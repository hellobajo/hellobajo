import React from 'react';
import { Camera, Star, ShieldCheck } from 'lucide-react';
import { Language } from '../data/translations';
import { HANDOVER_GALLERY_IMAGES } from '../data/images';

interface HandoverGalleryProps {
  lang?: Language;
}


export const HandoverGallery: React.FC<HandoverGalleryProps> = ({ lang = 'EN' }) => {
  // Language texts
  const eyebrowText =
    lang === 'EN'
      ? 'REAL DELIVERIES. HAPPY CUSTOMERS.'
      : lang === 'ZH'
      ? '真实交付 · 满意客户'
      : 'PENGANTARAN NYATA. PELANGGAN PUAS.';

  const headingText =
    lang === 'EN'
      ? 'Trusted Handover Gallery'
      : lang === 'ZH'
      ? '交车实拍图库'
      : 'Galeri Serah Terima Motor';

  const ratingBadge = lang === 'EN' ? '5.0 Customer Rating' : lang === 'ZH' ? '5.0 卓越客户评分' : '5.0 Rating Pelanggan';
  const deliveryBadge = lang === 'EN' ? 'Verified Airport & Hotel Delivery' : lang === 'ZH' ? '验证波德/机场与酒店送车' : 'Terverifikasi Antar Airport & Hotel';

  // Create doubled list for seamless infinite loop animation
  const doubledPhotos = [...HANDOVER_GALLERY_IMAGES, ...HANDOVER_GALLERY_IMAGES];

  return (
    <section id="handover-gallery" className="py-14 sm:py-20 bg-stone-50/80 overflow-hidden border-y border-stone-200/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        {/* 1. Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-900 text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-2xs mb-3">
            <Camera className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="tracking-wide uppercase">{eyebrowText}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {headingText}
          </h2>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-4">
            <div className="inline-flex items-center gap-1.5 bg-white text-slate-800 border border-stone-200/90 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span>{ratingBadge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white text-slate-800 border border-stone-200/90 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{deliveryBadge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Seamless Moving Auto-Marquee Container (No pause on hover) */}
      <div className="w-full overflow-hidden relative">
        {/* Left & Right Subtle Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-stone-50/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-stone-50/90 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex items-center gap-4 sm:gap-6 py-2 px-3">
          {doubledPhotos.map((imgUrl, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[210px] sm:w-[260px] lg:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-md border border-stone-200/80 bg-stone-200"
            >
              <img
                src={imgUrl}
                alt={`Handover delivery photo ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Subtext */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm text-slate-700 font-medium mt-8 sm:mt-10">
          {lang === 'EN'
            ? '⚡ Average delivery time: 15–20 minutes to any hotel or airport gate in Labuan Bajo.'
            : lang === 'ZH'
            ? '⚡ 平均送车时间：15-20 分钟覆盖拉布安巴佐任意酒店与机场航站楼。'
            : '⚡ Rata-rata pengantaran: 15–20 menit ke seluruh hotel & gerbang bandara Labuan Bajo.'}
        </p>
      </div>
    </section>
  );
};
