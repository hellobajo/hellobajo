// ==========================================================
// CENTRALIZED TRANSLATION DICTIONARY
//
// 📖 HOW TO EDIT OR ADD NEW LANGUAGES IN THE FUTURE:
// 1. Add the new language code to the `Language` type below (e.g. export type Language = 'EN' | 'ID' | 'ZH' | 'FR';)
// 2. Add a new key object matching the language code in `translations` export (e.g. FR: { ... }).
// 3. All components automatically use `t` from `translations[lang]`.
// ==========================================================

export type Language = 'EN' | 'ID' | 'ZH';

export interface ScooterFleetItem {
  id: string;
  name: string;
  variant: string;
  badge?: string;
  badgeColor?: string; // 'amber' | 'teal' | 'slate'
  description: string;
  specs: string[];
  price: number;
  priceFormatted: string;
  minDays?: number;
  minDaysLabel?: string;
}

export interface ScooterSlideItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  imageKey: 'beat' | 'scoopy' | 'fazzio' | 'vario150' | 'vario160' | 'nmax' | 'pcx';
}

export interface ScooterCategoryItem {
  id: string;
  name: string;
  priceFormatted: string;
  pricePeriod: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  specs: string[];
  slides: ScooterSlideItem[];
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TranslationContent {
  nav: {
    howItWorks: string;
    fleet: string;
    whyUs: string;
    reserve: string;
    faq: string;
    whatsappBtn: string;
  };
  hero: {
    estTag: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    badges: string[];
    ctaFleet: string;
    ctaWhatsapp: string;
  };
  howItWorks: {
    tag: string;
    title: string;
    steps: HowItWorksStep[];
    alertBanner: string;
    ridingAreaBanner: string;
  };
  fleet: {
    tag: string;
    title: string;
    subtitle: string;
    items: ScooterFleetItem[];
    categories?: ScooterCategoryItem[];
    bookBtn: string;
  };
  whyUs: {
    tag: string;
    title: string;
    items: WhyUsItem[];
  };
  reserve: {
    tag: string;
    title: string;
    subtitle: string;
    labels: {
      bike: string;
      bikePlaceholder: string;
      pickupDate: string;
      pickupTime: string;
      dropoffDate: string;
      dropoffTime: string;
      hotelPickup: string;
      hotelPickupPlaceholder: string;
      hotelDropoff: string;
      hotelDropoffPlaceholder: string;
      email: string;
      social: string;
      ageCheckbox: string;
      submitBtn: string;
      note: string;
    };
  };
  exploreMore: {
    tag: string;
    title: string;
    subtitle: string;
    carBannerTitle: string;
    carBannerSubtitle: string;
    carBannerDesc: string;
    car1Title: string;
    car1Desc: string;
    car2Title: string;
    car2Desc: string;
    ctaBtn: string;
  };
  faq: {
    tag: string;
    title: string;
    items: FaqItem[];
  };
  footer: {
    tagline: string;
    verifiedText: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  EN: {
    nav: {
      howItWorks: 'How It Works',
      fleet: 'Our Fleet',
      whyUs: 'Why Us',
      reserve: 'Book Scooter',
      faq: 'FAQ',
      whatsappBtn: 'WhatsApp Us',
    },
    hero: {
      estTag: 'LABUAN BAJO · EST. 2022',
      titleLine1: 'Hassle-Free Scooter Rental',
      titleLine2: 'in Labuan Bajo',
      subtitle: 'Explore Labuan Bajo on your own terms. Well-maintained scooters ready for delivery to Komodo Airport, your hotel, or villa.',
      badges: [
        'Zero Cash Deposit',
        'Helmets, phone holder & fuel',
        'Delivery to Hotel / Airport',
        'Instant WhatsApp Confirmation',
      ],
      ctaFleet: 'Explore Fleet',
      ctaWhatsapp: 'Book via WhatsApp',
    },
    howItWorks: {
      tag: 'HOW IT WORKS',
      title: 'Four steps, zero stress',
      steps: [
        {
          stepNumber: '01',
          title: 'Choose Scooter',
          description: 'Browse our fleet and pick the right ride for your trip.',
        },
        {
          stepNumber: '02',
          title: 'Chat on WhatsApp',
          description: 'Tell us your dates, hotel name, and preferred scooter. We reply soon.',
        },
        {
          stepNumber: '03',
          title: 'Verify Identity',
          description: 'Share a photo of your ID/Passport, return flight ticket, and hotel booking confirmation. It is quick, simple, and keeps everyone safe.',
        },
        {
          stepNumber: '04',
          title: 'Ride Away',
          description: 'We deliver to your door. Pay on arrival. Explore freely.',
        },
      ],
      alertBanner: 'No commitment until you\'re ready. Messaging us is just a conversation — no payment upfront. Pay cash or transfer on delivery. No deposit required.',
      ridingAreaBanner: 'Scooter rentals are strictly valid for Labuan Bajo & West Manggarai area only (Town center, Airport, Rangko Cave, Waecicu, Melo Village, Cunca Wulang). Long-distance overland riding across Flores (e.g., Ruteng, Bajawa, Kelimutu) is strictly prohibited for safety reasons and is currently not available.',
    },
    fleet: {
      tag: 'OUR FLEET',
      title: 'Select Your Scooter Category',
      subtitle: 'All rentals include 2 clean helmets, phone holder, initial fuel, & hassle-free staff delivery across Labuan Bajo town (Rp 20k/trip). No security deposit needed.',
      bookBtn: 'Book Now',
      items: [
        {
          id: 'beat',
          name: 'Honda Beat',
          variant: '(or similar)',
          minDays: 1,
          minDaysLabel: 'Min 1 Day',
          description: 'Compact, fuel-efficient, and easy to park — perfect for exploring town and coastal roads.',
          specs: ['Automatic', '110cc', 'EFI'],
          price: 100000,
          priceFormatted: 'Rp 100k',
        },
        {
          id: 'scoopy',
          name: 'Honda Scoopy',
          variant: '(or similar)',
          minDays: 1,
          minDaysLabel: 'Min 1 Day',
          description: 'Retro-chic style meets everyday practicality. Great for first-timers and casual riders.',
          specs: ['Automatic', '110cc', 'Keyless'],
          price: 120000,
          priceFormatted: 'Rp 120k',
        },
        {
          id: 'nmax',
          name: 'Yamaha NMAX',
          variant: '(or similar)',
          badge: 'Most Popular',
          badgeColor: 'teal',
          description: 'Big under-seat storage & powerful engine. The most comfortable ride for exploring Labuan Bajo. Highway-ready for trips.',
          specs: ['Automatic', '155cc', 'ABS'],
          price: 160000,
          priceFormatted: 'Rp 160k',
        },
      ],
      categories: [
        {
          id: 'compact',
          name: 'Compact / Economy',
          priceFormatted: 'Rp 100.000',
          pricePeriod: '/ day',
          badge: 'Best Value Choice',
          badgeColor: 'teal',
          description: 'Compact, fuel-efficient, and highly agile. Ideal for solo riders and couples cruising town streets, cafes, and beach roads.',
          specs: ['Automatic', '110cc – 125cc', 'EFI / Hybrid'],
          slides: [
            {
              id: 'beat',
              name: 'Honda Beat',
              subtitle: '110cc EFI • Light & Fuel-Efficient',
              price: 'Rp 100.000 / day',
              imageKey: 'beat',
            },
            {
              id: 'scoopy',
              name: 'Honda Scoopy',
              subtitle: '110cc Smart Key • Retro Chic Style',
              price: 'Rp 100.000 / day',
              imageKey: 'scoopy',
            },
            {
              id: 'fazzio',
              name: 'Yamaha Fazzio',
              subtitle: '125cc Hybrid • Modern Chic',
              price: 'Rp 100.000 / day',
              imageKey: 'fazzio',
            },
          ],
        },
        {
          id: 'medium',
          name: 'Medium / Sport',
          priceFormatted: 'Rp 130.000+',
          pricePeriod: '/ day',
          badge: 'Hill Climbing Power',
          badgeColor: 'amber',
          description: 'Stronger horsepower & sharp acceleration for effortlessly navigating steep Labuan Bajo hill climbs, scenic viewpoints, and longer island rides.',
          specs: ['Automatic', '150cc – 160cc', 'Liquid Cooled'],
          slides: [
            {
              id: 'vario150',
              name: 'Honda Vario 150',
              subtitle: '150cc eSP Engine • Sporty Acceleration',
              price: 'Rp 130.000 / day',
              imageKey: 'vario150',
            },
            {
              id: 'vario160',
              name: 'Honda Vario 160',
              subtitle: '160cc eSP+ 4-Valve • Smart Key & Power',
              price: 'Rp 140.000 / day',
              imageKey: 'vario160',
            },
          ],
        },
        {
          id: 'maxi',
          name: 'Maxi Scooter',
          priceFormatted: 'Rp 160.000',
          pricePeriod: '/ day',
          badge: 'Most Popular & Comfortable',
          badgeColor: 'teal',
          description: 'Ultimate comfort & highway stability. Features generous under-seat storage for backpacks, wide plush double seat, and powerful 155cc engine.',
          specs: ['Automatic', '155cc VVA', 'ABS / Disc Brake'],
          slides: [
            {
              id: 'nmax',
              name: 'Yamaha NMAX 155',
              subtitle: '155cc VVA Engine • Big Storage & Plush Seat',
              price: 'Rp 160.000 / day',
              imageKey: 'nmax',
            },
            {
              id: 'pcx',
              name: 'Honda PCX 155',
              subtitle: '155cc eSP+ • Luxury Comfort Cruiser',
              price: 'Rp 160.000 / day',
              imageKey: 'pcx',
            },
          ],
        },
      ],
    },
    whyUs: {
      tag: 'WHY US',
      title: 'Built for travellers, not tourists',
      items: [
        {
          icon: 'message-square',
          title: 'Seamless Booking',
          description: 'WhatsApp only. No app, no account, no form. Just a quick chat and you\'re confirmed.',
        },
        {
          icon: 'shield-check',
          title: 'Well-Maintained',
          description: 'Every bike is checked before each rental. Tyres, brakes, lights — all in top shape.',
        },
        {
          icon: 'check-circle',
          title: 'No Security Deposit',
          description: 'Zero upfront deposit. Pay only the daily rate when we deliver — cash or transfer.',
        },
        {
          icon: 'heart',
          title: 'Honest Support',
          description: 'Real locals who know every road. If something goes wrong, we sort it out immediately.',
        },
      ],
    },
    reserve: {
      tag: 'RESERVE NOW',
      title: 'Book a Scooter',
      subtitle: 'Fill in the details below and we\'ll open WhatsApp with your message ready.',
      labels: {
        bike: 'BIKE',
        bikePlaceholder: 'Select a bike',
        pickupDate: 'PICK-UP DATE & TIME',
        pickupTime: '8:00 AM',
        dropoffDate: 'DROP-OFF DATE & TIME',
        dropoffTime: '8:00 AM',
        hotelPickup: 'HOTEL / DELIVERY AREA',
        hotelPickupPlaceholder: 'Select area / hotel',
        hotelDropoff: 'RETURN AREA / DROP-OFF',
        hotelDropoffPlaceholder: 'Select return area / hotel',
        email: 'EMAIL ADDRESS',
        social: 'INSTAGRAM / FACEBOOK / TIKTOK',
        ageCheckbox: 'Rider is aged between 20 – 65 years old',
        submitBtn: 'Send on WhatsApp',
        note: 'Renting by WhatsApp is normal here. Message us and we handle the rest.',
      },
    },
    exploreMore: {
      tag: 'EXPLORE MORE',
      title: 'Discover Labuan Bajo Beyond the Sea',
      subtitle: 'Need comfortable private car transport for group land tours or airport transfers?',
      carBannerTitle: 'PRIVATE CHARTER · COMFORT, YOUR WAY',
      carBannerSubtitle: 'Whether it\'s a scenic escape or a group adventure, we\'ve got the perfect ride for you.',
      carBannerDesc: 'Safe, reliable, and driven by professional local drivers.',
      car1Title: 'PRIVATE CAR (1 - 4 PAX)',
      car1Desc: 'Perfect for couples, families, or business travelers.',
      car2Title: 'HIACE COMMUTER (UP TO 14 PAX)',
      car2Desc: 'Spacious and comfortable for friends, families, or big groups.',
      ctaBtn: 'Inquire Car Tour',
    },
    faq: {
      tag: 'FAQ',
      title: 'Common questions',
      items: [
        {
          q: 'What documents do I need to rent?',
          a: 'Simply provide your ID card or Passport, a round-trip flight ticket, hotel booking confirmation, and a link to an active social media profile (Instagram/Facebook name) for a quick verification. Please note that all rentals are subject to this standard security check.',
        },
        {
          q: 'Where do you deliver?',
          a: 'We deliver across Labuan Bajo town, the airport (LBJ), Katamaran, Marriott, La Prima, Sudamala, Bintang Flores, and Ayana Komodo Resort. Heading somewhere else? Just ask — we\'ll figure it out. Please note that some locations outside town may incur a small extra delivery fee.',
        },
        {
          q: 'Is there a security deposit?',
          a: 'No deposit at all. You pay only the daily rate when we deliver the bike — by cash or bank transfer. No cards, no upfront charges, no surprises.',
        },
        {
          q: 'What if I get a flat tyre?',
          a: 'Message us immediately on WhatsApp. We\'ll guide you to the nearest repair shop (very affordable here) or come out to you if needed. We\'re locals — we know every mechanic in town.',
        },
        {
          q: 'Do I need a driving licence?',
          a: 'We don\'t require one from you to rent. However, Indonesian law requires a valid licence to ride on public roads. An international driving permit or your home-country licence is generally accepted.',
        },
        {
          q: 'How do I return the bike?',
          a: 'Just let us know your return date and where you\'re staying. We\'ll pick it up from your hotel or agree on a simple drop-off point nearby. Easy.',
        },
        {
          q: 'What happens if the scooter gets damaged or breaks down?',
          a: 'Please take photos or a video of the scooter during handover to protect both parties. Any accidental damage (e.g., flat tires, scratches) is the guest\'s financial responsibility. However, if the scooter breaks down due to an internal mechanical failure not caused by misuse, we will swap it immediately at no extra cost.',
        },
        {
          q: 'What is the Riding Area Policy for rented scooters?',
          a: 'Scooters are rented strictly for the Labuan Bajo & West Manggarai area (town center, airport, Waecicu, Rangko Cave, Batu Cermin, Melo Village, Cunca Wulang). Riding scooters overland outside West Manggarai across Flores (such as to Ruteng, Bajawa, or Kelimutu) is strictly prohibited for safety and emergency roadside support reasons, and long-distance overland service is currently not available.',
        },
      ],
    },
    footer: {
      tagline: 'Hassle-Free Rental in Labuan Bajo. Locals who care.',
      verifiedText: 'Verified Local Bank Transfer Accepted via Wise / Revolut',
      rights: '© 2026 hellobajo.go — All rights reserved.',
    },
  },
  ID: {
    nav: {
      howItWorks: 'Cara Kerja',
      fleet: 'Pilihan Motor',
      whyUs: 'Keunggulan',
      reserve: 'Sewa Motor',
      faq: 'FAQ',
      whatsappBtn: 'Chat WhatsApp',
    },
    hero: {
      estTag: 'LABUAN BAJO · EST. 2022',
      titleLine1: 'Sewa Motor / Scooter Praktis',
      titleLine2: 'di Labuan Bajo',
      subtitle: 'Explore Labuan Bajo on your own terms. Motor terawat siap antar ke Bandara Komodo, hotel, atau villa Anda.',
      badges: [
        'Zero Cash Deposit',
        'Helm, phone holder & bensin',
        'Antar s.d Hotel / Bandara',
        'Respon Cepat WhatsApp',
      ],
      ctaFleet: 'Lihat Motor',
      ctaWhatsapp: 'Sewa via WhatsApp',
    },
    howItWorks: {
      tag: 'CARA KERJA',
      title: 'Empat langkah mudah, bebas ribet',
      steps: [
        {
          stepNumber: '01',
          title: 'Pilih Motor',
          description: 'Lihat armada motor kami dan pilih yang paling sesuai untuk perjalanan Anda.',
        },
        {
          stepNumber: '02',
          title: 'Chat via WhatsApp',
          description: 'Beri tahu tanggal sewa, nama hotel, dan motor pilihan. Kami segera merespon.',
        },
        {
          stepNumber: '03',
          title: 'Verifikasi Identitas',
          description: 'Kirim foto KTP/Paspor, tiket pesawat PP, dan konfirmasi booking hotel. Cepat, sederhana, dan aman.',
        },
        {
          stepNumber: '04',
          title: 'Mulai Berkendara',
          description: 'Kami antar motor ke lokasi Anda. Bayar saat serah terima. Jelajahi Bajo sepuasnya!',
        },
      ],
      alertBanner: 'Tanpa komitmen sebelum Anda yakin. Kirim pesan hanya konsultasi — tanpa bayar di awal. Bayar tunai atau transfer saat motor diantar. Tanpa uang deposit.',
      ridingAreaBanner: 'Sewa motor berlaku khusus untuk Area Labuan Bajo & Manggarai Barat (Pusat Kota, Bandara, Gua Rangko, Waecicu, Desa Melo, Cunca Wulang). Touring overland jarak jauh keluar Manggarai Barat (ke Ruteng, Bajawa, Kelimutu) dilarang keras demi alasan keselamatan & saat ini tidak tersedia.',
    },
    fleet: {
      tag: 'PILIHAN MOTOR',
      title: 'Pilih Kategori Motor Anda',
      subtitle: 'Semua sewa sudah termasuk 2 helm SNI bersih, phone holder, bensin awal, & pengantaran petugas area kota Labuan Bajo (Rp 20rb/antar). Tanpa uang deposit.',
      bookBtn: 'Pesan Sekarang',
      items: [
        {
          id: 'beat',
          name: 'Honda Beat',
          variant: '(atau sejenis)',
          minDays: 1,
          minDaysLabel: 'Min 1 Hari',
          description: 'Ramping, irit bahan bakar, dan sangat lincah — pas untuk keliling kota dan jalanan pantai.',
          specs: ['Matic', '110cc', 'EFI'],
          price: 100000,
          priceFormatted: 'Rp 100rb',
        },
        {
          id: 'scoopy',
          name: 'Honda Scoopy',
          variant: '(atau sejenis)',
          minDays: 1,
          minDaysLabel: 'Min 1 Hari',
          description: 'Gaya retro-modern yang nyaman dipakai harian. Sangat cocok untuk santai keliling spot wisata.',
          specs: ['Matic', '110cc', 'Keyless'],
          price: 120000,
          priceFormatted: 'Rp 120rb',
        },
        {
          id: 'nmax',
          name: 'Yamaha NMAX',
          variant: '(atau sejenis)',
          badge: 'Paling Populer',
          badgeColor: 'teal',
          description: 'Bagasi luas & mesin bertenaga. Sangat nyaman untuk perjalanan jauh keliling Labuan Bajo.',
          specs: ['Matic', '155cc', 'ABS'],
          price: 160000,
          priceFormatted: 'Rp 160rb',
        },
      ],
      categories: [
        {
          id: 'compact',
          name: 'Compact / Economy',
          priceFormatted: 'Rp 100.000',
          pricePeriod: '/ hari',
          badge: 'Pilihan Paling Hemat',
          badgeColor: 'teal',
          description: 'Ramping, sangat irit bensin, dan lincah. Pilihan tepat untuk solo traveler atau pasangan keliling kota & jalanan pantai.',
          specs: ['Matic', '110cc – 125cc', 'EFI / Hybrid'],
          slides: [
            {
              id: 'beat',
              name: 'Honda Beat',
              subtitle: '110cc EFI • Ringan & Sangat Irit',
              price: 'Rp 100.000 / hari',
              imageKey: 'beat',
            },
            {
              id: 'scoopy',
              name: 'Honda Scoopy',
              subtitle: '110cc Smart Key • Gaya Retro Modern',
              price: 'Rp 100.000 / hari',
              imageKey: 'scoopy',
            },
            {
              id: 'fazzio',
              name: 'Yamaha Fazzio',
              subtitle: '125cc Hybrid • Desain Kekinian',
              price: 'Rp 100.000 / hari',
              imageKey: 'fazzio',
            },
          ],
        },
        {
          id: 'medium',
          name: 'Medium / Sport',
          priceFormatted: 'Rp 130.000+',
          pricePeriod: '/ hari',
          badge: 'Tangguh Tanjakan Bukit',
          badgeColor: 'amber',
          description: 'Mesin lebih bertenaga & akselerasi responsif untuk melibas tanjakan terjal bukit Labuan Bajo dan perjalanan jauh.',
          specs: ['Matic', '150cc – 160cc', 'Liquid Cooled'],
          slides: [
            {
              id: 'vario150',
              name: 'Honda Vario 150',
              subtitle: '150cc eSP Engine • Sporty & Lincah',
              price: 'Rp 130.000 / hari',
              imageKey: 'vario150',
            },
            {
              id: 'vario160',
              name: 'Honda Vario 160',
              subtitle: '160cc eSP+ 4-Valve • Smart Key & Bertenaga',
              price: 'Rp 140.000 / hari',
              imageKey: 'vario160',
            },
          ],
        },
        {
          id: 'maxi',
          name: 'Maxi Scooter',
          priceFormatted: 'Rp 160.000',
          pricePeriod: '/ hari',
          badge: 'Paling Nyaman & Populer',
          badgeColor: 'teal',
          description: 'Kenyamanan ekstra & kestabilan maksimal. Dilengkapi bagasi besar untuk ransel, jok empuk lebar, dan mesin 155cc bertenaga.',
          specs: ['Matic', '155cc VVA', 'ABS / Disc Brake'],
          slides: [
            {
              id: 'nmax',
              name: 'Yamaha NMAX 155',
              subtitle: '155cc VVA • Bagasi Luas & Jok Empuk',
              price: 'Rp 160.000 / hari',
              imageKey: 'nmax',
            },
            {
              id: 'pcx',
              name: 'Honda PCX 155',
              subtitle: '155cc eSP+ • Jelajah Mewah & Nyaman',
              price: 'Rp 160.000 / hari',
              imageKey: 'pcx',
            },
          ],
        },
      ],
    },
    whyUs: {
      tag: 'KEUNGGULAN',
      title: 'Didesain Khusus untuk Penjelajah',
      items: [
        {
          icon: 'message-square',
          title: 'Pemesanan Mudah',
          description: 'Cukup via WhatsApp. Tanpa aplikasi, tanpa pendaftaran rumit. Chat singkat langsung konfirmasi.',
        },
        {
          icon: 'shield-check',
          title: 'Kondisi Prima',
          description: 'Setiap unit dicek rutin sebelum diserahkan. Ban, rem, lampu — semua dalam kondisi aman.',
        },
        {
          icon: 'check-circle',
          title: 'Tanpa Uang Deposit',
          description: 'Bebas uang jaminan di muka. Cukup bayar biaya sewa harian saat motor diantar.',
        },
        {
          icon: 'heart',
          title: 'Bantuan Ramah Lokal',
          description: 'Tim lokal asli yang paham medan. Jika ada kendala di jalan, kami siap bantu dengan cepat.',
        },
      ],
    },
    reserve: {
      tag: 'FORM PEMESANAN',
      title: 'Sewa Motor Sekarang',
      subtitle: 'Isi formulir ringkas berikut dan kami akan menyiapkan pesan otomatis ke WhatsApp.',
      labels: {
        bike: 'PILIH MOTOR',
        bikePlaceholder: 'Pilih jenis motor',
        pickupDate: 'TANGGAL & JAM AMBIL',
        pickupTime: '08:00 WITA',
        dropoffDate: 'TANGGAL & JAM KEMBALI',
        dropoffTime: '08:00 WITA',
        hotelPickup: 'LOKASI ANTAR / HOTEL',
        hotelPickupPlaceholder: 'Pilih area / nama hotel',
        hotelDropoff: 'LOKASI JEMBALI / DROP-OFF',
        hotelDropoffPlaceholder: 'Pilih area pengembalian',
        email: 'ALAMAT EMAIL',
        social: 'INSTAGRAM / FACEBOOK / TIKTOK',
        ageCheckbox: 'Pengendara berusia antara 20 – 65 tahun',
        submitBtn: 'Kirim via WhatsApp',
        note: 'Sewa motor via WhatsApp adalah hal biasa di sini. Cukup chat kami dan kami urus sisanya.',
      },
    },
    exploreMore: {
      tag: 'LAYANAN LAIN',
      title: 'Jelajahi Labuan Bajo Lebih Jauh',
      subtitle: 'Butuh sewa mobil pribadi dengan driver lokal berpengalaman untuk tur darat atau jemputan airport?',
      carBannerTitle: 'CHARTER MOBIL PRIBADI · NYAMAN & FLEKSIBEL',
      carBannerSubtitle: 'Solusi transportasi darat terbaik untuk liburan keluarga atau grup wisata.',
      carBannerDesc: 'Aman, terpercaya, didampingi driver profesional asli lokal.',
      car1Title: 'MOBIL PRIBADI (1 - 4 PAX)',
      car1Desc: 'Cocok untuk pasangan, keluarga kecil, atau perjalanan dinas.',
      car2Title: 'HIACE COMMUTER (S.D 14 PAX)',
      car2Desc: 'Kapasitas luas dan sangat nyaman untuk rombongan keluarga besar / teman.',
      ctaBtn: 'Tanyakan Sewa Mobil',
    },
    faq: {
      tag: 'TANYA JAWAB',
      title: 'Pertanyaan umum',
      items: [
        {
          q: 'Dokumen apa saja yang saya butuhkan untuk menyewa?',
          a: 'Cukup berikan KTP atau Paspor Anda, tiket pesawat pulang-pergi, konfirmasi pemesanan hotel, serta akun/link media sosial aktif (Instagram/Facebook) untuk verifikasi cepat. Seluruh penyewaan mengikuti pemeriksaan keamanan standar ini.',
        },
        {
          q: 'Di mana saja area pengantarannya?',
          a: 'Kami mengantar ke seluruh kota Labuan Bajo, bandara (LBJ), Katamaran, Marriott, La Prima, Sudamala, Bintang Flores, dan Ayana Komodo Resort. Ingin diantar ke lokasi lain? Cukup beri tahu kami — kami siap aturkan.',
        },
        {
          q: 'Apakah ada uang deposit / jaminan?',
          a: 'Tidak ada deposit sama sekali. Anda hanya membayar harga sewa harian saat kami mengantarkan motor — melalui tunai atau transfer bank.',
        },
        {
          q: 'Bagaimana jika ban motor bocor?',
          a: 'Segera kirim pesan ke kami via WhatsApp. Kami akan mengarahkan Anda ke bengkel terdekat atau langsung datang membimbing Anda jika diperlukan. Kami warga lokal — tahu setiap bengkel di kota.',
        },
        {
          q: 'Apakah saya butuh SIM untuk menyewa?',
          a: 'Kami tidak mewajibkan penyerahan SIM dari Anda untuk sewa. Namun hukum Indonesia mewajibkan SIM aktif saat berkendara di jalan umum (SIM C / International Permit).',
        },
        {
          q: 'Bagaimana cara mengembalikan motor?',
          a: 'Cukup beri tahu tanggal dan jam pengembalian serta lokasi Anda menginap. Tim kami akan menjemputnya langsung di hotel Anda atau tempat yang disepakati.',
        },
        {
          q: 'Bagaimana jika motor mengalami lecet, kerusakan, atau mogok?',
          a: 'Harap ambil foto/video motor saat serah terima untuk kebaikan bersama. Kerusakan insidental akibat pemakaian merupakan tanggung jawab penyewa. Namun jika motor mogok karena masalah teknis mesin, kami akan langsung menukarnya tanpa biaya tambahan.',
        },
        {
          q: 'Bagaimana aturan dan kebijakan area berkendara (Riding Area Policy)?',
          a: 'Sewa motor berlaku khusus untuk Area Labuan Bajo & Manggarai Barat (Pusat Kota, Bandara, Waecicu, Gua Rangko, Batu Cermin, Desa Melo, Cunca Wulang). Motor dilarang keras dibawa touring overland keluar wilayah Manggarai Barat (seperti ke Ruteng, Bajawa, atau Kelimutu) demi alasan keselamatan & keterbatasan bantuan darurat, dan layanan overland jarak jauh saat ini tidak tersedia.',
        },
      ],
    },
    footer: {
      tagline: 'Sewa Praktis di Labuan Bajo. Pelayanan ramah lokal.',
      verifiedText: 'Menerima Transfer Bank Lokal, Wise & Revolut',
      rights: '© 2026 hellobajo.go — Hak cipta dilindungi.',
    },
  },
  ZH: {
    nav: {
      howItWorks: '使用流程',
      fleet: '车型选择',
      whyUs: '我们的优势',
      reserve: '立即租车',
      faq: '常见问题',
      whatsappBtn: '微信/WhatsApp',
    },
    hero: {
      estTag: '拉布安巴佐 · 始于 2022',
      titleLine1: '拉布安巴佐轻松便捷',
      titleLine2: '摩托车 / 踏板车租赁',
      subtitle: 'Explore Labuan Bajo on your own terms. 优质维护的摩托车，随时送达科莫多机场、您的酒店或度假村。',
      badges: [
        '零现金押金',
        '赠头盔、支架与燃油',
        '专人送车上门 (Rp 20k/次)',
        'WhatsApp 快速回复',
      ],
      ctaFleet: '查看车型',
      ctaWhatsapp: '通过 WhatsApp 预订',
    },
    howItWorks: {
      tag: '使用流程',
      title: '只需四步，轻松租车',
      steps: [
        {
          stepNumber: '01',
          title: '选择车型',
          description: '浏览我们的车队，选择最适合您行程的摩托车。',
        },
        {
          stepNumber: '02',
          title: 'WhatsApp 沟通',
          description: '告知我们您的租车日期、酒店名称和心仪车型，我们将尽快回复。',
        },
        {
          stepNumber: '03',
          title: '身份核验',
          description: '提供护照/身份证照片、往返机票及酒店预订确认信。简单快速，保障安全。',
        },
        {
          stepNumber: '04',
          title: '开启骑行',
          description: '我们将送车上门。到车付款，随心开启拉布安巴佐探索之旅！',
        },
      ],
      alertBanner: '在您准备好之前无需承诺。发信息只是咨询——无需预付款。送车时现金或转账支付。无需押金。',
      ridingAreaBanner: '摩托车租赁仅限拉布安巴佐及西芒加莱县区域内（市区、机场、Rangko 溶洞、Waecicu、Melo 村、Cunca Wulang 瀑布）。出于安全及紧急救援考量，严禁骑车跨区前往 Ruteng、Bajawa、克里穆图等长途地点，且目前暂不提供跨区长途行程服务。',
    },
    fleet: {
      tag: '车型选择',
      title: '选择您的摩托车类型',
      subtitle: '所有租车均免费包含 2 顶清洁头盔、手机支架、初始燃油及专人送车服务 (Rp 20k/次)。无需押金。',
      bookBtn: '立即预订',
      items: [
        {
          id: 'beat',
          name: 'Honda Beat',
          variant: '(或同级车型)',
          minDays: 1,
          minDaysLabel: '最少 1 天',
          description: '小巧省油，停车极其方便——非常适合探索市区和沿海公路。',
          specs: ['自动挡', '110cc', '电喷 Engine'],
          price: 100000,
          priceFormatted: 'Rp 100k',
        },
        {
          id: 'scoopy',
          name: 'Honda Scoopy',
          variant: '(或同级车型)',
          minDays: 1,
          minDaysLabel: '最少 1 天',
          description: '复古时尚外形兼具实用性，非常适合初学者和休闲骑行者。',
          specs: ['自动挡', '110cc', '无钥匙启动'],
          price: 120000,
          priceFormatted: 'Rp 120k',
        },
        {
          id: 'nmax',
          name: 'Yamaha NMAX',
          variant: '(或同级车型)',
          badge: '最受欢迎',
          badgeColor: 'teal',
          description: '座桶空间大，动力强劲。探索拉布安巴佐最舒适的骑行选择，适合远途游览。',
          specs: ['自动挡', '155cc', 'ABS防抱死'],
          price: 160000,
          priceFormatted: 'Rp 160k',
        },
      ],
      categories: [
        {
          id: 'compact',
          name: 'Compact / Economy',
          priceFormatted: 'Rp 100.000',
          pricePeriod: '/ 天',
          badge: '高性价比之选',
          badgeColor: 'teal',
          description: '车身轻便、极其省油且操控轻盈。非常适合单人或情侣探索拉布安巴佐市区、咖啡馆与沿海公路。',
          specs: ['自动挡', '110cc – 125cc', '电喷 / 混动 Engine'],
          slides: [
            {
              id: 'beat',
              name: 'Honda Beat',
              subtitle: '110cc 电喷 • 轻巧超省油',
              price: 'Rp 100.000 / 天',
              imageKey: 'beat',
            },
            {
              id: 'scoopy',
              name: 'Honda Scoopy',
              subtitle: '110cc 智能钥匙 • 经典复古造型',
              price: 'Rp 100.000 / 天',
              imageKey: 'scoopy',
            },
            {
              id: 'fazzio',
              name: 'Yamaha Fazzio',
              subtitle: '125cc 混合动力 • 时尚轻便',
              price: 'Rp 100.000 / 天',
              imageKey: 'fazzio',
            },
          ],
        },
        {
          id: 'medium',
          name: 'Medium / Sport',
          priceFormatted: 'Rp 130.000+',
          pricePeriod: '/ 天',
          badge: '强劲爬坡动力',
          badgeColor: 'amber',
          description: '强劲马力与灵敏加速，轻松攀登拉布安巴佐陡峭山丘、观景台及更远环岛骑行路线。',
          specs: ['自动挡', '150cc – 160cc', '水冷 Engine'],
          slides: [
            {
              id: 'vario150',
              name: 'Honda Vario 150',
              subtitle: '150cc eSP 引擎 • 运动感提速',
              price: 'Rp 130.000 / 天',
              imageKey: 'vario150',
            },
            {
              id: 'vario160',
              name: 'Honda Vario 160',
              subtitle: '160cc 4气门 • 智能钥匙与强劲动力',
              price: 'Rp 140.000 / 天',
              imageKey: 'vario160',
            },
          ],
        },
        {
          id: 'maxi',
          name: 'Maxi Scooter',
          priceFormatted: 'Rp 160.000',
          pricePeriod: '/ 天',
          badge: '最受欢迎 & 最舒适',
          badgeColor: 'teal',
          description: '极致舒适与巡航稳定性。超大座桶可存放双肩背包，宽大双人柔软座椅，搭配 155cc 强劲引擎。',
          specs: ['自动挡', '155cc VVA', 'ABS / 盘式制动'],
          slides: [
            {
              id: 'nmax',
              name: 'Yamaha NMAX 155',
              subtitle: '155cc VVA 引擎 • 超大储物与宽大软座',
              price: 'Rp 160.000 / 天',
              imageKey: 'nmax',
            },
            {
              id: 'pcx',
              name: 'Honda PCX 155',
              subtitle: '155cc eSP+ • 奢华巡航骑行',
              price: 'Rp 160.000 / 天',
              imageKey: 'pcx',
            },
          ],
        },
      ],
    },
    whyUs: {
      tag: '我们的优势',
      title: '为真正的旅行者打造',
      items: [
        {
          icon: 'message-square',
          title: '便捷预订',
          description: '仅需 WhatsApp。无繁琐 App，无需注册账号，简单沟通即可确认。',
        },
        {
          icon: 'shield-check',
          title: '保养精良',
          description: '每辆车在交付前均经过严格检查。轮胎、刹车、灯光——均保持最佳状态。',
        },
        {
          icon: 'check-circle',
          title: '无需押金',
          description: '零预付押金。送车时只需支付日租金——支持现金或转账。',
        },
        {
          icon: 'heart',
          title: '本地贴心支持',
          description: '熟悉每条道路的本地团队。若遇突发情况，我们将迅速解决。',
        },
      ],
    },
    reserve: {
      tag: '立即预订',
      title: '预订摩托车',
      subtitle: '填写以下信息，我们将自动为您生成 WhatsApp 预订信息。',
      labels: {
        bike: '选择车型',
        bikePlaceholder: '请选择车型',
        pickupDate: '取车日期与时间',
        pickupTime: '08:00 AM',
        dropoffDate: '还车日期与时间',
        dropoffTime: '08:00 AM',
        hotelPickup: '送车地点 / 酒店名称',
        hotelPickupPlaceholder: '选择区域 / 输入酒店名称',
        hotelDropoff: '还车地点 / 酒店名称',
        hotelDropoffPlaceholder: '选择还车区域 / 酒店',
        email: '电子邮箱',
        social: 'INSTAGRAM / FACEBOOK / TIKTOK 账号',
        ageCheckbox: '骑行者年龄在 20 – 65 岁之间',
        submitBtn: '通过 WhatsApp 发送',
        note: '在当地通过 WhatsApp 租车非常普遍。发送信息给我们，其余交给我们处理。',
      },
    },
    exploreMore: {
      tag: '更多服务',
      title: '探索拉布安巴佐的深处魅力',
      subtitle: '需要舒适的包车服务用于团队陆地游或机场接送吗？',
      carBannerTitle: '私人包车 · 舒适出行',
      carBannerSubtitle: '无论景致漫游还是团队探险，我们都有适合您的完美车辆。',
      carBannerDesc: '安全可靠，由专业本地司机驾驶。',
      car1Title: '私人轿车/SUV (1 - 4 人)',
      car1Desc: '情侣、小家庭或商务出行的理想选择。',
      car2Title: 'HIACE 商务车 (最多 14 人)',
      car2Desc: '空间宽敞舒适，非常适合亲朋好友或大型团队。',
      ctaBtn: '咨询包车',
    },
    faq: {
      tag: '常见问题',
      title: '常见疑问解答',
      items: [
        {
          q: '租车需要提供什么证件？',
          a: '您只需提供身份证或护照、往返机票、酒店预订确认信以及活跃的社交媒体账号链接（Instagram/Facebook）以供快速核验。所有租赁均需通过此标准安全核验。',
        },
        {
          q: '送车范围涵盖哪些地方？',
          a: '我们的送车范围覆盖拉布安巴佐镇区、科莫多机场 (LBJ)、Katamaran、Marriott、La Prima、Sudamala、Bintang Flores 及 Ayana Komodo Resort。需要送往其他地点？随时询问——我们将妥善安排。',
        },
        {
          q: '需要支付押金吗？',
          a: '完全不需要押金。我们送车时您只需支付日租金——支持现金或银行转账。无刷卡手续费，无预扣款，透明无忧。',
        },
        {
          q: '如果骑行途中爆胎怎么办？',
          a: '请立即通过 WhatsApp 联系我们。我们将引导您前往最近的维修店（当地价格很实惠）或在需要时赶赴现场。作为当地人，我们认识镇上的每一位修车师傅。',
        },
        {
          q: '我需要驾驶执照吗？',
          a: '我们不强制要求您出示驾照即可租车。但印尼法律规定在公共道路骑行需持有有效驾照（国际驾照或本国驾照通常受认可）。',
        },
        {
          q: '如何归还摩托车？',
          a: '只需告知我们您的还车日期和入住酒店，我们将直接前往您的酒店取车，或在附近约定地点交接。十分便捷。',
        },
        {
          q: '如果摩托车受损或故障怎么办？',
          a: '交接车辆时请拍摄照片或视频，以保障双方权益。因使用意外造成的损失（如爆胎、划痕）由租客承担。若因非人为因素的内部机械故障导致车辆无法骑行，我们将免费为您更换车辆。',
        },
        {
          q: '摩托车骑行区域政策 (Riding Area Policy) 有何规定？',
          a: '租用摩托车仅限在拉布安巴佐及西芒加莱县区域内骑行（市区、机场、Waecicu、Rangko 溶洞、Batu Cermin、Melo 村、Cunca Wulang 瀑布）。出于安全及紧急救援保障考量，严禁将摩托车骑出西芒加莱县进行长途跨区旅行（如前往 Ruteng、Bajawa、克里穆图等），目前暂不提供长途跨区线路。',
        },
      ],
    },
    footer: {
      tagline: '拉布安巴佐轻松便捷租赁。本地贴心服务。',
      verifiedText: '支持本地银行转账，支持 Wise / Revolut',
      rights: '© 2026 hellobajo.go — 版权所有。',
    },
  },
};
