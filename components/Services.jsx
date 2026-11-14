import { services } from '../lib/site';

export default function Services() {
  return (
    <section className="section section-muted" id="tjanster" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div><p className="eyebrow"><span className="dash" /> VÅRA TJÄNSTER</p><h2 id="services-title">Flytthjälp för <span>olika behov.</span></h2></div>
          <p>Oavsett om det gäller ett helt bohag eller några enstaka saker börjar vi med att förstå vad du behöver.</p>
        </div>
        <div className="service-grid">
          {services.map(s => (
            <article className="service-card" key={s.number}>
              <div className="service-card-top"><span>{s.number} / {s.subtitle}</span><span className="service-icon" aria-hidden="true">{s.icon}</span></div>
              <h3>{s.title}</h3><p>{s.description}</p>
              <a href="#offert" className="service-card-link">Fråga om {s.title.toLowerCase()} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
