import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, User, Phone, MapPin, MessageCircle, Check, Anchor, Wind, ShieldCheck, Info } from 'lucide-react';
import { Language } from '../data/translations';
import { BOAT_CHARTERS, BoatCharterOption, calculateBoatCharterPrice } from '../data/boatsData';
import { SITE_CONFIG } from '../data/siteConfig';

interface SpeedboatBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBoatId?: string;
}

export const SpeedboatBookingModal: React.FC<SpeedboatBookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialBoatId,
}) => {
  // Only present active private speedboat charters in booking modal
  const availableBoats = BOAT_CHARTERS.filter((b) => !b.isUnderDevelopment);
  const foundInitial = BOAT_CHARTERS.find((b) => b.id === initialBoatId && !b.isUnderDevelopment);
  const defaultBoat = foundInitial || availableBoats[0] || BOAT_CHARTERS[0];
  
  const [selectedBoat, setSelectedBoat] = useState<BoatCharterOption>(defaultBoat);
  
  const minTourDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [tourDate, setTourDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [guestCount, setGuestCount] = useState<number>(4);
  const [fullName, setFullName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('');

  // Update selected boat when initialBoatId changes
  useEffect(() => {
    if (initialBoatId) {
      const found = BOAT_CHARTERS.find((b) => b.id === initialBoatId && !b.isUnderDevelopment);
      if (found) setSelectedBoat(found);
    }
  }, [initialBoatId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Calculate Total Price (Private Charter tier rate) and 10% Deposit
  const totalPrice = calculateBoatCharterPrice(selectedBoat, guestCount);
  const depositPrice = Math.round(totalPrice * 0.1);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = tourDate
      ? new Date(tourDate).toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : tourDate;

    const messageEN = `Hi HelloBajo! I would like to reserve a Private Speedboat Charter:\n
🚤 *Private Speedboat*: ${selectedBoat.name} (${selectedBoat.maxCapacity} - ${selectedBoat.acStatus})
📅 *Tour Date*: ${formattedDate}
👥 *Guests*: ${guestCount} Person(s)
👤 *Name*: ${fullName || '-'}
📱 *WhatsApp*: ${whatsapp || '-'}
📍 *Pickup Location*: ${pickupLocation || '-'}

💰 *Total Charter Rate*: ${formatIDR(totalPrice)}
💳 *10% Booking Deposit*: ${formatIDR(depositPrice)}

Please confirm availability and booking details. Thank you!`;

    const messageID = `Halo HelloBajo! Saya mau pesan Private Speedboat Charter:\n
🚤 *Pilihan Speedboat*: ${selectedBoat.name} (${selectedBoat.maxCapacity} - ${selectedBoat.acStatus})
📅 *Tanggal Tour*: ${formattedDate}
👥 *Jumlah Tamu*: ${guestCount} Pax (Private Group)
👤 *Nama Lengkap*: ${fullName || '-'}
📱 *No WhatsApp*: ${whatsapp || '-'}
📍 *Lokasi Penjemputan*: ${pickupLocation || '-'}

💰 *Total Harga Private Charter*: ${formatIDR(totalPrice)}
💳 *Nominal DP (10%)*: ${formatIDR(depositPrice)}

Mohon infokan ketersediaan & petunjuk pembayaran DP. Terima kasih!`;

    const messageZH = `你好 HelloBajo！我想预订科莫多快艇包船出海：\n
🚤 *出海船型*: ${selectedBoat.name} (${selectedBoat.maxCapacity} - ${selectedBoat.acStatus})
📅 *出海日期*: ${formattedDate}
👥 *出行人数*: ${guestCount} 人 (包船私密团)
👤 *姓名*: ${fullName || '-'}
📱 *WhatsApp*: ${whatsapp || '-'}
📍 *接送地点*: ${pickupLocation || '-'}

💰 *包船总价*: ${formatIDR(totalPrice)}
💳 *10% 预订金*: ${formatIDR(depositPrice)}

请确认位置与详细安排，谢谢！`;

    const textToSend = lang === 'ZH' ? messageZH : lang === 'EN' ? messageEN : messageID;

    window.open(
      `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(textToSend)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-stone-100 bg-white sticky top-0 z-20">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/80 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>{lang === 'EN' ? 'Pure Private Charter' : lang === 'ZH' ? '纯私密包船出海' : '100% Private Charter'}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === 'EN'
                  ? 'Reserve Private Speedboat'
                  : lang === 'ZH'
                  ? '预订科莫多快艇包船'
                  : 'Reservasi Private Speedboat Komodo'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body - Spacious & Clean Scrollable Content */}
          <div className="p-6 sm:p-8 space-y-7 overflow-y-auto no-scrollbar">
            <form id="speedboat-booking-form" onSubmit={handleSubmit} className="space-y-7">
              
              {/* 1. SELECTION GRID: Choose Private Speedboat */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
                    {lang === 'EN' ? '1. Select Private Speedboat' : lang === 'ZH' ? '1. 选择私密包船船型' : '1. Pilih Armada Private Speedboat'}
                  </label>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                    {lang === 'EN' ? 'Fix Price per Capacity Tier' : lang === 'ZH' ? '按阶梯人数固定计价' : 'Harga Flat per Tier Kapasitas'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {availableBoats.map((boat) => {
                    const isSelected = selectedBoat.id === boat.id;
                    return (
                      <div
                        key={boat.id}
                        onClick={() => setSelectedBoat(boat)}
                        className={`relative rounded-2xl border p-3.5 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'bg-teal-50/70 border-2 border-teal-600 shadow-md ring-2 ring-teal-500/20'
                            : 'bg-white border-stone-200/90 hover:border-teal-300 hover:bg-stone-50/70'
                        }`}
                      >
                        {/* Radio Selection Checkmark */}
                        <div className="absolute top-3 right-3 z-10">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-teal-600 text-white shadow-xs' : 'border border-stone-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          {/* Thumbnail Image */}
                          <div className="w-20 sm:w-24 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-stone-200/60">
                            <img
                              src={boat.image}
                              alt={boat.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details - Clean Layout with NO Line Clamping */}
                          <div className="space-y-1.5 pr-6">
                            <h3 className="text-sm font-black text-slate-900 leading-snug">
                              {boat.name}
                            </h3>

                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-900 text-white">
                                {boat.maxCapacity}
                              </span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-teal-100 text-teal-800 flex items-center gap-1">
                                <Wind className="w-3 h-3 text-teal-600" />
                                <span>{boat.acStatus}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price Tiers List Breakdown - Clean & Visible */}
                        <div className="pt-2 border-t border-stone-200/60 text-xs space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {lang === 'EN' ? 'Charter Rate Tiers:' : lang === 'ZH' ? '包船价格阶梯:' : 'Pilihan Harga Private Charter:'}
                          </span>
                          <div className="grid grid-cols-1 gap-1">
                            {boat.priceTiers?.map((tier, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center justify-between text-[11px] px-2 py-1 rounded-md font-bold ${
                                  isSelected && guestCount >= tier.minPax && guestCount <= tier.maxPax
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-stone-100/90 text-slate-700'
                                }`}
                              >
                                <span>{tier.label.split(':')[0]}</span>
                                <span>{tier.label.split(':')[1]}</span>
                              </div>
                            ))}
                            {boat.extraPaxPrice ? (
                              <div className="text-[10px] text-slate-500 font-semibold italic text-right px-1">
                                *Extra pax: +{formatIDR(boat.extraPaxPrice)}/pax
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. DATE & GUEST COUNT */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
                  {lang === 'EN' ? '2. Tour Date & Guest Count' : lang === 'ZH' ? '2. 出海日期与出行人数' : '2. Tanggal Tour & Jumlah Tamu'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>{lang === 'EN' ? 'Tour Date' : lang === 'ZH' ? '出海日期' : 'Tanggal Tour'}</span>
                      </label>
                      <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {lang === 'EN' ? 'Min. H+2' : lang === 'ZH' ? '最早 H+2 (后天)' : 'Min. H+2 (Mulai H+2)'}
                      </span>
                    </div>
                    <input
                      type="date"
                      required
                      min={minTourDate}
                      value={tourDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && val < minTourDate) {
                          setTourDate(minTourDate);
                        } else {
                          setTourDate(val);
                        }
                      }}
                      className="w-full bg-stone-50/80 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all outline-hidden cursor-pointer"
                    />
                  </div>

                  {/* Guest Count Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-teal-600" />
                      <span>{lang === 'EN' ? 'Total Guests (Pax)' : lang === 'ZH' ? '团队总人数' : 'Jumlah Tamu (Orang)'}</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      required
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      placeholder="contoh: 4"
                      className="w-full bg-stone-50/80 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all outline-hidden"
                    />
                  </div>
                </div>

                {/* Helper info banner for active tier pricing */}
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-2.5 text-xs text-teal-900 font-medium">
                  <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-teal-950">
                      {lang === 'EN' ? 'Private Charter Calculation:' : lang === 'ZH' ? '私密包船计价提示:' : 'Keterangan Harga Private Charter:'}
                    </span>{' '}
                    <span>
                      {lang === 'EN'
                        ? `Selected ${selectedBoat.name} for ${guestCount} guest(s). Price is fixed per charter rate.`
                        : lang === 'ZH'
                        ? `已选择 ${selectedBoat.name}，包含 ${guestCount} 人专属包船，整船固定计价。`
                        : `Untuk ${guestCount} tamu di ${selectedBoat.name}, berlaku tarif fix Private Charter ${formatIDR(totalPrice)}.`}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. CONTACT DETAILS */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
                  {lang === 'EN' ? '3. Customer Details' : lang === 'ZH' ? '3. 预订人联系资料' : '3. Data Kontak Pemesan'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-teal-600" />
                      <span>{lang === 'EN' ? 'Full Name' : lang === 'ZH' ? '姓名' : 'Nama Lengkap'}</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'EN' ? 'e.g. John Doe' : lang === 'ZH' ? '例如：张三' : 'contoh: Budi Santoso'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-stone-50/80 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all outline-hidden"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-teal-600" />
                      <span>{lang === 'EN' ? 'WhatsApp Number' : lang === 'ZH' ? 'WhatsApp 号码' : 'Nomor WhatsApp'}</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08123456789"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-stone-50/80 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all outline-hidden"
                    />
                  </div>

                  {/* Pickup Location */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <span>
                        {lang === 'EN'
                          ? 'Pickup Location (Hotel / Airport)'
                          : lang === 'ZH'
                          ? '接送地点 (酒店/机场)'
                          : 'Lokasi Penjemputan (Hotel/Bandara)'}
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder={
                        lang === 'EN'
                          ? 'e.g. Hotel Meruorah / Komodo Airport (LBJ)'
                          : lang === 'ZH'
                          ? '例如：阿雅娜酒店 / 科莫多机场'
                          : 'contoh: Hotel Meruorah / Bandara Komodo (LBJ)'
                      }
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-stone-50/80 border border-stone-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition-all outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* 4. PRICE BREAKDOWN & ACTION BUTTON */}
              <div className="pt-2 space-y-4 border-t border-stone-100">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/90 border border-stone-200/80 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      {lang === 'EN' ? 'Total Private Charter Rate' : lang === 'ZH' ? '包船费用总额' : 'Total Harga Private Charter'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {formatIDR(totalPrice)}
                    </span>
                  </div>

                  <div className="text-right bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      {lang === 'EN' ? 'Auto Deposit (10%)' : lang === 'ZH' ? '预订订金 (10%)' : 'Nominal DP (10%)'}
                    </span>
                    <span className="text-lg font-black text-emerald-800">
                      {formatIDR(depositPrice)}
                    </span>
                  </div>
                </div>

                {/* Big Contrast Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-teal-600/25 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <MessageCircle className="w-6 h-6 fill-white text-teal-600 group-hover:scale-110 transition-transform" />
                  <span>
                    {lang === 'EN'
                      ? 'Send Booking via WhatsApp'
                      : lang === 'ZH'
                      ? '通过 WhatsApp 发送预订'
                      : 'Kirim Reservasi via WhatsApp'}
                  </span>
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
