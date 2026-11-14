export const site = {
  name: 'Komplett Flytt och Transport',
  slogan: 'Vi tar hand om din flytt',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '',
};

export const services = [
  {
    number: '01',
    icon: '⌂',
    title: 'Bohagsflytt',
    subtitle: 'För dig som flyttar hem',
    description: 'Från lägenhet till hus eller en ny adress. Berätta om ditt bohag så tar vi fram ett upplägg som passar.',
  },
  {
    number: '02',
    icon: '▤',
    title: 'Företagsflytt',
    subtitle: 'När verksamheten byter plats',
    description: 'Ska kontoret flytta? Beskriv lokaler, inventarier och önskat datum så går vi igenom ditt uppdrag.',
  },
  {
    number: '03',
    icon: '⇢',
    title: 'Transport & bärhjälp',
    subtitle: 'För större och mindre uppdrag',
    description: 'Behöver du flytta möbler eller få hjälp med tunga lyft? Hör av dig och berätta vad som ska transporteras.',
  },
];

export const questions = [
  {
    question: 'Vad kostar en flytt?',
    answer: 'Priset beror på mängden saker, avståndet, tillgängligheten på adresserna och vilken hjälp du behöver. Beskriv flytten i formuläret så kan vi återkomma med ett förslag.',
  },
  {
    question: 'Vilka orter flyttar ni mellan?',
    answer: 'Skriv var du flyttar från och vart du ska i offertförfrågan. Vi bekräftar därefter om vi kan utföra flytten på den aktuella sträckan.',
  },
  {
    question: 'Kan jag använda RUT-avdrag?',
    answer: 'Vissa flyttjänster kan omfattas av RUT-avdrag om Skatteverkets villkor är uppfyllda. Avdraget avser arbetskostnaden, inte till exempel flyttbil och material. Läs mer på Skatteverkets webbplats.',
  },
  {
    question: 'Hur bokar jag flytthjälp?',
    answer: 'Börja med att skicka en förfrågan. När uppdraget och priset är överenskommet kan ni bekräfta flyttdatum och detaljer tillsammans.',
  },
];
