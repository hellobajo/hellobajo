import { RIDING_DESTINATIONS, HERO_IMAGE, SPEEDBOAT_BANNER, CAR_CHARTER_BANNER } from './images';

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    EN: string;
    ID: string;
    ZH: string;
  };
  excerpt: {
    EN: string;
    ID: string;
    ZH: string;
  };
  category: 'Scooter Guide' | 'Travel Tips' | 'Island Tours' | 'Road Safety';
  author: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  content: {
    EN: {
      toc: string[];
      paragraphs: string[];
      calloutNote?: string;
    };
    ID: {
      toc: string[];
      paragraphs: string[];
      calloutNote?: string;
    };
    ZH: {
      toc: string[];
      paragraphs: string[];
      calloutNote?: string;
    };
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'labuan-bajo-scooter-rental-guide',
    category: 'Scooter Guide',
    author: 'HelloBajo Team',
    publishDate: 'August 1, 2026',
    readTime: '6 min read',
    coverImage: HERO_IMAGE,
    tags: ['Scooter Rental', 'Labuan Bajo', 'Airport Pickup', 'Travel Tips'],
    title: {
      EN: 'Complete Guide to Scooter Rental in Labuan Bajo: Prices, Airport Pickup & No-Deposit Tips',
      ID: 'Panduan Lengkap Sewa Motor di Labuan Bajo: Harga, Antar Bandara & Bebas Deposit',
      ZH: '拉布安巴佐摩托车租赁全指南：价格、机场接送与免押金技巧',
    },
    excerpt: {
      EN: 'Everything you need to know before renting an automatic scooter in Labuan Bajo — from fuel availability, road conditions, to airport delivery options.',
      ID: 'Semua hal yang perlu Anda ketahui sebelum menyewa motor di Labuan Bajo — mulai dari SPBU, kondisi jalan, hingga antar jemput ke Bandara Komodo.',
      ZH: '在拉布安巴佐租用自动挡摩托车前需了解的一切——从加油站分布、路况到科莫多机场专人送车服务。',
    },
    content: {
      EN: {
        toc: [
          'Why Renting a Scooter in Labuan Bajo is the Best Choice',
          'Scooter Fleet Breakdown: Honda Beat vs Scoopy vs NMAX',
          'How Airport Pickup (Komodo LBJ) Works',
          'Fuel Stations & Pertalite/Pertamax Locations in Town',
          'Essential Safety Tips for Riding in Flores',
        ],
        paragraphs: [
          'Labuan Bajo is one of Indonesia\'s most scenic coastal towns. While taxis and privatized car transfers are available, renting an automatic scooter gives you total freedom to explore hidden beaches, sunset cafes, and panoramic hill viewpoints on your own schedule.',
          'At HelloBajo, we specialize in hassle-free scooter rentals with zero security deposit. When you land at Komodo International Airport (LBJ), our local team meets you right outside the arrival gate with your freshly washed scooter, clean SNI helmets, and raincoats.',
          'Choosing the right bike depends on your trip plans. The Honda Beat (110cc) and Honda Scoopy (110cc) are lightweight and ideal for cruising around town, visiting waterfront seafood markets, and riding to nearby Bukit Cinta. If you plan to ride two-up or travel further south to the steep hills of Golo Mori, the Yamaha NMAX (155cc) offers superior power, disc brakes, and comfortable seating.',
          'Gas stations in Labuan Bajo are conveniently located along the main bypass road. Official Pertamina stations sell Pertalite and Pertamax fuel. Local roadside shops also sell fuel in glass bottles ("Pertamini") if you ever run low in remote areas.',
          'Always wear your helmet, keep your headlights on, and drive cautiously around sharp curves. Roads around Labuan Bajo are generally smooth asphalt, but hilly inclines require steady throttle control.',
        ],
        calloutNote: 'Pro Tip: Booking your scooter in advance via WhatsApp ensures your bike is waiting for you at the airport as soon as your plane touches down.',
      },
      ID: {
        toc: [
          'Mengapa Sewa Motor adalah Cara Terbaik Keliling Labuan Bajo',
          'Pilihan Armada: Honda Beat, Scoopy, atau Yamaha NMAX',
          'Cara Kerja Antar Jemput di Bandara Komodo (LBJ)',
          'Lokasi SPBU & Pengisian Bahan Bakar di Labuan Bajo',
          'Tips Aman Berkendara di Jalanan Berkelok Flores',
        ],
        paragraphs: [
          'Labuan Bajo menyajikan pemandangan pesisir pantai yang menakjubkan. Menyewa motor matic memberikan kebebasan penuh untuk menjelajahi tempat wisata tersembunyi, kafe sunset, dan bukit pemandangan sesuai irama Anda.',
          'Di HelloBajo, kami menyediakan layanan sewa motor tanpa deposit jaminan. Begitu mendarat di Bandara Komodo (LBJ), tim kami langsung menyerahkan unit motor bersih lengkap dengan 2 helm SNI dan jas hujan.',
          'Untuk keliling kota dan spot dekat seperti Bukit Cinta, Honda Beat (110cc) dan Scoopy (110cc) sangat lincah dan irit. Namun jika Anda berboncengan atau ingin rute tanjakan seperti Golo Mori, Yamaha NMAX (155cc) adalah pilihan terbaik dengan bagasi luas dan mesin bertenaga.',
          'SPBU resmi Pertamina tersedia di jalan utama bypass Labuan Bajo. Di daerah pinggiran, warung warga juga menjual bensin eceran yang aman digunakan.',
          'Selalu kenakan helm, nyalakan lampu utama, dan berkendaralah secara hati-hati di tikungan tajam.',
        ],
        calloutNote: 'Tips Penting: Pesan motor Anda sebelum kedatangan via WhatsApp agar unit langsung siap di area penjemputan bandara.',
      },
      ZH: {
        toc: [
          '为什么租摩托车是探索拉布安巴佐的最佳方式',
          '车队对比：Honda Beat vs Scoopy vs Yamaha NMAX',
          '科莫多机场 (LBJ) 专人交接流程',
          '拉布安巴佐加油站位置指南',
          '弗洛雷斯海岛骑行安全须知',
        ],
        paragraphs: [
          '拉布安巴佐拥有令人惊叹的海岛风光。租用一台自动挡摩托车能让您以最自由的节奏打卡秘境海滩、日落咖啡馆与山顶观景台。',
          'HelloBajo 承诺零预付押金。当您抵达科莫多国际机场 (LBJ) 时，我们的团队将在到达口为您交付保养精良的车辆、双头盔及雨衣。',
          '选择适合的车型至关重要。Honda Beat 与 Scoopy 操作轻便，适合市区巡游；若需两人合骑前往 Golo Mori 等陡峭山路，Yamaha NMAX (155cc) 的大马力与舒适座舱是首选。',
          '市区主干道旁分布有标准的 Pertamina 加油站。沿途也有本地小店售卖瓶装汽油，无须担心燃料问题。',
          '骑行时请务必戴好头盔，保持车灯开启，并在弯道处减速慢行。',
        ],
        calloutNote: '贴心提示：建议提前通过 WhatsApp 预约，以便飞机落地后即可在机场直接骑车出发。',
      },
    },
  },
  {
    id: 'post-2',
    slug: 'top-scooter-day-trips-labuan-bajo',
    category: 'Travel Tips',
    author: 'HelloBajo Team',
    publishDate: 'July 25, 2026',
    readTime: '5 min read',
    coverImage: RIDING_DESTINATIONS.goloMori,
    tags: ['Golo Mori', 'Gua Rangko', 'Bukit Cinta', 'Day Trips'],
    title: {
      EN: 'Top 3 Scenic Day Trips from Labuan Bajo by Scooter (Golo Mori, Gua Rangko & Bukit Cinta)',
      ID: '3 Rute Day Trip Motor Paling Indah dari Labuan Bajo (Golo Mori, Gua Rangko & Bukit Cinta)',
      ZH: '拉布安巴佐 3 大绝美摩托车骑行一日游路线 (Golo Mori, Gua Rangko 与 爱心山)',
    },
    excerpt: {
      EN: 'Discover smooth asphalt coastal roads, crystal blue cave pools, and panoramic sunset peaks reachable within 30–60 minutes by motorbike.',
      ID: 'Jelajahi jalanan pesisir mulus, kolam alami dalam gua, dan pemandangan sunset memukau yang berjarak 30–60 menit dengan motor.',
      ZH: '骑行探索平整沿海公路、晶莹蓝洞游泳池与壮丽日落山顶，距离镇区仅 30-60 分钟车程。',
    },
    content: {
      EN: {
        toc: [
          'Route 1: Golo Mori Coastal Highway (Smooth Asphalt & Ocean Views)',
          'Route 2: Gua Rangko Underground Cave & Boat Transfer',
          'Route 3: Bukit Cinta Sunset Panorama',
        ],
        paragraphs: [
          'Golo Mori is Indonesia\'s premier coastal highway project near Labuan Bajo. Featuring brand new asphalt, rolling green hills, and panoramic views of the Flores Sea, this 25km scenic drive is a dream for scooter riders.',
          'Gua Rangko is a hidden saltwater cave located about 45 minutes northeast of town. Ride your scooter to the small fishing village of Rangko, then board a short 10-minute wooden boat to reach the cave mouth. Between 12:00 PM and 2:30 PM, sunlight beams through the cave entrance, illuminating the crystal blue pool inside.',
          'Bukit Cinta (Love Hill) is just a 15-minute ride from town center. Park your scooter at the base and take a gentle 5-minute hike to the ridge top for a 360-degree panorama over Labuan Bajo bay during golden hour.',
        ],
        calloutNote: 'Rider Reminder: Check your fuel gauge before heading to Golo Mori as there are fewer gas stations along the coastal highway.',
      },
      ID: {
        toc: [
          'Rute 1: Jalan Pesisir Golo Mori (Jalan Mulus & Pemandangan Laut)',
          'Rute 2: Gua Rangko & Perahu Nelayan',
          'Rute 3: Sunset di Bukit Cinta',
        ],
        paragraphs: [
          'Jalanan Golo Mori menawarkan rute pesisir pantai terbaik di Flores. Aspal mulus berkelok mengapit perbukitan hijau dan laut biru yang tenang.',
          'Gua Rangko adalah keajaiban alam tersembunyi. Berjarak 45 menit berkendara dari kota menuju Desa Rangko, dilanjutkan naik perahu kayu 10 menit ke mulut gua. Cahaya matahari siang menembus celah gua dan menerangi kolam alami biru jernih.',
          'Bukit Cinta berjarak hanya 15 menit dari pusat kota. Tempat favorit menyaksikan pemandangan matahari terbenam dengan siluet pulau-pulau Komodo.',
        ],
        calloutNote: 'Pengingat: Isi penuh tangki bensin Anda sebelum berkendara ke arah Golo Mori.',
      },
      ZH: {
        toc: [
          '路线 1：Golo Mori 沿海平整观景公路',
          '路线 2：Gua Rangko 蓝洞天然绝美地下水池',
          '路线 3：Bukit Cinta 爱心山壮丽海景日落',
        ],
        paragraphs: [
          'Golo Mori 沿海公路拥有崭新平整的柏油路面。沿途绿丘环绕、蓝海相伴，是骑行的绝佳体验。',
          'Gua Rangko 蓝洞距离市区约 45 分钟骑程。抵达 Rangko 渔村后换乘 10 分钟木船进入岩洞。中午时分阳光斜射入洞内，使地下水池呈现晶莹剔透的湖蓝色。',
          'Bukit Cinta 距离镇中心仅 15 分钟骑程，是全城观赏金黄海景日落与科莫多群岛剪影的最佳观景台。',
        ],
        calloutNote: '骑行建议：前往 Golo Mori 前请确保油箱充足。',
      },
    },
  },
  {
    id: 'post-3',
    slug: 'komodo-speedboat-vs-phinisi',
    category: 'Island Tours',
    author: 'HelloBajo Team',
    publishDate: 'July 10, 2026',
    readTime: '7 min read',
    coverImage: SPEEDBOAT_BANNER,
    tags: ['Komodo Island', 'Speedboat', 'Phinisi Yacht', 'Day Trip'],
    title: {
      EN: 'Komodo Tour Guide: Speedboat Day Trip vs Luxury Phinisi Liveaboard Comparison',
      ID: 'Panduan Wisata Komodo: Perbandingan Speedboat Day Trip vs Kapal Phinisi Menginap',
      ZH: '科莫多出海指南：高速快艇一日游 vs 豪华 Phinisi 帆船住宿对比',
    },
    excerpt: {
      EN: 'Should you choose a 1-day high-speed island tour or a 3-day luxury wooden yacht cruise in Komodo National Park? Here is a breakdown of costs, itineraries, and experiences.',
      ID: 'Apakah Anda harus memilih tur speedboat 1 hari atau menginap 3 hari di kapal Phinisi mewah? Simak perbandingan biaya, jadwal, dan pengalaman.',
      ZH: '应该选择 1 天快速打卡各大名景的高速快艇，还是选择 3 天 2 晚的豪华木质 Phinisi 帆船出海？本文为您全面拆解费用与路线。',
    },
    content: {
      EN: {
        toc: [
          'Option A: Speedboat Day Trip (Best for Travelers with Limited Time)',
          'Option B: Phinisi Liveaboard Yacht (Best for Luxury & Relaxed Sailing)',
          'Key Differences in Itineraries & Budget',
          'How to Combine Scooter Rental with Boat Charters in Labuan Bajo',
        ],
        paragraphs: [
          'Visiting Komodo National Park is the bucket-list highlight of any trip to Flores. Choosing between a fast Speedboat Day Trip and a traditional Phinisi Liveaboard depends on your travel duration and budget.',
          'Speedboat Day Trips cover all 6 major islands (Padar Island, Pink Beach, Komodo Island, Taka Makassar, Manta Point, Kanawa) in a single action-packed day (06:00 AM to 05:00 PM). It is ideal if you want to spend the rest of your holiday riding scooters along the coast or exploring land attractions.',
          'Phinisi Liveaboards offer a magical 2D1N or 3D2N experience where you sleep in luxury air-conditioned cabins, watch thousands of flying fox bats at sunset in Kalong Island, and enjoy freshly prepared seafood meals on deck.',
          'Pro tip: Many travelers rent a HelloBajo scooter for their land days before and after their boat cruise — ensuring smooth airport transfers and hassle-free town exploration.',
        ],
        calloutNote: 'Combination Special: Ask HelloBajo via WhatsApp about our bundled Scooter + Speedboat Day Trip discount packages!',
      },
      ID: {
        toc: [
          'Pilihan A: Speedboat Day Trip (Ideal untuk Waktu Terbatas)',
          'Pilihan B: Kapal Phinisi Menginap (Pengalaman Mewah & Santai)',
          'Perbandingan Biaya & Jadwal Perjalanan',
          'Kombinasi Sewa Motor & Tour Kapal di Labuan Bajo',
        ],
        paragraphs: [
          'Berkunjung ke Taman Nasional Komodo adalah impian setiap wisatawan. Memilih antara Speedboat 1 hari dan Kapal Phinisi menginap tergantung pada durasi liburan Anda.',
          'Speedboat Day Trip mengunjungi 6 destinasi utama dalam 1 hari penuh (06.00 - 17.00 WITA). Cocok jika Anda ingin menghemat waktu untuk lanjut menjelajahi daratan Bajo dengan motor.',
          'Kapal Phinisi menawarkan pengalaman bermalam 2D1N atau 3D2N dengan kabin ber-AC, pemandangan ribuan kelelawar di Pulau Kalong saat sunset, dan santapan kuliner laut di atas kapal.',
        ],
        calloutNote: 'Promo Hemat: Dapatkan diskon spesial untuk pemesanan kombinasi Sewa Motor + Speedboat Komodo!',
      },
      ZH: {
        toc: [
          '方案 A：高速快艇一日游 (适合时间紧凑的游客)',
          '方案 B：Phinisi 豪华帆船过夜出海 (顶级惬意航海体验)',
          '行程亮点与预算费用全方位对比',
          '如何将陆地摩托车骑行与海上游艇完美结合',
        ],
        paragraphs: [
          '前往科莫多国家公园是弗洛雷斯之行不可错过的梦幻行程。在快艇一日游与 Phinisi 过夜帆船之间做选择，主要取决于您的停留时间与预算。',
          '快艇一日游可在一天内 (06:00 - 17:00) 打卡 6 大经典岛屿，适合希望兼顾陆地骑行与观光的游客。',
          'Phinisi 豪华帆船过夜行程 (2天1晚 / 3天2晚) 提供海景空调船舱、蝙蝠岛千鸟出巢日落及船上现烹海鲜大餐。',
        ],
        calloutNote: '套餐特惠：通过 WhatsApp 咨询 HelloBajo 租车+快艇出海组合优惠！',
      },
    },
  },
];
