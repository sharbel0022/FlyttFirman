export const site = {
  name: 'Komplett Flytt och Transport',
  slogan: 'Vi tar hand om din flytt',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'info@gmail.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '07000001',
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
