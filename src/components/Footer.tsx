import React from 'react';
import { Link } from 'react-router-dom';
import { Language, TranslationContent } from '../data/translations';
import { SITE_CONFIG } from '../data/siteConfig';
import { MapPin, Phone, Mail, Instagram, ShieldCheck, Bike, Car, Ship, BookOpen } from 'lucide-react';

interface FooterProps {
  t: TranslationContent;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ t, lang }) => {
  const topDestinations = [
    {
      name: {
        EN: 'Komodo Airport (LBJ) Delivery',
        ID: 'Antar-Jemput Bandara Komodo (LBJ)',
        ZH: '科莫多机场 (LBJ) 接送',
      },
      link: '/blog/complete-guide-scooter-rental-labuan-bajo',
    },
    {
      name: {
        EN: 'Golo Mori Coastal Highway',
        ID: 'Jalan Pesisir Golo Mori',
        ZH: 'Golo Mori 沿海景观公路',
      },
      link: '/blog/top-3-scenic-day-trips-labuan-bajo-scooter',
    },
    {
      name: {
        EN: 'Gua Rangko Natural Cave',
        ID: 'Gua Rangko (Kolam Alami)',
        ZH: 'Gua Rangko 蓝洞天然湖',
      },
      link: '/blog/top-3-scenic-day-trips-labuan-bajo-scooter',
    },
    {
      name: {
        EN: 'Bukit Cinta Sunset Peak',
        ID: 'Spot Sunset Bukit Cinta',
        ZH: 'Bukit Cinta 爱心山日落',
      },
      link: '/blog/top-3-scenic-day-trips-labuan-bajo-scooter',
    },
    {
      name: {
        EN: 'Waecicu Beach & Resort Area',
        ID: 'Pantai Waecicu & Area Resort',
        ZH: 'Waecicu 海滩与度假区',
      },
      link: '/blog/hidden-beaches-around-labuan-bajo-land-sea',
    },
    {
      name: {
        EN: 'Wae Rebo Overland Route',
        ID: 'Rute Overland Desa Wae Rebo',
        ZH: 'Wae Rebo 传统原住民村落',
      },
      link: '/blog/ultimate-guide-private-car-charter-labuan-bajo',
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer 4-Column / 5-Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block cursor-default">
              <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.name} className="h-10 w-auto brightness-200" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex flex-col space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{SITE_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {SITE_CONFIG.whatsappDisplay} (WhatsApp 24/7)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="https://instagram.com/hellobajo.go" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {SITE_CONFIG.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Rental Services */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
              {lang === 'EN' ? 'Rental Services' : lang === 'ZH' ? '租赁服务' : 'Layanan Sewa'}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <Bike className="w-3.5 h-3.5 text-teal-500 group-hover:text-teal-400" />
                  <span>{lang === 'EN' ? 'Scooter & Motorbike Rental' : lang === 'ZH' ? '摩托车/踏板车租赁' : 'Sewa Motor Labuan Bajo'}</span>
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <Car className="w-3.5 h-3.5 text-teal-500 group-hover:text-teal-400" />
                  <span>{lang === 'EN' ? 'Private City Tour & Car Charter' : lang === 'ZH' ? '私人包车/城市游' : 'Sewa Mobil & City Tour'}</span>
                </Link>
              </li>
              <li>
                <Link to="/boats" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <Ship className="w-3.5 h-3.5 text-teal-500 group-hover:text-teal-400" />
                  <span>{lang === 'EN' ? 'Speedboat & Phinisi Charter' : lang === 'ZH' ? '快艇与 Phinisi 帆船出海' : 'Speedboat & Kapal Phinisi'}</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <BookOpen className="w-3.5 h-3.5 text-teal-500 group-hover:text-teal-400" />
                  <span>{lang === 'EN' ? 'Travel Guides & Blog' : lang === 'ZH' ? '旅游攻略与指南' : 'Panduan Wisata & Blog'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Destinations (Active Links) */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
              {lang === 'EN' ? 'Top Destinations' : lang === 'ZH' ? '热门打卡路线' : 'Destinasi Populer'}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {topDestinations.map((dest, idx) => (
                <li key={idx}>
                  <Link to={dest.link} className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 shrink-0" />
                    <span className="line-clamp-1">{dest.name[lang] || dest.name.EN}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Guarantees & Payment Methods */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
              {lang === 'EN' ? 'Guarantees & Payment' : lang === 'ZH' ? '服务保障与支付' : 'Jaminan & Pembayaran'}
            </h3>
            <div className="space-y-3">
              {/* Payment & Deposit Policy Card */}
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{lang === 'EN' ? 'Payment & Deposit Policy' : lang === 'ZH' ? '押金与订金政策' : 'Ketentuan Pembayaran & DP'}</span>
                </div>
                
                <div className="space-y-1.5 text-[11px] leading-snug">
                  {/* Scooter Rental No Deposit */}
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-emerald-900/40">
                    <span className="font-semibold text-emerald-400 block text-[11px]">
                      {lang === 'EN' ? '🛵 Scooter Rental:' : lang === 'ZH' ? '🛵 摩托车租赁：' : '🛵 Sewa Motor:'}
                    </span>
                    <span className="text-slate-300 text-[10px]">
                      {lang === 'EN' ? 'No Deposit Required. Pay daily rate on delivery.' : lang === 'ZH' ? '无需押金，取车交付时结清租金。' : 'Bebas Uang Jaminan. Bayar saat motor diantar.'}
                    </span>
                  </div>

                  {/* Speedboat & Car Charter DP 10% */}
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-teal-900/40">
                    <span className="font-semibold text-teal-300 block text-[11px]">
                      {lang === 'EN' ? '🚐 Speedboat & Car Charter:' : lang === 'ZH' ? '🚐 快艇与包车：' : '🚐 Speedboat & Car Charter:'}
                    </span>
                    <span className="text-slate-300 text-[10px]">
                      {lang === 'EN' ? 'Requires 10% DP to lock & confirm schedule.' : lang === 'ZH' ? '需付 10% 订金以锁定与确认行程。' : 'Memerlukan DP 10% untuk mengamankan jadwal.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment badges */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-300">
                {SITE_CONFIG.paymentBadges.map((badge) => (
                  <span key={badge} className="bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Rights Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-slate-300 transition-colors">Scooter Rental</Link>
            <span>•</span>
            <Link to="/cars" className="hover:text-slate-300 transition-colors">Private City Tour</Link>
            <span>•</span>
            <Link to="/boats" className="hover:text-slate-300 transition-colors">Island Hopping & Boats</Link>
            <span>•</span>
            <Link to="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

