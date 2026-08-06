import React, { useState } from 'react';
import { Language } from '../data/translations';
import { SITE_CONFIG } from '../data/siteConfig';
import { MapPin, Calendar, Bike, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface QuickSearchWidgetProps {
  lang: Language;
}

export const QuickSearchWidget: React.FC<QuickSearchWidgetProps> = ({ lang }) => {
  const [pickupLoc, setPickupLoc] = useState(SITE_CONFIG.deliveryLocations[0]);
  const [customLocText, setCustomLocText] = useState('');
  const [bikeType, setBikeType] = useState('Yamaha NMAX (155cc)');
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [rentalDays, setRentalDays] = useState(2);

  const estimatedPrice = bikeType.includes('Beat')
    ? rentalDays * 100000
    : bikeType.includes('Scoopy')
    ? rentalDays * 120000
    : rentalDays * 175000;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLocation = pickupLoc.includes('Custom Hotel') && customLocText.trim()
      ? customLocText.trim()
      : pickupLoc;

    const msg =
      lang === 'EN'
        ? `Hi HelloBajo! I want to book a scooter:\n• Bike: ${bikeType}\n• Pickup Location: ${finalLocation}\n• Pickup Date: ${pickupDate}\n• Duration: ${rentalDays} Day(s)\n• Est. Total: Rp ${estimatedPrice.toLocaleString()}`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想预订摩托车：\n• 车型: ${bikeType}\n• 取车地点: ${finalLocation}\n• 取车日期: ${pickupDate}\n• 租期: ${rentalDays} 天\n• 预估费用: Rp ${estimatedPrice.toLocaleString()}`
        : `Halo HelloBajo! Saya mau sewa motor:\n• Motor: ${bikeType}\n• Lokasi Antar: ${finalLocation}\n• Tgl Ambil: ${pickupDate}\n• Durasi: ${rentalDays} Hari\n• Est. Total: Rp ${estimatedPrice.toLocaleString()}`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white p-5 sm:p-7 rounded-3xl border border-stone-200/90 shadow-xl max-w-5xl mx-auto -mt-6 sm:-mt-10 relative z-20">
      <div className="flex items-center justify-between border-b border-stone-200/70 pb-4 mb-5">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
          <span>
            {lang === 'EN' ? 'Instant Scooter Availability & Price Calculator' : lang === 'ZH' ? '实时查车与费用计算器' : 'Cek Ketersediaan Motor & Estimasi Harga'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'EN' ? 'Zero Security Deposit' : lang === 'ZH' ? '无需押金' : 'Bebas Deposit'}</span>
        </div>
      </div>

      <form onSubmit={handleWhatsAppBooking} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pickup Location */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === 'EN' ? 'Pickup Location' : lang === 'ZH' ? '取车地点' : 'Lokasi Antar'}</span>
          </label>
          <select
            value={pickupLoc}
            onChange={(e) => setPickupLoc(e.target.value)}
            className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {SITE_CONFIG.deliveryLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {pickupLoc.includes('Custom Hotel') && (
            <div className="mt-2">
              <input
                type="text"
                value={customLocText}
                onChange={(e) => setCustomLocText(e.target.value)}
                placeholder={
                  lang === 'EN'
                    ? 'Type hotel / villa name or address...'
                    : lang === 'ZH'
                    ? '请输入酒店/民宿名称或详细地址...'
                    : 'Ketik nama hotel / villa / alamat...'
                }
                className="w-full px-3 py-2 bg-amber-50/70 border border-amber-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
              />
            </div>
          )}
        </div>

        {/* Bike Model */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Bike className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === 'EN' ? 'Select Scooter' : lang === 'ZH' ? '选择车型' : 'Pilih Motor'}</span>
          </label>
          <select
            value={bikeType}
            onChange={(e) => setBikeType(e.target.value)}
            className="w-full bg-slate-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Yamaha NMAX (155cc) - Rp 175k/day">Yamaha NMAX 155cc (Rp 175k/day)</option>
            <option value="Honda Scoopy (110cc) - Rp 120k/day">Honda Scoopy 110cc (Rp 120k/day)</option>
            <option value="Honda Beat (110cc) - Rp 100k/day">Honda Beat 110cc (Rp 100k/day)</option>
          </select>
        </div>

        {/* Start Date & Days */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{lang === 'EN' ? 'Date' : lang === 'ZH' ? '日期' : 'Tanggal'}</span>
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-slate-50 border border-stone-300 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              <span>{lang === 'EN' ? 'Days' : lang === 'ZH' ? '天数' : 'Hari'}</span>
            </label>
            <select
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              className="w-full bg-slate-50 border border-stone-300 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((d) => (
                <option key={d} value={d}>
                  {d} {lang === 'EN' ? (d === 1 ? 'Day' : 'Days') : lang === 'ZH' ? '天' : 'Hari'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button & Total Calculation */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-md hover:shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
            <span>
              {lang === 'EN' ? 'Check WA Rate' : lang === 'ZH' ? 'WhatsApp 算价预订' : 'Cek Harga & Chat WA'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Est. Price Summary Footer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-slate-600">
        <span>
          {lang === 'EN' ? 'Estimated Total:' : lang === 'ZH' ? '预估总费用：' : 'Estimasi Total:'}{' '}
          <strong className="text-teal-700 text-sm sm:text-base font-extrabold ml-1">
            Rp {estimatedPrice.toLocaleString('id-ID')}
          </strong>{' '}
          ({rentalDays} {lang === 'EN' ? 'days' : lang === 'ZH' ? '天' : 'hari'} × {bikeType.split('-')[0]})
        </span>
        <span className="text-slate-400 font-medium">
          {lang === 'EN' ? '✓ Easy delivery by staff (Rp 20k/trip)' : lang === 'ZH' ? '✓ 专人送车 (Rp 20k/次)' : '✓ Antar jemput petugas (Rp 20rb/antar)'}
        </span>
      </div>
    </div>
  );
};
