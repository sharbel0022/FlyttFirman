export default function MobileActions({ phone, email }) {
  return (
    <nav className="mobile-actions" aria-label="Snabbkontakt">
      {phone && <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}><span aria-hidden="true">☎</span> Ring oss</a>}
      {email && <a href={`mailto:${email}`}><span aria-hidden="true">✉</span> Mejla oss</a>}
      <a className="mobile-actions-primary" href="#offert">Begär offert ↗</a>
    </nav>
  );
}
