import { CAR_CHARTER_BANNER } from './images';

export interface CarFleetItem {
  id: string;
  name: string;
  category: string; // 'Family MPV' | 'Compact SUV' | 'Minibus / HiAce'
  capacity: string; // '6-7 Passengers'
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
    id: 'toyota-rush',
    name: 'Toyota Rush',
    category: 'Compact SUV',
    capacity: '6-7 Passengers',
    transmission: 'Automatic / Manual',
    priceWithDriver: 800000,
    priceFormatted: 'Rp 800k',
    priceSelfDrive: 550000,
    image: CAR_CHARTER_BANNER,
    badge: 'Most Popular',
    features: ['High Ground Clearance', 'Dual AC Blower', 'Bluetooth Audio', 'Spacious Trunk'],
    description: {
      EN: 'The ideal modern SUV for navigating the hilly roads and coastal lookouts of Labuan Bajo. Equipped with high ground clearance, cold AC, and comfortable seating.',
      ID: 'SUV modern pilihan utama untuk jalanan berbukit dan spot sunset Labuan Bajo. Ground clearance tinggi, AC dingin, dan kabin nyaman.',
      ZH: '打卡拉布安巴佐山路与日落观景点理想的 SUV 车型。高底盘设计、双重冷气与舒适座舱。',
    },
  },
  {
    id: 'toyota-calya-avanza',
    name: 'Toyota Calya / Avanza',
    category: 'Family MPV',
    capacity: '5-6 Passengers',
    transmission: 'Automatic / Manual',
    priceWithDriver: 650000,
    priceFormatted: 'Rp 650k',
    priceSelfDrive: 400000,
    image: CAR_CHARTER_BANNER,
    badge: 'Best Value',
    features: ['Fuel Efficient', 'Double Blower AC', 'Clean Interior', 'Agile Handling'],
    description: {
      EN: 'Economical and agile choice for city tours, airport transfers, seafood market trips, and day trips around Labuan Bajo and Gua Rangko.',
      ID: 'Pilihan hemat dan lincah untuk city tour Labuan Bajo, jemputan bandara, wisata kuliner, dan trip harian ke Gua Rangko.',
      ZH: '经济实惠且操作灵活的 MPV 车型，适合市区观光、机场接送与短途一日游。',
    },
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota HiAce Commuter',
    category: 'Minibus / Group Van',
    capacity: 'Maks 14 Passengers',
    transmission: 'Manual / Automatic',
    priceWithDriver: 1400000,
    priceFormatted: 'Rp 1.4M',
    image: CAR_CHARTER_BANNER,
    badge: 'Group Choice',
    features: ['High Roof Cabin', 'Individual AC Outlets', 'Reclining Seats', 'Large Trunk Space'],
    description: {
      EN: 'Spacious van accommodating up to 14 passengers, ideal for large families, dive groups, corporate teams, and overland tours in Flores.',
      ID: 'Minibus luas kapasitas maksimal 14 penumpang, sangat ideal untuk rombongan keluarga besar, grup diving, dan tur overland bersama.',
      ZH: '最多容纳 14 人的宽敞商务车，适合大型家庭团队、潜水剧组与团体出行。',
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
