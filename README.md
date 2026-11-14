# Komplett Flytt och Transport

En enkel, responsiv hemsida med **Next.js 16 (App Router)** och separata komponenter. Mobil och iPad är prioriterade. Designen utgår från företagets logotyp och använder svart, vitt och rött. Projektet hålls under **30 källfiler**.

## Starta på datorn

Du behöver Node.js 22 eller senare.

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Öppna `http://localhost:3000`. Avsluta med Ctrl+C.

## Koppla företagets telefon och e-post

Öppna `.env.local` och ange:

```dotenv
NEXT_PUBLIC_CONTACT_PHONE=+46...
NEXT_PUBLIC_CONTACT_EMAIL=foretag@dindoman.se
CONTACT_INBOX_EMAIL=foretag@dindoman.se
```

- Telefonnummer visas i kontaktsektionen, i sidfoten, menyn och mobilens snabbkontakt.
- E-postadressen visas som klickbar mejllänk. `CONTACT_INBOX_EMAIL` är inkorgen som får offertmejlen (den kan vara en Gmail-, Outlook- eller företagsadress).
- Ingen faktisk kontaktadress har lagts in i projektet eftersom uppgifterna ännu inte har tillhandahållits.

## Aktivera automatiska mejl via Resend

Denna version skickar **två mejl** när någon fyller i offertformuläret: ett med alla uppgifter till företaget och en automatisk mottagningsbekräftelse till kunden. Inget databas- eller bokningssystem behövs.

1. Registrera ett konto på [Resend](https://resend.com/).
2. Lägg till företagets egen domän och verifiera den via DNS enligt Resends instruktioner. Du kan inte skicka som en vanlig `@gmail.com`-adress utan egen verifierad avsändardomän. Företagets **mottagaradress** kan däremot vara Gmail.
3. Skapa en API-nyckel under *API Keys*.
4. Fyll i ytterligare två rader i `.env.local`:

   ```dotenv
   RESEND_FROM_EMAIL=Komplett Flytt <offert@dindoman.se>
   RESEND_API_KEY=re_... 
   ```

5. Starta om servern. För produktionsdrift lägger du in alla fem miljövariabler i din hostings hemlighetsinställningar och gör en ny deployment.
6. Testa med ett eget mejlkonto: skicka en offert, kontrollera att företaget får uppgifterna och att avsändaren får ett automatiskt svar. Kontrollera även skräppost.

**Viktigt:** Webbplatsen måste köras på hosting med **Next.js-server eller serverless-funktioner** (till exempel Vercel eller Netlify med Next.js-stöd). `next.config.mjs` exporterar inte längre en helt statisk `out/`-mapp – en statisk filhost kan inte köra `/api/offert`.

Om mejltjänsten inte är konfigurerad är formulärets skicka-knapp inaktiverad och sidan visar tydlig information. Ingen falsk leveransbekräftelse visas.

## Skydd och integritet

- Alla API-nycklar stannar på servern och `.env.local` finns i `.gitignore`.
- Formuläret kontrolleras både i webbläsaren och på servern. En dold honeypot och enkel IP-baserad hastighetsbegränsning dämpar spam.
- Minnesbaserad hastighetsbegränsning är **inte tillräcklig i en serverless-miljö med flera instanser**. Innan större trafik bör du aktivera bot-/rate-limit-skydd i hostingen.
- Ingen kunddatabas används. E-postleverantören och företagets inkorg hanterar dock de personuppgifter som skickas. Företaget ansvarar för korrekt integritetstext och hantering av uppgifterna.
- Den automatiska bekräftelsen betyder bara **mottagen offertförfrågan**, inte att flytten är bokad eller godkänd.

## Kontrollera och publicera

```bash
npm run build
npm run start
```

GitHub Actions kör en Next.js-byggkontroll vid varje push. Kontrollera tjänster, verksamhetsområden, företagsuppgifter och RUT-information före publicering. Köp domän separat om företaget inte redan har en.

## Struktur

- `app/` – startsida, CSS, metadata och serverendpoint `api/offert/route.js`.
- `components/` – header, hero, tjänster, områden, kontakt, mobilknappar och offertformulär.
- `lib/site.js` – tjänsteinformation och kontaktuppgifter från miljövariabler.
- `public/` – logotyp och favicon.
