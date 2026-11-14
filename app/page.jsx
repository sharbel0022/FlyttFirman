import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Steps from '../components/Steps';
import Areas from '../components/Areas';
import Contact from '../components/Contact';
import QuoteForm from '../components/QuoteForm';
import MobileActions from '../components/MobileActions';
import Footer from '../components/Footer';
import { site } from '../lib/site';

export default function Home() {
  // Ingen API-nyckel exponeras i webbläsaren, bara om formuläret är aktiverat.
  const emailEnabled = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.CONTACT_INBOX_EMAIL
  );

  return (
    <>
      <a className="skip-link" href="#innehall">Hoppa till innehåll</a>
      <Header phone={site.phone} email={site.email} />
      <main id="innehall">
        <Hero />
        <Services />
        <Steps />
        <Areas />
        <Contact phone={site.phone} email={site.email} />
        <QuoteForm contactEmail={site.email} contactPhone={site.phone} emailEnabled={emailEnabled} />
        <section className="last-call" aria-label="Begär offert">
          <div className="container last-call-inner">
            <div><span className="eyebrow eyebrow-white">REDO FÖR NÄSTA KAPITEL?</span><h2>Vi tar hand om din flytt.</h2></div>
            <a className="btn btn-white" href="#offert">Begär offert <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <Footer email={site.email} phone={site.phone} />
      <MobileActions email={site.email} phone={site.phone} />
    </>
  );
}
