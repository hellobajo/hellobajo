import React, { useState, useEffect } from 'react';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { SITE_CONFIG } from '../data/siteConfig';
import { CAR_CHARTER_BANNER, RIDING_DESTINATIONS } from '../data/images';
import {
  Car,
  UserCheck,
  ShieldCheck,
  Fuel,
  MapPin,
  MessageCircle,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Camera,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  HelpCircle,
  Compass,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';

interface CarsPageProps {
  lang: Language;
}

// 1. Itinerary Steps Data
const ITINERARY_STEPS = [
  {
    step: '01',
    time: '08:30 AM',
    category: { EN: 'TRANSFER SERVICE', ID: 'LAYANAN PENJEMPUTAN', ZH: '机场/酒店接送' },
    duration: { EN: '30 mins', ID: '30 Menit', ZH: '30 分钟' },
    title: {
      EN: 'Hotel or Airport Pick-Up',
      ID: 'Penjemputan Hotel / Bandara LBJ',
      ZH: '酒店或科莫多机场 (LBJ) 专人接送',
    },
    description: {
      EN: 'Your private driver picks you up directly from your hotel lobby or Komodo Airport (LBJ) in a clean, air-conditioned vehicle.',
      ID: 'Driver pribadi Anda akan menjemput langsung dari lobi hotel atau Bandara Komodo (LBJ) dengan mobil bersih ber-AC.',
      ZH: '您的私人司机将在酒店大堂或科莫多机场 (LBJ) 出口准时等候，为您开启舒适出行。',
    },
    highlight: {
      EN: 'Free pick-up across Labuan Bajo town area',
      ID: 'Gratis antar-jemput di area kota Labuan Bajo',
      ZH: '拉布安巴佐市区及机场范围免费接送',
    },
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '02',
    time: '09:00 AM – 10:30 AM',
    category: { EN: 'NATURE & GEOLOGY', ID: 'WISATA ALAM & GEOLOGI', ZH: '自然奇观与溶洞探秘' },
    duration: { EN: '1.5 Hours', ID: '1.5 Jam', ZH: '1.5 小时' },
    title: {
      EN: 'Gua Batu Cermin (Mirror Stone Cave)',
      ID: 'Gua Batu Cermin',
      ZH: '镜石洞 (Gua Batu Cermin)',
    },
    description: {
      EN: 'Morning visit to the natural limestone cave when temperatures are cool. Experience sunlight refracting off rock walls and ancient sea fossils.',
      ID: 'Kunjungan pagi ke gua batu kapur saat udara masih sejuk. Saksikan pantulan sinar matahari di dinding batu dan fosil laut purba.',
      ZH: '早晨游览天然石灰岩溶洞，气温宜人。欣赏阳光穿透岩隙的折射奇景与古老海洋生物化石。',
    },
    highlight: {
      EN: 'Best morning light & cool cave atmosphere',
      ID: 'Sinar matahari pagi terbaik & suasana gua yang sejuk',
      ZH: '晨光折射最佳拍摄时刻，清凉惬意',
    },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '03',
    time: '10:45 AM – 12:15 PM',
    category: { EN: 'PANORAMIC LANDSCAPE', ID: 'PANORAMA BUKIT & LAUT', ZH: '全景山海观景台' },
    duration: { EN: '1.5 Hours', ID: '1.5 Jam', ZH: '1.5 小时' },
    title: {
      EN: 'Bukit Cinta & Sylvia Hill Viewpoint',
      ID: 'Bukit Cinta & Sylvia Hill Viewpoint',
      ZH: '爱之丘与西尔维亚山观景台 (Bukit Cinta & Sylvia Hill)',
    },
    description: {
      EN: "Enjoy sweeping 360-degree hilltop views of Labuan Bajo's islands and turquoise bays before peak midday heat.",
      ID: 'Nikmati pemandangan 360 derajat gugusan pulau dan teluk biru Labuan Bajo dari puncak bukit sebelum terik siang.',
      ZH: '登高远眺拉布安巴佐 360 度海景与群岛风光，绿宝石般的海湾尽收眼底。',
    },
    highlight: {
      EN: 'Premier 360° panoramic photo lookout',
      ID: 'Spot foto panorama 360° spektakuler',
      ZH: '360° 绝美海岛全景摄影打卡点',
    },
    image: RIDING_DESTINATIONS.bukitCinta,
  },
  {
    step: '04',
    time: '12:30 PM – 14:00 PM',
    category: { EN: 'MIDDAY DINING', ID: 'MANTAP KULINER SIANG', ZH: '海景特色午餐' },
    duration: { EN: '1.5 Hours', ID: '1.5 Jam', ZH: '1.5 小时' },
    title: {
      EN: 'Lunch & Coastal Culinary Experience',
      ID: 'Makan Siang & Kuliner Pesisir',
      ZH: '海边餐厅午餐与地方美食体验',
    },
    description: {
      EN: 'Relaxed lunch stop at a seaside seafood venue or local café right in the middle of your trip. Your driver will gladly recommend local gems.',
      ID: 'Istirahat makan siang santai di restoran seafood tepi pantai atau kafe lokal. Driver siap merekomendasikan kuliner favorit lokal.',
      ZH: '在海边海鲜餐厅或特色咖啡馆享用美味午餐，司机为您推荐地道特色美食。',
    },
    highlight: {
      EN: 'Fresh local seafood & comfortable dining break',
      ID: 'Seafood segar lokal & tempat makan ber-AC nyaman',
      ZH: '新鲜海鲜与舒适用餐休整体验',
    },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '05',
    time: '14:15 PM – 15:45 PM',
    category: { EN: 'LOCAL SHOPPING & CULTURE', ID: 'WISATA BELANJA & BUDAYA', ZH: '手工艺品与文化采买' },
    duration: { EN: '1.5 Hours', ID: '1.5 Jam', ZH: '1.5 小时' },
    title: {
      EN: 'Flores Souvenir & Cultural Craft Center',
      ID: 'Pusat Oleh-Oleh & Kerajinan Khas Flores',
      ZH: '弗洛雷斯特产与手工艺品中心',
    },
    description: {
      EN: 'Browse authentic handwoven Tenun Ikat fabrics, famous Manggarai coffee, and hand-crafted Flores souvenirs at local artisan shops.',
      ID: 'Berbelanja kain Tenun Ikat asli, kopi Manggarai terkenal, dan kerajinan tangan khas Flores di galeri UMKM lokal.',
      ZH: '选购手工编织的特努织锦 (Tenun Ikat)、闻名遐迩的芒加莱咖啡以及精致的本地纪念品。',
    },
    highlight: {
      EN: 'Authentic local gifts & handwoven textiles',
      ID: 'Oleh-oleh autentik & kain tenun buatan tangan',
      ZH: '地道手工艺品与传统手工编织织锦',
    },
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '06',
    time: '16:00 PM – 18:00 PM',
    category: { EN: 'GOLDEN HOUR SUNSET', ID: 'MOMEN SUNSET EMAS', ZH: '日落观景台' },
    duration: { EN: '2 Hours', ID: '2 Jam', ZH: '2 小时' },
    title: {
      EN: 'Puncak Waringin Sunset Lookout',
      ID: 'Puncak Waringin Sunset Lookout',
      ZH: '瓦林金顶 (Puncak Waringin) 傍晚日落',
    },
    description: {
      EN: 'Arrive at Labuan Bajo’s top sunset terrace right on time for golden hour, looking out over Phinisi schooners gently swaying in the harbor.',
      ID: 'Tiba di teras pemandangan Puncak Waringin tepat saat golden hour, menyaksikan kapa-kapal Phinisi bersandar di pelabuhan.',
      ZH: '在黄金时段抵达拉布安巴佐顶级日落观景台，俯瞰港湾中摇曳的帆船与壮丽晚霞。',
    },
    highlight: {
      EN: 'Unrivaled sunset panorama over the bay',
      ID: 'Panorama sunset pelabuhan paling ikonik',
      ZH: '港湾帆船落日绝美晚霞全景',
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '07',
    time: '18:00 PM – 20:00 PM',
    category: { EN: 'DINNER & RETURN TRANSFER', ID: 'MAKAN MALAM & ANTAR HOTEL', ZH: '晚餐与送回酒店' },
    duration: { EN: 'Max 20:00 PM', ID: 'Maks 20:00 WITA', ZH: '截止晚 20:00' },
    title: {
      EN: 'Dinner Stop & Return Transfer (Up to 20:00 PM)',
      ID: 'Makan Malam & Pengantaran Kembali ke Hotel',
      ZH: '晚餐休息与送回酒店',
    },
    description: {
      EN: 'Conclude your day tour with a relaxing dinner stop at your chosen restaurant or local market, followed by a comfortable drop-off back to your hotel.',
      ID: 'Selesaikan tur harian dengan makan malam santai di restoran pilihan atau kuliner malam, dilanjutkan pengantaran kembali ke hotel.',
      ZH: '在您指定的餐厅或美食夜市享受晚餐，随后由专车将您安全送回酒店，结束愉快一天。',
    },
    highlight: {
      EN: 'Includes dinner stop & return transfer up to 20:00 PM',
      ID: 'Termasuk stop makan malam & pengantaran hingga 20:00 WITA',
      ZH: '包含晚餐途经与最迟 20:00 前的酒店送回服务',
    },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
];

// 2. Single-Day Optional Spots
const OPTIONAL_SPOTS = [
  {
    id: 'golo-mori',
    tag: { EN: 'SCENIC ROADTRIP & BAY VIEW', ID: 'JALANAN PESISIR INDAH', ZH: '绝美沿海公路与海湾' },
    timeCost: { EN: '+45 mins drive from town', ID: '+45 menit dari kota', ZH: '距离市区 +45 分钟车程' },
    title: { EN: 'Golo Mori Coastal Highway', ID: 'Jalan Pesisir Golo Mori', ZH: '戈洛莫里 (Golo Mori) 沿海公路' },
    desc: {
      EN: 'Drive through the sleek new Golo Mori scenic highway featuring dramatic coastal curves, pristine ocean vistas, and modern international venue grounds.',
      ID: 'Berkendara melalui jalan baru Golo Mori dengan tikungan pesisir menawan, pemandangan laut biru lepas, dan venue internasional.',
      ZH: '沿全新的戈洛莫里沿海景观公路驰骋，途经壮观的海岸线曲线、蔚蓝海景与现代化场馆。',
    },
    badge: { EN: 'Spectacular coastal driving experience', ID: 'Pengalaman berkendara pesisir spektakuler', ZH: '壮丽的沿海驾驶与风光体验' },
    image: RIDING_DESTINATIONS.goloMori,
  },
  {
    id: 'gua-rangko',
    tag: { EN: 'NATURAL SWIMMING CAVE', ID: 'GUA KOLAM ALAM SAKRAL', ZH: '天然岩洞海水游泳池' },
    timeCost: { EN: '+1 Hour (Requires short wooden boat ride)', ID: '+1 Jam (Perlu perahu kayu pendek)', ZH: '+1 小时 (需搭乘短途木船)' },
    title: { EN: 'Gua Rangko (Natural Cave Pool)', ID: 'Gua Rangko (Kolam Air Asin)', ZH: '朗科洞 (Gua Rangko) 蓝洞游泳池' },
    desc: {
      EN: 'A hidden saltwater cave where you can swim in crystal-clear blue water illuminated by afternoon sunbeams filtering through the cave roof.',
      ID: 'Gua air asin tersembunyi untuk berenang di air biru jernih yang tersinari cahaya matahari siang dari langit-langit gua.',
      ZH: '隐秘的咸水岩洞，正午阳光透过洞顶洒入，在晶莹剔透的蓝色洞穴泳池中惬意畅游。',
    },
    badge: { EN: 'Unique subterranean saltwater pool', ID: 'Kolam renang alam gua air asin unik', ZH: '独特的地下洞穴海水畅游' },
    image: RIDING_DESTINATIONS.guaRangko,
  },
  {
    id: 'desa-melo',
    tag: { EN: 'CULTURE & CACI DANCE', ID: 'BUDAYA MANGGARAI & TARI CACI', ZH: '芒加莱部落文化与鞭舞' },
    timeCost: { EN: '+45 mins drive into Flores highlands', ID: '+45 menit ke pegunungan Flores', ZH: '向海拔高地行驶 +45 分钟' },
    title: { EN: 'Desa Melo (Manggarai Cultural Village)', ID: 'Desa Adat Melo', ZH: '梅洛传统文化村 (Desa Melo)' },
    desc: {
      EN: 'Experience authentic Manggarai tribal heritage, enjoy traditional Flores coffee, and witness the thrilling Caci whip dance performed by local villagers.',
      ID: 'Rasakan warisan suku Manggarai autentik, nikmati kopi Flores tradisional, dan saksikan pertunjukan Tari Caci yang menegangkan.',
      ZH: '体验地道的芒加莱部落文化，品尝弗洛雷斯传统高山咖啡，观赏村民表演的卡西 (Caci) 鞭舞。',
    },
    badge: { EN: 'Authentic traditional Flores culture micro-experience', ID: 'Pengalaman budaya adat Manggarai autentik', ZH: '体验地道芒加莱传统文化' },
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  },
];

// 3. Multi-Day Overland Destinations
const OVERLAND_DESTINATIONS = [
  {
    title: { EN: 'Wae Rebo Village', ID: 'Desa Adat Wae Rebo', ZH: '维莱博 (Wae Rebo) 云端古村' },
    tag: { EN: '2D1N TRIP', ID: 'TRIP 2D1N', ZH: '2天1晚行程' },
    desc: {
      EN: 'Manggaraian mountain heritage village in the clouds with iconic cone-shaped Mbaru Niang houses.',
      ID: 'Desa adat di atas awan dengan rumah adat Mbaru Niang berbentuk kerucut yang ikonik.',
      ZH: '位于云端之上的芒加莱传统古村落，拥有标志性的圆锥形 Mbaru Niang 传统建筑。',
    },
    badge: { EN: 'Overnight in traditional Mbaru Niang house in clouds', ID: 'Menginap di rumah Mbaru Niang di atas awan', ZH: '在云端传统的 Mbaru Niang 木屋过夜' },
    image: RIDING_DESTINATIONS.waeRebo,
  },
  {
    title: { EN: 'Ruteng & Cancar', ID: 'Ruteng & Sawah Cancar', ZH: '卢腾 (Ruteng) 与蜘蛛网梯田' },
    tag: { EN: 'HIGHLAND CULTURE', ID: 'BUDAYA PEGUNUNGAN', ZH: '高原文化与梯田' },
    desc: {
      EN: 'Witness unique spider-web Lingko rice fields & cool mountain air in central Flores.',
      ID: 'Saksikan sawah jaring laba-laba Lingko yang unik & udara pegunungan sejuk di Flores tengah.',
      ZH: '亲眼目睹独特的蜘蛛网状 Lingko 水稻梯田，感受弗洛雷斯中部的高山清爽空气。',
    },
    badge: { EN: 'World-famous spider-web rice field panorama', ID: 'Panorama sawah jaring laba-laba terkenal dunia', ZH: '世界闻名的蜘蛛网水稻梯田全景' },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: { EN: 'Bajawa & Bena Village', ID: 'Bajawa & Desa Bena', ZH: '巴扎瓦 (Bajawa) 与贝纳巨石村' },
    tag: { EN: 'MEGALITHIC HERITAGE', ID: 'WARISAN MEGALITIK', ZH: '巨石文化遗产' },
    desc: {
      EN: 'Ancient tribal stone villages set against Mount Inerie with natural volcanic hot springs.',
      ID: 'Desa batu purba dengan latar Gunung Inerie dan pemandian air panas alami.',
      ZH: '背靠阿内里 (Inerie) 火山的古老石器部落村落，拥有天然火山温泉。',
    },
    badge: { EN: 'Megalithic culture & Malanage hot springs', ID: 'Budaya megalitikum & air panas Malanage', ZH: '巨石文化与 Malanage 火山温泉' },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: { EN: 'Kelimutu Tri-Color Lakes', ID: 'Danau 3 Warna Kelimutu', ZH: '克里穆图 (Kelimutu) 三色火山湖' },
    tag: { EN: '4D3N - 5D4N ROUND TRIP', ID: 'TRIP 4D3N - 5D4N', ZH: '4天3晚 - 5天4晚长途' },
    desc: {
      EN: 'Marvel at sacred tri-color crater lakes at sunrise on top of Mount Kelimutu (Round trip from Labuan Bajo).',
      ID: 'Saksikan keajaiban danau kawah tiga warna saat matahari terbit di puncak Gunung Kelimutu.',
      ZH: '在克里穆图火山顶观赏日出，震撼于神圣变色的三色火山湖奇景（拉布安巴佐往返）。',
    },
    badge: { EN: 'Magical tri-color volcanic crater lake sunrise', ID: 'Sunrise mistis di danau kawah tiga warna', ZH: '三色火山湖晨曦日出奇观' },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
];

// 4. FAQ List
const FAQS = [
  {
    q: {
      EN: 'How do I book the tour?',
      ID: 'Bagaimana cara memesan tur ini?',
      ZH: '如何预订私人包车行程？',
    },
    a: {
      EN: 'Booking is simple! Click any "Book via WhatsApp" button on this page. Send us your tour date, pick-up location, time, and group size. We will confirm your driver and car details immediately.',
      ID: 'Pemesanan sangat mudah! Klik tombol "Pesan via WhatsApp". Kirimkan tanggal tur, lokasi penjemputan, jam, dan jumlah peserta. Tim kami langsung mengonfirmasi driver dan unit mobil Anda.',
      ZH: '预订非常简便！点击本页面的“通过 WhatsApp 预订”按钮，发送您的日期、接送地点、时间及人数，我们将即刻为您确认车辆与司机。',
    },
  },
  {
    q: {
      EN: 'Is a deposit required to book?',
      ID: 'Apakah ada deposit untuk memesan?',
      ZH: '预订需要支付定金吗？',
    },
    a: {
      EN: 'To lock in your driver and private car for your date, a low commitment deposit of Rp 200.000 (~$13 USD) per car is required. The remaining balance of Rp 1.100.000 (~$70 USD) can be paid in cash, local bank transfer, or Wise after tour completion.',
      ID: 'Untuk mengunci jadwal driver & mobil, diperlukan deposit Rp 200.000 / mobil. Sisa pelunasan Rp 1.100.000 (~$70 USD) dapat dibayarkan tunai, transfer bank lokal, atau Wise setelah tur selesai.',
      ZH: '为了锁定司机与车辆，预订时仅需支付 Rp 200.000 (约 $13 USD) 定金。余款 Rp 1.100.000 (约 $70 USD) 可在行程结束后通过现金、印尼本地银行转账或 Wise 支付。',
    },
  },
  {
    q: {
      EN: 'Can we customize the start time or itinerary?',
      ID: 'Apakah jam berangkat dan rute bisa disesuaikan?',
      ZH: '发车时间和游览路线可以自由定制吗？',
    },
    a: {
      EN: 'Yes, 100%! All day tour itineraries are flexible. You can adjust the departure time based on your flight arrival/departure or personal schedule. You can also discuss freely with your driver to add stops or change lunch spots.',
      ID: 'Ya, 100% fleksibel! Anda bisa menyesuaikan jam berangkat sesuai jadwal penerbangan atau preferensi. Anda juga bebas berdiskusi dengan driver untuk menambah tempat singgah atau restoran.',
      ZH: '是的，100% 灵活！您可以根据航班抵离时间或个人习惯调整出发时间。行程中亦可与司机自由沟通，灵活增加停靠点或调整餐厅。',
    },
  },
  {
    q: {
      EN: 'How many people can fit in one car?',
      ID: 'Berapa kapasitas maksimal satu mobil?',
      ZH: '一辆车最多可以乘坐多少人？',
    },
    a: {
      EN: 'Our standard 7-seater vehicles (Toyota Innova Zenix / Avanza / Veloz / Rush) comfortably accommodate 1 to 6 passengers with light day bags. For larger groups (7 to 14 passengers), we recommend our spacious Toyota HiAce Commuter.',
      ID: 'Mobil MPV 7-seater standar kami (Innova Zenix / Avanza / Veloz / Rush) sangat nyaman untuk 1 hingga 6 penumpang. Untuk rombongan 7-14 orang, kami menyediakan Toyota HiAce Commuter.',
      ZH: '标准 7 座商务/SUV 车型 (Innova Zenix / Avanza / Rush) 适合 1-6 名乘客舒适乘坐。如果是 7-14 人的团队，我们提供宽敞的丰田 HiAce 商务车。',
    },
  },
  {
    q: {
      EN: 'Are entrance tickets included in Rp 1.300.000 (~$82 USD)?',
      ID: 'Apakah tiket masuk wisata sudah termasuk dalam Rp 1.300.000?',
      ZH: 'Rp 1.300.000 费用中是否包含景点门票？',
    },
    a: {
      EN: 'The Rp 1.300.000 rate covers the vehicle, full fuel (BBM), professional driver, mineral water, and all-day transfers up to 20:00 PM. Attraction entrance tickets (e.g. Gua Batu Cermin ~Rp 50.000/pax) and meals are paid directly by you at the venue.',
      ID: 'Harga Rp 1.300.000 sudah mencakup mobil ber-AC, BBM penuh, driver profesional, air mineral, & operasional hingga jam 20:00. Tiket masuk lokasi (seperti Gua Batu Cermin ~Rp 50.000/orang) & makan bayar langsung di lokasi.',
      ZH: 'Rp 1.300.000 价格已包含冷气专车、全程汽油 (BBM)、专业本地司机、矿泉水及全天使用（最迟至 20:00）。景点门票（例如镜石洞约 Rp 50.000/人）及餐食费用由您在现场自行支付。',
    },
  },
  {
    q: {
      EN: 'What happens if our flight is delayed?',
      ID: 'Bagaimana jika penerbangan kami mengalami delay?',
      ZH: '如果我们的航班延误了怎么办？',
    },
    a: {
      EN: 'No problem at all! We monitor real-time flight statuses at Komodo Airport (LBJ). Your driver will wait for your flight arrival without any delay penalties.',
      ID: 'Tidak masalah sama sekali! Kami memantau status penerbangan di Bandara Komodo (LBJ) secara real-time. Driver Anda akan tetap menunggu kedatangan Anda tanpa denda.',
      ZH: '完全无需担心！我们会实时关注科莫多机场 (LBJ) 的航班动态。即便延误，司机也会在机场耐心等候，不会产生额外等待罚金。',
    },
  },
];

export const CarsPage: React.FC<CarsPageProps> = ({ lang }) => {
  // Critical State: activeStepIndex is ONLY changed manually when clicking an itinerary step
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [showOptionalSpots, setShowOptionalSpots] = useState(true);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passengerCount, setPassengerCount] = useState('5 - 6 Passengers (Standard MPV - Rp 1.300.000)');
  const [tourDate, setTourDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('08:30 AM');
  const [pickupLocation, setPickupLocation] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [customOverlandQuery, setCustomOverlandQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'EN'
        ? `Hi HelloBajo! I want to book a Private Car Charter & City Tour:\n• Name: ${fullName}\n• Phone: ${phone}\n• Email: ${email || '-'}\n• Passengers: ${passengerCount}\n• Tour Date: ${tourDate}\n• Pickup Time: ${pickupTime}\n• Pickup Location: ${pickupLocation}\n• Special Requests: ${specialRequests || 'None'}\n• Price: Rp 1.300.000 (Deposit Rp 200.000)`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想预订包车一日游/城市游：\n• 姓名: ${fullName}\n• 电话/微信: ${phone}\n• 邮箱: ${email || '-'}\n• 乘车人数: ${passengerCount}\n• 用车日期: ${tourDate}\n• 接送时间: ${pickupTime}\n• 接送地点: ${pickupLocation}\n• 额外需求: ${specialRequests || '无'}\n• 包车价格: Rp 1.300.000 (定金 Rp 200.000)`
        : `Halo HelloBajo! Saya mau pesan Private Car Charter & City Tour:\n• Nama: ${fullName}\n• No WA: ${phone}\n• Email: ${email || '-'}\n• Jml Penumpang: ${passengerCount}\n• Tanggal: ${tourDate}\n• Jam Penjemputan: ${pickupTime}\n• Lokasi Antar/Jemput: ${pickupLocation}\n• Catatan Tambahan: ${specialRequests || 'Tidak ada'}\n• Harga: Rp 1.300.000 (Deposit Rp 200.000)`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleOverlandConsult = () => {
    const queryText = customOverlandQuery.trim();
    const msg =
      lang === 'EN'
        ? `Hi HelloBajo! I am interested in a Custom Overland Flores Trip:\n${queryText ? `• Request: ${queryText}` : '• Please send me details on Wae Rebo & Overland packages.'}`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想咨询弗洛雷斯长途包车 (Overland) 行程：\n${queryText ? `• 需求: ${queryText}` : '• 请发送维莱博与长途路线详情。'}`
        : `Halo HelloBajo! Saya mau tanya paket Overland Flores / Wae Rebo:\n${queryText ? `• Catatan: ${queryText}` : '• Mohon infokan detail paket overland.'}`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const pageTitle =
    lang === 'EN'
      ? 'Discover Labuan Bajo: Land & Culture Private Tour | HelloBajo'
      : lang === 'ZH'
      ? '拉布安巴佐私人包车与城市陆地一日游 | HelloBajo'
      : 'Sewa Mobil & Private City Tour Labuan Bajo — Innova & Avanza ber-AC';

  const pageDescription =
    lang === 'EN'
      ? "Labuan Bajo's premier private car charter & city tour service. Fixed Rp 1.300.000 rate, clean 7-seater AC car with driver, full fuel, and flexible route."
      : lang === 'ZH'
      ? '拉布安巴佐首选私人包车与城市游服务。固定价格 Rp 1.300.000/车，双重冷气 7 座 MPV/SUV，专业本地司机含全程汽油，行程 100% 自由定制。'
      : 'Layanan sewa mobil & private city tour terbaik di Labuan Bajo. Tarif tetap Rp 1.300.000/hari, mobil AC bersih 7-seater, driver ramah & BBM penuh.';

  const activeStep = ITINERARY_STEPS[activeStepIndex];

  return (
    <div className="bg-[#f9fafb] text-slate-800 selection:bg-teal-500 selection:text-white font-sans overflow-x-clip">
      <SEOHead title={pageTitle} description={pageDescription} canonicalUrl="https://hellobajo.com/cars" />

      {/* Sub-Header Section Navigation Bar */}
      <div className="bg-white border-b border-stone-200/80 sticky top-16 sm:top-20 z-40 backdrop-blur-md bg-white/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 overflow-x-auto no-scrollbar text-xs font-bold text-slate-600 space-x-6">
          <div className="flex items-center space-x-6 whitespace-nowrap">
            <a href="#city-tour" className="hover:text-teal-600 transition-colors flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-500" />
              <span>{lang === 'EN' ? 'City Tour' : lang === 'ZH' ? '一日游行程' : 'City Tour'}</span>
            </a>
            <a href="#pricing" className="hover:text-teal-600 transition-colors">
              {lang === 'EN' ? 'Pricing' : lang === 'ZH' ? '价格与服务' : 'Harga'}
            </a>
            <a href="#overland-custom" className="hover:text-teal-600 transition-colors">
              {lang === 'EN' ? 'Overland & Custom' : lang === 'ZH' ? '长途与定制' : 'Overland & Custom'}
            </a>
            <a href="#reserve-now" className="text-teal-600 hover:text-teal-700 font-extrabold">
              {lang === 'EN' ? 'Reserve Now' : lang === 'ZH' ? '立即预订' : 'Pesan Sekarang'}
            </a>
            <a href="#faq" className="hover:text-teal-600 transition-colors">
              FAQ
            </a>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi HelloBajo! I want to inquire about Private City Tour.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-teal-600 font-extrabold hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-teal-600 text-white" />
            <span>+62 817-0788-181</span>
          </a>
        </div>
      </div>

      {/* 1. HERO BANNER SECTION */}
      <section id="city-tour" className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={CAR_CHARTER_BANNER} alt="Private Tour Labuan Bajo" className="w-full h-full object-cover brightness-105 contrast-105 scale-102" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/50" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>LABUAN BAJO CAR CHARTER & CITY TOUR • PRIVATE & FLEXIBLE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {lang === 'EN'
              ? 'Discover Labuan Bajo: Land & Culture Private Tour'
              : lang === 'ZH'
              ? '探索拉布安巴佐：陆地风光与文化私人包车一日游'
              : 'Discover Labuan Bajo: Land & Culture Private Tour'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            {lang === 'EN'
              ? "Labuan Bajo's premier travel hub & private charter service. Explore land viewpoints, cultural spots, and hidden gems in your own private 7-seater AC car with a professional local driver."
              : lang === 'ZH'
              ? '拉布安巴佐首选私人包车与出游中心。搭乘专属双重冷气 7 座 MPV/SUV，由熟练本地司机带您打卡经典观景台、文化遗迹与隐秘景点。'
              : 'Layanan private car charter & tur kota terbaik di Labuan Bajo. Jelajahi keindahan bukit, tempat budaya, & destinasi tersembunyi dengan mobil AC 7-seater bersih & driver berpengalaman.'}
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 pt-2 text-xs font-semibold text-slate-200">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 backdrop-blur-xs">
              <Car className="w-3.5 h-3.5 text-teal-400" />
              Clean 7-Seater AC Fleet
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 backdrop-blur-xs">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              Private Driver & Fuel Included
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 backdrop-blur-xs">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              Flexible Route & Schedule
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 backdrop-blur-xs">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              Hotel & LBJ Airport Transfer
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hi HelloBajo! I want to book the Private City Tour (Rp 1.300.000).'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-full shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>Book via WhatsApp</span>
            </a>
            <a
              href="#city-tour-itinerary"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Explore Itinerary</span>
            </a>
          </div>

          <div className="pt-8 border-t border-slate-800/90 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              Fixed Rate: Rp 1.300.000 (~$82 USD)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              Clean AC vehicle & fuel included
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              Free hotel & airport pickup
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              Instant response in minutes
            </span>
          </div>
        </div>
      </section>

      {/* 2. PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            All-Inclusive Private Car Charter
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            Fixed daily rate per vehicle. No per-person markup. Approx. ~$82 USD (€76 EUR). Ideal for families, couples, and small groups.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Dark Slate Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-extrabold border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Best Value for Groups</span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  Rp 1.300.000
                </div>
                <div className="text-teal-400 text-xs sm:text-sm font-bold mt-0.5">
                  (~$82 USD)
                </div>
                <div className="text-slate-400 text-xs mt-1 font-medium">
                  / car / day (~$82 USD)
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">1–6 Pax (Standard 7-Seater)</strong>
                    <span className="text-slate-300">Clean Toyota Innova / Avanza / Rush with AC & Driver</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Innova / Avanza / Rush Fleet</strong>
                    <span className="text-slate-300">Clean & modern 7-Seater MPV/SUV with AC & Driver</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Charter Hours (Full Day)</strong>
                    <span className="text-slate-300">Start: 08:30 AM → End: After Dinner (Max 20:00 PM)</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hi HelloBajo! I want to book the Private Car Charter (Rp 1.300.000).'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>Book Private Car Charter via WhatsApp</span>
            </a>
          </div>

          {/* Right Light Inclusions Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Package Inclusions
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Clean modern 7-seater vehicle (Toyota Innova / Avanza / Rush)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Full Fuel (BBM) included for all city & mainland routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Friendly English & Indonesian speaking local driver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Door-to-door Pick-up & Drop-off anywhere in Labuan Bajo (Hotel/Resort/LBJ Airport)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Flexible schedule (Start 08:30 AM – End after Dinner max 20:00 PM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Chilled bottled mineral water for all passengers</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-200/80">
                <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  NOT INCLUDED (PAID DIRECTLY)
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Attraction entrance tickets (e.g., Gua Batu Cermin ~Rp 50.000/person)</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Personal meals, snacks, and drinks during lunch/dinner</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Driver tipping (voluntary & at your discretion based on service)</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Personal travel insurance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-50/80 border border-teal-200/90 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="block text-teal-900 font-bold mb-0.5">
                  Low Commitment Deposit (Rp 200.000 / ~$13 USD)
                </strong>
                To secure your private driver and vehicle for your selected date, a low deposit of Rp 200.000 / car is required upon booking. The remaining balance of Rp 1.100.000 (~$70 USD) can be paid in cash, local bank transfer, or Wise after tour completion.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLEET FEATURES SHOWCASE */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
                PRIVATE FLEET FEATURES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
                Clean, Air-Conditioned & Well-Maintained
              </h2>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm">
                All city & day tours use clean, modern 7-seater vehicles equipped with double-blower AC to ensure maximum comfort under the tropical sun.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-md">
                <img
                  src={CAR_CHARTER_BANNER}
                  alt="Toyota Rush / Avanza / Veloz / Innova"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  ACTUAL TOUR VEHICLE UNIT
                </span>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4 text-white">
                  <strong className="block text-sm font-bold">Toyota Rush / Avanza / Veloz / Innova</strong>
                  <span className="text-xs text-slate-300">Ready for Labuan Bajo Coastal & City Sightseeing Routes</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 border border-stone-200/80 rounded-2xl">
                    <Users className="w-5 h-5 text-teal-600 mb-1" />
                    <strong className="block text-xs font-bold text-slate-900">5–6 Passengers</strong>
                    <span className="text-[11px] text-slate-500">Comfortable capacity</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-stone-200/80 rounded-2xl">
                    <Car className="w-5 h-5 text-teal-600 mb-1" />
                    <strong className="block text-xs font-bold text-slate-900">Double Blower AC</strong>
                    <span className="text-[11px] text-slate-500">Cool tropical ride</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-stone-200/80 rounded-2xl">
                    <UserCheck className="w-5 h-5 text-teal-600 mb-1" />
                    <strong className="block text-xs font-bold text-slate-900">Driver + Fuel</strong>
                    <span className="text-[11px] text-slate-500">Included in price</span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-stone-200/80 rounded-2xl">
                    <MapPin className="w-5 h-5 text-teal-600 mb-1" />
                    <strong className="block text-xs font-bold text-slate-900">Door-to-Door</strong>
                    <span className="text-[11px] text-slate-500">Free LBJ pickup</span>
                  </div>
                </div>

                <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="block text-teal-900 font-bold mb-0.5">
                      Group Tour (7–14 Passengers)?
                    </strong>
                    Toyota HiAce Commuter/Premio is available! Rate differs from standard 7-seater — consult directly on WhatsApp for special group pricing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAND & CULTURE DAY TOUR ITINERARY (DESKTOP STICKY + MOBILE ACCORDION) */}
      <section id="city-tour-itinerary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            LOGICAL DAY TOUR ROUTE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
            Land & Culture Day Tour Itinerary
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Example 1-day route. All day tour itineraries are 100% flexible and customized on the day of your trip based on your preferences, flight time, or weather.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Start: 08:30 AM (Flexible) → End: After Dinner (Max 20:00 PM)</span>
          </div>

          <div className="mt-4 max-w-2xl mx-auto bg-amber-50/90 border border-amber-300/80 rounded-2xl p-3.5 flex items-center justify-between text-xs text-amber-900 font-medium">
            <span className="bg-amber-500 text-white font-black px-2.5 py-1 rounded-lg text-[10px] uppercase shrink-0 mr-3">
              100% Flexible
            </span>
            <span className="text-left">
              All day tour itineraries are dependent on situation & preferences on the day of your trip. Discuss freely with your driver to adjust stops, timing, or dinner places!
            </span>
          </div>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: List of Itinerary Steps (6 Columns) */}
          <div className="lg:col-span-6 space-y-4">
            {ITINERARY_STEPS.map((item, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-slate-900 text-white ring-2 ring-teal-500/50 shadow-xl p-5 sm:p-6'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-colors ${
                          isActive
                            ? 'bg-teal-500 text-slate-950 font-black'
                            : 'bg-stone-100 text-slate-800'
                        }`}
                      >
                        {item.step}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                              isActive ? 'text-teal-300 bg-teal-950/80' : 'text-teal-800 bg-teal-50 border border-teal-200/60'
                            }`}
                          >
                            {item.time} • {item.category[lang]}
                          </span>
                        </div>
                        <h3
                          className={`text-lg sm:text-xl font-black mt-1.5 transition-colors leading-snug ${
                            isActive ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {item.title[lang]}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full ${
                          isActive ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-stone-100 text-slate-700'
                        }`}
                      >
                        {item.duration[lang]}
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? 'text-teal-400 translate-x-1' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Concise Description Line */}
                  <p
                    className={`mt-3.5 text-sm sm:text-base leading-relaxed ${
                      isActive ? 'text-slate-200 font-medium' : 'text-slate-700 font-medium'
                    }`}
                  >
                    {item.description[lang]}
                  </p>

                  <div
                    className={`mt-3.5 pt-3.5 flex items-center gap-2 text-xs sm:text-sm font-bold ${
                      isActive ? 'border-t border-slate-800 text-teal-300' : 'border-t border-stone-100 text-teal-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 shrink-0 text-teal-400" />
                    <span>{item.highlight[lang]}</span>
                  </div>

                  {/* Mobile Accordion Inline View (`lg:hidden`) */}
                  {isActive && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-slate-800 space-y-3">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950">
                        <img
                          src={item.image}
                          alt={item.title[lang]}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-teal-300">
                          {item.time}
                        </div>
                      </div>

                      <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-3.5 text-xs sm:text-sm text-teal-200 flex items-start gap-2.5 font-semibold">
                        <Camera className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-teal-300 font-extrabold mb-0.5 uppercase tracking-wider">TOUR HIGHLIGHT</strong>
                          {item.highlight[lang]}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Floating / Sticky Preview Card (`lg:block hidden sticky top-28`) */}
          <div className="lg:col-span-6 hidden lg:block sticky top-28">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden transition-all duration-300 space-y-0">
              
              {/* Destination Image with Badge Overlays */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  key={activeStep.step}
                  src={activeStep.image}
                  alt={activeStep.title[lang]}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-slate-900/80 backdrop-blur-md text-teal-300 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-lg border border-slate-700">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {activeStep.time}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-teal-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-1.5">
                    {activeStep.category[lang]}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {activeStep.title[lang]}
                  </h3>
                </div>
              </div>

              {/* Step Detail Content */}
              <div className="p-6 sm:p-7 space-y-5">
                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
                  {activeStep.description[lang]}
                </p>

                {/* Spot Photo Highlight Box */}
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-teal-950 leading-relaxed font-semibold">
                    <strong className="block text-teal-950 font-black uppercase tracking-wider mb-1 text-xs">
                      TOUR HIGHLIGHT
                    </strong>
                    {activeStep.highlight[lang]}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-bold">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    Labuan Bajo Land Route
                  </span>
                  <span className="text-teal-700 font-extrabold">✓ Private Car Included</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. SWAP OR ADD SPOTS (OPTIONAL 1-DAY DESTINATIONS) */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200 mb-2">
                1-DAY OPTIONAL SPOTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Swap or Add Spots to Your Single-Day Charter
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Golo Mori Coastal Highway, Gua Rangko, or Desa Melo cultural village options.
              </p>
            </div>

            <button
              onClick={() => setShowOptionalSpots(!showOptionalSpots)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              {showOptionalSpots ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{showOptionalSpots ? 'Hide 1-Day Options' : 'Show 1-Day Options'}</span>
            </button>
          </div>

          {showOptionalSpots && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OPTIONAL_SPOTS.map((spot) => (
                <div
                  key={spot.id}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={spot.image}
                        alt={spot.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {spot.tag[lang]}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3 text-teal-400" />
                        <span>{spot.timeCost[lang]}</span>
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                        {spot.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {spot.desc[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-3">
                    <div className="text-[11px] text-teal-800 font-semibold bg-teal-50 p-2.5 rounded-xl border border-teal-200/80 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{spot.badge[lang]}</span>
                    </div>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                        `Hi HelloBajo! I want to add/swap ${spot.title.EN} to my 1-day car charter.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>+ Select Spot for Day Tour</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 6. MULTI-DAY OVERLAND FLORES SECTION */}
      <section id="overland-custom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-extrabold text-xs uppercase tracking-wider border border-teal-500/30">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              MULTI-DAY OVERLAND FLORES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Planning a Longer Trip across Flores Island?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              For far-distance overland destinations like Wae Rebo Traditional Village, Ruteng Spider-Web Fields, Bajawa, or Kelimutu Tri-Color Lakes, contact us for custom multi-day overland packages (2D1N to 5D4N round trip).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {OVERLAND_DESTINATIONS.map((dest, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-teal-500/50 transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img src={dest.image} alt={dest.title[lang]} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-teal-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      {dest.tag[lang]}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white">{dest.title[lang]}</h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {dest.desc[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <span className="text-[10px] text-teal-300 font-medium flex items-center gap-1 border-t border-slate-700/80 pt-2.5">
                    <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                    <span className="truncate">{dest.badge[lang]}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Overland Inquiry Box */}
          <div className="bg-slate-950/90 border border-slate-800 p-6 rounded-2xl space-y-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  CUSTOM ITINERARY
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1">
                  Want a Custom Route or Special Request?
                </h3>
                <p className="text-slate-400 text-xs">
                  Type your preferred spots, dates, or custom requests below, then chat directly with our team on WhatsApp!
                </p>
              </div>

              <button
                onClick={handleOverlandConsult}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 text-teal-500" />
                <span>Consult Overland & Custom Route →</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={customOverlandQuery}
                onChange={(e) => setCustomOverlandQuery(e.target.value)}
                placeholder="Type your preferred spots or questions here..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleOverlandConsult}
                className="absolute right-2 top-2 bottom-2 px-3 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-[11px] text-slate-500 text-center">
              Instant response & free custom route consultation
            </p>
          </div>

        </div>
      </section>

      {/* 7. RESERVATION FORM SECTION */}
      <section id="reserve-now" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            RESERVE NOW
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Book Your Private Car Charter & City Tour
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Fill in the details below to generate your instant WhatsApp booking details.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-xl space-y-6">
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  FULL NAME * *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Sarah Johnson"
                  className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  WHATSAPP / PHONE NUMBER * *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62 / +1 / +61 xxx xxx xxx"
                  className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  NUMBER OF PASSENGERS *
                </label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)}
                  className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="1 - 4 Passengers (Standard MPV - Rp 1.300.000)">1 - 4 Passengers (Standard MPV - Rp 1.300.000)</option>
                  <option value="5 - 6 Passengers (Standard MPV - Rp 1.300.000)">5 - 6 Passengers (Standard MPV - Rp 1.300.000)</option>
                  <option value="7 - 14 Passengers (HiAce Commuter - Consult Rate)">7 - 14 Passengers (HiAce Commuter - Consult Rate)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  TOUR DATE *
                </label>
                <input
                  type="date"
                  required
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  PICK-UP TIME *
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="08:30 AM (Recommended)">08:30 AM (Recommended)</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="Custom Time (Flight Arrival)">Custom Time (Flight Arrival)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                PICK-UP LOCATION / HOTEL / AIRPORT * *
              </label>
              <input
                type="text"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="e.g., Ayana Komodo Resort / LBJ Airport"
                className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                SPECIAL REQUESTS / CUSTOM DESTINATIONS (OPTIONAL)
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g., Want to visit Gua Rangko, need child seat, or specific restaurant stop..."
                className="w-full bg-slate-50 border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Deposit Policy Box */}
            <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed font-medium">
                <strong className="block text-teal-900 font-bold mb-0.5">
                  Booking Deposit Policy
                </strong>
                Rp 200.000 (~$13 USD) deposit / car to lock your driver & vehicle. Remaining Rp 1.100.000 (~$70 USD) payable upon tour completion.
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-teal-600" />
              <span>Send Booking on WhatsApp</span>
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              Booking via WhatsApp is instant & simple. Rp 200.000 (~$13 USD) deposit locks your driver; remaining balance paid after the tour.
            </p>
          </form>

          {/* Payment Badges */}
          <div className="pt-6 border-t border-stone-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              ACCEPTED PAYMENT METHODS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-stone-200/80 text-slate-700 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <div>
                  <strong className="block text-slate-900">Wise</strong>
                  <span className="text-[10px] text-slate-500">USD, EUR, AUD, SGD & Global</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-stone-200/80 text-slate-700 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <div>
                  <strong className="block text-slate-900">Bank Transfer</strong>
                  <span className="text-[10px] text-slate-500">BCA, Mandiri, BRI, BNI</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-stone-200/80 text-slate-700 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <div>
                  <strong className="block text-slate-900">Cash & QRIS</strong>
                  <span className="text-[10px] text-slate-500">IDR Cash or QRIS after tour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMMON QUESTIONS (FAQ) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            FAQ
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Common Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Everything you need to know before booking your Labuan Bajo Private Car Charter.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    {faq.q[lang]}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100">
                    {faq.a[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
