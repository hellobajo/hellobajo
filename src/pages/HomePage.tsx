import React, { useEffect } from 'react';
import { Language, TranslationContent } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { Hero } from '../components/Hero';
import { QuickSearchWidget } from '../components/QuickSearchWidget';
import { ItineraryTimeline } from '../components/ItineraryTimeline';
import { PricingCard } from '../components/PricingCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ReserveForm } from '../components/ReserveForm';
import { AlternativeDestinations } from '../components/AlternativeDestinations';
import { FaqAccordion } from '../components/FaqAccordion';

interface HomePageProps {
  lang: Language;
  t: TranslationContent;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, t }) => {
  const [selectedBikeId, setSelectedBikeId] = React.useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectScooter = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    const reserveElement = document.getElementById('reserve');
    if (reserveElement) {
      reserveElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      {/* Hero Section */}
      <Hero t={t} lang={lang} />

      {/* Quick Search & Calculator Widget */}
      <div className="px-4 sm:px-6 lg:px-8">
        <QuickSearchWidget lang={lang} />
      </div>

      {/* How It Works Timeline */}
      <ItineraryTimeline t={t} lang={lang} />

      {/* Fleet & Pricing Cards */}
      <PricingCard t={t} lang={lang} onSelectScooter={handleSelectScooter} />

      {/* Why Choose Us */}
      <WhyChooseUs t={t} />

      {/* WhatsApp Reservation Form */}
      <ReserveForm t={t} lang={lang} selectedBikeId={selectedBikeId} />

      {/* Cross Promotion: Cars & Speedboats */}
      <AlternativeDestinations t={t} lang={lang} />

      {/* FAQ Accordion */}
      <FaqAccordion t={t} />
    </div>
  );
};
