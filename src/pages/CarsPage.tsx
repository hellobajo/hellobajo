import React, { useState, useEffect } from 'react';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { CARS_FLEET, CAR_TOUR_PACKAGES } from '../data/carsData';
import { SITE_CONFIG } from '../data/siteConfig';
import { CAR_CHARTER_BANNER } from '../data/images';
import { Car, UserCheck, ShieldCheck, Fuel, MapPin, MessageCircle, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface CarsPageProps {
  lang: Language;
}

export const CarsPage: React.FC<CarsPageProps> = ({ lang }) => {
  const [selectedCar, setSelectedCar] = useState(CARS_FLEET[0].name);
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [durationDays, setDurationDays] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppCarBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'EN'
        ? `Hi HelloBajo! I am interested in renting a car:\n• Vehicle: ${selectedCar}\n• Date: ${pickupDate}\n• Duration: ${durationDays} Day(s)\n• Please share availability and details!`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想包车/租车：\n• 车型: ${selectedCar}\n• 用车日期: ${pickupDate}\n• 天数: ${durationDays} 天\n• 请提供车辆安排与报价！`
        : `Halo HelloBajo! Saya mau sewa mobil:\n• Unit: ${selectedCar}\n• Tgl: ${pickupDate}\n• Durasi: ${durationDays} Hari\n• Mohon info ketersediaan & harganya!`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const pageTitle =
    lang === 'EN'
      ? 'Car Rental & SUV Charter Labuan Bajo — Private Driver & Self Drive | HelloBajo'
      : lang === 'ZH'
      ? '拉布安巴佐包车与SUV租赁 — 专业本地司机与私人行程 | HelloBajo'
      : 'Sewa Mobil Labuan Bajo — Innova Zenix, Avanza, Fortuner & HiAce dengan Driver';

  const pageDescription =
    lang === 'EN'
      ? 'Private car rental in Labuan Bajo with professional local drivers or self-drive. Toyota Innova Zenix, Avanza, Fortuner 4x4, and HiAce Commuter for city tours & Wae Rebo overland.'
      : lang === 'ZH'
      ? '拉布安巴佐私人包车与 SUV 租赁。精选 Innova Zenix, Avanza, Fortuner 4x4 与 HiAce 商务车。含专业本地司机、冷气与市区接送。'
      : 'Sewa mobil murah & nyaman di Labuan Bajo. Innova Zenix, Avanza, Fortuner 4x4, & HiAce Commuter untuk tur kota, jemputan bandara, dan trip overland Wae Rebo.';

  return (
    <div className="bg-[#faf8f5] text-slate-800 pt-6 pb-16">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://hellobajo.com/cars"
      />

      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img src={CAR_CHARTER_BANNER} alt="Car rental in Labuan Bajo" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-widest">
            <Car className="w-4 h-4" />
            <span>{lang === 'EN' ? 'PRIVATE CAR & SUV CHARTER' : lang === 'ZH' ? '私人包车 & 商务出游' : 'SEWA MOBIL & CHARTER PRIBADI'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {lang === 'EN'
              ? 'Explore Labuan Bajo in Air-Conditioned Comfort'
              : lang === 'ZH'
              ? '舒适惬意 · 探索弗洛雷斯陆地风光'
              : 'Sewa Mobil & Charter Pribadi di Labuan Bajo'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'EN'
              ? 'Ideal for families, group tours, airport transfers, and Wae Rebo overland trips. Driven by experienced local drivers who know every road.'
              : lang === 'ZH'
              ? '非常适合家庭出游、团队接送、机场转运及维莱博 (Wae Rebo) 陆地越野之旅。熟练本地司机，全程安心随行。'
              : 'Sangat cocok untuk liburan keluarga, rombongan, antar-jemput bandara, dan perjalanan darat ke Wae Rebo & Bajawa. Driver ramah & berpengalaman.'}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-semibold text-teal-200">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <UserCheck className="w-4 h-4 text-teal-400" />
              {lang === 'EN' ? 'Professional Driver Included' : lang === 'ZH' ? '含专业司机' : 'Termasuk Driver Profesional'}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <Fuel className="w-4 h-4 text-teal-400" />
              {lang === 'EN' ? 'Fuel / Petrol Packages Available' : lang === 'ZH' ? '包含/可选 BBM 汽油' : 'Tersedia Paket + BBM'}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              {lang === 'EN' ? 'No Hidden Charges' : lang === 'ZH' ? '无隐藏费用' : 'Tanpa Biaya Tersembunyi'}
            </span>
          </div>
        </div>
      </section>

      {/* Fleet Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {lang === 'EN' ? 'Our Private Car & SUV Fleet' : lang === 'ZH' ? '包车车队选择' : 'Pilihan Armada Mobil'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'EN'
              ? 'Clean, well-maintained, dual AC vehicles ready for city transfers or overland mountain roads.'
              : lang === 'ZH'
              ? '干净整洁、定期保养的双重空调车辆，时刻准备为您服务。'
              : 'Mobil bersih, AC dingin, & siap untuk jemputan kota maupun perjalanan overland gunung.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARS_FLEET.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {car.badge && (
                    <span className="absolute top-3 left-3 bg-teal-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {car.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-teal-400" />
                    <span>{car.capacity}</span>
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {car.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {car.description[lang]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {car.features.map((feat) => (
                      <span key={feat} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-3 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{car.priceFormatted}</span>
                    <span className="text-xs text-slate-500 ml-1">/ {lang === 'EN' ? 'day' : lang === 'ZH' ? '天' : 'hari'}</span>
                  </div>
                  <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {lang === 'EN' ? '+ Local Driver' : lang === 'ZH' ? '含本地司机' : 'Termasuk Driver'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCar(car.name);
                    const formEl = document.getElementById('car-reserve-form');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === 'EN' ? 'Inquire & Book' : lang === 'ZH' ? '预订此车型' : 'Pesan Mobil Ini'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Car Tour Itineraries */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 font-extrabold text-xs uppercase tracking-widest">
              {lang === 'EN' ? 'LAND TOUR PACKAGES' : lang === 'ZH' ? '精选包车路线' : 'PAKET TUR DARAT'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              {lang === 'EN' ? 'Popular Private Land Excursions' : lang === 'ZH' ? '热门私人包车一日游' : 'Rute Wisata Mobil Populer'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAR_TOUR_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-teal-700 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </span>
                    <span className="bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">{pkg.priceStart}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{pkg.title[lang]}</h3>
                  <p className="text-xs text-slate-600 mb-4">{pkg.description[lang]}</p>

                  <div className="space-y-1.5 text-xs text-slate-700 border-t border-stone-100 pt-3">
                    <strong className="block text-[11px] text-slate-400 uppercase tracking-wider">Key Destinations:</strong>
                    {pkg.destinations.map((dest) => (
                      <div key={dest} className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{dest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hi HelloBajo! I am interested in the ${pkg.title.EN} car package.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-slate-900" />
                    <span>{lang === 'EN' ? 'Book Tour via WhatsApp' : lang === 'ZH' ? 'WhatsApp 咨询路线' : 'Tanya Paket Tour'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Car Booking Form */}
      <section id="car-reserve-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'EN' ? 'Inquire Private Car Rental' : lang === 'ZH' ? '预订包车服务' : 'Formulir Pemesanan Mobil'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {lang === 'EN' ? 'Fill in your details below to open a direct WhatsApp reservation.' : lang === 'ZH' ? '填写以下表格，以便直接通过 WhatsApp 确认用车细节。' : 'Isi formulir di bawah ini untuk terhubung langsung dengan tim kami via WhatsApp.'}
            </p>
          </div>

          <form onSubmit={handleWhatsAppCarBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Select Vehicle' : lang === 'ZH' ? '选择车型' : 'Pilih Mobil'}
              </label>
              <select
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              >
                {CARS_FLEET.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.name} ({car.priceFormatted}/day)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Start Date' : lang === 'ZH' ? '用车日期' : 'Tanggal Mulai'}
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Rental Duration' : lang === 'ZH' ? '天数' : 'Durasi'}
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
              >
                {[1, 2, 3, 4, 5, 7, 10].map((d) => (
                  <option key={d} value={d}>
                    {d} {lang === 'EN' ? (d === 1 ? 'Day' : 'Days') : lang === 'ZH' ? '天' : 'Hari'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-teal-600" />
                <span>{lang === 'EN' ? 'Send Inquiry on WhatsApp' : lang === 'ZH' ? '通过 WhatsApp 提交预订' : 'Kirim Pesanan via WhatsApp'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
