export default function Areas() {
  return (
    <>
      <section className="areas-section" id="omraden" aria-labelledby="areas-title">
        <div className="container areas-layout">
          <div><p className="eyebrow eyebrow-white"><span className="dash" /> VAR FLYTTAR DU?</p><h2 id="areas-title">Från en adress <span>till nästa.</span></h2><p>Flyttar du inom din ort eller till en annan stad? Skriv var du behöver hjälp så återkommer vi med besked om vi kan utföra uppdraget.</p><a className="btn btn-white" href="#offert">Fråga om din sträcka <span aria-hidden="true">↗</span></a></div>
          <div className="route-card" aria-label="Exempel på flyttsträcka"><small>DIN FLYTTSTRÄCKA</small><div className="route-path"><div><span className="route-dot" /><div><small>FRÅN</small><strong>Din nuvarande adress</strong></div></div><div><span className="route-dot route-dot-red" /><div><small>TILL</small><strong>Din nya adress</strong></div></div></div><a href="#offert">Beskriv din flytt <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
      <div className="rut-strip"><div className="container rut-inner"><span className="rut-label">BRA ATT VETA</span><p><strong>RUT-avdrag kan gälla för flyttarbete.</strong><br />Det beror på arbetet och Skatteverkets villkor. Avdraget gäller arbetskostnad, inte exempelvis bil och material.</p><a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrutavdraget.4.d5e04db14b6fef2c866097.html/" target="_blank" rel="noopener noreferrer">Läs hos Skatteverket ↗</a></div></div>
    </>
  );
}
