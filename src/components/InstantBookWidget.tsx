import React, { useState, useMemo, useEffect } from 'react';
import { TranslationContent, Language } from '../data/translations';
import { Calendar, Bike, MapPin, Zap, MessageCircle, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface InstantBookWidgetProps {
  t: TranslationContent;
  lang: Language;
  onSelectScooter?: (bikeId: string) => void;
}

const SCOOTER_UNITS = [
  { id: 'nmax', name: 'Yamaha NMAX (or similar)', rate: 160000, labelEN: 'Yamaha NMAX (Maxi Scooter - Most Popular) – Rp 160k/day', labelZH: 'Yamaha NMAX (豪华踏板 - 最受欢迎) – Rp 160k/天', labelID: 'Yamaha NMAX (Maxi Scooter - Paling Populer) – Rp 160rb/hari' },
  { id: 'scoopy', name: 'Honda Scoopy (or similar)', rate: 120000, labelEN: 'Honda Scoopy (Classic Style Scooter) – Rp 120k/day', labelZH: 'Honda Scoopy (复古风踏板) – Rp 120k/天', labelID: 'Honda Scoopy (Classic Style Scooter) – Rp 120rb/hari' },
  { id: 'beat', name: 'Honda Beat (or similar)', rate: 100000, labelEN: 'Honda Beat (Standard / Compact Scooter) – Rp 100k/day', labelZH: 'Honda Beat (标准经济型踏板) – Rp 100k/天', labelID: 'Honda Beat (Standard / Compact Scooter) – Rp 100rb/hari' },
];

const ALL_TIME_SLOTS = [
  { label: '8:00 AM', val: 8.0 },
  { label: '8:30 AM', val: 8.5 },
  { label: '9:00 AM', val: 9.0 },
  { label: '9:30 AM', val: 9.5 },
  { label: '10:00 AM', val: 10.0 },
  { label: '10:30 AM', val: 10.5 },
  { label: '11:00 AM', val: 11.0 },
  { label: '11:30 AM', val: 11.5 },
  { label: '12:00 PM', val: 12.0 },
  { label: '12:30 PM', val: 12.5 },
  { label: '1:00 PM', val: 13.0 },
  { label: '1:30 PM', val: 13.5 },
  { label: '2:00 PM', val: 14.0 },
  { label: '2:30 PM', val: 14.5 },
  { label: '3:00 PM', val: 15.0 },
  { label: '3:30 PM', val: 15.5 },
  { label: '4:00 PM', val: 16.0 },
  { label: '4:30 PM', val: 16.5 },
  { label: '5:00 PM', val: 17.0 },
];

export const InstantBookWidget: React.FC<InstantBookWidgetProps> = ({ lang }) => {
  // Today and Tomorrow ISO helpers
  const todayISO = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const tomorrowISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Compute minimum cutoff time (+45 minutes from now)
  const currentMinTimeDecimal = useMemo(() => {
    const now = new Date();
    const minTimeDate = new Date(now.getTime() + 45 * 60 * 1000);
    return minTimeDate.getHours() + minTimeDate.getMinutes() / 60;
  }, []);

  // Form State
  const [unitType, setUnitType] = useState<string>('nmax');
  const [durationDays, setDurationDays] = useState<number>(1);
  const [pickupDate, setPickupDate] = useState<string>(todayISO);
  const [pickupTime, setPickupTime] = useState<string>('9:00 AM');
  const [amount, setAmount] = useState<number>(1);
  const [pickupMethod, setPickupMethod] = useState<'hotel' | 'airport'>('hotel');
  const [hotelLocation, setHotelLocation] = useState<string>('');

  // Calculate available time slots for the selected date
  const availableTimeSlots = useMemo(() => {
    if (pickupDate === todayISO) {
      const filtered = ALL_TIME_SLOTS.filter(slot => slot.val >= currentMinTimeDecimal && slot.val <= 17.0);
      return filtered;
    }
    return ALL_TIME_SLOTS;
  }, [pickupDate, todayISO, currentMinTimeDecimal]);

  // Handle auto-switching to tomorrow if today has no remaining cutoff slots
  useEffect(() => {
    if (pickupDate === todayISO && availableTimeSlots.length === 0) {
      setPickupDate(tomorrowISO);
      setPickupTime(ALL_TIME_SLOTS[0].label);
    } else if (availableTimeSlots.length > 0) {
      const isValid = availableTimeSlots.some(s => s.label === pickupTime);
      if (!isValid) {
        setPickupTime(availableTimeSlots[0].label);
      }
    }
  }, [pickupDate, availableTimeSlots, todayISO, tomorrowISO, pickupTime]);

  // Calculator logic - Rp 20,000 per unit for initial delivery/pickup fee
  const calculation = useMemo(() => {
    const selectedBike = SCOOTER_UNITS.find(b => b.id === unitType) || SCOOTER_UNITS[0];
    const basePrice = amount * selectedBike.rate * durationDays;
    
    // Delivery fee: Rp 20,000 per unit for hotel/airport, Rp 0 for store pick-up
    const isDelivery = pickupMethod === 'hotel' || pickupMethod === 'airport';
    const totalDeliveryFee = isDelivery ? amount * 20000 : 0;
    const totalEstimate = basePrice + totalDeliveryFee;

    return {
      selectedBike,
      basePrice,
      totalDeliveryFee,
      totalEstimate,
      isDelivery,
    };
  }, [unitType, amount, durationDays, pickupMethod]);

  // Handle WhatsApp Instant Booking
  const handleInstantBook = (e: React.FormEvent) => {
    e.preventDefault();

    const bikeName = calculation.selectedBike.name;
    const durationText = durationDays === 1 
      ? `1 Day (24-Hour Rental)` 
      : `${durationDays} Days (${durationDays * 24} Hours)`;
    
    let methodText = '';
    if (pickupMethod === 'hotel') {
      const locationDetail = hotelLocation.trim() ? `: ${hotelLocation.trim()}` : '';
      methodText = lang === 'EN' ? `Deliver to Hotel / Villa${locationDetail}` : lang === 'ZH' ? `送车至酒店/度假村${locationDetail}` : `Antar ke Hotel / Villa${locationDetail}`;
    } else {
      methodText = lang === 'EN' ? 'Deliver to Komodo International Airport (LBJ)' : lang === 'ZH' ? '送车至科莫多国际机场 (LBJ)' : 'Antar ke Bandara Komodo (LBJ)';
    }

    const formattedTotal = new Intl.NumberFormat('id-ID').format(calculation.totalEstimate);

    let message = '';
    if (lang === 'EN') {
      message = `⚡ *INSTANT SCOOTER BOOKING* ⚡\n\n` +
        `• *Model:* ${bikeName}\n` +
        `• *Quantity:* ${amount} Scooter${amount > 1 ? 's' : ''}\n` +
        `• *Duration:* ${durationText}\n` +
        `• *Pick-up Date & Time:* ${pickupDate} @ ${pickupTime}\n` +
        `• *Method / Location:* ${methodText}\n` +
        `• *Total Price:* Rp ${formattedTotal} (🔒 Zero Cash Deposit, Pay on Delivery)\n\n` +
        `Hi HelloBajo! Is this scooter available for instant booking?`;
    } else if (lang === 'ZH') {
      message = `⚡ *即时摩托车预订* ⚡\n\n` +
        `• *车型:* ${bikeName}\n` +
        `• *数量:* ${amount} 辆\n` +
        `• *时长:* ${durationText}\n` +
        `• *取车时间:* ${pickupDate} @ ${pickupTime}\n` +
        `• *取车地点/方式:* ${methodText}\n` +
        `• *预估金额:* Rp ${formattedTotal} (🔒 免现金押金，取车交付时支付)\n\n` +
        `你好 HelloBajo！请问当前有现车可以预订吗？`;
    } else {
      message = `⚡ *INSTANT BOOKING MOTOR* ⚡\n\n` +
        `• *Tipe Motor:* ${bikeName}\n` +
        `• *Jumlah:* ${amount} Unit Motor\n` +
        `• *Durasi:* ${durationText}\n` +
        `• *Tgl & Jam Ambil:* ${pickupDate} @ ${pickupTime}\n` +
        `• *Metode / Lokasi:* ${methodText}\n` +
        `• *Total Estimasi:* Rp ${formattedTotal} (🔒 Bebas Deposit Tunai, Bayar Saat Diantar)\n\n` +
        `Halo HelloBajo! Apakah unit ini ready untuk disewa sekarang?`;
    }

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-0">
      <div className="bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-slate-900 transition-all">
        
        {/* Header - Compact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3.5 border-b border-stone-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{lang === 'EN' ? 'Instant Scooter Booking' : lang === 'ZH' ? '即时摩托车预订' : 'Instant Booking Motor'}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200/90 px-2 py-0.5 rounded-full">
                  Express
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'EN' ? 'Fast booking for tourists • Direct WhatsApp chat' : lang === 'ZH' ? '游客快捷预订 • 直接 WhatsApp 沟通' : 'Pemesanan cepat turis • Langsung terhubung ke WhatsApp'}
              </p>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-teal-700 bg-teal-50/90 px-2.5 py-1 rounded-full border border-teal-200/80 shrink-0 self-start sm:self-center">
            🔒 {lang === 'EN' ? 'Zero Cash Deposit' : lang === 'ZH' ? '免现金押金' : 'Bebas Deposit Tunai'}
          </div>
        </div>

        {/* Clean Compact Form */}
        <form onSubmit={handleInstantBook} className="space-y-3">
          
          {/* Row 1: Bike & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Unit Model (Col 8) */}
            <div className="sm:col-span-8 space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-teal-600" />
                <span>{lang === 'EN' ? 'Unit Model' : lang === 'ZH' ? '选择车型' : 'Tipe Motor'} *</span>
              </label>
              <select
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer outline-hidden"
              >
                {SCOOTER_UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {lang === 'EN' ? u.labelEN : lang === 'ZH' ? u.labelZH : u.labelID}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity (Col 4) */}
            <div className="sm:col-span-4 space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'EN' ? 'Quantity' : lang === 'ZH' ? '数量' : 'Jumlah'} *
              </label>
              <select
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer outline-hidden"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {lang === 'EN' ? (num > 1 ? 'Units' : 'Unit') : lang === 'ZH' ? '辆' : 'Unit'}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Row 2: Duration, Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Duration Days */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{lang === 'EN' ? 'Duration' : lang === 'ZH' ? '租车时长' : 'Durasi'} *</span>
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer outline-hidden"
              >
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={6}>6 Days</option>
                <option value={7}>7 Days (1 Week)</option>
                <option value={10}>10 Days</option>
                <option value={14}>14 Days</option>
              </select>
              <p className="text-[11px] font-bold text-teal-700 tracking-tight pt-0.5">
                (1 day = 24-Hour Rental)
              </p>
            </div>

            {/* Pick-up Date */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>{lang === 'EN' ? 'Pick-up Date' : lang === 'ZH' ? '取车日期' : 'Tgl Ambil'} *</span>
              </label>
              <input
                type="date"
                required
                min={todayISO}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer outline-hidden"
              />
            </div>

            {/* Pick-up Time */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{lang === 'EN' ? 'Pick-up Time' : lang === 'ZH' ? '取车时间' : 'Jam Ambil'} *</span>
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer outline-hidden"
              >
                {availableTimeSlots.map((slot) => (
                  <option key={slot.label} value={slot.label}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Row 3: Pick-up Method Dropdown (3 Options) */}
          <div className="space-y-2 pt-0.5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              
              <div className={`${pickupMethod === 'hotel' ? 'sm:col-span-6' : 'sm:col-span-12'} space-y-1`}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{lang === 'EN' ? 'Pick-up Method' : lang === 'ZH' ? '取车方式' : 'Metode Pengambilan'} *</span>
                </label>
                <select
                  value={pickupMethod}
                  onChange={(e) => setPickupMethod(e.target.value as 'hotel' | 'airport')}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer outline-hidden"
                >
                  <option value="hotel">
                    🛵 {lang === 'EN' ? 'Deliver to Hotel / Villa (+Rp 20k/unit)' : lang === 'ZH' ? '送车至酒店/度假村 (+Rp 20k/辆)' : 'Deliver ke Hotel / Villa (+Rp 20rb/unit)'}
                  </option>
                  <option value="airport">
                    ✈️ {lang === 'EN' ? 'Komodo International Airport (LBJ) (+Rp 20k/unit)' : lang === 'ZH' ? '科莫多国际机场 LBJ (+Rp 20k/辆)' : 'Bandara Komodo LBJ (+Rp 20rb/unit)'}
                  </option>
                </select>
              </div>

              {/* Hotel / Villa Name Input (only when 'hotel' is selected) */}
              {pickupMethod === 'hotel' && (
                <div className="sm:col-span-6 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {lang === 'EN' ? 'Hotel / Villa Name' : lang === 'ZH' ? '酒店 / 度假村名称' : 'Nama Hotel / Villa'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={hotelLocation}
                    onChange={(e) => setHotelLocation(e.target.value)}
                    placeholder={lang === 'EN' ? 'e.g., Ayana, Meruorah, Sudamala...' : lang === 'ZH' ? '例如：Ayana, Meruorah, Sudamala...' : 'contoh: Ayana, Meruorah, Sudamala...'}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 outline-hidden"
                  />
                </div>
              )}

            </div>
          </div>

          {/* Calculator Box & Send on WhatsApp */}
          <div className="pt-2.5 mt-2 border-t border-stone-200/80 bg-teal-50/70 border border-teal-100/90 p-3 sm:p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-xs font-semibold text-slate-600 flex items-center justify-center sm:justify-start gap-1.5">
                <span>{amount} {lang === 'EN' ? (amount > 1 ? 'Units' : 'Unit') : 'Unit'} {calculation.selectedBike.name.split('(')[0]}</span>
                {calculation.isDelivery && (
                  <span className="text-teal-700 font-bold bg-teal-100/90 px-1.5 py-0.5 rounded text-[11px]">
                    +Rp {(amount * 20).toLocaleString('id-ID')}k delivery
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{lang === 'EN' ? 'Est. Total:' : lang === 'ZH' ? '预估金额:' : 'Est. Total:'}</span>
                <span className="text-xl sm:text-2xl font-black text-teal-700 tracking-tight">
                  Rp {new Intl.NumberFormat('id-ID').format(calculation.totalEstimate)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{lang === 'EN' ? 'Send on WhatsApp' : lang === 'ZH' ? '通过 WA 发送' : 'Send on WhatsApp'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
