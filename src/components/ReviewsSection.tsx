import React from 'react';
import { Language } from '../data/translations';
import { REVIEWS_DATA } from '../data/reviewsData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-widest uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 RATING ON GOOGLE REVIEWS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'EN'
              ? 'Loved by Travelers from Around the Globe'
              : lang === 'ZH'
              ? '来自全球旅行者的真实好评'
              : 'Dipercaya & Disukai Wisatawan Dunia'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {lang === 'EN'
              ? 'Real feedback from real riders. See why HelloBajo is Labuan Bajo’s top-rated hassle-free scooter rental.'
              : lang === 'ZH'
              ? '真实租客原汁原味的反馈。了解为什么 HelloBajo 是拉布安巴佐高评分无忧摩托车租赁。'
              : 'Ulasan jujur dari penyewa asli. Bebas deposit, unit mulus, dan pelayanan cepat via WhatsApp.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#faf8f5] p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{rev.date}</span>
                </div>

                <Quote className="w-6 h-6 text-teal-600/30 mb-2" />
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span className="text-base">{rev.flag}</span>
                  </h4>
                  <p className="text-[11px] text-teal-700 font-semibold mt-0.5">
                    {rev.scooterRented}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60 font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Badge */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-medium shadow-md">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 font-extrabold text-sm">4.9 ★★★★★</span>
            </div>
            <span className="text-slate-400">|</span>
            <span>Over 500+ Happy Riders in Labuan Bajo</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-teal-400 font-semibold">100% No Deposit Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
};
