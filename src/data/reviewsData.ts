export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  date: string;
  scooterRented: string;
  comment: string;
  avatarBg: string;
}

export const REVIEWS_DATA: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Sarah & Mark',
    country: 'Australia',
    flag: '🇦🇺',
    rating: 5,
    date: 'July 2026',
    scooterRented: 'Yamaha NMAX 155cc',
    comment: 'Super fast delivery to Komodo Airport! Motorbike was brand new with high power to climb steep hills near Waecicu and Golo Mori. Zero deposit made everything stress-free.',
    avatarBg: 'bg-teal-500',
  },
  {
    id: 'rev-2',
    name: 'Budi Santoso',
    country: 'Indonesia',
    flag: '🇮🇩',
    rating: 5,
    date: 'June 2026',
    scooterRented: 'Honda Scoopy 110cc',
    comment: 'Pelayanan Mas HelloBajo mantap banget. Motor Scoopy-nya mulus, bensin terisi, helm wangi dan bersih. Diantar gratis ke hotel Meruorah.',
    avatarBg: 'bg-emerald-500',
  },
  {
    id: 'rev-3',
    name: 'Chen Wei & Lin',
    country: 'Singapore / China',
    flag: '🇸🇬',
    rating: 5,
    date: 'May 2026',
    scooterRented: 'Honda Beat 110cc',
    comment: 'Rented for 4 days exploring Labuan Bajo town and Gua Rangko. Very responsive on WhatsApp in English. Helmets and raincoats included without extra charge!',
    avatarBg: 'bg-amber-500',
  },
  {
    id: 'rev-4',
    name: 'Gilles & Sophie',
    country: 'France',
    flag: '🇫🇷',
    rating: 5,
    date: 'April 2026',
    scooterRented: 'Yamaha NMAX 155cc',
    comment: 'Best rental shop in Labuan Bajo hands down. We paid via Wise transfer, no security deposit required. The NMAX was perfect for two people riding to Bukit Cinta sunset.',
    avatarBg: 'bg-blue-500',
  },
];
