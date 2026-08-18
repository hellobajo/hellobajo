import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, TranslationContent } from '../data/translations';
import { MessageCircle, Menu, X, Bike, Car, Ship, BookOpen, ChevronDown, Check } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { getContextualWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  t: TranslationContent;
}

export const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange, t }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  const whatsappUrl = getContextualWhatsAppUrl(location.pathname, lang);

  const commercialNavItems = [
    {
      path: '/',
      label: lang === 'EN' ? 'Scooter Rental' : lang === 'ZH' ? '摩托车租赁' : 'Sewa Motor',
      icon: Bike,
    },
    {
      path: '/cars',
      label: lang === 'EN' ? 'Private City Tour' : lang === 'ZH' ? '私人包车/城市游' : 'Private City Tour',
      icon: Car,
    },
    {
      path: '/boats',
      label: lang === 'EN' ? 'Island Hopping & Boats' : lang === 'ZH' ? '跳岛游与船只' : 'Island Hopping & Boats',
      icon: Ship,
    },
  ];

  const guideNavItem = {
    path: '/blog',
    label: lang === 'EN' ? 'Travel Guides' : lang === 'ZH' ? '攻略指南' : 'Panduan Wisata',
    icon: BookOpen,
  };

  const allNavItems = [...commercialNavItems, guideNavItem];

  const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'ID', label: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ZH', label: '中文 (Chinese)', flag: '🇨🇳' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo */}
          <Link to="/blog" className="flex items-center gap-2 shrink-0 group" aria-label="HelloBajo Travel Guides">
            <div className="relative flex items-center justify-center h-8 sm:h-12">
              <img 
                src={SITE_CONFIG.logo} 
                alt={SITE_CONFIG.name} 
                loading="eager"
                decoding="async"
                width="160"
                height="48"
                className="h-8 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Mobile Quick Business Icons Bar (🛵 🚗 🚤 📖) */}
          <div className="flex md:hidden items-center gap-1 bg-stone-100/90 p-1 rounded-2xl border border-stone-200/80 shadow-2xs">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  aria-label={item.label}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-teal-600 text-white shadow-xs font-bold scale-105'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-stone-200/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              );
            })}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {/* Commercial Service Pill Buttons */}
            <div className="flex items-center gap-1.5 lg:gap-2">
              {commercialNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 lg:gap-2 px-3.5 py-2 rounded-full transition-all duration-200 text-xs lg:text-sm font-extrabold ${
                      active
                        ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20 border border-teal-600'
                        : 'bg-stone-100/90 text-slate-700 hover:text-teal-700 hover:bg-teal-50 border border-stone-200/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-teal-600'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Subtle Vertical Divider */}
            <div className="h-5 w-px bg-slate-200/80 mx-1 lg:mx-2" aria-hidden="true" />

            {/* Informational Travel Guides Text Link */}
            {(() => {
              const Icon = guideNavItem.icon;
              const active = isActive(guideNavItem.path);
              return (
                <Link
                  to={guideNavItem.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-all text-xs lg:text-sm rounded-md ${
                    active
                      ? 'text-teal-700 font-extrabold underline decoration-teal-600 decoration-2 underline-offset-4'
                      : 'text-slate-600 hover:text-slate-900 font-semibold hover:bg-stone-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{guideNavItem.label}</span>
                </Link>
              );
            })()}
          </nav>

          {/* Right Action Controls (Lang Toggle & WhatsApp CTA) */}
          <div className="flex items-center gap-2">
            
            {/* Desktop Language Selector Pill Capsule */}
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-full text-xs font-semibold border border-slate-200/60">
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'EN'
                    ? 'bg-white text-teal-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ID')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'ID'
                    ? 'bg-white text-teal-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => onLanguageChange('ZH')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'ZH'
                    ? 'bg-white text-teal-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                中文
              </button>
            </div>

            {/* Mobile Compact Language Dropdown Toggle */}
            <div className="relative md:hidden">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-full border border-slate-200/80 cursor-pointer transition-colors"
                aria-label="Select Language"
              >
                <span>{lang === 'ZH' ? '中文' : lang}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Floating Language Options Dropdown */}
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {LANG_OPTIONS.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          onLanguageChange(item.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-left transition-colors cursor-pointer ${
                          lang === item.code ? 'bg-teal-50 text-teal-700 font-extrabold' : 'text-slate-700 hover:bg-stone-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.label}</span>
                        </span>
                        {lang === item.code && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Direct WhatsApp Pill CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-extrabold rounded-full shadow-sm hover:shadow-teal-600/20 hover:shadow-md transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>{t.nav.whatsappBtn}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-1">
            {lang === 'EN' ? 'Services & Rentals' : lang === 'ZH' ? '预订服务' : 'Layanan Utama'}
          </div>
          <div className="space-y-1.5">
            {commercialNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-extrabold transition-all ${
                    active
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-teal-600'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-200/80">
            <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-1 mb-1.5">
              {lang === 'EN' ? 'Articles & Guides' : lang === 'ZH' ? '攻略与文章' : 'Artikel & Panduan'}
            </div>
            {(() => {
              const Icon = guideNavItem.icon;
              const active = isActive(guideNavItem.path);
              return (
                <Link
                  to={guideNavItem.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? 'text-teal-700 font-extrabold underline underline-offset-4 decoration-teal-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{guideNavItem.label}</span>
                </Link>
              );
            })()}
          </div>
          
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white text-sm font-extrabold rounded-full shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>{t.nav.whatsappBtn}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
