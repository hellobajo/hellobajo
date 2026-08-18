import React, { useState, useEffect, useRef } from 'react';
import { TranslationContent, Language, ScooterCategoryItem } from '../data/translations';
import { SCOOTER_IMAGES } from '../data/images';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface PricingCardProps {
  t: TranslationContent;
  lang: Language;
  onSelectScooter?: (bikeId: string) => void;
}

const getScooterImage = (key: string) => {
  if (key in SCOOTER_IMAGES) {
    return SCOOTER_IMAGES[key as keyof typeof SCOOTER_IMAGES];
  }
  return SCOOTER_IMAGES.beat;
};

interface CategoryCardProps {
  category: ScooterCategoryItem;
  lang: Language;
  bookBtnText: string;
  onSelectBike: (bikeId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, lang, bookBtnText, onSelectBike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = category.slides.length;
  const currentSlide = category.slides[currentIndex] || category.slides[0];

  // Pause auto-play for a specified duration (e.g. 10 seconds when a model is selected)
  const pauseForDuration = (durationMs: number = 10000) => {
    setIsPaused(true);
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      pauseTimerRef.current = null;
    }, durationMs);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  // Auto-Play Timer: 3 Seconds smooth transition
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const handleMouseEnter = () => {
    if (!pauseTimerRef.current) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!pauseTimerRef.current) {
      setIsPaused(false);
    }
  };

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      if (!pauseTimerRef.current) setIsPaused(false);
      return;
    }
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 35; // minimum swipe distance in pixels

    if (diffX > threshold) {
      // Swiped Left -> Next Slide
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      pauseForDuration(5000);
    } else if (diffX < -threshold) {
      // Swiped Right -> Previous Slide
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      pauseForDuration(5000);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    pauseForDuration(5000);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    pauseForDuration(5000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-200/80 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div>
        {/* Advanced Interactive Image Slider */}
        <div
          className="relative h-48 sm:h-64 lg:h-72 w-full bg-stone-100 overflow-hidden select-none cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images Stack with Crossfade Effect */}
          {category.slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const imgSrc = getScooterImage(slide.imageKey);

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                }`}
              >
                <img
                  src={imgSrc}
                  alt={slide.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}

          {/* Top Header Overlay Badges */}
          <div className="absolute top-2.5 sm:top-3.5 inset-x-2.5 sm:inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
            {/* Auto-Play Status / Paused Pill */}
            <div className="flex items-center gap-1.5">
              {isPaused ? (
                <span className="bg-slate-900/85 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-400/30 shadow-md flex items-center gap-1">
                  <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-pulse" />
                  <span>{lang === 'EN' ? 'Paused' : lang === 'ZH' ? '已暂停' : 'Ditahan'}</span>
                </span>
              ) : (
                <span className="bg-slate-900/70 backdrop-blur-md text-slate-200 text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-700/50 shadow-md flex items-center gap-1">
                  <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-teal-400" />
                  <span>3s Auto</span>
                </span>
              )}
            </div>

            {/* Category Badge */}
            {category.badge && (
              <span className={`text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md backdrop-blur-md border ${
                category.badgeColor === 'amber'
                  ? 'bg-amber-400/95 text-amber-950 border-amber-300'
                  : 'bg-teal-500/95 text-white border-teal-300'
              }`}>
                {category.badge}
              </span>
            )}
          </div>

          {/* Overlay Details on Photo (Current Active Model) */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 inset-x-2.5 sm:inset-x-3.5 z-20 pointer-events-none flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1 bg-teal-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md mb-0.5 shadow-xs truncate max-w-full">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-200 shrink-0" />
                <span className="truncate">{currentSlide.name}</span>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md shadow-xs inline-block line-clamp-1 border border-stone-200/80">
                  {currentSlide.subtitle}
                </p>
              </div>
            </div>

            {/* Counter Badge */}
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 sm:py-1 rounded-md border border-slate-700/60 shrink-0">
              {currentIndex + 1} / {totalSlides}
            </span>
          </div>

          {/* Manual Chevron Controls (Left & Right Buttons) */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-30 bg-slate-950/60 hover:bg-slate-900 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-30 bg-slate-950/60 hover:bg-slate-900 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Pagination Dots at Bottom Center */}
          <div className="absolute bottom-1.5 sm:bottom-2.5 inset-x-0 z-30 flex items-center justify-center gap-1.5">
            {category.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                  pauseForDuration(10000);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-5 sm:w-6 bg-teal-400 shadow-xs'
                    : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {category.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
            {category.description}
          </p>

          {/* Interactive Slide Selector Pills */}
          <div className="mt-3 pt-2.5 border-t border-stone-100">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              {lang === 'EN' ? 'Available Models:' : lang === 'ZH' ? '本类型包含车款：' : 'Pilihan Model:'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {category.slides.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                const slidePriceShort = slide.price.split('/')[0].trim();
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      pauseForDuration(10000);
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 border cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <CheckCircle2 className={`w-3 h-3 shrink-0 ${isSelected ? 'text-white' : 'text-teal-600'}`} />
                    <span>{slide.name}</span>
                    <span className={`text-[10px] font-semibold opacity-90 ${isSelected ? 'text-teal-100' : 'text-stone-600'}`}>
                      ({slidePriceShort})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specs Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {category.specs.map((spec, specIdx) => (
              <span
                key={specIdx}
                className="px-2 py-0.5 bg-teal-50 border border-teal-200/80 text-teal-900 text-[10px] sm:text-[11px] font-bold rounded-md"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Price & Action Button */}
      <div className="p-4 sm:p-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1 shrink-0">
          <span className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentSlide.price ? currentSlide.price.split('/')[0].trim() : category.priceFormatted}
          </span>
          <span className="text-xs text-slate-600 font-semibold">
            {category.pricePeriod}
          </span>
        </div>

        <button
          onClick={() => onSelectBike(currentSlide.id)}
          className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:shadow-teal-600/30 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
        >
          {bookBtnText}
        </button>
      </div>
    </div>
  );
};

export const PricingCard: React.FC<PricingCardProps> = ({ t, lang, onSelectScooter }) => {
  const handleSelectBike = (bikeId: string) => {
    if (onSelectScooter) {
      onSelectScooter(bikeId);
    } else {
      const scooterElement = document.getElementById('scooter-rental');
      if (scooterElement) {
        scooterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Fallback to t.fleet.categories or construct default categories
  const categories: ScooterCategoryItem[] = t.fleet.categories || [
    {
      id: 'compact',
      name: 'Compact / Economy',
      priceFormatted: 'Rp 100.000',
      pricePeriod: lang === 'EN' ? '/ day' : lang === 'ZH' ? '/ 天' : '/ hari',
      badge: 'Best Value Choice',
      badgeColor: 'teal',
      description: 'Compact, fuel-efficient, and highly agile. Ideal for solo riders and couples cruising town streets, cafes, and beach roads.',
      specs: ['Automatic', '110cc – 125cc', 'EFI / Hybrid'],
      slides: [
        { id: 'beat', name: 'Honda Beat', subtitle: '110cc EFI • Light & Fuel-Efficient', price: 'Rp 100.000 / day', imageKey: 'beat' },
        { id: 'scoopy', name: 'Honda Scoopy', subtitle: '110cc Smart Key • Retro Style', price: 'Rp 100.000 / day', imageKey: 'scoopy' },
        { id: 'fazzio', name: 'Yamaha Fazzio', subtitle: '125cc Hybrid • Modern Chic', price: 'Rp 100.000 / day', imageKey: 'fazzio' },
      ],
    },
    {
      id: 'medium',
      name: 'Medium / Sport',
      priceFormatted: 'Rp 130.000+',
      pricePeriod: lang === 'EN' ? '/ day' : lang === 'ZH' ? '/ 天' : '/ hari',
      badge: 'Hill Climbing Power',
      badgeColor: 'amber',
      description: 'Stronger horsepower & sharp acceleration for effortlessly navigating steep Labuan Bajo hill climbs, scenic viewpoints, and longer island rides.',
      specs: ['Automatic', '150cc – 160cc', 'Liquid Cooled'],
      slides: [
        { id: 'vario150', name: 'Honda Vario 150', subtitle: '150cc eSP Engine • Sporty Acceleration', price: 'Rp 130.000 / day', imageKey: 'vario150' },
        { id: 'vario160', name: 'Honda Vario 160', subtitle: '160cc eSP+ 4-Valve • Smart Key & Power', price: 'Rp 140.000 / day', imageKey: 'vario160' },
      ],
    },
    {
      id: 'maxi',
      name: 'Maxi Scooter',
      priceFormatted: 'Rp 175.000',
      pricePeriod: lang === 'EN' ? '/ day' : lang === 'ZH' ? '/ 天' : '/ hari',
      badge: 'Most Popular & Comfortable',
      badgeColor: 'teal',
      description: 'Ultimate comfort & highway stability. Features generous under-seat storage for backpacks, wide plush double seat, and powerful 155cc engine.',
      specs: ['Automatic', '155cc VVA', 'ABS / Disc Brake'],
      slides: [
        { id: 'nmax', name: 'Yamaha NMAX 155', subtitle: '155cc VVA Engine • Big Storage & Plush Seat', price: 'Rp 175.000 / day', imageKey: 'nmax' },
        { id: 'pcx', name: 'Honda PCX 155', subtitle: '155cc eSP+ • Luxury Comfort Cruiser', price: 'Rp 175.000 / day', imageKey: 'pcx' },
      ],
    },
  ];

  return (
    <section id="fleet" className="py-10 sm:py-20 bg-[#faf8f5] scroll-mt-16 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.fleet.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5 sm:mt-3">
            {t.fleet.title}
          </h2>
          <p className="text-slate-700 mt-2 sm:mt-3 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.fleet.subtitle}
          </p>
        </div>

        {/* 3-Card Category Grid with Interactive Carousels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              lang={lang}
              bookBtnText={t.fleet.bookBtn}
              onSelectBike={handleSelectBike}
            />
          ))}
        </div>

        {/* Availability & Photo Example Disclaimer */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50/90 text-amber-900 px-4 py-2 rounded-xl border border-amber-200/80 shadow-xs text-xs sm:text-sm font-medium">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {lang === 'EN'
                ? 'Unit availability, exact color, and year may vary depending on daily stock. Photos are for visual reference.'
                : lang === 'ZH'
                ? '具体车型、颜色与年份视当日库存而定，所展示图片仅供参考。'
                : 'Ketersediaan unit, warna, dan tahun motor menyesuaikan stok harian. Foto adalah contoh visual.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
