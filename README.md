# Komplett Flytt och Transport

En enkel, responsiv flytthemsida i **Next.js 16** med separata React-komponenter. Fungerar på mobil, surfplatta och dator och håller sig under 30 projektfiler.

## Starta lokalt

Kräver Node.js 22+.

```bash
npm install
npm run dev
```

Öppna http://localhost:3000 och stoppa med Ctrl+C.

## Kontaktuppgifter

Telefon **07000001** och e-post **info@gmail.com** är nu förinställda på hemsidan i `lib/site.js`. De visas som klickbara länkar i kontaktsektionen, menyn, mobilen och sidfoten. Offertmejl adresseras till **info@gmail.com** som standard. Bekräfta att dessa uppgifter tillhör firman före publicering; telefonnumret är ovanligt kort för ett svenskt mobilnummer.

För att ändra utan kodändring kan du använda servermiljön:

```dotenv
NEXT_PUBLIC_CONTACT_PHONE=07000001
NEXT_PUBLIC_CONTACT_EMAIL=info@gmail.com
CONTACT_INBOX_EMAIL=info@gmail.com
```

## Koppla Resend för offert och autosvar

Offertformuläret skickar ett mejl med kundens uppgifter till företaget och därefter ett automatiskt bekräftelsemejl till kunden. För detta krävs två **hemliga servervariabler** på din Next.js-hosting:

- `RESEND_API_KEY` – en giltig API-nyckel från Resend.
- `RESEND_FROM_EMAIL` – en avsändaradress på en **verifierad domän**, till exempel `Komplett Flytt <offert@dindoman.se>`.

**Viktigt:** Gmail-adressen kan ta emot och besvara mejl, men Resend kan **inte** använda `info@gmail.com` som avsändare utan rätt till domänen gmail.com. Du behöver därför först verifiera en egen domän i https://resend.com/domains och ange en adress på den domänen som `RESEND_FROM_EMAIL`.

För lokal testning: kopiera `.env.example` till `.env.local`, fyll i de två saknade variablerna **endast lokalt**, och starta om servern. `.env.local` ignoreras av Git och får aldrig publiceras eller delas. Om du redan delat nyckeln i en chatt bör du rotera den i Resend och använda den nya nyckeln enbart i hostingen.

För produktion: konfigurera variablerna i Vercel/annat Next.js-webbhotells *Environment Variables* som serverhemligheter och deploya om. Det räcker **inte** att pusha koden till GitHub. Sidan kan inte skicka mejl förrän drift, nyckel och verifierad avsändare finns.

## Beteende och säkerhet

- Formuläret visar tydligt när mejlfunktionen inte är konfigurerad.
- E-postadress är obligatorisk för att ett autosvar ska kunna skickas.
- Företaget får mejlet först; kunden får därefter en bekräftelse (inte en bokning).
- Grundläggande validering, dold spamskyddsruta och enkel begränsning per IP ingår. För en publik serverless-installation rekommenderas även hostingens rate limiting.
- Ingen kunddatabas används. Företaget ansvarar för integritetstext och korrekt hantering av offertuppgifterna.

## Struktur och bygg

`app/` (sida och API), `components/` (sektioner), `lib/site.js` (kontakt och tjänster), `public/` (logotyp).

```bash
npm run build
npm run start
```

GitHub Actions kör byggkontroll efter push. Hosting måste stödja Next.js-serverfunktioner; en ren statisk publicering kan inte skicka mejl.
