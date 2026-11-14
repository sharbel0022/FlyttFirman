// Hanterar offertmejl på servern. Nyckeln lämnar aldrig servern.
export const runtime = 'nodejs';

const allowedServices = new Set(['Bohagsflytt', 'Företagsflytt', 'Transport och bärhjälp', 'Annat / osäker']);
const interval = 15 * 60 * 1000;
const maxRequests = 3;
const recentRequests = new Map();

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function response(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function isRateLimited(ip) {
  const now = Date.now();
  // Liten minnesbegränsning för en enkel installation. För många serverinstanser
  // krävs även rate limiting hos hostingen, se README.
  if (recentRequests.size > 1000) {
    for (const [key, values] of recentRequests) {
      if (values.every((time) => now - time > interval)) recentRequests.delete(key);
    }
  }
  const previous = (recentRequests.get(ip) || []).filter((time) => now - time < interval);
  if (previous.length >= maxRequests) {
    recentRequests.set(ip, previous);
    return true;
  }
  recentRequests.set(ip, [...previous, now]);
  return false;
}

async function sendEmail(message, key) {
  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
    cache: 'no-store',
    signal: AbortSignal.timeout(12000),
  });
  if (!result.ok) {
    console.error('E-postleverantören kunde inte ta emot mejlet. Status:', result.status);
    throw new Error('EMAIL_PROVIDER_FAILED');
  }
}

export async function POST(request) {
  const key = process.env.RESEND_API_KEY?.trim();
  const sender = process.env.RESEND_FROM_EMAIL?.trim();
  const inbox = process.env.CONTACT_INBOX_EMAIL?.trim();
  if (!key || !sender || !inbox) {
    return response({ error: 'Offertmejl är ännu inte aktiverat. Kontakta oss via telefon eller e-post.' }, 503);
  }

  if (Number(request.headers.get('content-length') || 0) > 8000) {
    return response({ error: 'Förfrågan är för stor.' }, 413);
  }

  // Avvisa webbläsaranrop från andra webbplatser.
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return response({ error: 'Ogiltig förfrågan.' }, 403);
  }

  let data;
  try {
    data = await request.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('BAD_BODY');
  } catch {
    return response({ error: 'Formulärets uppgifter kunde inte läsas.' }, 400);
  }

  // Dold extraruta för botar. Acceptera tyst så att de inte får vägledning.
  if (clean(data.website, 100)) return response({ ok: true, confirmationSent: false });

  const name = clean(data.name, 100);
  const phone = clean(data.phone, 35);
  const email = clean(data.email, 150);
  const from = clean(data.from, 100);
  const to = clean(data.to, 100);
  const service = clean(data.service, 50);
  const date = clean(data.date, 10);
  const notes = clean(data.notes, 1200);
  const consent = data.consent === true;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPhone = /^[+\d\s().-]{6,35}$/.test(phone) && (phone.match(/\d/g) || []).length >= 6;
  const validDate = !date || /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!name || name.length > 100 || !validPhone || !validEmail || email.length > 150 ||
      !from || from.length > 100 || !to || to.length > 100 ||
      !allowedServices.has(service) || !validDate || notes.length > 1200 || !consent) {
    return response({ error: 'Kontrollera uppgifterna i formuläret och försök igen.' }, 400);
  }

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return response({ error: 'För många förfrågningar. Försök igen om en stund eller kontakta oss direkt.' }, 429);
  }

  const details = [
    `Namn: ${name}`,
    `Telefon: ${phone}`,
    `E-post: ${email}`,
    `Flytt från: ${from}`,
    `Flytt till: ${to}`,
    `Tjänst: ${service}`,
    `Önskat datum: ${date || 'Inte bestämt'}`,
    `Övrigt: ${notes || 'Inget angivet'}`,
  ];
  const emailText = `Ny offertförfrågan via hemsidan\n\n${details.join('\n')}\n`;

  try {
    // Först måste företaget få förfrågan; annars får kunden inte falsk bekräftelse.
    await sendEmail({
      from: sender,
      to: [inbox],
      reply_to: email,
      subject: `Ny flyttoffert – ${from} till ${to}`,
      text: emailText,
      html: `<h2>Ny offertförfrågan</h2><ul>${details.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`,
    }, key);
  } catch {
    return response({ error: 'Det gick inte att skicka förfrågan just nu. Försök igen senare eller mejla oss direkt.' }, 502);
  }

  try {
    await sendEmail({
      from: sender,
      to: [email],
      reply_to: inbox,
      subject: 'Vi har fått din offertförfrågan – Komplett Flytt och Transport',
      text: `Hej ${name}!\n\nTack för din offertförfrågan. Vi har tagit emot den och återkommer när vi har gått igenom dina uppgifter. Detta är inte en bokningsbekräftelse.\n\nDin förfrågan:\n${details.join('\n')}\n\nMed vänliga hälsningar\nKomplett Flytt och Transport`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#17171a;line-height:1.7"><h2 style="color:#c51931">Tack för din förfrågan!</h2><p>Hej ${escapeHtml(name)}!</p><p>Vi har tagit emot din offertförfrågan och återkommer när vi har gått igenom uppgifterna.</p><p><strong>Detta är inte en bokningsbekräftelse.</strong></p><h3>Dina uppgifter</h3><ul>${details.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul><p>Med vänliga hälsningar<br><strong>Komplett Flytt och Transport</strong></p></div>`,
    }, key);
  } catch {
    // Företaget har redan fått mejlet – låt inte kunden skicka igen av misstag.
    return response({ ok: true, confirmationSent: false });
  }

  return response({ ok: true, confirmationSent: true });
}
