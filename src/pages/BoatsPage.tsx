import React, { useState, useEffect } from 'react';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { BOAT_CHARTERS } from '../data/boatsData';
import { SITE_CONFIG } from '../data/siteConfig';
import { SPEEDBOAT_BANNER } from '../data/images';
import { Ship, Anchor, LifeBuoy, MapPin, CheckCircle, MessageCircle, Users, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface BoatsPageProps {
  lang: Language;
}

export const BoatsPage: React.FC<BoatsPageProps> = ({ lang }) => {
  const [selectedBoat, setSelectedBoat] = useState(BOAT_CHARTERS[0].name);
  const [paxCount, setPaxCount] = useState(2);
  const [tourDate, setTourDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppBoatBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'EN'
        ? `Hi HelloBajo! I am interested in booking a Komodo boat tour:\n• Charter: ${selectedBoat}\n• Date: ${tourDate}\n• Guests: ${paxCount} Person(s)\n• Please share availability and details!`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想预订科莫多出海包船/一日游：\n• 船型: ${selectedBoat}\n• 出海日期: ${tourDate}\n• 人数: ${paxCount} 人\n• 请确认位子与详细安排！`
        : `Halo HelloBajo! Saya mau booking tour kapal Komodo:\n• Kapal: ${selectedBoat}\n• Tgl Tour: ${tourDate}\n• Jumlah Orang: ${paxCount} Pax\n• Mohon info ketersediaan & harganya!`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const pageTitle =
    lang === 'EN'
      ? 'Komodo Island Speedboat Day Tour & Luxury Phinisi Charter | HelloBajo'
      : lang === 'ZH'
      ? '科莫多岛出海一日游与 Phinisi 豪华帆船包船 | HelloBajo'
      : 'Sewa Speedboat & Kapal Phinisi Labuan Bajo — Open & Private Komodo Tour';

  const pageDescription =
    lang === 'EN'
      ? 'Book Komodo 6-destination speedboat day tours and private luxury Phinisi boat charters in Labuan Bajo. Visit Padar Island, Pink Beach, Komodo Dragons, and Manta Point.'
      : lang === 'ZH'
      ? '预订科莫多 6 大经典景点高速快艇一日游与私人 Phinisi 豪华帆船包船。打卡帕达尔山顶、粉红沙滩、科莫多巨蜥与魔鬼鱼浮潜。'
      : 'Sewa speedboat Komodo 1 hari 6 destinasi & charter kapal Phinisi kayu mewah. Jelajah Pulau Padar, Pink Beach, Komodo, Taka Makassar, & Manta Point.';

  return (
    <div className="bg-[#faf8f5] text-slate-800 pt-6 pb-16">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://hellobajo.com/boats"
      />

      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-50 mix-blend-overlay">
          <img src={SPEEDBOAT_BANNER} alt="Komodo boat charter" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-widest">
            <Ship className="w-4 h-4" />
            <span>{lang === 'EN' ? 'KOMODO ISLAND BOAT CHARTERS' : lang === 'ZH' ? '科莫多岛出海包船 & 一日游' : 'SEWA SPEEDBOAT & PHINISI KOMODO'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {lang === 'EN'
              ? 'Sail to Komodo National Park in Speed & Style'
              : lang === 'ZH'
              ? '乘风破浪 · 探索科莫多梦幻海洋'
              : 'Jelajah Taman Nasional Komodo dengan Speedboat & Phinisi'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'EN'
              ? 'From 1-day open group speedboat tours covering 6 flagship islands to exclusive luxury Phinisi liveaboard charters with private cabins & chefs.'
              : lang === 'ZH'
              ? '从一日游打卡 6 大经典岛屿的高速快艇，到包含独立空调船舱与私人厨师的 Phinisi 顶级豪华印尼帆船包船。'
              : 'Pilihan tur speedboat 1 hari jelajah 6 destinasi utama atau charter kapal kayu Phinisi mewah lengkap dengan kabin AC & chef pribadi.'}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-semibold text-teal-200">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <Anchor className="w-4 h-4 text-teal-400" />
              {lang === 'EN' ? 'Twin Engine Speedboats' : lang === 'ZH' ? '双发高功率快艇' : 'Speedboat Mesin Ganda'}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <LifeBuoy className="w-4 h-4 text-teal-400" />
              {lang === 'EN' ? 'Certified Life Vests & Snorkel Gear' : lang === 'ZH' ? '专业救生衣与浮潜装备' : 'Alat Snorkeling & Pelampung SNI'}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <Award className="w-4 h-4 text-teal-400" />
              {lang === 'EN' ? 'Licensed Komodo Park Guide' : lang === 'ZH' ? '持牌国家公园导游' : 'Guide Taman Nasional Komodo'}
            </span>
          </div>
        </div>
      </section>

      {/* Boat Options Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {lang === 'EN' ? 'Choose Your Sea Journey' : lang === 'ZH' ? '选择您的出海体验' : 'Pilihan Paket Kapal Komodo'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'EN'
              ? 'High-speed day trips or overnight wooden Phinisi yachts equipped with AC cabins.'
              : lang === 'ZH'
              ? '高速一日游或配备空调船舱的过夜木质 Phinisi 豪华帆船。'
              : 'Speedboat cepat 1 hari atau kapal Phinisi kayu mewah untuk menginap.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BOAT_CHARTERS.map((boat) => (
            <div
              key={boat.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={boat.image}
                    alt={boat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {boat.badge && (
                    <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {boat.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{boat.duration}</span>
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {boat.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {boat.description[lang]}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <strong className="block text-[11px] text-slate-400 uppercase tracking-wider">
                      {lang === 'EN' ? 'Destinations Included:' : lang === 'ZH' ? '包含打卡景点：' : 'Destinasi yang Dikunjungi:'}
                    </strong>
                    <div className="grid grid-cols-1 gap-1">
                      {boat.destinations.map((dest) => (
                        <div key={dest} className="flex items-center gap-2 text-xs text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{dest}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-stone-100">
                    <strong className="block text-[11px] text-slate-400 uppercase tracking-wider">
                      {lang === 'EN' ? 'Inclusions:' : lang === 'ZH' ? '包含服务：' : 'Fasilitas & Inklusi:'}
                    </strong>
                    {boat.inclusions.slice(0, 4).map((inc) => (
                      <div key={inc} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{boat.priceFormatted}</span>
                    <span className="text-xs text-slate-500 ml-1">/ {boat.priceNote}</span>
                  </div>
                  <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    {boat.capacity}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedBoat(boat.name);
                    const formEl = document.getElementById('boat-reserve-form');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lang === 'EN' ? 'Book Boat Tour' : lang === 'ZH' ? '预订此出海行程' : 'Pesan Tour Kapal Ini'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Boat Reservation Form */}
      <section id="boat-reserve-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'EN' ? 'Reserve Komodo Boat Tour' : lang === 'ZH' ? '预订科莫多出海行程' : 'Formulir Pemesanan Tour Kapal'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {lang === 'EN' ? 'Direct WhatsApp reservation with instant confirmation from our local boat team.' : lang === 'ZH' ? '直接通过 WhatsApp 与本地船务团队确认出海细节。' : 'Pemesanan langsung via WhatsApp dengan konfirmasi instan dari tim lokal.'}
            </p>
          </div>

          <form onSubmit={handleWhatsAppBoatBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Select Boat Tour' : lang === 'ZH' ? '选择出海行程' : 'Pilih Kapal'}
              </label>
              <select
                value={selectedBoat}
                onChange={(e) => setSelectedBoat(e.target.value)}
                className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              >
                {BOAT_CHARTERS.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name} ({b.priceFormatted})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Tour Date' : lang === 'ZH' ? '出海日期' : 'Tanggal Tour'}
              </label>
              <input
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Number of Guests' : lang === 'ZH' ? '出海人数' : 'Jumlah Pax'}
              </label>
              <select
                value={paxCount}
                onChange={(e) => setPaxCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((p) => (
                  <option key={p} value={p}>
                    {p} {p === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-teal-600" />
                <span>{lang === 'EN' ? 'Check Availability via WhatsApp' : lang === 'ZH' ? '通过 WhatsApp 查询余位' : 'Cek Ketersediaan Tour via WhatsApp'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
