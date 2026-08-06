import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, TranslationContent } from '../data/translations';
import { MessageCircle, Menu, X, Bike, Car, Ship, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  t: TranslationContent;
}

export const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange, t }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? 'Hi HelloBajo! I am interested in renting a scooter in Labuan Bajo.'
      : lang === 'ZH'
      ? '你好 HelloBajo！我想咨询在拉布安巴佐租摩托车。'
      : 'Halo HelloBajo! Saya mau tanya sewa motor di Labuan Bajo.'
  )}`;

  const navItems = [
    {
      path: '/',
      label: lang === 'EN' ? 'Scooters' : lang === 'ZH' ? '摩托车' : 'Sewa Motor',
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
    {
      path: '/blog',
      label: lang === 'EN' ? 'Travel Guides' : lang === 'ZH' ? '攻略指南' : 'Panduan Wisata',
      icon: BookOpen,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="HelloBajo Home">
            <div className="relative flex items-center justify-center h-10 sm:h-12">
              <img 
                src={SITE_CONFIG.logo} 
                alt={SITE_CONFIG.name} 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-teal-50 text-teal-700 font-extrabold border border-teal-200/70 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls (Lang Toggle & WhatsApp CTA) */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector Pill Capsule */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-semibold border border-slate-200/60">
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
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                  active ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
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
