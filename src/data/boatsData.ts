import { SPEEDBOAT_BANNER } from './images';

export interface BoatCharterOption {
  id: string;
  name: string;
  type: 'Open Daytrip' | 'Private Speedboat' | 'Luxury Phinisi Liveaboard';
  capacity: string;
  duration: string;
  priceFormatted: string;
  priceNote: string;
  image: string;
  badge?: string;
  destinations: string[];
  inclusions: string[];
  description: {
    EN: string;
    ID: string;
    ZH: string;
  };
}

export const BOAT_CHARTERS: BoatCharterOption[] = [
  {
    id: 'open-speedboat-daytrip',
    name: 'Komodo 6-Destination Speedboat Day Tour (Open Group)',
    type: 'Open Daytrip',
    capacity: '12 - 20 Pax / Boat',
    duration: 'Full Day (06:00 - 17:00)',
    priceFormatted: 'Rp 1,350,000',
    priceNote: 'per person',
    image: SPEEDBOAT_BANNER,
    badge: 'Best Seller',
    destinations: [
      'Padar Island (Trekking & Summit View)',
      'Pink Beach (Snorkeling & Photos)',
      'Komodo Island (Ranger Trek & Dragon Spotting)',
      'Taka Makassar (Crescent Sandbank)',
      'Manta Point (Swimming with Manta Rays)',
      'Kanawa Island (Crystal Clear Snorkeling)',
    ],
    inclusions: [
      'Hotel pickup & drop-off transfers',
      'Speedboat charter with twin 250HP engines',
      'Buffet / Bento lunch box & snacks',
      'Full snorkeling gear & life jacket',
      'Mineral water, soft drinks & fruits',
      'English speaking tour guide & documentation',
    ],
    description: {
      EN: 'The ultimate 1-day Komodo National Park experience! Cover all 6 flagship islands in a high-speed comfortable boat with air-conditioned cabin.',
      ID: 'Paket tur favorit 1 hari jelajah 6 destinasi utama Taman Nasional Komodo. Kapal cepat nyaman dengan kabin AC dan pemandu profesional.',
      ZH: '一天内打卡科莫多国家公园 6 大标志性景点的经典之选！高速双发动力，豪华空调船舱与专业英文导游。',
    },
  },
  {
    id: 'private-speedboat-charter',
    name: 'VIP Private Speedboat Charter',
    type: 'Private Speedboat',
    capacity: 'Up to 12 Pax',
    duration: 'Full Day (Custom Schedule)',
    priceFormatted: 'Rp 10,500,000',
    priceNote: 'per boat charter',
    image: SPEEDBOAT_BANNER,
    badge: '100% Private',
    destinations: [
      'Custom Itinerary Options',
      'Padar Island',
      'Pink Beach',
      'Komodo Island / Rinca Island',
      'Manta Point & Taka Makassar',
      'Turtle Point (Siaba)',
    ],
    inclusions: [
      'Exclusive private speedboat use',
      'Captain, crew & licensed guide',
      'Freshly cooked lunch & seasonal fruits',
      'Snorkeling gear, fins & life jackets',
      'GoPro underwater photos & video',
      'Free hotel & marina transfers',
    ],
    description: {
      EN: 'Enjoy complete flexibility and privacy for your family or friends. Departure times customized to your preference with personal crew.',
      ID: 'Nikmati kebebasan total dan privasi bersama keluarga / teman. Bebas atur jam berangkat dan durasi di setiap spot.',
      ZH: '专属私密快艇出海体验。完全根据您的步调定制航线与出发时间，包含全套浮潜设备与 GoPRO 水下摄影。',
    },
  },
  {
    id: 'luxury-phinisi-liveaboard',
    name: 'Luxury Wooden Phinisi Boat Charter (2D1N / 3D2N)',
    type: 'Luxury Phinisi Liveaboard',
    capacity: '8 - 14 Passengers',
    duration: '2 Days 1 Night or 3 Days 2 Nights',
    priceFormatted: 'Rp 32,000,000',
    priceNote: 'starting per charter',
    image: SPEEDBOAT_BANNER,
    badge: 'Luxury Yacht',
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
      EN: 'Sail the turquoise waters of Komodo aboard a handcrafted traditional Indonesian Phinisi. Gourmet dining, ocean-view cabins, and magical bat sunsets.',
      ID: 'Pengalaman berlayar mewah dengan kapal Phinisi kayu tradisional Indonesia. Kamar AC private, chef pribadi, dan sunset memukau.',
      ZH: '搭乘印尼手工定制的木质 Luxury Phinisi 豪华印尼帆船，探索科莫多群岛。观赏万千蝙蝠出巢日落与私人厨师美馔。',
    },
  },
];
