import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  CITY_TOUR_HERO,
  CAR_CHARTER_BANNER,
  RIDING_DESTINATIONS,
  CITY_TOUR_ITINERARY_IMAGES,
  CITY_TOUR_OPTIONAL_IMAGES,
  OVERLAND_DESTINATION_IMAGES
} from '../data/images';
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
  Info,
  X,
  Star
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
      EN: 'Your private driver picks you up directly from your hotel lobby or Komodo Airport (LBJ) in a clean, air-conditioned vehicle with free pick-up across Labuan Bajo town.',
      ID: 'Driver pribadi Anda menjemput langsung dari lobi hotel atau Bandara Komodo (LBJ) dengan mobil bersih ber-AC secara gratis di seluruh area kota.',
      ZH: '专职私人司机前往酒店大堂或科莫多机场 (LBJ) 准时接您，在拉布安巴佐市区范围提供免费接送。',
    },
    highlight: {
      EN: 'Free pick-up across Labuan Bajo town area',
      ID: 'Gratis antar-jemput di area kota Labuan Bajo',
      ZH: '拉布安巴佐市区及机场范围免费接送',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step1Pickup,
  },
  {
    step: '02',
    time: '09:00 AM – 10:30 AM',
    category: { EN: 'NATURE & GEOLOGY', ID: 'WISATA ALAM & GEOLOGI', ZH: '自然奇观与溶洞探秘' },
    duration: { EN: '1.5 Hours', ID: '1.5 Jam', ZH: '1.5 小时' },
    title: {
      EN: 'Gua Batu Cermin (Mirror Stone Cave)',
      ID: 'Gua Batu Cermin (Mirror Stone Cave)',
      ZH: '镜石洞 (Gua Batu Cermin)',
    },
    description: {
      EN: 'Explore the natural limestone cave in the cool morning atmosphere. Witness sunlight refracting off rock walls and ancient sea fossils preserved inside.',
      ID: 'Eksplorasi gua batu kapur alami saat udara pagi sejuk. Saksikan pantulan sinar matahari di dinding batu dan fosil laut purba.',
      ZH: '晨间探秘天然石灰岩溶洞，气温清凉宜人。欣赏阳光穿透岩隙的折射奇景与古老海洋生物化石。',
    },
    highlight: {
      EN: 'Ancient sea fossils & cool limestone atmosphere',
      ID: 'Fosil laut purba & suasana gua kapur sejuk',
      ZH: '远古海洋化石与清凉溶洞奇观',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step2BatuCermin,
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
      EN: 'Enjoy sweeping 360-degree hilltop views of Labuan Bajo’s rolling islands and turquoise bays before midday heat.',
      ID: 'Nikmati pemandangan 360 derajat gugusan pulau dan teluk biru Labuan Bajo dari puncak bukit sebelum terik siang.',
      ZH: '登高远眺拉布安巴佐 360 度海景与连绵群岛，绿宝石般的海湾尽收眼底。',
    },
    highlight: {
      EN: '360-degree island & turquoise bay views',
      ID: 'Spot foto panorama 360° pulau & teluk biru',
      ZH: '360° 绝美海岛与蓝色海湾全景打卡点',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step3BukitCinta,
  },
  {
    step: '04',
    time: '12:30 PM – 14:00 PM',
    category: { EN: 'MIDDAY DINING', ID: 'KULINER PESISIR SIANG', ZH: '海景特色午餐' },
    duration: { EN: '1.5 Hours', ID: '1.5 Jam', ZH: '1.5 小时' },
    title: {
      EN: 'Lunch & Coastal Culinary Experience',
      ID: 'Makan Siang & Kuliner Pesisir',
      ZH: '海边餐厅午餐与地方美食体验',
    },
    description: {
      EN: 'Midday dining break at a seaside seafood venue or cozy local café. Your driver will gladly recommend authentic culinary spots.',
      ID: 'Istirahat makan siang di restoran seafood tepi pantai atau kafe lokal nyaman. Driver siap merekomendasikan kuliner khas terbaik.',
      ZH: '在海边海鲜餐厅或舒适咖啡馆享用美味午餐，司机为您推荐最棒的地道特色美食。',
    },
    highlight: {
      EN: 'Fresh seafood & relaxed seaside dining',
      ID: 'Seafood segar lokal & istirahat makan siang nyaman',
      ZH: '新鲜海鲜与舒适海边用餐体验',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step4Lunch,
  },
  {
    step: '05',
    time: '14:15 PM – 15:15 PM',
    category: { EN: 'LOCAL SHOPPING & CULTURE', ID: 'WISATA BELANJA & BUDAYA', ZH: '特产与手工艺品' },
    duration: { EN: '1 Hour', ID: '1 Jam', ZH: '1 小时' },
    title: {
      EN: 'Flores Souvenir & Craft Center',
      ID: 'Pusat Oleh-Oleh & Kerajinan Khas Flores',
      ZH: '弗洛雷斯特产与手工艺品中心',
    },
    description: {
      EN: 'Browse authentic handwoven Tenun Ikat fabrics, aromatic Manggarai coffee, and hand-crafted Flores souvenirs at local artisan galleries.',
      ID: 'Berbelanja kain Tenun Ikat asli, kopi Manggarai beraroma harum, dan kerajinan tangan khas Flores di galeri UMKM lokal.',
      ZH: '选购手工编织的特努织锦 (Tenun Ikat)、闻名遐迩的芒加莱咖啡以及精致的本地纪念品。',
    },
    highlight: {
      EN: 'Handwoven Tenun Ikat fabrics & Manggarai coffee',
      ID: 'Kain Tenun Ikat buatan tangan & kopi Manggarai',
      ZH: '手工特努织锦与芒加莱高山咖啡',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step5Souvenir,
  },
  {
    step: '06',
    time: '15:30 PM – 16:30 PM',
    category: { EN: 'CULTURE & HIGHLAND', ID: 'WISATA BUDAYA & PEGUNUNGAN', ZH: '传统文化村与高山体验' },
    duration: { EN: '1 Hour', ID: '1 Jam', ZH: '1 小时' },
    title: {
      EN: 'Desa Melo Cultural Village',
      ID: 'Desa Adat Melo',
      ZH: '梅洛传统文化村 (Desa Melo)',
    },
    description: {
      EN: 'Ascend into the cool Flores highlands to experience traditional Manggarai village heritage, scenic mountain vistas, and fresh upland air.',
      ID: 'Perjalanan ke pegunungan Flores yang sejuk untuk merasakan warisan suku Manggarai, pemandangan bukit, dan udara segar.',
      ZH: '前往凉爽的弗洛雷斯高山，体验芒加莱部落传统文化，呼吸清新山地空气与观赏辽阔山景。',
    },
    highlight: {
      EN: 'Traditional village heritage & scenic mountain air',
      ID: 'Warisan desa adat Manggarai & udara pegunungan sejuk',
      ZH: '传统部落文化遗存与高山清爽空气',
    },
    image: CITY_TOUR_OPTIONAL_IMAGES.desaMelo,
  },
  {
    step: '07',
    time: '16:45 PM – 17:45 PM',
    category: { EN: 'GOLDEN HOUR SUNSET', ID: 'MOMEN SUNSET EMAS', ZH: '日落观景台' },
    duration: { EN: '1 Hour', ID: '1 Jam', ZH: '1 小时' },
    title: {
      EN: 'Puncak Waringin Sunset Lookout',
      ID: 'Puncak Waringin Sunset Lookout',
      ZH: '瓦林金顶 (Puncak Waringin) 傍晚日落',
    },
    description: {
      EN: 'Arrive at Labuan Bajo’s premier sunset terrace during golden hour to admire traditional Phinisi schooners anchored in the glowing bay.',
      ID: 'Tiba di teras pemandangan Puncak Waringin tepat saat golden hour, menyaksikan kapal Phinisi bersandar di pelabuhan.',
      ZH: '在黄金时段抵达拉布安巴佐顶尖日落观景台，俯瞰港湾中停泊的菲尼斯 (Phinisi) 帆船与壮丽晚霞。',
    },
    highlight: {
      EN: 'Golden hour sunset over Phinisi schooners in harbor',
      ID: 'Sunset emas dengan latar kapal Phinisi di pelabuhan',
      ZH: '港湾帆船落日绝美晚霞全景',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step6Sunset,
  },
  {
    step: '08',
    time: '18:00 PM – Max 20:00 PM',
    category: { EN: 'DINNER & RETURN TRANSFER', ID: 'MAKAN MALAM & ANTAR HOTEL', ZH: '晚餐与送回酒店' },
    duration: { EN: 'Max 20:00 PM', ID: 'Maks 20:00 WITA', ZH: '截止晚 20:00' },
    title: {
      EN: 'Dinner Stop & Return Transfer',
      ID: 'Makan Malam & Pengantaran Kembali ke Hotel',
      ZH: '晚餐休息与送回酒店',
    },
    description: {
      EN: 'Conclude your tour with a relaxing dinner stop at a restaurant or seafood night market of your choice, followed by hotel drop-off.',
      ID: 'Selesaikan tur harian dengan makan malam di restoran pilihan atau wisata kuliner malam, dilanjutkan pengantaran kembali ke hotel.',
      ZH: '在您指定的餐厅或美食夜市享受晚餐休整，随后由专车将您安全送回酒店，圆满结束一日游。',
    },
    highlight: {
      EN: 'Relaxing dinner stop & hotel drop-off up to 20:00 PM',
      ID: 'Stop makan malam & pengantaran hotel hingga 20:00 WITA',
      ZH: '包含晚餐途经与最迟 20:00 前的酒店送回服务',
    },
    image: CITY_TOUR_ITINERARY_IMAGES.step7Dinner,
  },
];

// 2. Single-Day Optional Spots
const OPTIONAL_SPOTS = [
  {
    id: 'golo-mori',
    tag: { EN: 'SCENIC COASTAL ROAD TRIP', ID: 'JALAN PESISIR INDAH', ZH: '绝美沿海公路' },
    timeCost: { EN: '+45 mins drive from town', ID: '+45 menit dari kota', ZH: '距离市区 +45 分钟车程' },
    title: { EN: 'Golo Mori Coastal Highway', ID: 'Jalan Pesisir Golo Mori', ZH: '戈洛莫里 (Golo Mori) 沿海公路' },
    desc: {
      EN: 'Scenic road trip through dramatic coastal curves, pristine ocean vistas, and modern international venue grounds for custom route requests.',
      ID: 'Perjalanan road trip menyusuri jalanan pesisir Golo Mori dengan tikungan indah, pemandangan laut biru lepas, dan area venue modern.',
      ZH: '沿戈洛莫里沿海景观公路驰骋，途经壮观的海岸线曲线、蔚蓝海景与现代化场馆。',
    },
    badge: { EN: 'Scenic road trip for custom route requests', ID: 'Rute road trip pesisir spektakuler', ZH: '壮丽的沿海驾驶与风光体验' },
    image: CITY_TOUR_OPTIONAL_IMAGES.goloMori,
  },
  {
    id: 'gua-rangko',
    tag: { EN: 'NATURAL CAVERN POOL', ID: 'GUA KOLAM ALAM AIR ASIN', ZH: '天然岩洞海水池' },
    timeCost: { EN: '+1 Hour (Requires short wooden boat ride)', ID: '+1 Jam (Perlu perahu kayu pendek)', ZH: '+1 小时 (需搭乘短途木船)' },
    title: { EN: 'Gua Rangko (Natural Cave Pool)', ID: 'Gua Rangko (Kolam Air Asin)', ZH: '朗科洞 (Gua Rangko) 蓝洞游泳池' },
    desc: {
      EN: 'Natural subterranean saltwater pool with crystal-clear blue water illuminated by afternoon sunbeams filtering through the cave roof.',
      ID: 'Kolam air asin alami dalam gua dengan air biru jernih kristal yang tersinari cahaya matahari dari langit-langit gua.',
      ZH: '隐秘的咸水岩洞，正午阳光透过洞顶洒入，在晶莹剔透的蓝色洞穴泳池中惬意畅游。',
    },
    badge: { EN: 'Natural subterranean saltwater pool with crystal-clear water', ID: 'Kolam renang gua air asin biru kristal', ZH: '独特的地下洞穴海水畅游' },
    image: CITY_TOUR_OPTIONAL_IMAGES.guaRangko,
  },
  {
    id: 'cunca-watu',
    tag: { EN: 'HIGHLAND JUNGLE WATERFALL', ID: 'AIR TERJUN PEGUNUNGAN', ZH: '高山热带雨林瀑布' },
    timeCost: { EN: '+1 Hour drive into Flores highlands', ID: '+1 Jam ke pegunungan Flores', ZH: '向高山行驶 +1 小时' },
    title: { EN: 'Cunca Watu Waterfall', ID: 'Air Terjun Cunca Watu', ZH: '昆卡瓦图 (Cunca Watu) 瀑布' },
    desc: {
      EN: 'Refreshing jungle waterfall adventure in the Flores highlands featuring cool natural plunge pools and lush tropical greenery.',
      ID: 'Petualangan air terjun segar di pegunungan Flores dengan kolam renang alami yang sejuk dan pemandangan hijau asri.',
      ZH: '在弗洛雷斯高山探索清凉的热带雨林瀑布，在天然清澈的水潭中畅享畅快淋漓。',
    },
    badge: { EN: 'Refreshing jungle waterfall adventure in Flores highlands', ID: 'Petualangan air terjun pegunungan yang segar', ZH: '高山雨林清凉瀑布打卡' },
    image: CITY_TOUR_OPTIONAL_IMAGES.cuncaWatu,
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
    image: OVERLAND_DESTINATION_IMAGES.waeRebo,
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
    image: OVERLAND_DESTINATION_IMAGES.ruteng,
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
    image: OVERLAND_DESTINATION_IMAGES.bajawa,
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
    image: OVERLAND_DESTINATION_IMAGES.kelimutu,
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
      EN: 'Is a deposit required? No deposit required! We secure your private driver and vehicle based on your flight details or hotel confirmation. Payment is settled in cash or transfer directly upon tour completion.',
      ID: 'Apakah ada deposit untuk memesan? Tanpa deposit sama sekali! Kami mengamankan driver dan unit mobil Anda berdasarkan info nomor penerbangan atau nama konfirmasi hotel Anda. Pelunasan dilakukan secara tunai atau transfer setelah tur selesai.',
      ZH: '预订需要支付定金吗？无需任何定金！我们根据您的航班号或酒店确认信息为您锁定专属司机与车辆。行程结束后直接以现金或转账结清。',
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
      EN: 'Our standard 7-seater vehicles (Toyota Rush / Calya / Avanza) comfortably accommodate 1 to 6 passengers with light day bags. For larger groups (up to 14 passengers), we recommend our spacious Toyota HiAce Commuter.',
      ID: 'Mobil MPV / SUV 7-seater standar kami (Toyota Rush / Calya / Avanza) sangat nyaman untuk 1 hingga 6 penumpang. Untuk rombongan besar (maksimal 14 orang), kami menyediakan Toyota HiAce Commuter.',
      ZH: '标准 7 座 MPV/SUV 车型 (Toyota Rush / Calya / Avanza) 适合 1-6 名乘客舒适乘坐。如果是大型团队 (最多 14 人)，我们提供宽敞的丰田 HiAce 商务车。',
    },
  },
  {
    q: {
      EN: 'Are entrance tickets included in Rp 1.200.000 (~$75 USD)?',
      ID: 'Apakah tiket masuk wisata sudah termasuk dalam Rp 1.200.000?',
      ZH: 'Rp 1.200.000 费用中是否包含景点门票？',
    },
    a: {
      EN: 'The Rp 1.200.000 rate covers the vehicle, full fuel (BBM), professional driver, mineral water, and all-day transfers up to 20:00 PM. Attraction entrance tickets (e.g. Gua Batu Cermin ~Rp 50.000/pax) and meals are paid directly by you at the venue.',
      ID: 'Harga Rp 1.200.000 sudah mencakup mobil ber-AC, BBM penuh, driver profesional, air mineral, & operasional hingga jam 20:00. Tiket masuk lokasi (seperti Gua Batu Cermin ~Rp 50.000/orang) & makan bayar langsung di lokasi.',
      ZH: 'Rp 1.200.000 价格已包含冷气专车、全程汽油 (BBM)、专业本地司机、矿泉水及全天使用（最迟至 20:00）。景点门票（例如镜石洞约 Rp 50.000/人）及餐食费用由您在现场自行支付。',
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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehiclePackage, setVehiclePackage] = useState(''); // Default state: starts unselected
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tourDate, setTourDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [pickupTime, setPickupTime] = useState('08:30 AM');
  const [pickupLocation, setPickupLocation] = useState('');
  const [verificationInfo, setVerificationInfo] = useState(''); // Mandatory Verification Field
  const [specialRequests, setSpecialRequests] = useState('');
  const [customOverlandQuery, setCustomOverlandQuery] = useState('');

  // Mandatory fields validation
  const isFormValid = useMemo(() => {
    return (
      vehiclePackage.trim() !== '' &&
      fullName.trim() !== '' &&
      phone.trim() !== '' &&
      tourDate.trim() !== '' &&
      pickupTime.trim() !== '' &&
      pickupLocation.trim() !== '' &&
      verificationInfo.trim() !== ''
    );
  }, [vehiclePackage, fullName, phone, tourDate, pickupTime, pickupLocation, verificationInfo]);

  const handleOpenModal = (preselectedVehicle?: string) => {
    if (preselectedVehicle) {
      setVehiclePackage(preselectedVehicle);
    }
    setIsModalOpen(true);
    try {
      window.history.pushState({ modalOpen: true }, '');
    } catch (e) {
      // ignore history errors
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
  };

  // Mobile browser history trap: pressing phone Back button closes modal
  useEffect(() => {
    const handlePopState = () => {
      setIsModalOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const msg =
      lang === 'EN'
        ? `Hi HelloBajo! I want to book a Private Car Charter (Zero Deposit Required):\n• Selected Vehicle/Package: ${vehiclePackage}\n• Full Name: ${fullName}\n• Phone/WhatsApp: ${phone}\n• Email: ${email || '-'}\n• Tour Date: ${tourDate}\n• Pickup Time: ${pickupTime}\n• Pickup Location: ${pickupLocation}\n• Verification (Flight / Hotel Name): ${verificationInfo}\n• Special Requests: ${specialRequests || 'None'}\n• Price: Rp 1.200.000 / Car (Zero Upfront Deposit - Pay on completion)`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想预订拉布安巴佐私人包车（免定金服务）：\n• 预订车型/方案: ${vehiclePackage}\n• 姓名: ${fullName}\n• 电话/微信: ${phone}\n• 邮箱: ${email || '-'}\n• 用车日期: ${tourDate}\n• 接送时间: ${pickupTime}\n• 接送地点: ${pickupLocation}\n• 验证信息 (航班号/酒店预订姓名): ${verificationInfo}\n• 额外需求: ${specialRequests || '无'}\n• 价格: Rp 1.200.000/车 (全程无需定金，行程结束付款)`
        : `Halo HelloBajo! Saya mau pesan Private Car Charter (Bebas Deposit / Tanpa DP):\n• Armada/Paket: ${vehiclePackage}\n• Nama Lengkap: ${fullName}\n• No WA/Telepon: ${phone}\n• Email: ${email || '-'}\n• Tanggal Tour: ${tourDate}\n• Jam Penjemputan: ${pickupTime}\n• Lokasi Antar/Jemput: ${pickupLocation}\n• Info Verifikasi (No Penerbangan / Nama Hotel): ${verificationInfo}\n• Catatan Tambahan: ${specialRequests || 'Tidak ada'}\n• Harga: Rp 1.200.000 (Tanpa Deposit - Pelunasan setelah tour selesai)`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsModalOpen(false);
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
      : 'Sewa Mobil & Private City Tour Labuan Bajo — Rush, Calya & HiAce ber-AC';

  const pageDescription =
    lang === 'EN'
      ? "Labuan Bajo's premier private car charter & city tour service. Fixed Rp 1.200.000 rate, clean 7-seater AC car with driver, full fuel, and flexible route."
      : lang === 'ZH'
      ? '拉布安巴佐首选私人包车与城市游服务。固定价格 Rp 1.200.000/车，双重冷气 7 座 MPV/SUV，专业本地司机含全程汽油，行程 100% 自由定制。'
      : 'Layanan sewa mobil & private city tour terbaik di Labuan Bajo. Tarif tetap Rp 1.200.000/hari, mobil AC bersih 7-seater, driver ramah & BBM penuh.';

  const activeStep = ITINERARY_STEPS[activeStepIndex];

  return (
    <div className="bg-[#f9fafb] text-slate-800 selection:bg-teal-500 selection:text-white font-sans overflow-x-clip">
      <SEOHead title={pageTitle} description={pageDescription} canonicalUrl="https://hellobajo.com/cars" />

      {/* Sub-Header Section Navigation Bar */}
      <div className="bg-white border-b border-stone-200/80 sticky top-16 sm:top-20 z-40 backdrop-blur-md bg-white/95 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start sm:justify-center h-12 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold text-slate-600 space-x-6 sm:space-x-10">
          <a
            href="#city-tour"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === 'EN' ? 'Private City Tour' : lang === 'ZH' ? '城市一日游' : 'Private City Tour'}</span>
          </a>
          <a
            href="#pricing"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Rates & Inclusions' : lang === 'ZH' ? '包车价格与包含' : 'Harga & Fasilitas'}
          </a>
          <a
            href="#city-tour-itinerary"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? '1-Day Itinerary' : lang === 'ZH' ? '7 步游览路线' : 'Jadwal Tour 1 Hari'}
          </a>
          <a
            href="#overland-custom"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Overland & Custom' : lang === 'ZH' ? '长途与定制' : 'Overland & Custom'}
          </a>
          <a
            href="#reserve-now"
            className="text-teal-600 hover:text-teal-700 font-extrabold transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Book Private Car' : lang === 'ZH' ? '预订包车' : 'Pesan Mobil'}
          </a>
          <a
            href="#faq"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            FAQ
          </a>
        </div>
      </div>

      {/* 1. HERO BANNER SECTION WITH CLEAN LIGHT MODE & PUZZLE VISUAL */}
      <section id="city-tour" className="relative bg-[#faf8f5] text-slate-900 py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-stone-200/80 scroll-mt-20 sm:scroll-mt-24">
        {/* Soft Warm Background Radial Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-100/40 to-stone-100/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT COLUMN: SQUARE PUZZLE GRID VISUAL WITH "BAJO" MASKED PHOTO */}
            <div className="lg:col-span-6 flex justify-center order-1">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square p-3 sm:p-4 bg-white border border-stone-200/90 rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden group">

                {/* Top-Left Casual Floating Badge (Hidden on mobile to prevent overlapping with price badge) */}
                <div className="hidden sm:block absolute top-5 left-5 z-30 -rotate-2 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105 pointer-events-none">
                  <div className="bg-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-md border border-amber-300/80 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950 animate-pulse" />
                    <span>{lang === 'EN' ? 'PRIVATE CITY TOUR' : lang === 'ZH' ? '包车一日游' : 'PRIVATE CITY TOUR'}</span>
                  </div>
                </div>

                {/* Top-Right Price Floating Badge */}
                <div className="absolute top-5 right-5 z-30 pointer-events-none">
                  <span className="bg-white/95 text-teal-800 border border-teal-300 text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md">
                    Rp 1.200.000 / Car
                  </span>
                </div>

                {/* 2x2 Integrated Puzzle Grid (Continuous Photo & Giant "BAJO" Letters) */}
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3 sm:gap-3.5 relative z-10 pt-10 pb-8">

                  {/* Tile 1: Top-Left (Quadrant 1 + Letter B) */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/50 shadow-md group/tile bg-slate-900 flex items-center justify-center">
                    <img
                      src={CITY_TOUR_HERO}
                      alt="Labuan Bajo Padar Island"
                      loading="eager"
                      decoding="async"
                      className="absolute w-[200%] h-[200%] max-w-none top-0 left-0 object-cover brightness-105 contrast-105 group-hover/tile:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-transparent to-slate-950/50" />
                    <span className="relative text-7xl sm:text-9xl font-black text-white/95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tighter select-none font-sans">
                      B
                    </span>
                  </div>

                  {/* Tile 2: Top-Right (Quadrant 2 + Letter A) */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/50 shadow-md group/tile bg-slate-900 flex items-center justify-center">
                    <img
                      src={CITY_TOUR_HERO}
                      alt="Labuan Bajo Ocean"
                      loading="eager"
                      decoding="async"
                      className="absolute w-[200%] h-[200%] max-w-none top-0 left-[-100%] object-cover brightness-105 contrast-105 group-hover/tile:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-slate-950/30 via-transparent to-slate-950/50" />
                    <span className="relative text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-amber-200 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tighter select-none font-sans">
                      A
                    </span>
                  </div>

                  {/* Tile 3: Bottom-Left (Quadrant 3 + Letter J) */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/50 shadow-md group/tile bg-slate-950 flex items-center justify-center">
                    <img
                      src={CITY_TOUR_HERO}
                      alt="Labuan Bajo Landscape"
                      loading="eager"
                      decoding="async"
                      className="absolute w-[200%] h-[200%] max-w-none top-[-100%] left-0 object-cover brightness-105 contrast-105 group-hover/tile:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-slate-950/50" />
                    <span className="relative text-7xl sm:text-9xl font-black text-white/95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tighter select-none font-sans">
                      J
                    </span>
                  </div>

                  {/* Tile 4: Bottom-Right (Quadrant 4 + Letter O) */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/50 shadow-md group/tile bg-slate-950 flex items-center justify-center">
                    <img
                      src={CITY_TOUR_HERO}
                      alt="Labuan Bajo Fleet"
                      loading="eager"
                      decoding="async"
                      className="absolute w-[200%] h-[200%] max-w-none top-[-100%] left-[-100%] object-cover brightness-105 contrast-105 group-hover/tile:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-slate-950/40 via-transparent to-slate-950/50" />
                    <span className="relative text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-100 to-amber-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tighter select-none font-sans">
                      O
                    </span>
                  </div>

                </div>

                {/* Bottom Footer Overlay Bar */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-extrabold text-slate-600 border-t border-stone-100 relative z-10">
                  <span className="text-teal-700 flex items-center gap-1 font-extrabold">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    {lang === 'EN' ? 'Zero Deposit Required' : lang === 'ZH' ? '免定金预订' : 'Bebas Deposit / Tanpa DP'}
                  </span>
                  <span className="text-slate-500">
                    {lang === 'EN' ? 'Flexibility Up to 20:00' : lang === 'ZH' ? '全天服务至晚 20:00' : 'Operasional s/d 20:00 WITA'}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: COPYWRITING & ACTION BUTTONS */}
            <div className="lg:col-span-6 space-y-6 text-left order-2">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-300/60 text-amber-900 text-xs font-black uppercase tracking-wider">
                <Car className="w-4 h-4 text-amber-700" />
                <span>
                  {lang === 'EN'
                    ? 'BEST VALUE PRIVATE CAR • LABUAN BAJO'
                    : lang === 'ZH'
                    ? '拉布安巴佐高性价比包车 • 自由行首选'
                    : 'BEST VALUE PRIVATE CAR • LABUAN BAJO'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {lang === 'EN'
                  ? 'Private Labuan Bajo City Tour & Car Charter'
                  : lang === 'ZH'
                  ? '拉布安巴佐私人包车与城市景观一日游'
                  : 'Sewa Mobil Private & City Tour Labuan Bajo'}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {lang === 'EN'
                  ? "Explore Labuan Bajo's iconic hills, mirror limestone caves, and Puncak Waringin sunset vistas in a clean, private 7-seater AC car. Includes friendly local driver, full fuel, and free hotel or airport transfers."
                  : lang === 'ZH'
                  ? '乘坐专属双重冷气 7 座 MPV/SUV，由专业熟路本地司机为您服务（已含全程汽油与接送）。100% 自由安排行程，轻松游览镜石洞、爱之丘与瓦林金顶落日。'
                  : 'Jelajahi keindahan bukit, gua alam Gua Batu Cermin, & sunset Puncak Waringin dengan mobil 7-seater AC bersih. Sudah termasuk driver ramah, BBM penuh, & gratis antar-jemput hotel/bandara.'}
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white border border-stone-200/90 shadow-xs p-3.5 rounded-2xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-700 shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-extrabold">
                      {lang === 'EN' ? 'Fixed Daily Rate' : lang === 'ZH' ? '全天一口价' : 'Tarif Tetap / Hari'}
                    </span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-black">Rp 1.200.000 / Car</strong>
                  </div>
                </div>

                <div className="bg-white border border-stone-200/90 shadow-xs p-3.5 rounded-2xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-extrabold">
                      {lang === 'EN' ? 'Payment Policy' : lang === 'ZH' ? '付款政策' : 'Kebijakan Bayar'}
                    </span>
                    <strong className="text-xs sm:text-sm text-emerald-700 font-black">
                      {lang === 'EN' ? 'Zero Deposit Required' : lang === 'ZH' ? '无需预付定金' : 'Tanpa Uang Muka'}
                    </strong>
                  </div>
                </div>

                <div className="bg-white border border-stone-200/90 shadow-xs p-3.5 rounded-2xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
                    <Fuel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-extrabold">
                      {lang === 'EN' ? 'All-Inclusive' : lang === 'ZH' ? '费用全包' : 'All-Inclusive'}
                    </span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-black">
                      {lang === 'EN' ? 'Car + Driver + Fuel' : lang === 'ZH' ? '专车 + 司机 + 汽油' : 'Mobil + Driver + BBM'}
                    </strong>
                  </div>
                </div>

                <div className="bg-white border border-stone-200/90 shadow-xs p-3.5 rounded-2xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-700 shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-extrabold">
                      {lang === 'EN' ? 'Free Transfers' : lang === 'ZH' ? '免费接送' : 'Bebas Antar-Jemput'}
                    </span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-black">
                      {lang === 'EN' ? 'Hotel & Airport LBJ' : lang === 'ZH' ? '市区酒店与科莫多机场' : 'Hotel & Bandara LBJ'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleOpenModal('Standard 7-Seater MPV (Toyota Rush / Calya / Avanza) — Rp 1.200.000')}
                  className="px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-600/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
                  <span>{lang === 'EN' ? 'Book Private Car Now' : lang === 'ZH' ? '立即预订专属包车' : 'Pesan Mobil Private Sekarang'}</span>
                </button>

                <a
                  href="#city-tour-itinerary"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-stone-300 shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span>{lang === 'EN' ? 'Explore Itinerary' : lang === 'ZH' ? '查看 7 步行程' : 'Lihat Jadwal Tour'}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  {lang === 'EN' ? '1-6 Persons / Car' : lang === 'ZH' ? '每车可乘 1-6 人' : 'Kapasitas 1-6 Orang / Mobil'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  {lang === 'EN' ? 'Instant WhatsApp Reply' : lang === 'ZH' ? 'WhatsApp 快速响应' : 'Respon Instan via WA'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  {lang === 'EN' ? '100% Flexible Route' : lang === 'ZH' ? '路线 100% 自由定制' : 'Rute 100% Fleksibel'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20 sm:scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            {lang === 'EN' ? 'TRANSPARENT PRICING' : lang === 'ZH' ? '透明包车价格' : 'HARGA TRANSPARAN'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            {lang === 'EN'
              ? 'All-Inclusive Private Car Charter'
              : lang === 'ZH'
              ? '全包式私人包车一日游'
              : 'Sewa Mobil Private All-Inclusive'}
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'EN'
              ? 'Fixed daily rate per vehicle. No per-person markup. Approx. ~$75 USD (€68 EUR). Ideal for families, couples, and small groups (1–6 pax).'
              : lang === 'ZH'
              ? '每车固定日租价格，无单人附加费。约合 ~$75 美元 (€68 欧元)。非常适合家庭、情侣及 1-6 人小团队。'
              : 'Harga tetap harian per mobil. Tanpa biaya per orang. Sekitar ~$75 USD (€68 EUR). Cocok untuk keluarga, pasangan, & rombongan (1–6 orang).'}
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Dark Slate Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-extrabold border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  {lang === 'EN'
                    ? 'Best Value for 1–6 Pax'
                    : lang === 'ZH'
                    ? '1–6 人高性价比首选'
                    : 'Paling Hemat untuk 1–6 Orang'}
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  Rp 1.200.000
                </div>
                <div className="text-teal-400 text-xs sm:text-sm font-bold mt-0.5">
                  (~$75 USD / €68 EUR)
                </div>
                <div className="text-slate-400 text-xs mt-1 font-medium">
                  {lang === 'EN'
                    ? '/ car / day (Fixed All-Inclusive)'
                    : lang === 'ZH'
                    ? '/ 车 / 天 (全包一口价)'
                    : '/ mobil / hari (Harga Pas All-In)'}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">
                      {lang === 'EN'
                        ? '1–6 Passengers Capacity'
                        : lang === 'ZH'
                        ? '1–6 位乘客载客量'
                        : 'Kapasitas 1–6 Penumpang'}
                    </strong>
                    <span className="text-slate-300">
                      {lang === 'EN'
                        ? 'Clean Toyota Rush / Calya / Avanza 7-Seater MPV'
                        : lang === 'ZH'
                        ? '舒适干净的 Toyota Rush / Calya / Avanza 7 座 MPV/SUV'
                        : 'Unit Toyota Rush / Calya / Avanza 7-seater bersih & terawat'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">
                      {lang === 'EN'
                        ? '7-Seater SUV / MPV Fleet'
                        : lang === 'ZH'
                        ? '7 座 SUV / MPV 车队'
                        : 'Armada SUV / MPV 7-Seater'}
                    </strong>
                    <span className="text-slate-300">
                      {lang === 'EN'
                        ? 'Clean & modern 7-seater vehicle with Double Blower AC & Driver'
                        : lang === 'ZH'
                        ? '干净现代的 7 座车辆，配置双重冷气与专业本地司机'
                        : 'Mobil 7-seater bersih & modern ber-AC Double Blower & Driver'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">
                      {lang === 'EN'
                        ? 'Full Day Charter Hours'
                        : lang === 'ZH'
                        ? '全天包车服务时长'
                        : 'Jam Sewa Full Day'}
                    </strong>
                    <span className="text-slate-300">
                      {lang === 'EN'
                        ? 'Start: 08:30 AM → End: After Dinner (Max 20:00 PM)'
                        : lang === 'ZH'
                        ? '出发: 08:30 AM → 结束: 晚餐后（最晚 20:00 PM）'
                        : 'Mulai: 08:30 WITA → Selesai: Setelah Makan Malam (Maks 20:00 WITA)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal('Standard 7-Seater MPV (Toyota Rush / Calya / Avanza) — Rp 1.200.000')}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>
                {lang === 'EN'
                  ? 'Book Private Car Charter via WhatsApp'
                  : lang === 'ZH'
                  ? '通过 WhatsApp 预订包车'
                  : 'Pesan Private Car Charter via WhatsApp'}
              </span>
            </button>
          </div>

          {/* Right Light Inclusions Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  {lang === 'EN' ? 'PACKAGE INCLUSIONS' : lang === 'ZH' ? '包含服务项目' : 'FASILITAS TERMASUK (ALL-IN)'}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'EN'
                        ? 'Clean modern 7-seater vehicle (Toyota Rush / Calya / Avanza)'
                        : lang === 'ZH'
                        ? '干净现代的 7 座舒适车辆（Toyota Rush / Calya / Avanza）'
                        : 'Mobil 7-seater bersih & modern (Toyota Rush / Calya / Avanza)'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'EN'
                        ? 'Full Fuel (BBM) included for all city & mainland routes'
                        : lang === 'ZH'
                        ? '包含全程汽油（BBM，覆盖所有市区与陆地观光线路）'
                        : 'BBM Penuh (Bahan Bakar) untuk seluruh rute city tour'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'EN'
                        ? 'Friendly English & Indonesian speaking local driver'
                        : lang === 'ZH'
                        ? '专业熟路本地司机（精通基础英文与印尼语）'
                        : 'Driver lokal ramah berbahasa Indonesia & Inggris'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'EN'
                        ? 'Door-to-door Pick-up & Drop-off anywhere in Labuan Bajo (Hotel/Resort/LBJ Airport)'
                        : lang === 'ZH'
                        ? '门到门免费接送（拉布安巴佐市区酒店/度假村/科莫多机场）'
                        : 'Bebas Antar-Jemput Door-to-Door (Hotel/Resort/Bandara Komodo LBJ)'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'EN'
                        ? 'Flexible schedule (Start 08:30 AM – End after Dinner max 20:00 PM)'
                        : lang === 'ZH'
                        ? '100% 自由行程（08:30 出发 – 晚餐后最晚 20:00 结束）'
                        : 'Jadwal fleksibel (Mulai 08:30 – Selesai setelah Makan Malam maks 20:00 WITA)'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'EN'
                        ? 'Chilled bottled mineral water for all passengers'
                        : lang === 'ZH'
                        ? '为全车乘客免费提供冰镇瓶装矿泉水'
                        : 'Air mineral botol dingin untuk seluruh penumpang'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-200/80">
                <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  {lang === 'EN' ? 'NOT INCLUDED (PAID DIRECTLY)' : lang === 'ZH' ? '不包含费用 (现场自理)' : 'TIDAK TERMASUK (BAYAR DI LOKASI)'}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>
                      {lang === 'EN'
                        ? 'Attraction entrance tickets (e.g., Gua Batu Cermin ~Rp 50.000/person)'
                        : lang === 'ZH'
                        ? '景点门票（如镜石洞 Gua Batu Cermin 约 Rp 50.000/人）'
                        : 'Tiket masuk objek wisata (contoh: Gua Batu Cermin ~Rp 50.000/orang)'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>
                      {lang === 'EN'
                        ? 'Personal meals, snacks, and drinks during lunch/dinner'
                        : lang === 'ZH'
                        ? '个人午餐、晚餐及个人餐饮消费'
                        : 'Makan siang, makan malam, & konsumsi pribadi'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>
                      {lang === 'EN'
                        ? 'Driver tipping (voluntary & at your discretion based on service)'
                        : lang === 'ZH'
                        ? '司机小费（非强制，根据服务满意度自愿支付）'
                        : 'Tip driver (sukarela sesuai kepuasan pelayanan)'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>
                      {lang === 'EN' ? 'Personal travel insurance' : lang === 'ZH' ? '个人旅游保险' : 'Asuransi perjalanan pribadi'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-50/80 border border-teal-200/90 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="block text-teal-900 font-bold mb-0.5">
                  {lang === 'EN'
                    ? 'Zero Upfront Deposit Required'
                    : lang === 'ZH'
                    ? '无需预付定金保障'
                    : 'Bebas Deposit / Tanpa Uang Muka'}
                </strong>
                {lang === 'EN'
                  ? 'We secure your private driver and vehicle based on your flight details or hotel confirmation. Payment is settled in cash or transfer directly upon tour completion.'
                  : lang === 'ZH'
                  ? '我们根据您的航班号或酒店确认信息为您锁定专属司机与车辆。行程结束后直接以现金或转账结清。'
                  : 'Kami mengamankan driver dan unit mobil Anda berdasarkan info nomor penerbangan atau nama konfirmasi hotel Anda. Pelunasan dilakukan secara tunai atau transfer setelah tur selesai.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLEET FEATURES SHOWCASE */}
      <section className="bg-stone-50 py-12 sm:py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/90 text-teal-900 font-black text-xs uppercase tracking-wider border border-teal-200">
              <Car className="w-3.5 h-3.5 text-teal-700" />
              <span>
                {lang === 'EN'
                  ? 'PRIVATE FLEET FEATURES'
                  : lang === 'ZH'
                  ? '专属车队配置'
                  : 'FASILITAS ARMADA PRIVAT'}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {lang === 'EN'
                ? 'Clean, Air-Conditioned & Well-Maintained'
                : lang === 'ZH'
                ? '干净舒适 • 双重冷气 • 良好保养车队'
                : 'Mobil Bersih, AC Dingin & Terawat'}
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              {lang === 'EN'
                ? 'All city & day tours use clean, modern 7-seater vehicles equipped with double-blower AC to ensure maximum comfort under the tropical sun.'
                : lang === 'ZH'
                ? '所有拉布安巴佐包车一日游均采用双重冷气 7 座 MPV/SUV，车况良好，确保热带出行舒适无忧。'
                : 'Semua unit mobil private city tour menggunakan armada 7-seater modern ber-AC dingin untuk kenyamanan maksimal perjalanan Anda.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Photo Card */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-slate-900 border border-stone-200/90 shadow-md min-h-[260px] sm:min-h-[320px] flex flex-col justify-between group">
              <img
                src={CAR_CHARTER_BANNER}
                alt="Toyota Rush / Calya / Avanza Fleet"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
              
              <div className="relative z-10 p-4">
                <span className="inline-block bg-teal-600 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider shadow-sm border border-teal-400/40">
                  {lang === 'EN' ? 'ACTUAL TOUR VEHICLE UNIT' : lang === 'ZH' ? '真实包车出航实拍' : 'UNIT MOBIL TUR ASLI'}
                </span>
              </div>

              <div className="relative z-10 p-5 sm:p-6 text-white space-y-1">
                <strong className="block text-base sm:text-lg font-black text-white leading-snug">
                  Toyota Rush / Calya / Avanza Fleet
                </strong>
                <p className="text-xs sm:text-sm text-slate-200 font-semibold">
                  {lang === 'EN'
                    ? 'Ready for Labuan Bajo Coastal & City Sightseeing Routes'
                    : lang === 'ZH'
                    ? '拉布安巴佐沿海与城市观光线路首选'
                    : 'Siap untuk Rute City Tour & Pesisir Labuan Bajo'}
                </p>
              </div>
            </div>

            {/* Right Feature Cards & Group Info */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                {/* Feature 1 */}
                <div className="p-4 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-teal-400/80 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <strong className="block text-xs sm:text-sm font-black text-slate-900">
                    {lang === 'EN' ? '5–6 Passengers' : lang === 'ZH' ? '1–6 位乘客' : '5–6 Penumpang'}
                  </strong>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {lang === 'EN' ? 'Comfortable 7-seater capacity' : lang === 'ZH' ? '舒适 7 座宽敞空间' : 'Kapasitas muat 7-seater'}
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-4 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-teal-400/80 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 mb-2">
                    <Car className="w-4 h-4" />
                  </div>
                  <strong className="block text-xs sm:text-sm font-black text-slate-900">
                    {lang === 'EN' ? 'Double Blower AC' : lang === 'ZH' ? '双重强劲冷气' : 'Double Blower AC'}
                  </strong>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {lang === 'EN' ? 'Cool tropical climate control' : lang === 'ZH' ? '轻松应对热带气候' : 'Sejuk sepanjang perjalanan'}
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-4 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-teal-400/80 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 mb-2">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <strong className="block text-xs sm:text-sm font-black text-slate-900">
                    {lang === 'EN' ? 'Driver + Fuel' : lang === 'ZH' ? '司机 + 全程汽油' : 'Driver + BBM'}
                  </strong>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {lang === 'EN' ? 'Fully inclusive, zero extra cost' : lang === 'ZH' ? '一口全包，绝无隐藏额外费' : 'Sudah termasuk biaya BBM'}
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="p-4 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-teal-400/80 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 mb-2">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <strong className="block text-xs sm:text-sm font-black text-slate-900">
                    {lang === 'EN' ? 'Door-to-Door' : lang === 'ZH' ? '门到门接送' : 'Antar-Jemput'}
                  </strong>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {lang === 'EN' ? 'Free hotel & airport LBJ pickup' : lang === 'ZH' ? '酒店与科莫多机场免费接送' : 'Bebas antar-jemput hotel/bandara'}
                  </p>
                </div>
              </div>

              {/* Group Info Box */}
              <div className="p-4 bg-teal-50/80 border border-teal-200/90 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <strong className="block text-teal-950 font-black mb-0.5">
                    {lang === 'EN' ? 'Group Tour (7–14 Passengers)?' : lang === 'ZH' ? '大容量团体出行 (7–14 人)？' : 'Rombongan Besar (7–14 Orang)?'}
                  </strong>
                  {lang === 'EN'
                    ? 'Toyota HiAce Commuter/Premio is available! Consult directly on WhatsApp for special group rates.'
                    : lang === 'ZH'
                    ? '提供 Toyota HiAce (最多 14 人)！价格与 7 座车不同，欢迎通过 WhatsApp 咨询优惠费率。'
                    : 'Tersedia Toyota HiAce Commuter/Premio (Maks 14 orang)! Hubungi WhatsApp kami untuk penawaran harga rombongan.'}
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
          <div className="lg:col-span-6 space-y-3.5">
            {ITINERARY_STEPS.map((item, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-white border-2 border-teal-600 shadow-lg p-5 sm:p-6 transform scale-[1.01]'
                      : 'bg-white hover:bg-stone-50/80 text-slate-800 border border-stone-200/90 p-5 sm:p-6 shadow-2xs hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-colors ${
                          isActive
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'bg-stone-100 text-slate-700'
                        }`}
                      >
                        {item.step}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                              isActive
                                ? 'text-teal-900 bg-teal-50 border-teal-200'
                                : 'text-slate-600 bg-stone-100 border-stone-200'
                            }`}
                          >
                            {item.time} • {item.category[lang]}
                          </span>
                        </div>
                        <h3
                          className={`text-lg sm:text-xl font-black mt-1.5 transition-colors leading-snug ${
                            isActive ? 'text-teal-950' : 'text-slate-900'
                          }`}
                        >
                          {item.title[lang]}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          isActive
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-stone-100 text-slate-600 border-stone-200/60'
                        }`}
                      >
                        {item.duration[lang]}
                      </span>
                      <ChevronRight
                        className={`hidden lg:block w-5 h-5 transition-transform duration-300 ${
                          isActive ? 'text-teal-600 translate-x-1' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Concise Description Line */}
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 font-normal">
                    {item.description[lang]}
                  </p>

                  <div
                    className={`mt-3.5 pt-3 flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                      isActive
                        ? 'bg-teal-50/80 border border-teal-200/70 p-3 rounded-xl text-teal-950 mt-3.5'
                        : 'border-t border-stone-100 text-teal-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 shrink-0 text-amber-500 fill-amber-500" />
                    <span>{item.highlight[lang]}</span>
                  </div>

                  {/* Mobile Inline Detailed View - Always Expanded by Default */}
                  <div className="lg:hidden mt-4 pt-4 border-t border-stone-200 space-y-3">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title[lang]}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-white">
                        {item.time}
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 text-xs sm:text-sm text-teal-950 flex items-start gap-2.5 font-semibold">
                      <Camera className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-teal-900 font-black mb-0.5 uppercase tracking-wider text-[11px]">
                          TOUR HIGHLIGHT
                        </strong>
                        {item.highlight[lang]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Floating / Sticky Preview Card (`lg:block hidden sticky top-36`) */}
          <div className="lg:col-span-6 hidden lg:block sticky top-36 sm:top-40 z-30">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden transition-all duration-300 space-y-0">
              
              {/* Destination Image with Badge Overlays */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  key={activeStep.step}
                  src={activeStep.image}
                  alt={activeStep.title[lang]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border border-white/20 shadow-md flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{activeStep.time}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-teal-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider mb-1.5 shadow-xs">
                    {activeStep.category[lang]}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {activeStep.title[lang]}
                  </h3>
                </div>
              </div>

              {/* Step Detail Content */}
              <div className="p-6 sm:p-7 space-y-5">
                <p className="text-slate-700 text-sm sm:text-base font-normal leading-relaxed">
                  {activeStep.description[lang]}
                </p>

                {/* Spot Photo Highlight Box */}
                <div className="bg-teal-50/80 border border-teal-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
                  <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-xs">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-teal-950 leading-relaxed font-semibold">
                    <strong className="block text-teal-900 font-black uppercase tracking-wider mb-1 text-[11px]">
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

      {/* 5. INSPIRASI RUTE & DESTINASI FLEKSIBEL (OPTIONAL 1-DAY DESTINATIONS) */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Minimalist Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 font-black text-xs uppercase tracking-wider border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {lang === 'EN'
                  ? 'FLEXIBLE ROUTE INSPIRATION'
                  : lang === 'ZH'
                  ? '灵感路线与自由定制'
                  : 'INSPIRASI RUTE & DESTINASI FLEKSIBEL'}
              </span>
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {lang === 'EN'
                ? 'Alternative Spots for Your Single-Day Charter'
                : lang === 'ZH'
                ? '可灵活切换/加选的景点路线'
                : 'Pilihan Destinasi Tambahan yang Fleksibel'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              {lang === 'EN'
                ? 'Want to visit Golo Mori Coastal Highway, Gua Rangko, or Cunca Watu Waterfall? You can freely adjust your route on tour day with your private driver.'
                : lang === 'ZH'
                ? '想去 Golo Mori 沿海公路、Gua Rangko 蓝洞或 Cunca Watu 瀑布？行程当天均可与您的专属司机灵活调整。'
                : 'Mau tukar atau tambah destinasi ke Golo Mori, Gua Rangko, atau Air Terjun Cunca Watu? Bebas diskusikan dengan supir kami saat penjemputan.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OPTIONAL_SPOTS.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.title[lang]}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-teal-700 text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                      {spot.tag[lang]}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{spot.timeCost[lang]}</span>
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                      {spot.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {spot.desc[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="text-xs text-teal-950 font-bold bg-teal-50 p-3 rounded-xl border border-teal-200/80 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{spot.badge[lang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. MULTI-DAY OVERLAND FLORES SECTION */}
      <section id="overland-custom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20 sm:scroll-mt-24">
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-extrabold text-xs uppercase tracking-wider border border-teal-500/30">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              MULTI-DAY OVERLAND FLORES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Planning a Longer Trip across Flores Island?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              For far-distance overland destinations like Wae Rebo Traditional Village, Ruteng Spider-Web Fields, Bajawa, or Kelimutu Tri-Color Lakes, contact us for custom multi-day overland packages (2D1N to 5D4N round trip).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {OVERLAND_DESTINATIONS.map((dest, idx) => (
              <div
                key={idx}
                className="bg-slate-800/90 border border-slate-700/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-teal-500/50 transition-all shadow-md"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img src={dest.image} alt={dest.title[lang]} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-teal-600 text-white text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                      {dest.tag[lang]}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="text-base font-black text-white">{dest.title[lang]}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {dest.desc[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <span className="text-xs text-teal-300 font-bold flex items-center gap-1.5 border-t border-slate-700/80 pt-3">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
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

      {/* 7. SECURE BOOKING CTA SECTION */}
      <section id="reserve-now" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 sm:scroll-mt-24">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6 border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'EN' ? 'ZERO DEPOSIT REQUIRED' : lang === 'ZH' ? '无需任何预付款' : 'TANPA DEPOSIT / TANPA DP'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
            {lang === 'EN'
              ? 'Book Your Private Car Charter in Seconds'
              : lang === 'ZH'
              ? '几秒内锁住您的专属司机与车辆'
              : 'Pesan Private Car Charter Anda Dalam Hitungan Detik'}
          </h2>

          <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
            {lang === 'EN'
              ? 'No upfront payment or credit card deposit required! Simply verify with your flight number or hotel booking name, and pay upon tour completion.'
              : lang === 'ZH'
              ? '无需预付定金或信用卡！只需填写您的航班号或酒店预订姓名完成验证，行程结束后直接付款。'
              : 'Tanpa DP dan tanpa kartu kredit! Cukup verifikasi dengan nomor penerbangan atau nama hotel Anda, dan bayar setelah tour selesai.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 text-teal-500" />
              <span>{lang === 'EN' ? 'Book Private Car Now' : lang === 'ZH' ? '立即预订专属包车' : 'Pesan Mobil Private Sekarang'}</span>
            </button>
          </div>

          {/* Payment Badges */}
          <div className="pt-6 border-t border-slate-800/80">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'EN' ? 'PAYMENT UPON TOUR COMPLETION VIA' : lang === 'ZH' ? '行程结束后付款方式' : 'PELUNASAN SETELAH TOUR SELESAI VIA'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                IDR Cash
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Local Bank Transfer (BCA/Mandiri/BRI)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Wise / QRIS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMMON QUESTIONS (FAQ) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 sm:scroll-mt-24">
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

      {/* STICKY MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">
            {lang === 'EN' ? 'Zero Deposit Required' : lang === 'ZH' ? '免定金预订' : 'Bebas Deposit'}
          </span>
          <div className="text-sm font-black text-slate-900 flex items-center gap-1">
            <span>Rp 1.200.000</span>
            <span className="text-[10px] text-slate-500 font-semibold">/ car</span>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-lg shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
          <span>{lang === 'EN' ? 'Book Private Car Now' : lang === 'ZH' ? '立即预订' : 'Pesan Sekarang'}</span>
        </button>
      </div>

      {/* POP-UP MODAL BOOKING FLOW */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/30 mb-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'EN' ? 'Zero Deposit Required' : lang === 'ZH' ? '免定金预订' : 'Bebas Deposit / Tanpa DP'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {lang === 'EN'
                    ? 'Secure Your Private Car Charter'
                    : lang === 'ZH'
                    ? '预订拉布安巴佐专属包车'
                    : 'Pesan Private Car Charter'}
                </h3>
                <p className="text-slate-400 text-xs mt-1 font-medium">
                  {lang === 'EN'
                    ? 'Fill in the fields below to lock your car & driver instantly.'
                    : lang === 'ZH'
                    ? '请填写下方信息即可立即锁定车辆与司机。'
                    : 'Lengkapi formulir di bawah ini untuk mengamankan unit mobil.'}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleModalSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Vehicle Selection - Unselected by Default */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'SELECT VEHICLE / PACKAGE *' : lang === 'ZH' ? '选择包车方案 *' : 'PILIH ARMADA / PAKET *'}
                </label>
                <select
                  required
                  value={vehiclePackage}
                  onChange={(e) => setVehiclePackage(e.target.value)}
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    vehiclePackage ? 'text-slate-900 border-teal-500/50 bg-teal-50/20' : 'text-slate-400 border-stone-200'
                  }`}
                >
                  <option value="" disabled>
                    {lang === 'EN' ? '-- Select Vehicle / Package --' : lang === 'ZH' ? '-- 请选择车型方案 --' : '-- Pilih Armada / Paket --'}
                  </option>
                  <option value="Standard 7-Seater MPV (Toyota Rush / Calya / Avanza) — Rp 1.200.000">
                    Standard 7-Seater MPV (Toyota Rush / Calya / Avanza) — Rp 1.200.000 / day
                  </option>
                  <option value="Toyota HiAce Commuter (Up to 14 Pax) — Custom Rate">
                    Toyota HiAce Commuter (Up to 14 Pax) — Custom Overland Rate
                  </option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'EN' ? 'FULL NAME *' : lang === 'ZH' ? '姓名 *' : 'NAMA LENGKAP *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'EN' ? 'WHATSAPP / PHONE *' : lang === 'ZH' ? '电话 / 微信 *' : 'NO WA / TELEPON *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 / +1 / +61 xxx xxx"
                    className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'EMAIL ADDRESS (OPTIONAL)' : lang === 'ZH' ? '电子邮箱 (选填)' : 'EMAIL (OPSIONAL)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Tour Date & Pick-up Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'EN' ? 'TOUR DATE *' : lang === 'ZH' ? '用车日期 *' : 'TANGGAL TOUR *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'EN' ? 'PICK-UP TIME *' : lang === 'ZH' ? '接送时间 *' : 'JAM PENJEMPUTAN *'}
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="08:30 AM (Recommended)">08:30 AM (Recommended)</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="Custom Time (Flight Arrival)">Custom Time (Flight Arrival)</option>
                  </select>
                </div>
              </div>

              {/* Pick-up Location */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'PICK-UP LOCATION *' : lang === 'ZH' ? '接送地点 *' : 'LOKASI PENJEMPUTAN *'}
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g., Ayana Komodo Resort or LBJ Airport"
                  className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* MANDATORY VERIFICATION FIELD: Flight Number or Hotel Confirmation Name */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-1.5">
                <label className="block text-[11px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>
                    {lang === 'EN'
                      ? 'FLIGHT NUMBER OR HOTEL CONFIRMATION NAME *'
                      : lang === 'ZH'
                      ? '航班号或酒店预订姓名 (用于免定金验证) *'
                      : 'NO. PENERBANGAN ATAU NAMA HOTEL *'}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={verificationInfo}
                  onChange={(e) => setVerificationInfo(e.target.value)}
                  placeholder={
                    lang === 'EN'
                      ? 'e.g., Batik Air ID 6522 OR Ayana Resort booking under Sarah'
                      : lang === 'ZH'
                      ? '例：Batik Air ID 6522 或 阿雅娜酒店预订人 Sarah'
                      : 'contoh: Batik Air ID 6522 / Booking Hotel Ayana a.n. Sarah'
                  }
                  className="w-full bg-white border border-amber-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[10px] text-amber-800/90 font-medium leading-normal">
                  {lang === 'EN'
                    ? '💡 Used solely to verify your trip details and hold your private vehicle without requiring a cash deposit.'
                    : lang === 'ZH'
                    ? '💡 仅用于核实您的行程并锁定车辆，无需预付任何押金。'
                    : '💡 Digunakan untuk verifikasi jadwal kedatangan & mengunci armada tanpa perlu mentransfer DP.'}
                </p>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'EN' ? 'SPECIAL REQUESTS (OPTIONAL)' : lang === 'ZH' ? '额外需求 (选填)' : 'CATATAN TAMBAHAN (OPSIONAL)'}
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Want to add Gua Rangko stop, child seat needed..."
                  className="w-full bg-slate-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isFormValid
                      ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/25 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300/80'
                  }`}
                >
                  <MessageCircle className={`w-4 h-4 ${isFormValid ? 'fill-white text-teal-600' : 'text-slate-400'}`} />
                  <span>
                    {lang === 'EN'
                      ? 'Secure Your Car Now via WhatsApp'
                      : lang === 'ZH'
                      ? '通过 WhatsApp 确认包车'
                      : 'Pesan Mobil Private Sekarang via WA'}
                  </span>
                </button>
                {!isFormValid && (
                  <p className="text-[10px] text-amber-700 text-center font-semibold mt-2">
                    {lang === 'EN'
                      ? 'Please complete all required fields (*), including vehicle & flight/hotel verification info.'
                      : lang === 'ZH'
                      ? '请填写所有必填项 (*)，包括车型方案与航班/酒店验证信息。'
                      : 'Mohon lengkapi semua kolom wajib (*), termasuk pilihan armada & verifikasi penerbangan/hotel.'}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
