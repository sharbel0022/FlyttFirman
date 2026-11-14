import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow eyebrow-white"><span className="dash" /> FÖR EN ENKLARE FLYTT</p>
            <h1 id="hero-title">Vi tar hand om <span>din flytt.</span></h1>
            <p className="hero-description">Ska du flytta till ett nytt hem, byta kontor eller få hjälp med transport? Vi gör det enkelt att ta nästa steg.</p>
            <div className="hero-actions">
              <a className="btn btn-red btn-large" href="#offert">Få en offert <span aria-hidden="true">↗</span></a>
              <a className="btn btn-ghost btn-large" href="#tjanster">Se våra tjänster <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-assurance"><span>✓ Tydlig kontakt</span><span>✓ Anpassat efter din flytt</span></div>
          </div>
          <div className="hero-image-wrap">
            <Image className="hero-image" src="/komplett-logo.webp" alt="Komplett Flytt och Transports logotyp med flyttbil, medarbetare och texten Vi tar hand om din flytt" width={1672} height={941} sizes="(max-width: 850px) 100vw, 55vw" preload />
            <div className="hero-image-tag"><span className="hero-tag-icon">✳</span><div><small>NY ADRESS?</small><strong>Vi hjälper dig vidare.</strong></div></div>
          </div>
        </div>
      </section>
      <div className="quick-links" aria-label="Våra tjänster">
        <div className="container quick-links-inner">
          <a href="#tjanster"><span>01</span> Bohagsflytt <i aria-hidden="true">↗</i></a>
          <a href="#tjanster"><span>02</span> Företagsflytt <i aria-hidden="true">↗</i></a>
          <a href="#tjanster"><span>03</span> Transport &amp; bärhjälp <i aria-hidden="true">↗</i></a>
        </div>
      </div>
    </>
  );
}
