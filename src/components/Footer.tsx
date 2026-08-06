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
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.name} className="h-10 w-auto brightness-200" />
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-300">
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

          {/* Col 3: Services & Rental Routes */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
              {lang === 'EN' ? 'Rental Services' : lang === 'ZH' ? '租赁服务' : 'Layanan Sewa'}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <Bike className="w-3.5 h-3.5 text-teal-500" />
                  <span>{lang === 'EN' ? 'Scooter & Motorbike Rental' : lang === 'ZH' ? '摩托车/踏板车租赁' : 'Sewa Motor Labuan Bajo'}</span>
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-teal-500" />
                  <span>{lang === 'EN' ? 'Private City Tour' : lang === 'ZH' ? '私人包车/城市游' : 'Private City Tour'}</span>
                </Link>
              </li>
              <li>
                <Link to="/boats" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <Ship className="w-3.5 h-3.5 text-teal-500" />
                  <span>{lang === 'EN' ? 'Island Hopping & Boats' : lang === 'ZH' ? '跳岛游与船只' : 'Island Hopping & Boats'}</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                  <span>{lang === 'EN' ? 'Labuan Bajo Travel Guides' : lang === 'ZH' ? '旅游攻略与指南' : 'Panduan Wisata Bajo'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Scooter Destinations */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
              {lang === 'EN' ? 'Top Destinations' : lang === 'ZH' ? '骑行打卡景点' : 'Rute Pesisir'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Komodo Airport (LBJ) Pickup</li>
              <li>Golo Mori Coastal Highway</li>
              <li>Gua Rangko Natural Cave</li>
              <li>Bukit Cinta Sunset Peak</li>
              <li>Waecicu Beach & Resort Area</li>
              <li>Wae Rebo Overland Route</li>
            </ul>
          </div>

          {/* Col 5: Guarantees & Payment Methods */}
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-4">
              {lang === 'EN' ? 'Guarantees & Payment' : lang === 'ZH' ? '服务保障与支付' : 'Jaminan & Pembayaran'}
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'EN' ? 'No Deposit Required' : lang === 'ZH' ? '无需押金' : 'Bebas Uang Jaminan'}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {lang === 'EN' ? 'Pay daily rate on delivery by cash or bank transfer.' : lang === 'ZH' ? '送车交付时结清租金即可。' : 'Bayar saat motor diantar via cash / transfer.'}
                </p>
              </div>

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
