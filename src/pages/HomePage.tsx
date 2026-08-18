import React, { useEffect, useState } from 'react';
import { Language, TranslationContent } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { Hero } from '../components/Hero';
import { ItineraryTimeline } from '../components/ItineraryTimeline';
import { PricingCard } from '../components/PricingCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { HandoverGallery } from '../components/HandoverGallery';
import { AlternativeDestinations } from '../components/AlternativeDestinations';
import { FaqAccordion } from '../components/FaqAccordion';
import { ScooterBookingModal } from '../components/ScooterBookingModal';
import { Bike } from 'lucide-react';

interface HomePageProps {
  lang: Language;
  t: TranslationContent;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, t }) => {
  const [selectedBikeId, setSelectedBikeId] = useState<string>('');
  const [isScooterModalOpen, setIsScooterModalOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectScooter = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setIsScooterModalOpen(true);
  };

  // Schema.org Structured Data for Local Business / Auto Rental
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'HelloBajo Scooter Rental Labuan Bajo',
    description: 'Hassle-Free Scooter & Motorbike Rental in Labuan Bajo with easy delivery by staff (Rp 20k/trip) to Komodo Airport (LBJ) and no security deposit required.',
    url: 'https://hellobajo.com',
    telephone: '+628170788181',
    email: 'hellobajo.go@gmail.com',
    priceRange: 'Rp 100,000 - Rp 175,000 / day',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Labuan Bajo',
      addressRegion: 'Nusa Tenggara Timur',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-8.4908',
      longitude: '119.8789',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '520',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '22:00',
    },
  };

  const pageTitle =
    lang === 'EN'
      ? 'HelloBajo — Easy & Hassle-Free Scooter Rental in Labuan Bajo'
      : lang === 'ZH'
      ? 'HelloBajo — 拉布安巴佐无忧摩托车租赁 | 科莫多机场专人送车'
      : 'HelloBajo — Sewa Motor Labuan Bajo Mulus & Bebas Deposit';

  const pageDescription =
    lang === 'EN'
      ? 'Rent automatic scooters in Labuan Bajo (Honda Beat, Scoopy, Yamaha NMAX). Easy delivery by staff (Rp 20k/trip) to Komodo Airport (LBJ), hotels, or villas. No deposit required.'
      : lang === 'ZH'
      ? '拉布安巴佐自动挡摩托车租赁（Honda Beat, Scoopy, Yamaha NMAX）。专人送车至科莫多机场 (LBJ) 及酒店 (Rp 20k/次)，零押金，赠免费头盔与雨衣。'
      : 'Sewa motor Labuan Bajo mulus & bebas deposit. Antar jemput ke Bandara Komodo (LBJ), hotel, atau villa (biaya petugas Rp 20rb). Termasuk 2 helm SNI & jas hujan.';

  return (
    <div>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://hellobajo.com"
        schema={localBusinessSchema}
      />

      {/* Sub-Header Section Navigation Bar for Scooter Page */}
      <div className="bg-white border-b border-stone-200/80 sticky top-16 sm:top-20 z-40 backdrop-blur-md bg-white/95 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start sm:justify-center h-12 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold text-slate-600 space-x-6 sm:space-x-10">
          <a
            href="#scooter-rental"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5"
          >
            <Bike className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === 'EN' ? "Let's Ride" : lang === 'ZH' ? '骑行体验' : "Let's Ride"}</span>
          </a>
          <a
            href="#fleet"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Our Fleet & Rates' : lang === 'ZH' ? '车队与价格' : 'Pilihan Motor & Tarif'}
          </a>
          <a
            href="#how-it-works"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'How It Works' : lang === 'ZH' ? '租车流程' : 'Cara Sewa'}
          </a>
          <a
            href="#why-us"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Why Us' : lang === 'ZH' ? '为什么选择我们' : 'Why Us'}
          </a>
          <a
            href="#handover-gallery"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            {lang === 'EN' ? 'Gallery' : lang === 'ZH' ? '实拍图库' : 'Galeri'}
          </a>
          <button
            onClick={() => {
              setSelectedBikeId('');
              setIsScooterModalOpen(true);
            }}
            className="text-teal-600 hover:text-teal-700 font-extrabold transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            {lang === 'EN' ? 'Book a Scooter' : lang === 'ZH' ? '预订摩托车' : 'Pesan Motor'}
          </button>
          <a
            href="#faq"
            className="hover:text-teal-600 transition-colors whitespace-nowrap py-1"
          >
            FAQ
          </a>
        </div>
      </div>

      {/* Hero Section with Unified Instant Scooter Booking Widget */}
      <Hero t={t} lang={lang} onSelectScooter={handleSelectScooter} />

      {/* How It Works Timeline */}
      <ItineraryTimeline t={t} lang={lang} />

      {/* Fleet & Pricing Cards */}
      <PricingCard t={t} lang={lang} onSelectScooter={handleSelectScooter} />

      {/* Why Choose Us */}
      <WhyChooseUs t={t} />

      {/* Social Proof & Handover Gallery */}
      <HandoverGallery lang={lang} />

      {/* Cross Promotion: Cars & Speedboats */}
      <AlternativeDestinations t={t} lang={lang} />

      {/* FAQ Accordion */}
      <FaqAccordion t={t} />

      {/* Scooter Booking Pop-up Modal */}
      <ScooterBookingModal
        isOpen={isScooterModalOpen}
        onClose={() => setIsScooterModalOpen(false)}
        lang={lang}
        initialBikeId={selectedBikeId}
      />
    </div>
  );
};
