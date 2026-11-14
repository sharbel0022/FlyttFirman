# Komplett Flytt och Transport

En enkel, mobilanpassad hemsida byggd med **Next.js (App Router), React-komponenter och CSS**. Designen utgår från företagets uppladdade logotyp. Den är gjord för att kunna publiceras billigt, utan databas eller bokningssystem.

## Starta lokalt

Kräver Node.js 20.9 eller senare.

```bash
npm install
npm run dev
```

Öppna **http://localhost:3000**. Stoppa med **Ctrl+C**.

## Lägg till kontaktuppgifter

1. Kopiera `.env.example` till `.env.local`.
2. Fyll i företagets riktiga `NEXT_PUBLIC_CONTACT_EMAIL` och `NEXT_PUBLIC_CONTACT_PHONE`.
3. Starta om utvecklingsservern. Vid publicering behöver sidan byggas om när uppgifterna ändras.

Utan e-postadress kan offertformuläret skapa och kopiera en färdig förfrågan men inte erbjuda ”Öppna e-post”. **Det skickar inte mejl automatiskt.** Formuläret lagrar ingenting på en server.

## Bygg och publicera billigt

```bash
npm run build
```

Next.js exporterar en statisk hemsida i `out/`. Publicera den på ett statiskt webbhotell, exempelvis via GitHub-koppling på Netlify (byggkommando `npm run build`, publiceringsmapp `out`). En domän kan köpas separat. Gratisplaner har användningsbegränsningar.

## Viktigt före skarp publicering

- Kontrollera att de tre listade tjänsterna faktiskt erbjuds.
- Ange rätt kontaktuppgifter och verksamhetsområden; sidan påstår inte att firman flyttar i hela Sverige.
- Lägg till juridisk företagsinformation och integritetsinformation vid behov.
- RUT-avdrag beror på Skatteverkets villkor och avser kvalificerad arbetskostnad.

## Kodstruktur

- `app/` – sida, metadata och global CSS.
- `components/` – separata sektioner och interaktivt offertformulär.
- `lib/site.js` – företagets namn, tjänster och vanliga frågor.
- `public/` – logotyp och favicon.

Max 30 källfiler; inga tester, databaser, API-rutter, UI-bibliotek eller onödiga konfigurationsfiler.
