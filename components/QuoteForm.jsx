'use client';

import { useState } from 'react';

export default function QuoteForm({ contactEmail, contactPhone, emailEnabled }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);

  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setResult(null);
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = Object.fromEntries(fields.entries());
    payload.consent = fields.get('consent') === 'on';

    try {
      const response = await fetch('/api/offert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setResult({ type: 'error', text: data.error || 'Något gick fel. Försök igen.' });
        return;
      }
      form.reset();
      setResult({
        type: data.confirmationSent ? 'success' : 'notice',
        text: data.confirmationSent
          ? 'Tack! Vi har fått din förfrågan och skickat en bekräftelse till din e-postadress.'
          : 'Tack! Vi har fått din förfrågan, men kunde inte skicka bekräftelsemejlet. Du behöver inte skicka igen.',
      });
    } catch {
      setResult({ type: 'error', text: 'Kunde inte ansluta. Kontrollera internetanslutningen och försök igen.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="section quote-section" id="offert" aria-labelledby="quote-title">
      <div className="container quote-layout">
        <div className="quote-intro">
          <p className="eyebrow"><span className="dash" /> KOSTNADSFRI FÖRFRÅGAN</p>
          <h2 id="quote-title">Få en offert för <span>din flytt.</span></h2>
          <p>Beskriv din flytt och skicka direkt till oss. Du får ett automatiskt bekräftelsemejl när vi tagit emot din förfrågan.</p>
          <ul>
            <li>Enkelt att fylla i från mobilen</li>
            <li>Inget konto eller bokning krävs</li>
            <li>Vi återkommer med ett personligt förslag</li>
          </ul>
          {contactPhone && <a className="call-link" href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`}>Vill du hellre ringa? {contactPhone} ↗</a>}
          {contactEmail && <a className="call-link" href={`mailto:${contactEmail}`}>Eller mejla oss: {contactEmail} ↗</a>}
        </div>
        <div className="form-card">
          <div className="form-top"><div><span>OFFERTFÖRFRÅGAN</span><h3>Vad behöver du hjälp med?</h3></div><small>ENKELT &amp; SNABBT</small></div>
          <form onSubmit={submit} aria-describedby="form-privacy">
            <div className="form-row">
              <label>Namn <em>*</em><input name="name" type="text" autoComplete="name" placeholder="För- och efternamn" maxLength={100} required /></label>
              <label>Telefon <em>*</em><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Ditt telefonnummer" maxLength={35} minLength={6} required /></label>
            </div>
            <label>E-post <em>*</em><input name="email" type="email" autoComplete="email" inputMode="email" placeholder="namn@exempel.se" maxLength={150} required /></label>
            <div className="form-row">
              <label>Flytt från <em>*</em><input name="from" type="text" placeholder="Ort eller postnummer" maxLength={100} required /></label>
              <label>Flytt till <em>*</em><input name="to" type="text" placeholder="Ort eller postnummer" maxLength={100} required /></label>
            </div>
            <div className="form-row">
              <label>Typ av hjälp <em>*</em>
                <select name="service" defaultValue="" required>
                  <option value="" disabled>Välj tjänst</option>
                  <option>Bohagsflytt</option>
                  <option>Företagsflytt</option>
                  <option>Transport och bärhjälp</option>
                  <option>Annat / osäker</option>
                </select>
              </label>
              <label>Önskat datum<input name="date" type="date" /></label>
            </div>
            <label>Övrig information (valfritt)<textarea name="notes" placeholder="Exempel: antal rum, våning, hiss eller tunga möbler" rows={3} maxLength={1200} /></label>
            <div className="honey-field" aria-hidden="true"><label>Webbplats<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
            <label className="consent"><input name="consent" type="checkbox" required /><span>Jag godkänner att mina uppgifter används för att hantera offertförfrågan och skicka en bekräftelse via e-post. <em>*</em></span></label>
            <button className="btn btn-red submit" type="submit" disabled={pending || !emailEnabled}>
              {pending ? 'Skickar förfrågan…' : 'Skicka offertförfrågan'} <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p className="privacy-note" id="form-privacy">Vi använder uppgifterna endast för att hantera din offertförfrågan. Ingen bokning görs automatiskt.</p>
          {!emailEnabled && <p className="form-warning" role="status">Mejlutskicket är ännu inte aktiverat. Kontakta oss via telefon eller e-post tills företagets mejlkonto har kopplats.</p>}
          {result && <div className={`form-feedback form-feedback-${result.type}`} role="status" aria-live="polite">{result.text}</div>}
        </div>
      </div>
    </section>
  );
}
