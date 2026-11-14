'use client';

import { useState } from 'react';

const links = [
  ['#tjanster', 'Tjänster'],
  ['#process', 'Så fungerar det'],
  ['#omraden', 'Områden'],
  ['#kontakt', 'Kontakt'],
];

export default function Header({ phone, email }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header" id="toppen">
      <div className="container header-inner">
        <a className="brand" href="#toppen" aria-label="Komplett Flytt och Transport, startsidan" onClick={() => setOpen(false)}>
          <span className="brand-symbol">K<span>.</span></span>
          <span className="brand-copy"><strong>KOMPLETT</strong><small>FLYTT &amp; TRANSPORT</small></span>
        </a>
        <nav className={`nav ${open ? 'is-open' : ''}`} id="main-nav" aria-label="Huvudmeny">
          {links.map(([href, title]) => <a key={href} href={href} onClick={() => setOpen(false)}>{title}</a>)}
          {phone && <a className="nav-contact-mobile" href={`tel:${phone.replace(/[^+\d]/g, '')}`} onClick={() => setOpen(false)}>Ring: {phone}</a>}
          {email && <a className="nav-contact-mobile" href={`mailto:${email}`} onClick={() => setOpen(false)}>Mejla oss</a>}
          <a className="nav-mobile-cta" href="#offert" onClick={() => setOpen(false)}>Begär offert ↗</a>
        </nav>
        {phone && <a className="header-phone" href={`tel:${phone.replace(/[^+\d]/g, '')}`} aria-label={`Ring oss på ${phone}`}>☎ <span>{phone}</span></a>}
        <a className="btn btn-red header-cta" href="#offert">Begär offert <span aria-hidden="true">↗</span></a>
        <button className={`menu-button ${open ? 'is-open' : ''}`} type="button" aria-controls="main-nav" aria-expanded={open} aria-label={open ? 'Stäng meny' : 'Öppna meny'} onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
