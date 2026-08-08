import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { BOAT_CHARTERS } from '../data/boatsData';
import { SPEEDBOAT_HERO, SPEEDBOAT_BANNER, SPEEDBOAT_DESTINATIONS } from '../data/images';
import { SpeedboatBookingModal } from '../components/SpeedboatBookingModal';
import {
  Ship,
  Anchor,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Compass,
  HelpCircle,
  XCircle,
  AlertCircle,
  Users,
  Wind,
} from 'lucide-react';

interface BoatsPageProps {
  lang: Language;
}

// 6 Iconic Destinations for 1-Day Komodo Tour with Explicit Activities
const KOMODO_DESTINATIONS = [
  {
    stop: 'Stop #1',
    name: 'Padar Island',
    time: '~45-50 Mins',
    category: 'SUMMIT TREKKING',
    categoryID: 'TREKKING PUNCAK',
    categoryZH: '山顶徒步',
    activity: 'Trek ~818 stairs to summit for iconic 3-color bay panoramic view',
    activityID: 'Trekking ~818 anak tangga ke puncak untuk foto panoramik 3 teluk',
    activityZH: '攀登约818级台阶登顶，俯瞰三大梦幻海湾绝美全景',
    image: SPEEDBOAT_DESTINATIONS.padar,
  },
  {
    stop: 'Stop #2',
    name: 'Pink Beach',
    time: '~15 Mins',
    category: 'NATURAL PINK SAND',
    categoryID: 'PASIR PINK ALAMI',
    categoryZH: '天然粉红沙滩',
    activity: 'Swim, snorkel & take aesthetic photos on natural pink coral sand beach',
    activityID: 'Berenang, snorkeling & foto estetik di pantai pasir pink alami',
    activityZH: '漫步天然粉红珊瑚沙滩，游泳浮潜并拍摄大片',
    image: SPEEDBOAT_DESTINATIONS.pinkBeach,
  },
  {
    stop: 'Stop #3',
    name: 'Komodo Island',
    time: '~20 Mins',
    category: 'KOMODO DRAGONS WALK',
    categoryID: 'JELAJAH NAGA KOMODO',
    categoryZH: '科莫多巨蜥徒步',
    activity: 'Ranger-guided soft trekking to observe ancient Komodo Dragons up close',
    activityID: 'Trekking didampingi Ranger melihat Naga Komodo purba',
    activityZH: '在护林员带领下徒步，近距离观察古老科莫多巨蜥',
    image: SPEEDBOAT_DESTINATIONS.komodo,
  },
  {
    stop: 'Stop #4',
    name: 'Taka Makassar',
    time: '~25 Mins',
    category: 'CRESCENT SANDBANK',
    categoryID: 'BUKIT PASIR PUILAH',
    categoryZH: '新月沙洲',
    activity: 'Swim & drone photo on a unique crescent white sandbank in turquoise water',
    activityID: 'Foto drone & berenang di bukit pasir putih bulan sabit di tengah laut',
    activityZH: '在蒂芙尼蓝海央的弯月形白沙洲游泳并拍摄航拍视角',
    image: SPEEDBOAT_DESTINATIONS.takaMakassar,
  },
  {
    stop: 'Stop #5',
    name: 'Manta Point',
    time: '~10 Mins',
    category: 'MANTA RAY SNORKELING',
    categoryID: 'SNORKELING PARI MANTA',
    categoryZH: '魔鬼鱼浮潜',
    activity: 'Drift snorkeling in open sea alongside giant wild Manta Rays feeding',
    activityID: 'Snorkeling drift di laut lepas berenang bersama Ikan Manta Pari raksasa',
    activityZH: '开阔海域漂流浮潜，偶遇巨大的野生魔鬼鱼（Manta Rays）',
    image: SPEEDBOAT_DESTINATIONS.mantaPoint,
  },
  {
    stop: 'Stop #6',
    name: 'Kanawa Island',
    time: '~35 Mins',
    category: 'CORAL GARDEN & NEMO',
    categoryID: 'TAMAN KARANG & NEMO',
    categoryZH: '珊瑚花园与小丑鱼',
    activity: 'Snorkel shallow coral reefs, feed Clownfish (Nemo) & relax at jetty pier',
    activityID: 'Snorkeling taman karang, beri makan ikan Nemo & santai di dermaga kayu',
    activityZH: '在浅水珊瑚花园浮潜喂小丑鱼，并在木质码头度过悠闲时光',
    image: SPEEDBOAT_DESTINATIONS.kanawa,
  },
];

// Itinerary Schedule Data (Multi-language)
const ITINERARY_FULLDAY = [
  {
    time: '06:00 – 06:30',
    title: {
      EN: 'Hotel Pick-Up & Pier Briefing',
      ID: 'Penjemputan Hotel & Briefing Dermaga',
      ZH: '酒店专车接送与码头讲解',
    },
    desc: {
      EN: 'Free private pickup from your hotel or resort in Labuan Bajo directly to the harbor pier. Meet your professional tour team & licensed guide for safety briefing and gear check.',
      ID: 'Penjemputan gratis dari hotel/resort di Labuan Bajo menuju dermaga utama. Briefing keselamatan dan fitting peralatan kelengkapan oleh kapten & guide profesional.',
      ZH: '专车从酒店或度假村接送至主码头。与专业船长和双语导游会合，进行行前安全讲解并领取浮潜装备。',
    },
  },
  {
    time: '07:00 – 08:00',
    title: {
      EN: 'Express Cruise to Padar Island',
      ID: 'Pelayaran Cepat ke Pulau Padar',
      ZH: '高速航行前往帕达尔岛',
    },
    desc: {
      EN: 'High-speed ocean cruise aboard our twin-engine speedboat across the Komodo archipelago (~45–50 mins). Enjoy exotic island panoramas, ocean breeze, and mineral water.',
      ID: 'Pelayaran cepat menyeberangi lautan Komodo (~45-50 menit) menggunakan speedboat mesin twin. Nikmati pemandangan gugusan pulau eksotis dan udara laut segar.',
      ZH: '乘坐强劲双发快艇穿梭于科莫多海域（约 45-50 分钟）。沿途尽情领略科莫多群岛壮丽的大海与岛屿风光。',
    },
  },
  {
    time: '08:00 – 10:00',
    title: {
      EN: 'Padar Island Summit Trekking',
      ID: 'Trekking Puncak Pulau Padar',
      ZH: '攀登帕达尔岛山顶俯瞰全景',
    },
    desc: {
      EN: 'Soft trek up ~818 wooden stairs to the iconic Padar Island summit. Capture world-famous photos overlooking three natural crescent bays with white, pink, and black volcanic sand.',
      ID: 'Trekking ~818 anak tangga kayu menuju puncak Pulau Padar. Foto pemandangan spektakuler 3 teluk berkontras warna pasir alami (pasir putih, pink, dan pasir vulkanik hitam).',
      ZH: '攀登约 818 级石阶登上山顶。俯瞰世界级名胜奇观——融合白沙、粉红沙与黑色火山沙的三色海湾美景。',
    },
  },
  {
    time: '10:00 – 11:15',
    title: {
      EN: 'Pink Beach Relaxation & Swim',
      ID: 'Bersantai & Berenang di Pink Beach',
      ZH: '粉红沙滩畅游与拍照打卡',
    },
    desc: {
      EN: '15-min cruise to Pink Beach. Walk on soft natural pink coral sand, swim in calm turquoise waters, or take aesthetic photos along the vibrant coastline.',
      ID: 'Pelayaran 15 menit ke Pink Beach. Bersantai di atas pasir berwarna pink alami dari serpihan karang merah, berenang di air jernih, dan berfoto estetik di tepi pantai.',
      ZH: '15分钟航程抵达浪漫粉红沙滩。漫步于细软的天然粉色珊瑚沙滩上，在清澈的碧蓝海水中游泳并拍照打卡。',
    },
  },
  {
    time: '11:30 – 13:00',
    title: {
      EN: 'Komodo Dragon Trekking & Lunch',
      ID: 'Trekking Naga Komodo & Makan Siang',
      ZH: '科莫多巨蜥徒步与精美午餐',
    },
    desc: {
      EN: 'Guided ranger trek on Komodo Island to spot the legendary dragon up close in its natural wild habitat. Followed by a fresh gourmet lunch box served onboard or on the island.',
      ID: 'Trekking didampingi Ranger resmi Taman Nasional Komodo untuk melihat Naga Komodo purba secara dekat, dilanjutkan makan siang lezat (lunch box) segar.',
      ZH: '在科莫多国家公园护林员的专业带领下，近距离寻找并观赏野生科莫多巨蜥，随后享用丰盛定制午餐餐盒。',
    },
  },
  {
    time: '13:30 – 14:15',
    title: {
      EN: 'Taka Makassar Crescent Sandbank',
      ID: 'Bukit Pasir Bulan Sabit Taka Makassar',
      ZH: 'Taka Makassar 弯月白沙洲',
    },
    desc: {
      EN: 'Step onto a dreamlike crescent white sandbank surrounded by crystal-clear shallow turquoise ocean. Perfect spot for drone footage, swimming, and soft reef snorkeling.',
      ID: 'Singgah di pulau pasir putih berbentuk bulan sabit yang mengapung di tengah laut jernih. Lokasi terbaik untuk foto drone, berenang, dan snorkeling karang dangkal.',
      ZH: '登上浮现于蒂芙尼蓝海央的月牙形白沙洲。这里是拍摄航拍无人机大片、游泳与浅水浮潜的绝佳胜地。',
    },
  },
  {
    time: '14:15 – 15:00',
    title: {
      EN: 'Manta Point Snorkeling Drift',
      ID: 'Snorkeling Drift Manta Point',
      ZH: 'Manta Point 顺流浮潜同游',
    },
    desc: {
      EN: 'Drift-snorkeling in open waters with wild Manta Rays. Swimmers can glide alongside giant, friendly mantas with up to 3–4 meter wingspans as they feed gracefully in currents.',
      ID: 'Snorkeling drift di laut lepas bersama Manta Ray (Pari Raksasa) liar. Pengalaman tak terlupakan berenang berdampingan dengan Manta bersayap hingga 3-4 meter.',
      ZH: '在开阔海域体验顺流浮潜，与展翅达 3-4 米的巨型野生魔鬼鱼（Manta）在清澈海水中优雅同游。',
    },
  },
  {
    time: '15:15 – 16:15',
    title: {
      EN: 'Kanawa Island Coral Garden & Nemo',
      ID: 'Taman Karang & Ikan Nemo Pulau Kanawa',
      ZH: '卡纳瓦岛珊瑚花园与小丑鱼',
    },
    desc: {
      EN: 'Snorkel vibrant shallow reef gardens teeming with colorful tropical fish and clownfish (Nemo). Relax with cold drinks at the iconic wooden pier before heading home.',
      ID: 'Snorkeling di taman karang dangkal penuh warna yang dihuni ikan tropis & Ikan Nemo. Bersantai menikmati kelapa muda atau minuman segar di dermaga kayu ikonik.',
      ZH: '在色彩斑斓的浅海珊瑚花园浮潜，同小丑鱼（Nemo）近距离互动，并在经典木质码头享受悠闲时光。',
    },
  },
  {
    time: '16:15 – 17:00',
    title: {
      EN: 'Return Cruise & Hotel Drop-Off',
      ID: 'Pelayaran Pulang & Pengantaran Hotel',
      ZH: '返航与专车送回酒店/机场',
    },
    desc: {
      EN: 'Smooth return cruise back to Labuan Bajo harbor while enjoying afternoon sea breezes. Private vehicle awaits at the pier to transport you safely back to your hotel or airport.',
      ID: 'Pelayaran santai kembali ke dermaga Labuan Bajo menikmati angin sore. Mobil jemputan privat telah bersiap di dermaga untuk mengantar Anda kembali ke hotel.',
      ZH: '乘快艇舒适返航至主码头。专属专车已在码头恭候，安全送您返回酒店、度假村或科莫多机场。',
    },
  },
];

const ITINERARY_SUNSET = [
  {
    time: '12:00 – 13:30',
    title: {
      EN: 'Hotel Pick-Up & Pier Briefing',
      ID: 'Penjemputan Hotel & Briefing Dermaga',
      ZH: '酒店专车接送与行前讲解',
    },
    desc: {
      EN: 'Afternoon pickup from your hotel or resort directly to the harbor. Receive a safety orientation, fit your snorkel gear, and board your private speedboat.',
      ID: 'Penjemputan siang hari dari hotel menuju dermaga utama. Fitting alat snorkeling, briefing singkat keselamatan, dan persiapan naik ke atas speedboat.',
      ZH: '午后专车从酒店接送至码头。试穿浮潜装备、听取安全讲解，并登上专属快艇。',
    },
  },
  {
    time: '13:30 – 14:30',
    title: {
      EN: 'Kelor Island Hike & Beach',
      ID: 'Pulau Kelor: Hike & Bersantai Pantai',
      ZH: '克洛尔岛 (Kelor Island) 徒步与海滩',
    },
    desc: {
      EN: 'Scenic 15-min trek up Kelor Hill for sweeping 360-degree views of surrounding islands. Enjoy soft white sand beaches, clear swimming waters, and stunning photo ops.',
      ID: 'Trekking 15 menit ke puncak Bukit Kelor untuk pemandangan panorama 360 derajat. Berenang dan bersantai di pantai pasir putih nan lembut.',
      ZH: '徒步 15 分钟登顶克洛尔山，俯瞰 360 度海景与周边岛屿。在白沙滩上自由游泳与休闲拍摄。',
    },
  },
  {
    time: '14:45 – 15:45',
    title: {
      EN: 'Manjarite Island Calm Snorkeling',
      ID: 'Pulau Manjarite: Snorkeling Laut Tenang',
      ZH: '曼加里特岛 (Manjarite Island) 平静浮潜',
    },
    desc: {
      EN: 'Snorkel in super calm, crystal-clear shallow waters ideal for beginners and families. Discover lush coral reefs, sea turtles, and colorful tropical marine life along the quiet bay.',
      ID: 'Snorkeling di laut tenang dan super jernih, sangat aman untuk pemula & keluarga. Jelajahi terumbu karang subur dan keanekaragaman ikan tropis.',
      ZH: '在极其平静透明的浅海中体验浮潜，非常适合初学者与家庭。探索茂盛的珊瑚礁与丰富的海水热带鱼群。',
    },
  },
  {
    time: '17:15 – 18:30',
    title: {
      EN: 'Kalong Island Sunset & Flying Foxes',
      ID: 'Sunset Pulau Kalong & Migrasi Kelelawar',
      ZH: '卡隆岛蝙蝠日落奇观 (Kalong Island)',
    },
    desc: {
      EN: 'Anchor near mangrove-covered Kalong Island during golden hour. Witness millions of giant flying fox bats emerge from mangroves and fly into the glowing orange sunset sky.',
      ID: 'Bersandar di perairan Pulau Kalong saat golden hour sunset. Saksikan jutaan kelelawar kalong raksasa terbang keluar dari hutan bakau menutupi langit senja.',
      ZH: '傍晚快艇停泊于卡隆岛红树林旁。在金色晚霞下，亲眼目睹数以百万计的果蝠出巢翱翔天际的震撼天象。',
    },
  },
  {
    time: '18:30 – 20:00',
    title: {
      EN: 'Starlight Return Cruise & Drop-Off',
      ID: 'Pelayaran Malam & Pengantaran Hotel',
      ZH: '夜航返航与专车送回酒店',
    },
    desc: {
      EN: 'Relax on the peaceful night cruise back to Labuan Bajo under star-filled skies. Private driver welcomes you at the pier for a comfortable drop-off at your hotel or seafood restaurant.',
      ID: 'Pelayaran malam santai kembali ke dermaga Labuan Bajo di bawah langit berbintang. Driver privat mengantar Anda kembali ke hotel atau restoran pilihan.',
      ZH: '乘船夜航返回拉布安巴佐，享受夜色与星空。码头专车将您安全送回酒店或指定海鲜餐厅。',
    },
  },
];

const FAQ_ITEMS = [
  {
    q: {
      EN: 'Q: What time does the 1-day speedboat tour start and finish?',
      ID: 'Q: Jam berapa tur speedboat 1 hari dimulai dan selesai?',
      ZH: '问：快艇出海一日游的起止时间是什么？',
    },
    a: {
      EN: 'Pick-up starts at 05:30 AM from your hotel in Labuan Bajo, boat departs marina at 06:00 AM, and returns around 16:30 - 17:00 PM.',
      ID: 'Penjemputan hotel dimulai pukul 05:30 WITA, kapal berangkat dari dermaga pukul 06:00 WITA, dan kembali sekitar pukul 16:30 - 17:00 WITA.',
      ZH: '早上 05:30 开始专车到酒店接人，快艇于 06:00 从码头出发，下午约 16:30 - 17:00 返回码头。',
    },
  },
  {
    q: {
      EN: 'Q: Are national park entrance tickets included?',
      ID: 'Q: Apakah tiket masuk Taman Nasional Komodo sudah termasuk?',
      ZH: '问：费用是否包含科莫多国家公园门票？',
    },
    a: {
      EN: 'National park entrance fees, ranger guide fees & local retributions are paid directly in cash at the official park office (~Rp 350,000/person for Indonesian citizens/WNI, ~Rp 650,000/person for foreign tourists/WNA).',
      ID: 'Tiket masuk TNK, biaya pemandu ranger & retribusi daerah dibayarkan tunai langsung di kantor lokasi TNK (~Rp 350.000/orang untuk WNI, ~Rp 650.000/orang untuk WNA).',
      ZH: '国家公园门票、护林员引导费与地方规费需在公园入口处以印尼盾现金支付（印尼籍 WNI 约 35万印尼盾/人，外籍游客 WNA 约 65万印尼盾/人）。',
    },
  },
  {
    q: {
      EN: 'Q: Is hotel pickup and drop-off included?',
      ID: 'Q: Apakah antar-jemput hotel sudah termasuk?',
      ZH: '问：费用是否包含酒店接送服务？',
    },
    a: {
      EN: 'Yes! Free roundtrip transfer between your hotel/resort in Labuan Bajo town or Labuan Bajo Airport and the speedboat marina is included in all packages.',
      ID: 'Ya! Gratis pengantaran dan penjemputan pulang-pergi antara hotel/resort di Labuan Bajo / Bandara Komodo dan dermaga speedboat.',
      ZH: '是的！包含拉布安巴佐镇上酒店/度假村或科莫多机场（LBJ）与快艇码头之间的免费往返接送。',
    },
  },
];

export const BoatsPage: React.FC<BoatsPageProps> = ({ lang }) => {
  const [activeItineraryTab, setActiveItineraryTab] = useState<'fullday' | 'sunset'>('fullday');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalBoatId, setModalBoatId] = useState<string>('open-speedboat-daytrip');
  const [selectedDestIdx, setSelectedDestIdx] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto advance destination slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedDestIdx((prev) => (prev + 1) % KOMODO_DESTINATIONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenBookingModal = (boatId?: string) => {
    if (boatId) setModalBoatId(boatId);
    setIsModalOpen(true);
  };

  const pageTitle =
    lang === 'EN'
      ? 'Komodo Island Speedboat Day Tour & Private Charter | HelloBajo'
      : lang === 'ZH'
      ? '科莫多岛出海一日游与快艇包船 | HelloBajo'
      : 'Sewa Speedboat Labuan Bajo — Open & Private Komodo Tour';

  const pageDescription =
    lang === 'EN'
      ? 'Book Komodo 6-destination speedboat day tours and private charter in Labuan Bajo. Visit Padar Island, Pink Beach, Komodo Dragons, and Manta Point.'
      : lang === 'ZH'
      ? '预订科莫多 6 大经典景点高速快艇一日游与私人包船。打卡帕达尔山顶、粉红沙滩、科莫多巨蜥与魔鬼鱼浮潜。'
      : 'Sewa speedboat Komodo 1 hari 6 destinasi & private charter. Jelajah Pulau Padar, Pink Beach, Komodo, Taka Makassar, & Manta Point.';

  return (
    <div className="bg-[#faf8f5] text-slate-800 pb-16">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://hellobajo.com/boats"
      />

      {/* Speedboat Booking Modal */}
      <SpeedboatBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
        initialBoatId={modalBoatId}
      />

      {/* Sticky Sub-Header Navigation Bar */}
      <div className="bg-white border-b border-stone-200/80 sticky top-16 sm:top-20 z-40 backdrop-blur-md bg-white/95 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start sm:justify-center h-12 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold text-slate-600 space-x-6 sm:space-x-10">
          <a
            href="#hero"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5"
          >
            <Ship className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === 'EN' ? 'Private Charter' : lang === 'ZH' ? '包船服务' : 'Private Charter'}</span>
          </a>
          <a
            href="#why-speedboat"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'EN' ? 'Why Speedboat?' : lang === 'ZH' ? '为什么选快艇' : 'Keunggulan Speedboat'}</span>
          </a>
          <a
            href="#fleet"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Boat Fleet & Rates' : lang === 'ZH' ? '船型与价格' : 'Pilihan Kapal'}
          </a>
          <a
            href="#inclusions"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Inclusions & Policies' : lang === 'ZH' ? '包含与条款' : 'Fasilitas & Syarat'}
          </a>
          <a
            href="#itinerary"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? '1-Day Schedule' : lang === 'ZH' ? '行程时间表' : 'Jadwal Itinerary'}
          </a>
          <button
            onClick={() => handleOpenBookingModal()}
            className="text-teal-600 hover:text-teal-700 font-extrabold transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            {lang === 'EN' ? 'Book Speedboat' : lang === 'ZH' ? '预订出海' : 'Book Speedboat'}
          </button>
          <a
            href="#faq"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            FAQ
          </a>
        </div>
      </div>

      {/* 1. HERO BANNER SECTION WITH CLEAN & MODERN LUXURY RESORT STYLE */}
      <section id="hero" className="relative bg-slate-900 text-white py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-20 sm:scroll-mt-24">
        {/* Bright Tropical Sea Background Image Overlay & Vibrant Tropical Glows */}
        <div className="absolute inset-0">
          <img src={SPEEDBOAT_BANNER} alt="Komodo boat charter" loading="eager" decoding="async" className="w-full h-full object-cover brightness-[0.88] contrast-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/35 to-sky-950/20" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT COLUMN: SPACIOUS, CLEAN RESORT-STYLE COPYWRITING */}
            <div className="lg:col-span-6 space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/25 border border-teal-200/50 text-teal-100 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm">
                <Ship className="w-4 h-4 text-teal-300 shrink-0" />
                <span>
                  {lang === 'EN'
                    ? 'OFFICIAL SPEEDBOAT CHARTER LABUAN BAJO'
                    : lang === 'ZH'
                    ? '拉布安巴佐官方快艇包船'
                    : 'OFFICIAL SPEEDBOAT CHARTER LABUAN BAJO'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
                {lang === 'EN'
                  ? 'Private & Open Komodo Speedboat Tour'
                  : lang === 'ZH'
                  ? '科莫多群岛私人与拼船出海快艇'
                  : 'Sewa Speedboat Private & Open Tour Komodo'}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-xl font-normal drop-shadow-sm">
                {lang === 'EN'
                  ? 'Explore 6 iconic destinations in Komodo National Park in 1 day. Choose between comfortable open-air breeze boats or deluxe full-AC cabins.'
                  : lang === 'ZH'
                  ? '一天打卡科莫多国家公园 6 大标志性景致。可选清爽敞篷风情快艇或全空调豪华舱出海。'
                  : 'Jelajah 6 destinasi ikonik Taman Nasional Komodo dalam 1 hari. Bebas pilih speedboat kabin AC mewah atau open-air yang segar.'}
              </p>

              {/* Feature Tags / Pills - Clean Horizontal Layout with Generous Spacing */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 bg-amber-400/25 border border-amber-200/40 px-3.5 py-2 rounded-full text-amber-100 text-xs font-bold backdrop-blur-md shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>
                    {lang === 'EN' ? '10% Deposit Locks Date' : lang === 'ZH' ? '10% 订金锁定船期' : 'DP 10% Amankan Kapal'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-teal-400/25 border border-teal-200/40 px-3.5 py-2 rounded-full text-teal-100 text-xs font-bold backdrop-blur-md shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                  <span>
                    {lang === 'EN' ? '100% Departure Guarantee' : lang === 'ZH' ? '100% 保证按时出海' : '100% Garansi Berangkat'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 border border-white/35 px-3.5 py-2 rounded-full text-white text-xs font-medium backdrop-blur-md shadow-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                  <span>
                    {lang === 'EN' ? 'Free Hotel Transfer' : lang === 'ZH' ? '含免费酒店接送' : 'Gratis Antar-Jemput Hotel'}
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenBookingModal()}
                  className="px-8 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 active:bg-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-teal-500/20 hover:shadow-teal-400/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Ship className="w-4.5 h-4.5 text-slate-950" />
                  <span>{lang === 'EN' ? 'Book Speedboat Now' : lang === 'ZH' ? '立即预订快艇' : 'Pesan Speedboat Sekarang'}</span>
                </button>
                <a
                  href="#fleet"
                  className="px-7 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/35 backdrop-blur-md transition-all duration-200 flex items-center gap-2 shadow-md transform hover:-translate-y-0.5"
                >
                  <span>{lang === 'EN' ? 'View Fleet & Rates' : lang === 'ZH' ? '查看船型与价目' : 'Lihat Kapal & Harga'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-200" />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: ELEGANT LARGE DESTINATION GALLERY SHOWCASE */}
            <div className="lg:col-span-6 w-full">
              <div className="relative w-full rounded-2xl sm:rounded-3xl border border-white/40 bg-white/15 shadow-2xl p-2 sm:p-3 backdrop-blur-xl overflow-hidden">
                
                {/* Featured Active Destination Photo Card */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-sky-950/30 shadow-xl group">
                  <motion.img
                    key={selectedDestIdx}
                    initial={{ opacity: 0.88, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={KOMODO_DESTINATIONS[selectedDestIdx].image}
                    alt={KOMODO_DESTINATIONS[selectedDestIdx].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Header Floating Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
                    <span className="bg-teal-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                      {KOMODO_DESTINATIONS[selectedDestIdx].stop}
                    </span>
                    <span className="bg-slate-950/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                      <Clock className="w-3.5 h-3.5 text-teal-300" />
                      <span>{KOMODO_DESTINATIONS[selectedDestIdx].time}</span>
                    </span>
                  </div>

                  {/* Previous / Next Arrow Overlay Buttons */}
                  <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <button
                      onClick={() => setSelectedDestIdx((prev) => (prev === 0 ? KOMODO_DESTINATIONS.length - 1 : prev - 1))}
                      className="w-10 h-10 rounded-full bg-slate-950/70 hover:bg-teal-400 text-white hover:text-slate-950 border border-white/30 flex items-center justify-center transition-all pointer-events-auto cursor-pointer shadow-xl font-black text-lg"
                      aria-label="Previous destination"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setSelectedDestIdx((prev) => (prev === KOMODO_DESTINATIONS.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 rounded-full bg-slate-950/70 hover:bg-teal-400 text-white hover:text-slate-950 border border-white/30 flex items-center justify-center transition-all pointer-events-auto cursor-pointer shadow-xl font-black text-lg"
                      aria-label="Next destination"
                    >
                      ›
                    </button>
                  </div>

                  {/* Bottom Information Overlay - Sleek Dark Gradient (Does Not Block Image) */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent text-white space-y-1 z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-black text-teal-300 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
                        {lang === 'EN'
                          ? KOMODO_DESTINATIONS[selectedDestIdx].category
                          : lang === 'ZH'
                          ? KOMODO_DESTINATIONS[selectedDestIdx].categoryZH
                          : KOMODO_DESTINATIONS[selectedDestIdx].categoryID}
                      </span>
                      <span className="text-[11px] font-bold text-slate-300 bg-slate-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                        {selectedDestIdx + 1} / {KOMODO_DESTINATIONS.length}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-xs">
                      {KOMODO_DESTINATIONS[selectedDestIdx].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed line-clamp-2 drop-shadow-xs max-w-xl">
                      {lang === 'EN'
                        ? KOMODO_DESTINATIONS[selectedDestIdx].activity
                        : lang === 'ZH'
                        ? KOMODO_DESTINATIONS[selectedDestIdx].activityZH
                        : KOMODO_DESTINATIONS[selectedDestIdx].activityID}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1.5 WHY SPEEDBOAT SECTION (Minimalist, Clean & Light Layout) */}
      <section id="why-speedboat" className="bg-stone-50 py-12 sm:py-16 border-y border-stone-200/80 scroll-mt-20 sm:scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/90 text-teal-900 font-black text-xs uppercase tracking-wider border border-teal-200">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {lang === 'EN'
                  ? 'THE ULTIMATE TIME-SAVER'
                  : lang === 'ZH'
                  ? '高效省时首选'
                  : 'SOLUSI TERBAIK HEMAT WAKTU'}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'EN'
                ? 'Why Choose a Speedboat Day Tour Over a Phinisi Sailing Trip?'
                : lang === 'ZH'
                ? '为什么选择一日快艇出海而非传统 Phinisi 帆船航行？'
                : 'Mengapa Memilih Speedboat Day Tour Dibandingkan Phinisi Sailing Trip?'}
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              {lang === 'EN'
                ? 'Explore all 6 iconic Komodo National Park destinations in just 1 full day with maximum speed, 100% group privacy, and luxury resort comfort at night.'
                : lang === 'ZH'
                ? '仅需 1 天即可高效游览科莫多 6 大核心名胜，尊享高速航行、100% 私人包船与陆地奢华酒店宿享。'
                : 'Jelajah 6 destinasi ikonik Komodo dalam 1 hari penuh dengan kecepatan tinggi, privasi penuh, & kenyamanan tidur nyenyak di hotel darat.'}
            </p>
          </div>

          {/* 4 Clean Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* 1. Time Efficiency */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs hover:border-teal-400/80 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {lang === 'EN'
                    ? 'Time Efficiency (1-Day Complete)'
                    : lang === 'ZH'
                    ? '高效省时 (1天打卡满贯)'
                    : 'Efisiensi Waktu (Selesai 1 Hari)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {lang === 'EN'
                    ? 'Conquer all 6 iconic destinations in just 1 full day without taking long work leaves.'
                    : lang === 'ZH'
                    ? '无需请长假！仅需 1 天即可高效打卡帕达尔岛、粉红沙滩与科莫多 6 大名胜。'
                    : 'Bisa menaklukkan 6 destinasi ikonik Komodo hanya dalam 1 hari penuh tanpa cuti panjang.'}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-teal-700">⚡ Speedboat: 1 Hari</span>
                <span className="text-slate-400 font-medium line-through">Phinisi: 3D2N</span>
              </div>
            </div>

            {/* 2. Comfort & Real Bed at Night */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs hover:border-amber-400/80 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {lang === 'EN'
                    ? 'Comfort & Real Bed at Night'
                    : lang === 'ZH'
                    ? '舒适度假 & 陆地奢华床榻'
                    : 'Kenyamanan & Tidur Nyenyak'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {lang === 'EN'
                    ? 'Thrilling sea adventures by day, then return to sleep peacefully in your plush resort bed on land.'
                    : lang === 'ZH'
                    ? '白天尽情出海，夜晚返回陆地度假酒店的大床熟睡，告别船舱晃动与晕船。'
                    : 'Petualangan laut seharian penuh, dan kembali tidur nyenyak di hotel darat pada malam harinya.'}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-amber-800">🏨 Resort Bed on Land</span>
                <span className="text-slate-400 font-medium line-through">Swaying Cabin</span>
              </div>
            </div>

            {/* 3. Pure Privacy & Flexibility */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs hover:border-teal-400/80 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {lang === 'EN'
                    ? 'Pure Privacy & Flexibility'
                    : lang === 'ZH'
                    ? '纯粹私密 & 专属自由度'
                    : 'Privasi Murni & Fleksibel'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {lang === 'EN'
                    ? '100% Private Charter exclusively for your group. Custom departure timing and zero strangers.'
                    : lang === 'ZH'
                    ? '100% 专属私人包船，自定义出发时间与游玩节奏，无需与陌生人挤占空间。'
                    : '100% Private Charter untuk grup sendiri tanpa berbagi ruang dengan penumpang lain.'}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-teal-700">🚤 100% Private Charter</span>
                <span className="text-slate-400 font-medium line-through">Shared Tour</span>
              </div>
            </div>

            {/* 4. Cost-Effective for Groups */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs hover:border-emerald-400/80 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {lang === 'EN'
                    ? 'Cost-Effective for Groups'
                    : lang === 'ZH'
                    ? '团体/家庭高性价比'
                    : 'Hemat Biaya Rombongan'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {lang === 'EN'
                    ? 'The most economical option for families wanting full island coverage without multi-day rentals.'
                    : lang === 'ZH'
                    ? '家庭与朋友团体的理想之选，无需支付昂贵的按天/按夜船舱租金即可一次畅游。'
                    : 'Pilihan paling efisien untuk rombongan keluarga yang ingin eksplorasi maksimal.'}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-800">💰 Flat Family Charter</span>
                <span className="text-slate-400 font-medium line-through">Liveaboard Rates</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INCLUSIONS & POLICIES SECTION (Tour Facilities & Booking Terms) */}
      <section id="inclusions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20 sm:scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            {lang === 'EN' ? 'INCLUSIONS & POLICIES' : lang === 'ZH' ? '服务包含与条款' : 'FASILITAS & SYARAT'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'EN'
              ? 'Tour Facilities & Booking Terms'
              : lang === 'ZH'
              ? '出海设施包含与预订须知'
              : 'Fasilitas Tur & Ketentuan Pemesanan'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {lang === 'EN'
              ? 'Everything included in your Komodo speedboat day trip package.'
              : lang === 'ZH'
              ? '关于科莫多快艇出海一日游包含设施与费用的详细说明。'
              : 'Semua yang termasuk dalam paket tur speedboat Komodo 1 hari.'}
          </p>
        </div>

        {/* 2 Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT BOX: INCLUDED IN TOUR PACKAGE */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {lang === 'EN' ? 'Included in Tour Package' : lang === 'ZH' ? '费用包含项目' : 'Termasuk Dalam Paket'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {lang === 'EN' ? 'All-inclusive speedboat charter service' : lang === 'ZH' ? '全包式快艇出海服务' : 'Fasilitas lengkap tur speedboat'}
                </p>
              </div>
            </div>

            {/* Grid of included items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(lang === 'ZH'
                ? [
                    '快艇出海（可选空调舱 / 敞篷）',
                    '拉布安巴佐酒店 / 机场免费往返接送',
                    '精美盒饭午餐与下午茶点心',
                    '冰镇矿泉水、软饮与热带水果',
                    '经验丰富的当地英文导游与船员',
                    '全套浮潜设备（面镜与呼吸管）',
                    '救生衣全员配备',
                    '船上干净海洋卫生间',
                    '急救药箱 (P3K)',
                  ]
                : lang === 'EN'
                ? [
                    'Speedboat Charter (AC Cabin / Open Air option)',
                    'Hotel / Airport Pick Up & Drop Off (Round Trip)',
                    'Fresh Lunch Box & Afternoon Snacks',
                    'Chilled Mineral Water, Soft Drinks & Fruits',
                    'Experienced Local Tour Guide & Boat Crew (ABK)',
                    'Full Snorkeling Equipment (Mask & Snorkel)',
                    'Safety Life Jackets for all passengers',
                    'Clean Marine Toilet on Boat',
                    'First Aid Kit (P3K)',
                  ]
                : [
                    'Charter Speedboat (Pilihan Kabin AC / Open Air)',
                    'Antar - Jemput Hotel / Bandara (PP)',
                    'Makan Siang Box & Camilan Sore',
                    'Air Mineral Dingin, Minuman Ringan & Buah',
                    'Pemandu Wisata Lokal & ABK Kapal',
                    'Peralatan Snorkeling Lengkap (Masker & Snorkel)',
                    'Pelampung Keselamatan (Life Jacket)',
                    'Toilet Bersih di Atas Kapal',
                    'Kotak P3K Pertolongan Pertama',
                  ]
              ).map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100/80 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* 10% Deposit Guarantee Banner */}
            <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="text-xs text-teal-900 font-medium leading-relaxed">
                <strong className="font-extrabold block text-teal-950 mb-0.5">
                  {lang === 'EN' ? '10% Deposit Guarantee:' : lang === 'ZH' ? '10% 订金保障：' : 'Garansi DP 10%:'}
                </strong>
                {lang === 'EN'
                  ? 'Lock your speedboat schedule with just a 10% deposit. The remaining 90% balance can be settled on departure day at Labuan Bajo Harbor.'
                  : lang === 'ZH'
                  ? '仅需支付 10% 订金即可锁定快艇与座位。剩余 90% 余款可于出海当日在拉布安巴佐码头现金结清。'
                  : 'Kunci jadwal speedboat Anda cukup dengan DP 10%. Pelunasan sisa 90% dapat dibayarkan saat hari keberangkatan di Dermaga Labuan Bajo.'}
              </div>
            </div>
          </div>

          {/* RIGHT BOX: EXCLUDED & IMPORTANT NOTES */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {lang === 'EN' ? 'Excluded & Important Notes' : lang === 'ZH' ? '费用不含与说明' : 'Belum Termasuk & Catatan'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {lang === 'EN' ? 'Paid separately on site' : lang === 'ZH' ? '公园现场单独现金支付' : 'Dibayar terpisah di lokasi'}
                </p>
              </div>
            </div>

            {/* Red Excluded List */}
            <div className="space-y-3">
              {(lang === 'ZH'
                ? [
                    '科莫多国家公园门票与护林员引导费（公园门口现付现金）',
                    '船员、导游与护林员自愿小费',
                    '个人消费（泳衣、防晒霜、拖鞋、毛巾）',
                  ]
                : lang === 'EN'
                ? [
                    'Komodo National Park Entrance Tickets & Ranger Fees (Cash on site)',
                    'Tipping for Boat Crew, Tour Guide & Ranger (Voluntary)',
                    'Personal Expenses (Swimsuit, Sunblock, Sandals, Towels)',
                  ]
                : [
                    'Tiket Masuk TNK & Biaya Ranger (Dibayar tunai di lokasi)',
                    'Tip Sukarela untuk ABK, Tour Guide & Ranger',
                    'Pengeluaran Pribadi (Pakaian Renang, Sunblock, Handuk)',
                  ]
              ).map((ex) => (
                <div
                  key={ex}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{ex}</span>
                </div>
              ))}
            </div>

            {/* ACCURATE Komodo National Park Ticket Price Info Box */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 space-y-2 text-xs text-amber-900 font-medium">
              <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>
                  {lang === 'EN'
                    ? 'Komodo National Park Official Ticket Info:'
                    : lang === 'ZH'
                    ? '科莫多国家公园门票官方费率：'
                    : 'Info Resmi Tiket Masuk Taman Nasional Komodo:'}
                </span>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc font-semibold text-amber-900">
                <li>
                  {lang === 'EN'
                    ? 'Domestic Tourist (WNI): ~IDR 350,000 / person (includes TNK ticket, ranger guide fee & local retribution)'
                    : lang === 'ZH'
                    ? '印尼籍游客 (WNI)：约 35万印尼盾 / 人（含门票、护林员引导费与地方规费）'
                    : 'Wisatawan Domestik (WNI): ~Rp 350.000 / orang (termasuk tiket TNK, pemandu ranger & retribusi daerah)'}
                </li>
                <li>
                  {lang === 'EN'
                    ? 'Foreign Tourist (WNA): ~IDR 650,000 / person (includes TNK ticket, ranger guide fee & local retribution)'
                    : lang === 'ZH'
                    ? '外籍游客 (WNA)：约 65万印尼盾 / 人（含门票、护林员引导费与地方规费）'
                    : 'Wisatawan Manca (WNA): ~Rp 650.000 / orang (termasuk tiket TNK, pemandu ranger & retribusi daerah)'}
                </li>
              </ul>
              <p className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200/60">
                {lang === 'EN'
                  ? '*Paid directly in cash at official Komodo National Park Ranger office on site.'
                  : lang === 'ZH'
                  ? '*请于出海当日在科莫多国家公园护林员办公室以印尼盾现金现付。'
                  : '*Dibayarkan langsung tunai di kantor Ranger Resmi Taman Nasional Komodo di lokasi.'}
              </p>
            </div>

            {/* Direct Booking Button */}
            <button
              onClick={() => handleOpenBookingModal()}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ship className="w-4 h-4 text-teal-400" />
              <span>{lang === 'EN' ? 'Book Speedboat Now' : lang === 'ZH' ? '立即预订快艇' : 'Pesan Speedboat Sekarang'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. ITINERARY SCHEDULE SECTION (Concise & Interactive) */}
      <section id="itinerary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20 sm:scroll-mt-24">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-100">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200 mb-2">
                {lang === 'EN' ? 'ITINERARY SCHEDULE' : lang === 'ZH' ? '行程时间表' : 'JADWAL ITINERARY'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {lang === 'EN'
                  ? 'Speedboat Tour Schedule & Itinerary'
                  : lang === 'ZH'
                  ? '科莫多快艇出海一日游行程参考'
                  : 'Jadwal Itinerary Tur Speedboat Komodo'}
              </h2>
            </div>

            {/* Itinerary Tab Selector */}
            <div className="w-full sm:w-auto flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setActiveItineraryTab('fullday')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer text-center ${
                  activeItineraryTab === 'fullday'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'EN'
                  ? 'Fullday 6 Destinations (06:00 - 17:00)'
                  : lang === 'ZH'
                  ? '全天 6 大景点 (06:00 - 17:00)'
                  : 'Full Day 6 Destinasi (06:00 - 17:00)'}
              </button>
              <button
                onClick={() => setActiveItineraryTab('sunset')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer text-center ${
                  activeItineraryTab === 'sunset'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'EN'
                  ? 'Sunset Kalong Trip (12:00 - 20:00)'
                  : lang === 'ZH'
                  ? '半天卡隆日落游 (12:00 - 20:00)'
                  : 'Sunset Kalong Trip (12:00 - 20:00)'}
              </button>
            </div>
          </div>

          {/* Schedule Grid (Clean, Responsive Card Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {(activeItineraryTab === 'fullday' ? ITINERARY_FULLDAY : ITINERARY_SUNSET).map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-stone-50/90 border border-stone-200/80 hover:border-teal-400 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-2.5"
              >
                {/* Header Row: Time Badge & Stop Indicator */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-200/60 pb-2.5">
                  <div className="bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50/70 border border-teal-100 px-2.5 py-0.5 rounded-md">
                    {lang === 'EN' ? `Stop #${idx + 1}` : lang === 'ZH' ? `第 ${idx + 1} 站` : `Spot #${idx + 1}`}
                  </span>
                </div>

                {/* Content: Full width title & enriched description */}
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {item.title[lang]}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item.desc[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Private Charter Flexibility Footer Banner */}
          <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/80 flex items-center gap-3 text-xs sm:text-sm text-teal-950 font-bold">
            <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              {lang === 'EN'
                ? 'Private Charter Flexibility: Route sequence and duration at each destination can be customized with your Captain & Tour Guide upon request.'
                : lang === 'ZH'
                ? '包船灵活性：包船客户可根据个人喜好与船长及导游沟通协商，灵活调整打卡顺序与各景点的停留时间。'
                : 'Fleksibilitas Private Charter: Urutan rute & durasi waktu di setiap spot dapat disesuaikan dengan Kapten & Tour Guide sesuai permintaan Anda.'}
            </span>
          </div>

        </div>
      </section>

      {/* 4. SPEEDBOAT FLEET CARDS SECTION (Clean, Minimalist & Spacious) */}
      <section id="fleet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 sm:scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-widest border border-teal-200">
            {lang === 'EN' ? 'BOAT FLEET & RATES' : lang === 'ZH' ? '船型列表与价格' : 'PILIHAN KAPAL & HARGA'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'EN' ? 'Choose Your Sea Journey' : lang === 'ZH' ? '选择您的出海体验' : 'Pilihan Paket Kapal Komodo'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {lang === 'EN'
              ? 'High-speed day trips or luxury private charters for your Komodo adventure.'
              : lang === 'ZH'
              ? '提供高品质出海快艇与私人包船体验，带您安全无忧探索科莫多。'
              : 'Speedboat cepat 1 hari untuk open tour maupun private charter eksklusif.'}
          </p>
        </div>

        {/* Clean & Spacious Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {BOAT_CHARTERS.map((boat) => {
            const isDev = !!boat.isUnderDevelopment;
            return (
              <div
                key={boat.id}
                className={`bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
                  isDev ? 'opacity-90 bg-stone-50/50' : 'hover:shadow-xl hover:border-teal-300'
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={boat.image}
                      alt={boat.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isDev ? 'grayscale-[0.2]' : 'group-hover:scale-105'
                      }`}
                    />
                    {isDev ? (
                      <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider border border-amber-300">
                        {lang === 'EN' ? 'Coming Soon' : lang === 'ZH' ? '即将推出 (开发中)' : 'Coming Soon / Dalam Pengembangan'}
                      </span>
                    ) : boat.badge ? (
                      <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {boat.badge}
                      </span>
                    ) : null}

                    <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>{boat.duration}</span>
                    </span>
                  </div>

                  {/* Card Details - FULL TEXT without truncation */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="space-y-2">
                      <h3 className={`text-xl font-extrabold leading-snug transition-colors ${
                        isDev ? 'text-slate-700' : 'text-slate-900 group-hover:text-teal-600'
                      }`}>
                        {boat.name}
                      </h3>

                      {/* Clean Badges for Max Capacity & AC Status */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                          <Users className="w-3.5 h-3.5 text-teal-600" />
                          <span>{boat.maxCapacity}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg border border-teal-200">
                          <Wind className="w-3.5 h-3.5 text-teal-600" />
                          <span>{boat.acStatus}</span>
                        </span>
                      </div>
                    </div>

                    {/* Description - Full text display, NO line truncation */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {boat.description[lang]}
                    </p>

                    {/* Pricing Tiers or Coming Soon status */}
                    <div className="pt-4 border-t border-stone-100 space-y-2">
                      {isDev ? (
                        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-center">
                          <span className="text-xs font-extrabold text-amber-900 block">
                            {lang === 'EN'
                              ? 'Rates & Specs Coming Soon'
                              : lang === 'ZH'
                              ? '价格与规格即将发布'
                              : 'Tarif & Spesifikasi Segera Hadir'}
                          </span>
                          <span className="text-[11px] text-amber-700 font-medium">
                            {lang === 'EN'
                              ? 'Contact support for preliminary inquiry'
                              : lang === 'ZH'
                              ? '如需提前了解请联系客服'
                              : 'Hubungi CS untuk pertanyaan ketersediaan'}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            {lang === 'EN' ? 'Private Charter Rates:' : lang === 'ZH' ? '私密包船价格阶梯:' : 'Pilihan Harga Private Charter:'}
                          </span>
                          <div className="space-y-1.5">
                            {boat.priceTiers?.map((tier, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs font-bold bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-slate-800"
                              >
                                <span>{tier.label.split(':')[0]}</span>
                                <span className="text-teal-700 font-black">{tier.label.split(':')[1]}</span>
                              </div>
                            ))}
                            {boat.extraPaxPrice ? (
                              <div className="text-[11px] text-slate-500 font-semibold italic text-right pt-0.5">
                                *Extra pax: +IDR {boat.extraPaxPrice.toLocaleString('id-ID')}/pax
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button (Disabled if under development) */}
                <div className="p-6 pt-0 mt-2">
                  {isDev ? (
                    <button
                      disabled
                      className="w-full py-3.5 bg-slate-200 text-slate-400 font-extrabold text-xs sm:text-sm rounded-xl border border-slate-300 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Ship className="w-4 h-4 text-slate-400" />
                      <span>
                        {lang === 'EN'
                          ? 'Coming Soon (Under Construction)'
                          : lang === 'ZH'
                          ? '即将推出 (开发中)'
                          : 'Segera Hadir (Dalam Pembuatan)'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenBookingModal(boat.id)}
                      className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                    >
                      <Ship className="w-4 h-4 text-teal-200 group-hover/btn:scale-110 transition-transform" />
                      <span>{lang === 'EN' ? 'Reserve Private Charter' : lang === 'ZH' ? '预订包船出海' : 'Pesan Private Charter'}</span>
                      <ArrowRight className="w-4 h-4 text-teal-200 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20 sm:scroll-mt-24">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-teal-700 font-extrabold text-xs uppercase tracking-widest">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>{lang === 'EN' ? 'KOMODO BOAT TOUR FAQ' : lang === 'ZH' ? '科莫多出海常见问题' : 'FAQ TUR KAPAL KOMODO'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'EN' ? 'Frequently Asked Questions' : lang === 'ZH' ? '常见问题解答' : 'Pertanyaan Sering Diajukan'}
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <strong className="block text-slate-900 font-bold">
                  {item.q[lang]}
                </strong>
                <p className="text-slate-600">
                  {item.a[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
