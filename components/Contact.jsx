export default function Contact({ phone, email }) {
  const phoneLink = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '';
  return (
    <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div>
          <p className="eyebrow"><span className="dash" /> KONTAKTA OSS</p>
          <h2 id="contact-title">Vi hjälper dig <span>hela vägen.</span></h2>
          <p>Har du frågor om ett uppdrag? Ring eller skriv till oss, eller fyll i offertformuläret.</p>
        </div>
        <div className="contact-cards">
          <div className="contact-card">
            <span className="contact-icon" aria-hidden="true">☎</span>
            <div><small>TELEFON</small>{phone ? <a href={phoneLink}>{phone}</a> : <span className="contact-pending">Telefonnummer läggs till</span>}</div>
          </div>
          <div className="contact-card">
            <span className="contact-icon" aria-hidden="true">✉</span>
            <div><small>E-POST</small>{email ? <a href={`mailto:${email}`}>{email}</a> : <span className="contact-pending">E-postadress läggs till</span>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
