import { CAR_CHARTER_BANNER } from './images';

export interface CarFleetItem {
  id: string;
  name: string;
  category: string; // 'Family MPV' | 'Luxury SUV' | 'Minibus / HiAce' | 'Compact SUV'
  capacity: string; // '6 Passengers'
  transmission: string;
  priceWithDriver: number; // Daily price in IDR with driver & fuel
  priceFormatted: string;
  priceSelfDrive?: number;
  image: string;
  badge?: string;
  features: string[];
  description: {
    EN: string;
    ID: string;
    ZH: string;
  };
}

export interface CarTourPackage {
  id: string;
  title: {
    EN: string;
    ID: string;
    ZH: string;
  };
  duration: string;
  destinations: string[];
  priceStart: string;
  description: {
    EN: string;
    ID: string;
    ZH: string;
  };
  recommendedFor: string;
}

export const CARS_FLEET: CarFleetItem[] = [
  {
    id: 'innova-zenix',
    name: 'Toyota Innova Zenix / Reborn',
    category: 'Family MPV',
    capacity: '6-7 Passengers',
    transmission: 'Automatic',
    priceWithDriver: 900000,
    priceFormatted: 'Rp 900k',
    priceSelfDrive: 650000,
    image: CAR_CHARTER_BANNER,
    badge: 'Most Popular',
    features: ['Captain Seats', 'Rear AC Vents', 'Bluetooth Audio', 'Spacious Trunk'],
    description: {
      EN: 'The gold standard for comfortable road travel in Flores. Extremely smooth suspension and cold dual AC for family trips, airport transfers, and overland tours.',
      ID: 'Standar kenyamanan perjalanan darat di Flores. Suspensi sangat empuk, AC dingin, dan kabin senyap untuk liburan keluarga & overland.',
      ZH: '弗洛雷斯陆地出行的舒适之选。双重独立空调与宽敞独立座椅，非常适合家庭游览和机场接送。',
    },
  },
  {
    id: 'avanza-veloz',
    name: 'Toyota Avanza / Veloz',
    category: 'Compact MPV',
    capacity: '5-6 Passengers',
    transmission: 'Automatic / Manual',
    priceWithDriver: 700000,
    priceFormatted: 'Rp 700k',
    priceSelfDrive: 450000,
    image: CAR_CHARTER_BANNER,
    badge: 'Best Value',
    features: ['Fuel Efficient', 'Double Blower AC', 'Clean Interior', 'Compact Size'],
    description: {
      EN: 'Economical and agile choice for city tours, airport transfers, and short day trips around Labuan Bajo and Gua Rangko.',
      ID: 'Pilihan hemat dan lincah untuk city tour Labuan Bajo, jemputan bandara, dan trip harian ke Gua Rangko.',
      ZH: '性价比极高的小型 MPV，非常适合市区观光、机场接送及短途一日游。',
    },
  },
  {
    id: 'fortuner-pajero',
    name: 'Toyota Fortuner 4x4 / Pajero Sport',
    category: 'Luxury 4x4 SUV',
    capacity: '6 Passengers',
    transmission: 'Automatic 4WD',
    priceWithDriver: 1600000,
    priceFormatted: 'Rp 1.6M',
    image: CAR_CHARTER_BANNER,
    badge: 'Luxury 4x4',
    features: ['4x4 Terrain Mode', 'Leather Interior', 'High Clearance', 'Premium Sound'],
    description: {
      EN: 'Premium 4WD SUV designed for rugged roads, steep mountain hills, and luxury VIP overland excursions to Wae Rebo & Ruteng.',
      ID: 'SUV 4WD premium tangguh untuk medan menanjak, jalan berbatu, dan wisata VIP overland Wae Rebo & Bajawa.',
      ZH: '豪华四驱 SUV，轻松应对陡峭山路与复杂地形，适合前往维莱博 (Wae Rebo) 的高端越野之旅。',
    },
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota HiAce Commuter / Premio',
    category: 'Minibus / Group Van',
    capacity: '12-14 Passengers',
    transmission: 'Manual / Automatic',
    priceWithDriver: 1400000,
    priceFormatted: 'Rp 1.4M',
    image: CAR_CHARTER_BANNER,
    badge: 'Group Choice',
    features: ['High Roof Cabin', 'Reclining Seats', 'Individual AC Outlets', 'Large Luggage Space'],
    description: {
      EN: 'Spacious 14-seater van perfect for wedding groups, dive crews, tour groups, and big family reunions exploring Labuan Bajo.',
      ID: 'Minibus 14 kursi ideal untuk rombongan keluarga besar, grup diving, dan tur overland bersama.',
      ZH: '14 座宽敞商务车，适合婚嫁团队、潜水剧组、大型家庭与团体出行。',
    },
  },
];

export const CAR_TOUR_PACKAGES: CarTourPackage[] = [
  {
    id: 'half-day-city',
    title: {
      EN: 'Labuan Bajo City & Sunset Tour (Half Day)',
      ID: 'City Tour Labuan Bajo & Sunset (Setengah Hari)',
      ZH: '拉布安巴佐市区与日落一日游 (半天)',
    },
    duration: '5 - 6 Hours',
    destinations: ['Puncak Waringin', 'Gua Rangko (Cave Swim)', 'Bukit Cinta Sunset Point', 'Labuan Bajo Culinary Waterfront'],
    priceStart: 'Rp 600,000 / Car',
    description: {
      EN: 'Explore iconic viewpoints, swim in the underground mirror water of Gua Rangko cave, and witness breathtaking sunset over Komodo islands.',
      ID: 'Kunjungi spot foto terbaik, berenang di kolam alami Gua Rangko, dan nikmati sunset memukau dari Bukit Cinta.',
      ZH: '打卡山顶观景台，在 Rangko 岩洞天然地下镜面湖游泳，并在爱心山观赏绝美海景日落。',
    },
    recommendedFor: 'Couples, Families, First-time Visitors',
  },
  {
    id: 'full-day-golo-mori',
    title: {
      EN: 'Golo Mori Coastal Highway & Scenic Viewpoints (Full Day)',
      ID: 'Golo Mori Highway & Spot Foto Pesisir (Full Day)',
      ZH: 'Golo Mori 沿海景观公路与深度摄影 (全天)',
    },
    duration: '8 - 10 Hours',
    destinations: ['Golo Mori Convention Center', 'Golo Mori Scenic Coastal Road', 'Katamaran Bay', 'Waecicu Hill Viewpoint'],
    priceStart: 'Rp 800,000 / Car',
    description: {
      EN: 'Drive along Indonesia\'s newest coastal highway. Smooth asphalt, dramatic sea cliffs, and peaceful beaches away from town crowds.',
      ID: 'Menjelajahi jalanan pesisir pantai terindah di Flores. Jalan mulus berliku dengan pemandangan bukit hijau dan laut biru.',
      ZH: '驰骋在弗洛雷斯新竣工的沿海海景公路，感受蔚蓝大海与连绵绿山交织的壮丽自然景象。',
    },
    recommendedFor: 'Photographers, Sightseeing & Relaxed Tours',
  },
  {
    id: 'wae-rebo-overland',
    title: {
      EN: 'Wae Rebo Traditional Village 2D1N Overland Trip',
      ID: 'Tur Overland Desa Adat Wae Rebo 2 Hari 1 Malam',
      ZH: '维莱博 (Wae Rebo) 传统原住民村落 2天1晚 陆地游',
    },
    duration: '2 Days 1 Night',
    destinations: ['Melo Village', 'Lembor Spiderweb Rice Fields', 'Denge Village', 'Wae Rebo Traditional Cone Houses'],
    priceStart: 'Rp 2,800,000 / Package',
    description: {
      EN: 'Journey into the mountain clouds of Flores. Visit UNESCO heritage cone houses, taste local Manggarai coffee, and experience genuine indigenous culture.',
      ID: 'Perjalanan ke desa di atas awan. Kunjungi rumah adat Mbaru Niang, cicipi kopi lokal Manggarai, dan rasakan kehangatan warga lokal.',
      ZH: '深入云端之上的原住民古村落，探访 UNESCO 保护的圆锥形竹编长屋，品尝地道特级咖啡。',
    },
    recommendedFor: 'Culture Seekers, Trekking Enthusiasts & Photographers',
  },
];
