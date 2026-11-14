'use client';

import { useRef, useState } from 'react';

export default function QuoteForm({ contactEmail, contactPhone }) {
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const draftRef = useRef(null);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = key => String(data.get(key) || '').trim();
    const message = [
      'OFFERTFÖRFRÅGAN – KOMPLETT FLYTT OCH TRANSPORT',
      '',
      `Namn: ${value('name')}`,
      `Telefon: ${value('phone')}`,
      `E-post: ${value('email') || 'Ej angiven'}`,
      `Flytt från: ${value('from')}`,
      `Flytt till: ${value('to')}`,
      `Tjänst: ${value('service')}`,
      `Önskat datum: ${value('date') || 'Inte bestämt'}`,
      '',
      `Övriga uppgifter: ${value('notes') || 'Inga'}`,
      '',
      'Vänligen återkom med pris och om uppdraget är möjligt.',
    ].join('\n');
    setDraft(message);
    setCopied(false);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopied(false);
    }
  }

  const subject = 'Offertförfrågan – Komplett Flytt och Transport';
  const emailLink = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`
    : '';

  return (
    <section className="section quote-section" id="offert" aria-labelledby="quote-title">
      <div className="container quote-layout">
        <div className="quote-intro"><p className="eyebrow"><span className="dash" /> KONTAKTA OSS</p><h2 id="quote-title">Berätta om <span>din flytt.</span></h2><p>Fyll i några uppgifter så får du en färdig förfrågan att skicka. Du behöver inte veta exakt hur allt ska gå till än.</p><ul><li>Det tar bara någon minut att fylla i</li><li>Du kan beskriva särskilda önskemål</li><li>Du får ett färdigt meddelande att skicka</li></ul>{contactPhone ? <a className="call-link" href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`}>Vill du hellre ringa? {contactPhone} ↗</a> : null}</div>
        <div className="form-card"><div className="form-top"><div><span>OFFERTFÖRFRÅGAN</span><h3>Vad behöver du hjälp med?</h3></div><small>01 / 01</small></div>
          <form onSubmit={submit}>
            <div className="form-row"><label>Namn <em>*</em><input name="name" type="text" autoComplete="name" placeholder="För- och efternamn" maxLength={100} required /></label><label>Telefon <em>*</em><input name="phone" type="tel" autoComplete="tel" placeholder="Ditt telefonnummer" maxLength={35} required /></label></div>
            <label>E-post (valfritt)<input name="email" type="email" autoComplete="email" placeholder="namn@exempel.se" maxLength={150} /></label>
            <div className="form-row"><label>Flytt från <em>*</em><input name="from" placeholder="Ort eller postnummer" maxLength={100} required /></label><label>Flytt till <em>*</em><input name="to" placeholder="Ort eller postnummer" maxLength={100} required /></label></div>
            <div className="form-row"><label>Typ av hjälp <em>*</em><select name="service" defaultValue="" required><option value="" disabled>Välj tjänst</option><option>Bohagsflytt</option><option>Företagsflytt</option><option>Transport och bärhjälp</option><option>Annat / osäker</option></select></label><label>Önskat datum<input name="date" type="date" /></label></div>
            <label>Övrigt (valfritt)<textarea name="notes" placeholder="Till exempel storlek på bostad, våning eller tunga möbler..." rows={3} maxLength={1200} /></label>
            <button className="btn btn-red submit" type="submit">Förbered offertförfrågan <span aria-hidden="true">↗</span></button>
          </form>
          <p className="privacy-note">Inga personuppgifter skickas automatiskt från sidan. Du väljer själv om du vill kopiera eller mejla din förfrågan.</p>
          {draft ? <div className="draft" role="status" aria-live="polite"><strong>Din förfrågan är klar!</strong><p>{contactEmail ? 'Klicka på ”Öppna e-post” och skicka meddelandet från ditt e-postprogram, eller kopiera texten.' : 'Kopiera texten nedan. Företagets e-postadress behöver fyllas i innan sidan används av kunder.'}</p><textarea ref={draftRef} aria-label="Din färdiga offertförfrågan" readOnly rows={9} value={draft} /><div className="draft-buttons"><button type="button" className="btn btn-dark" onClick={copyDraft}>{copied ? 'Kopierat ✓' : 'Kopiera text'}</button>{contactEmail ? <a className="btn btn-red" href={emailLink}>Öppna e-post ↗</a> : null}</div></div> : null}
        </div>
      </div>
    </section>
  );
}
