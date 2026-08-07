import { BOAT_FLEET_IMAGES } from './images';

export interface PriceTier {
  minPax: number;
  maxPax: number;
  price: number;
  label: string;
}

export interface BoatCharterOption {
  id: string;
  name: string;
  type: 'Private Speedboat' | 'Luxury Phinisi Liveaboard';
  capacity: string;
  maxCapacity: string;
  acStatus: string;
  duration: string;
  priceTiers?: PriceTier[];
  extraPaxPrice?: number;
  priceVal: number;
  isPerPerson: boolean;
  priceFormatted: string;
  priceNote: string;
  image: string;
  badge?: string;
  isUnderDevelopment?: boolean;
  destinations: string[];
  inclusions: string[];
  description: {
    EN: string;
    ID: string;
    ZH: string;
  };
}

export function calculateBoatCharterPrice(boat: BoatCharterOption, guestCount: number): number {
  if (boat.isUnderDevelopment || !boat.priceTiers || boat.priceTiers.length === 0) {
    return boat.priceVal || 0;
  }
  const count = Math.max(1, guestCount);
  const matchingTier = boat.priceTiers.find((t) => count >= t.minPax && count <= t.maxPax);
  if (matchingTier) {
    return matchingTier.price;
  }
  // If count exceeds maximum defined tier
  const maxTier = boat.priceTiers[boat.priceTiers.length - 1];
  if (count > maxTier.maxPax) {
    if (boat.extraPaxPrice) {
      return maxTier.price + (count - maxTier.maxPax) * boat.extraPaxPrice;
    }
    return maxTier.price;
  }
  // If count below minimum defined tier
  return boat.priceTiers[0].price;
}

export const BOAT_CHARTERS: BoatCharterOption[] = [
  {
    id: 'athena-cruise',
    name: 'Athena Cruise',
    type: 'Private Speedboat',
    capacity: '1 - 8 Person',
    maxCapacity: 'Max 8 Pax',
    acStatus: 'Cabin AC',
    duration: 'Full Day (06:00 - 17:00)',
    priceVal: 8000000,
    isPerPerson: false,
    priceFormatted: 'Rp 8.000.000 - 9.000.000',
    priceNote: 'Private Charter',
    priceTiers: [
      { minPax: 1, maxPax: 4, price: 8000000, label: '1-4 Person: Rp 8.000.000' },
      { minPax: 5, maxPax: 8, price: 9000000, label: '5-8 Person: Rp 9.000.000' },
    ],
    image: BOAT_FLEET_IMAGES.athena,
    badge: 'Popular',
    destinations: [
      'Padar Island (Trekking & Summit View)',
      'Pink Beach (Snorkeling & Photos)',
      'Komodo Island (Ranger Trek & Dragon Spotting)',
      'Taka Makassar (Crescent Sandbank)',
      'Manta Point (Swimming with Manta Rays)',
      'Kanawa Island (Crystal Clear Snorkeling)',
    ],
    inclusions: [
      'Private Speedboat Charter (Athena Cruise)',
      'Experienced Captain, Crew & Licensed Tour Guide',
      'Fresh Lunch Box, Snacks & Fruits',
      'Full Snorkeling Gear (Mask, Snorkel, Fins) & Life Jacket',
      'Mineral Water & Soft Drinks',
      'Free Hotel & Marina Transfer in Labuan Bajo',
    ],
    description: {
      EN: 'Compact high-speed private speedboat charter with twin engines and air-conditioned cabin seating. Ideal for families and small groups up to 8 guests.',
      ID: 'Kapal cepat private charter eksklusif dengan kabin ber-AC dan mesin twin berkecepatan tinggi. Sangat cocok untuk keluarga dan rombongan hingga 8 orang.',
      ZH: '紧凑型双发高速包船快艇，配备冷气空调船舱，适合最多8人的家庭与小团队专属出海。',
    },
  },
  {
    id: 'shining-cruise',
    name: 'Shining Cruise',
    type: 'Private Speedboat',
    capacity: '1 - 8 Person',
    maxCapacity: 'Max 8 Pax',
    acStatus: 'Full AC & Sun Deck',
    duration: 'Full Day (06:00 - 17:00)',
    priceVal: 11000000,
    isPerPerson: false,
    priceFormatted: 'Rp 11.000.000 - 12.000.000',
    priceNote: 'Private Charter',
    priceTiers: [
      { minPax: 1, maxPax: 4, price: 11000000, label: '1-4 Person: Rp 11.000.000' },
      { minPax: 5, maxPax: 8, price: 12000000, label: '5-8 Person: Rp 12.000.000' },
    ],
    image: BOAT_FLEET_IMAGES.shining,
    badge: 'Full AC Deck',
    destinations: [
      'Padar Island (Trekking & Summit View)',
      'Pink Beach (Snorkeling & Photos)',
      'Komodo Island (Ranger Trek & Dragon Spotting)',
      'Taka Makassar (Crescent Sandbank)',
      'Manta Point (Swimming with Manta Rays)',
      'Kanawa Island (Crystal Clear Snorkeling)',
    ],
    inclusions: [
      'Private Speedboat Charter (Shining Cruise)',
      'Full AC Enclosed Cabin & Open Sun Deck',
      'Captain, Crew & Professional Tour Guide',
      'Freshly Cooked Lunch & Seasonal Tropical Fruits',
      'Snorkeling Gear & Safety Equipment',
      'GoPro Underwater Documentation & Hotel Transfers',
    ],
    description: {
      EN: 'Modern sleek private speedboat featuring full air conditioning, spacious seating cabin, and rear view deck for ultimate Komodo day tours.',
      ID: 'Speedboat private charter modern berkabin AC penuh dengan sundeck belakang. Kenyamanan ekstra jelajah pulau Komodo.',
      ZH: '全空调舒适室内船舱与观景甲板，现代化设计 private 快艇，带给您极佳出海观景体验。',
    },
  },
  {
    id: 'arsiva-speedboat',
    name: 'Arsiva Speedboat',
    type: 'Private Speedboat',
    capacity: '1 - 12+ Person',
    maxCapacity: 'Max 12+ Pax',
    acStatus: 'Full AC & Wide Lounge',
    duration: 'Full Day (06:00 - 17:00)',
    priceVal: 13000000,
    isPerPerson: false,
    priceFormatted: 'Mulai Rp 13.000.000',
    priceNote: 'Private Charter',
    priceTiers: [
      { minPax: 1, maxPax: 5, price: 13000000, label: '1-5 Person: Rp 13.000.000' },
      { minPax: 6, maxPax: 9, price: 14000000, label: '6-9 Person: Rp 14.000.000' },
      { minPax: 10, maxPax: 12, price: 15000000, label: '10-12 Person: Rp 15.000.000' },
    ],
    extraPaxPrice: 1000000,
    image: BOAT_FLEET_IMAGES.arsiva,
    badge: 'Spacious Group',
    destinations: [
      'Padar Island',
      'Pink Beach',
      'Komodo Island / Rinca Island',
      'Taka Makassar Sandbank',
      'Manta Point',
      'Siaba / Kanawa Island',
    ],
    inclusions: [
      'Exclusive Private Speedboat (Arsiva Speedboat)',
      'Air-Conditioned Cabin with Plush Sofa Lounge',
      'Dedicated Captain, Crew & Licensed Guide',
      'Gourmet Bento Lunch Box, Snacks & Fresh Fruits',
      'Complete Snorkeling Equipment & Life Jackets',
      'GoPro Underwater Photos & Videos Included',
      'Free Hotel & Port Transfer',
    ],
    description: {
      EN: 'Spacious high-capacity private speedboat with comfortable sofa seating and wide deck. Perfect for medium to large groups up to 12+ guests.',
      ID: 'Speedboat private charter berkapasitas besar dengan sofa kabin AC yang luas dan nyaman. Sangat ideal untuk rombongan hingga 12+ orang.',
      ZH: '宽敞大容量私人快艇，配有沙发卡座与超大活动空间，为多达12人以上的私密团队出海首选。',
    },
  },
  {
    id: 'sea-zaydan',
    name: 'Sea Zaydan',
    type: 'Private Speedboat',
    capacity: '1 - 12+ Person',
    maxCapacity: 'Max 12+ Pax',
    acStatus: 'Full AC & Sunset Deck',
    duration: 'Full Day (06:00 - 17:00)',
    priceVal: 13000000,
    isPerPerson: false,
    priceFormatted: 'Mulai Rp 13.000.000',
    priceNote: 'Private Charter',
    priceTiers: [
      { minPax: 1, maxPax: 5, price: 13000000, label: '1-5 Person: Rp 13.000.000' },
      { minPax: 6, maxPax: 9, price: 14000000, label: '6-9 Person: Rp 14.000.000' },
      { minPax: 10, maxPax: 12, price: 15000000, label: '10-12 Person: Rp 15.000.000' },
    ],
    extraPaxPrice: 1000000,
    image: BOAT_FLEET_IMAGES.seaZaydan,
    badge: 'Premium Fleet',
    destinations: [
      'Padar Island',
      'Pink Beach',
      'Komodo Island',
      'Taka Makassar',
      'Manta Point',
      'Kanawa Island',
    ],
    inclusions: [
      'Exclusive Private Speedboat (Sea Zaydan)',
      'Air-Conditioned Indoor Cabin & Outdoor Viewing Lounge',
      'Captain, Crew & Professional Local Guide',
      'Delicious Buffet Lunch, Refreshments & Fruits',
      'High Quality Snorkeling Gear & Safety Vests',
      'GoPro Underwater Photography',
      'Free Roundtrip Hotel Transfers',
    ],
    description: {
      EN: 'Premium private speedboat offering superior speed, smooth navigation, full AC interior, and scenic sunset deck for memorable family tours.',
      ID: 'Speedboat private armada premium dengan manuver cepat dan stabil, kabin AC sejuk, serta tempat bersantai menikmati pemandangan laut.',
      ZH: '顶级私密快艇，双机航行平稳迅速，全冷气室内配合观景拉风露台，带来难忘的海岛体验。',
    },
  },
  {
    id: 'luxury-phinisi-liveaboard',
    name: 'Luxury Wooden Phinisi Boat',
    type: 'Luxury Phinisi Liveaboard',
    capacity: '8 - 14 Passengers',
    maxCapacity: 'Max 14 Pax',
    acStatus: 'Luxury AC Cabins',
    duration: '2D1N / 3D2N Liveaboard',
    priceVal: 0,
    isPerPerson: false,
    priceFormatted: 'Coming Soon',
    priceNote: 'Coming Soon',
    image: BOAT_FLEET_IMAGES.phinisi,
    badge: 'Coming Soon',
    isUnderDevelopment: true,
    destinations: [
      'Kelor Island (Sunset Trek)',
      'Kalong Island (Flying Fox Bat Sunset)',
      'Padar Island Sunrise Trek',
      'Pink Beach & Manta Point',
      'Siaba Island (Sea Turtles)',
      'Kanawa Island',
    ],
    inclusions: [
      'Ensuite AC Deluxe Cabins with private bathroom',
      'Private Chef with 3 Gourmet meals daily',
      'Sunset Upper Deck lounge & Bar',
      'Snorkeling gear & Stand-up paddleboards',
      'Full crew, captain & park guide',
    ],
    description: {
      EN: 'Handcrafted traditional Indonesian Wooden Phinisi liveaboard vessel for luxury multi-day cruises (Under Development).',
      ID: 'Kapal Phinisi kayu tradisional Indonesia untuk pelayaran menginap 2D1N / 3D2N (Dalam Pengembangan / Coming Soon).',
      ZH: '手工制造印尼传统 Phinisi 豪华帆船过夜游 (暂未开放)。',
    },
  },
];

