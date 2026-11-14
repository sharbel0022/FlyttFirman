import { questions } from '../lib/site';

export default function FAQ() {
  return (
    <section className="section faq-section" id="fragor" aria-labelledby="faq-title">
      <div className="container faq-layout"><div><p className="eyebrow"><span className="dash" /> VANLIGA FRÅGOR</p><h2 id="faq-title">Bra att veta <span>inför flytten.</span></h2><p>Här är svar på vanliga frågor. Kontakta oss gärna om du undrar över något annat.</p></div>
        <div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
      </div>
    </section>
  );
}
