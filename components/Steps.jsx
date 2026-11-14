const steps = [
  ['01', 'Beskriv ditt uppdrag', 'Fyll i var du flyttar från och till, och vilken hjälp du behöver.'],
  ['02', 'Få ett förslag', 'Vi går igenom detaljerna och återkommer om ett möjligt upplägg och pris.'],
  ['03', 'Planera din flytt', 'När allt känns rätt kommer vi överens om datum och praktiska detaljer.'],
];

export default function Steps() {
  return (
    <section className="section" id="process" aria-labelledby="steps-title">
      <div className="container steps-layout">
        <div className="steps-intro"><p className="eyebrow"><span className="dash" /> SÅ FUNGERAR DET</p><h2 id="steps-title">Tre steg.<br /><span>En smidigare flytt.</span></h2><p>Vi håller kontakten enkel så att du vet vad nästa steg är.</p><a className="underlined-link" href="#offert">Berätta om din flytt <span aria-hidden="true">↗</span></a></div>
        <ol className="steps-list">{steps.map(([num, title, desc]) => <li key={num}><span className="step-number">{num}</span><div><h3>{title}</h3><p>{desc}</p></div><span className="step-arrow" aria-hidden="true">↗</span></li>)}</ol>
      </div>
    </section>
  );
}
