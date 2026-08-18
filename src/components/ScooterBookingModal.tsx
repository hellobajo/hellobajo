import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, Bike, MessageCircle, ShieldCheck, Check, Plus, Trash2 } from 'lucide-react';
import { Language } from '../data/translations';
import { SCOOTER_IMAGES } from '../data/images';
import { SITE_CONFIG } from '../data/siteConfig';

interface ScooterBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBikeId?: string;
  initialCategoryId?: string;
}

interface CategoryOption {
  id: string;
  nameEN: string;
  nameZH: string;
  nameID: string;
  baseRate: number;
  rateFormatted: string;
  badgeEN: string;
  badgeZH: string;
  badgeID: string;
  defaultImageKey: string;
  models: { id: string; name: string; rate: number; imageKey: string }[];
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'compact',
    nameEN: 'Compact / Economy',
    nameZH: '标准经济型',
    nameID: 'Compact / Economy',
    baseRate: 100000,
    rateFormatted: 'Rp 100k/day',
    badgeEN: 'Best Value',
    badgeZH: '高性价比',
    badgeID: 'Paling Hemat',
    defaultImageKey: 'beat',
    models: [
      { id: 'beat', name: 'Honda Beat (110cc EFI)', rate: 100000, imageKey: 'beat' },
      { id: 'scoopy', name: 'Honda Scoopy (110cc SmartKey)', rate: 100000, imageKey: 'scoopy' },
      { id: 'fazzio', name: 'Yamaha Fazzio (125cc Hybrid)', rate: 100000, imageKey: 'fazzio' },
    ],
  },
  {
    id: 'medium',
    nameEN: 'Medium / Sport',
    nameZH: '运动升级型',
    nameID: 'Medium / Sport',
    baseRate: 130000,
    rateFormatted: 'Rp 130k–140k/day',
    badgeEN: 'Hill Power',
    badgeZH: '爬坡强劲',
    badgeID: 'Tenaga Tanjakan',
    defaultImageKey: 'vario160',
    models: [
      { id: 'vario150', name: 'Honda Vario 150 (150cc eSP)', rate: 130000, imageKey: 'vario150' },
      { id: 'vario160', name: 'Honda Vario 160 (160cc eSP+)', rate: 140000, imageKey: 'vario160' },
    ],
  },
  {
    id: 'maxi',
    nameEN: 'Maxi Scooter',
    nameZH: '豪华大踏板',
    nameID: 'Maxi Scooter',
    baseRate: 160000,
    rateFormatted: 'Rp 160k/day',
    badgeEN: 'Most Popular',
    badgeZH: '最受好评',
    badgeID: 'Paling Nyaman',
    defaultImageKey: 'nmax',
    models: [
      { id: 'nmax', name: 'Yamaha NMAX 155 (155cc VVA)', rate: 160000, imageKey: 'nmax' },
      { id: 'pcx', name: 'Honda PCX 155 (155cc eSP+)', rate: 160000, imageKey: 'pcx' },
    ],
  },
];

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
];

export const ScooterBookingModal: React.FC<ScooterBookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialBikeId,
  initialCategoryId,
}) => {
  // Today ISO helper
  const todayISO = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // 1st Scooter Form State
  const [selectedCatId, setSelectedCatId] = useState<string>('compact');
  const [selectedModelId, setSelectedModelId] = useState<string>('any');
  const [quantity, setQuantity] = useState<number>(1);

  // 2nd Scooter Form State (Optional)
  const [hasSecondScooter, setHasSecondScooter] = useState<boolean>(false);
  const [secondCatId, setSecondCatId] = useState<string>('medium');
  const [secondModelId, setSecondModelId] = useState<string>('any');
  const [secondQuantity, setSecondQuantity] = useState<number>(1);

  // Shared Logistics State
  const [durationDays, setDurationDays] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>(todayISO);
  const [startTime, setStartTime] = useState<string>('9:00 AM');
  const [pickupMethod, setPickupMethod] = useState<'hotel' | 'airport'>('hotel');
  const [hotelName, setHotelName] = useState<string>('');

  // Synchronize state when initial bike or category changes on modal open
  useEffect(() => {
    if (isOpen) {
      if (initialBikeId) {
        const foundCat = CATEGORIES.find(c => c.models.some(m => m.id === initialBikeId));
        if (foundCat) {
          setSelectedCatId(foundCat.id);
          setSelectedModelId(initialBikeId);
        }
      } else if (initialCategoryId) {
        const foundCat = CATEGORIES.find(c => c.id === initialCategoryId);
        if (foundCat) {
          setSelectedCatId(foundCat.id);
          setSelectedModelId('any');
        }
      }
    }
  }, [isOpen, initialBikeId, initialCategoryId]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Category objects
  const currentCat = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];
  const secondCat = CATEGORIES.find(c => c.id === secondCatId) || CATEGORIES[1];

  // Helper function to resolve dynamic image key based on selected model
  const getBikeImage = (cat: CategoryOption, modelId: string) => {
    if (modelId !== 'any') {
      const foundM = cat.models.find(m => m.id === modelId);
      if (foundM) {
        return SCOOTER_IMAGES[foundM.imageKey as keyof typeof SCOOTER_IMAGES] || SCOOTER_IMAGES.beat;
      }
    }
    return SCOOTER_IMAGES[cat.defaultImageKey as keyof typeof SCOOTER_IMAGES] || SCOOTER_IMAGES.beat;
  };

  // Price Calculation
  const calculation = useMemo(() => {
    // 1st Scooter Rate
    let dailyRate1 = currentCat.baseRate;
    if (selectedModelId !== 'any') {
      const foundM = currentCat.models.find(m => m.id === selectedModelId);
      if (foundM) dailyRate1 = foundM.rate;
    }
    const subtotal1 = dailyRate1 * durationDays * quantity;

    // 2nd Scooter Rate
    let subtotal2 = 0;
    if (hasSecondScooter) {
      let dailyRate2 = secondCat.baseRate;
      if (secondModelId !== 'any') {
        const foundM = secondCat.models.find(m => m.id === secondModelId);
        if (foundM) dailyRate2 = foundM.rate;
      }
      subtotal2 = dailyRate2 * durationDays * secondQuantity;
    }

    const totalUnits = quantity + (hasSecondScooter ? secondQuantity : 0);
    // Rp 20,000 per unit for high season direct delivery
    const deliveryFee = 20000 * totalUnits;
    const totalEstimate = subtotal1 + subtotal2 + deliveryFee;

    return {
      dailyRate1,
      subtotal1,
      subtotal2,
      totalUnits,
      deliveryFee,
      totalEstimate,
    };
  }, [currentCat, selectedModelId, quantity, hasSecondScooter, secondCat, secondModelId, secondQuantity, durationDays]);

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const category1Name = lang === 'EN' ? currentCat.nameEN : lang === 'ZH' ? currentCat.nameZH : currentCat.nameID;
    let model1Text = lang === 'EN' ? 'Any Available in Category' : lang === 'ZH' ? '同级别任意现车' : 'Bebas Model Kategori';
    if (selectedModelId !== 'any') {
      const foundM = currentCat.models.find(m => m.id === selectedModelId);
      if (foundM) model1Text = foundM.name;
    }

    let secondScooterText = '';
    if (hasSecondScooter) {
      const category2Name = lang === 'EN' ? secondCat.nameEN : lang === 'ZH' ? secondCat.nameZH : secondCat.nameID;
      let model2Text = lang === 'EN' ? 'Any Available in Category' : lang === 'ZH' ? '同级别任意现车' : 'Bebas Model Kategori';
      if (secondModelId !== 'any') {
        const foundM = secondCat.models.find(m => m.id === secondModelId);
        if (foundM) model2Text = foundM.name;
      }
      secondScooterText = `• *2nd Scooter Selection:* ${category2Name} - ${model2Text} (${secondQuantity} Unit${secondQuantity > 1 ? 's' : ''})\n`;
    }

    let locationText = '';
    if (pickupMethod === 'hotel') {
      locationText = hotelName.trim()
        ? `${lang === 'EN' ? 'Deliver to Hotel / Villa' : lang === 'ZH' ? '送车至酒店' : 'Antar ke Hotel'}: ${hotelName.trim()}`
        : `${lang === 'EN' ? 'Deliver to Hotel / Villa' : lang === 'ZH' ? '送车至酒店' : 'Antar ke Hotel'}`;
    } else {
      locationText = lang === 'EN' ? 'Deliver to Komodo International Airport (LBJ)' : lang === 'ZH' ? '送车至科莫多国际机场 (LBJ)' : 'Antar ke Bandara Komodo (LBJ)';
    }

    const durationText = durationDays === 1 
      ? `1 Day (24-Hour Rental)` 
      : `${durationDays} Days (${durationDays * 24} Hours)`;

    const totalFormatted = new Intl.NumberFormat('id-ID').format(calculation.totalEstimate);

    let message = '';
    if (lang === 'EN') {
      message = `🛵 *SCOOTER RENTAL BOOKING* 🛵\n\n` +
        `• *1st Scooter:* ${category1Name} - ${model1Text} (${quantity} Unit${quantity > 1 ? 's' : ''})\n` +
        (secondScooterText ? secondScooterText : '') +
        `• *Total Units:* ${calculation.totalUnits} Unit${calculation.totalUnits > 1 ? 's' : ''}\n` +
        `• *Rental Duration:* ${durationText}\n` +
        `• *Start Date & Time:* ${startDate} @ ${startTime}\n` +
        `• *Delivery Location:* ${locationText}\n` +
        `• *Estimated Total:* Rp ${totalFormatted} (🔒 Zero Cash Deposit, Pay on Delivery)\n\n` +
        `Hi HelloBajo! Is this scooter reservation available for my trip dates?`;
    } else if (lang === 'ZH') {
      message = `🛵 *摩托车租赁预订* 🛵\n\n` +
        `• *第1部摩托车:* ${category1Name} - ${model1Text} (${quantity} 辆)\n` +
        (secondScooterText ? secondScooterText : '') +
        `• *车辆总数:* ${calculation.totalUnits} 辆\n` +
        `• *租赁时长:* ${durationText}\n` +
        `• *取车日期与时间:* ${startDate} @ ${startTime}\n` +
        `• *送车地点:* ${locationText}\n` +
        `• *预估总额:* Rp ${totalFormatted} (🔒 免现金押金，取车交付时支付)\n\n` +
        `你好 HelloBajo！请问该时间段有车可以预订吗？`;
    } else {
      message = `🛵 *PEMESANAN SEWA MOTOR* 🛵\n\n` +
        `• *Motor Pertama:* ${category1Name} - ${model1Text} (${quantity} Unit)\n` +
        (secondScooterText ? secondScooterText : '') +
        `• *Total Unit:* ${calculation.totalUnits} Unit Motor\n` +
        `• *Durasi Sewa:* ${durationText}\n` +
        `• *Tgl & Jam Ambil:* ${startDate} @ ${startTime}\n` +
        `• *Lokasi Pengantaran:* ${locationText}\n` +
        `• *Total Estimasi:* Rp ${totalFormatted} (🔒 Bebas Deposit Tunai, Bayar Saat Diantar)\n\n` +
        `Halo HelloBajo! Apakah unit ini tersedia untuk tanggal rental saya?`;
    }

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-auto text-slate-900"
        >
          {/* Modal Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-xs shrink-0">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                  {lang === 'EN' ? 'Book Scooter Rental' : lang === 'ZH' ? '预订摩托车' : 'Pesan Sewa Motor'}
                </h3>
                <p className="text-xs text-teal-300 font-medium flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>{lang === 'EN' ? 'Zero Cash Deposit • High Season Direct Delivery' : lang === 'ZH' ? '免现金押金 • 旺季直接送车' : 'Bebas Deposit Tunai • Layanan Antar High Season'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body & Form */}
          <form onSubmit={handleWhatsAppSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* High-Season Notice Banner with Pulse Animation */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-yellow-50/90 border border-amber-300/80 p-3 sm:p-3.5 shadow-xs">
              <div className="flex items-start gap-2.5">
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold shadow-xs">
                    ⚡
                  </span>
                </div>
                <div className="text-xs text-amber-950 leading-relaxed font-medium">
                  <span className="font-extrabold text-amber-900 mr-1">
                    {lang === 'EN' ? '⚡ High-Season Notice:' : lang === 'ZH' ? '⚡ 旺季预订提示：' : '⚡ Peringatan High-Season:'}
                  </span>
                  {lang === 'EN' ? (
                    <>
                      Units run fast &amp; models are subject to stock. Chat WhatsApp first to check live availability, or submit your choice below to lock it. <span className="font-semibold text-amber-900/90">(Equivalent specs guaranteed if fully booked).</span>
                    </>
                  ) : lang === 'ZH' ? (
                    <>
                      车辆档期紧俏，具体车型视实时库存而定。建议先通过 WhatsApp 咨询客服确认实时车况，或提交下方订单锁定配额。<span className="font-semibold text-amber-900/90">（如遇满款，将保障安排同等或更高规格车型）。</span>
                    </>
                  ) : (
                    <>
                      Stok unit cepat habis &amp; model tergantung ketersediaan. Chat WhatsApp terlebih dahulu untuk cek stok fisik, atau kirim pilihan Anda di bawah untuk mengamankan slot. <span className="font-semibold text-amber-900/90">(Spesifikasi setara dijamin jika model penuh).</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Step 1: Category Selection (Clean 3-Category Cards with Dynamic Image) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>{lang === 'EN' ? '1. Select Scooter Category' : lang === 'ZH' ? '1. 选择车队类别' : '1. Pilih Kategori Motor'} *</span>
                <span className="text-[11px] font-normal text-slate-500 lowercase">{lang === 'EN' ? '3 choices' : lang === 'ZH' ? '3 种类别' : '3 pilihan'}</span>
              </label>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCatId === cat.id;
                  // Dynamic image based on active selected model
                  const catImage = getBikeImage(cat, isSelected ? selectedModelId : 'any');

                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCatId(cat.id);
                        setSelectedModelId('any');
                      }}
                      className={`relative flex flex-col justify-between p-2 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/60 shadow-sm ring-1 ring-teal-600/30'
                          : 'border-stone-200 bg-stone-50/70 hover:border-stone-300 hover:bg-stone-100/70'
                      }`}
                    >
                      {/* Badge */}
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-teal-600 text-white' : 'bg-stone-200 text-slate-700'
                        }`}>
                          {lang === 'EN' ? cat.badgeEN : lang === 'ZH' ? cat.badgeZH : cat.badgeID}
                        </span>
                        {isSelected && (
                          <span className="w-3.5 h-3.5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      {/* Uncropped Dynamic Scooter Image */}
                      <div className="w-full h-16 sm:h-20 my-1 flex items-center justify-center overflow-hidden">
                        <img
                          src={catImage}
                          alt={cat.nameEN}
                          className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-all duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Category Name & Base Rate */}
                      <div className="text-center mt-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                          {lang === 'EN' ? cat.nameEN : lang === 'ZH' ? cat.nameZH : cat.nameID}
                        </h4>
                        <p className="text-[10px] sm:text-xs font-bold text-teal-700 mt-0.5">
                          {cat.rateFormatted}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Preferred Model within Selected Category + Dynamic Image Display */}
            <div className="space-y-2 bg-stone-50 p-3 sm:p-3.5 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'EN' ? 'Preferred Model Option' : lang === 'ZH' ? '具体车型偏好' : 'Pilihan Model Spesifik'}
                </label>
                <span className="text-[11px] font-bold text-teal-700">
                  {quantity} {lang === 'EN' ? (quantity > 1 ? 'Units' : 'Unit') : 'Unit'}
                </span>
              </div>

              {/* Model Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedModelId('any')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    selectedModelId === 'any'
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-800 border-stone-200 hover:border-teal-500'
                  }`}
                >
                  <span>✨ {lang === 'EN' ? 'Any Available in Category' : lang === 'ZH' ? '同级别任意现车 (更快分配)' : 'Bebas Model Kategori'}</span>
                  {selectedModelId === 'any' && <Check className="w-3.5 h-3.5" />}
                </button>

                {currentCat.models.map((m) => {
                  const isMSelected = selectedModelId === m.id;

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModelId(m.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between gap-2 cursor-pointer ${
                        isMSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-white text-slate-800 border-stone-200 hover:border-teal-500'
                      }`}
                    >
                      <span className="truncate">🛵 {m.name}</span>
                      {isMSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Quantity Stepper for 1st Bike */}
              <div className="flex items-center justify-between pt-1.5 border-t border-stone-200/80 mt-2">
                <span className="text-xs font-bold text-slate-700">
                  {lang === 'EN' ? 'Quantity:' : lang === 'ZH' ? '选择数量:' : 'Jumlah Unit:'}
                </span>
                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-800 font-black text-sm flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold text-slate-900 w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-black text-sm flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2.5: "+ Add another scooter unit" BUTTON & SECOND SCOOTER BLOCK */}
            {!hasSecondScooter ? (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setHasSecondScooter(true)}
                  className="text-teal-700 hover:text-teal-800 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                >
                  <Plus className="w-4 h-4 text-teal-600 stroke-[3]" />
                  <span>+ {lang === 'EN' ? 'Add another scooter unit' : lang === 'ZH' ? '增加其他车型/车辆' : 'Add another scooter unit'}</span>
                </button>
              </div>
            ) : (
              /* 2ND SCOOTER SELECTION CARD BLOCK */
              <div className="p-3.5 bg-teal-50/80 rounded-2xl border-2 border-teal-200 space-y-3 relative transition-all">
                {/* Header with Remove Button */}
                <div className="flex items-center justify-between border-b border-teal-200/80 pb-2">
                  <span className="text-xs font-black text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{lang === 'EN' ? '2nd Scooter Selection' : lang === 'ZH' ? '第 2 部摩托车选择' : 'Pilihan Motor Ke-2'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasSecondScooter(false)}
                    className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>× {lang === 'EN' ? 'Remove 2nd bike' : lang === 'ZH' ? '删除第2部' : 'Hapus motor ke-2'}</span>
                  </button>
                </div>

                {/* 2nd Scooter Categories */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wider">
                    {lang === 'EN' ? 'CATEGORY:' : lang === 'ZH' ? '车队类别:' : 'KATEGORI:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((c) => {
                      const is2ndSelected = secondCatId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSecondCatId(c.id);
                            setSecondModelId('any');
                          }}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            is2ndSelected
                              ? 'bg-slate-900 text-white border-slate-900 font-extrabold shadow-xs'
                              : 'bg-white text-slate-800 border-stone-200 font-bold hover:border-teal-500'
                          }`}
                        >
                          <div className="text-xs leading-tight">{lang === 'EN' ? c.nameEN.split('/')[0] : c.nameID.split('/')[0]}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{c.rateFormatted.split('/')[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2nd Scooter Preferred Model */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-teal-900 uppercase tracking-wider">
                    {lang === 'EN' ? 'MODEL:' : lang === 'ZH' ? '车型:' : 'MODEL:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSecondModelId('any')}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border text-left flex items-center justify-between cursor-pointer ${
                        secondModelId === 'any'
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'bg-white text-slate-800 border-stone-200'
                      }`}
                    >
                      <span>✨ Any in Category</span>
                      {secondModelId === 'any' && <Check className="w-3 h-3" />}
                    </button>

                    {secondCat.models.map((m) => {
                      const is2ndMSelected = secondModelId === m.id;

                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSecondModelId(m.id)}
                          className={`px-2.5 py-2 rounded-xl text-xs font-bold border text-left flex items-center justify-between gap-1 cursor-pointer ${
                            is2ndMSelected
                              ? 'bg-teal-700 text-white border-teal-700'
                              : 'bg-white text-slate-800 border-stone-200'
                          }`}
                        >
                          <span className="truncate">🛵 {m.name}</span>
                          {is2ndMSelected && <Check className="w-3 h-3 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2nd Scooter Quantity Stepper */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-teal-950">
                    {lang === 'EN' ? '2nd Bike Qty:' : lang === 'ZH' ? '第 2 部数量:' : 'Jumlah Motor Ke-2:'}
                  </span>
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-teal-300">
                    <button
                      type="button"
                      onClick={() => setSecondQuantity(Math.max(1, secondQuantity - 1))}
                      className="w-6 h-6 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-900 font-black text-sm flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-extrabold text-slate-900 w-6 text-center">{secondQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setSecondQuantity(secondQuantity + 1)}
                      className="w-6 h-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-black text-sm flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Rental Duration */}
            <div className="space-y-1 bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'EN' ? 'Rental Duration' : lang === 'ZH' ? '租赁时长' : 'Durasi Sewa'} *
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-white border border-stone-200 focus:border-teal-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer outline-hidden"
              >
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={6}>6 Days</option>
                <option value={7}>7 Days (1 Week)</option>
                <option value={10}>10 Days</option>
                <option value={14}>14 Days (2 Weeks)</option>
              </select>
              <p className="text-[11px] font-bold text-teal-700 pt-0.5 tracking-tight flex items-center gap-1">
                <span>⏱️</span>
                <span>(1 day = 24-Hour Rental)</span>
              </p>
            </div>

            {/* Step 4: Start Date & Pickup Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Start Date */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>{lang === 'EN' ? 'Start Date' : lang === 'ZH' ? '开始日期' : 'Tanggal Ambil'} *</span>
                </label>
                <input
                  type="date"
                  required
                  min={todayISO}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer outline-hidden"
                />
              </div>

              {/* Pickup Time */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{lang === 'EN' ? 'Pickup Time' : lang === 'ZH' ? '取车时间' : 'Jam Ambil'} *</span>
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer outline-hidden"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Step 5: Delivery Location Options (NO STORE PICKUP DUE TO HIGH SEASON) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{lang === 'EN' ? 'Delivery Location' : lang === 'ZH' ? '送车地点' : 'Lokasi Pengantaran'} *</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPickupMethod('hotel')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
                    pickupMethod === 'hotel'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-stone-50 text-slate-800 border-stone-200 hover:border-teal-500'
                  }`}
                >
                  <span>🛵 Hotel / Villa Delivery</span>
                  <span className="text-[10px] opacity-90">+Rp 20k/unit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPickupMethod('airport')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between gap-1 cursor-pointer ${
                    pickupMethod === 'airport'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-stone-50 text-slate-800 border-stone-200 hover:border-teal-500'
                  }`}
                >
                  <span>✈️ Komodo Airport (LBJ)</span>
                  <span className="text-[10px] opacity-90">+Rp 20k/unit</span>
                </button>
              </div>

              {pickupMethod === 'hotel' && (
                <div className="pt-1">
                  <input
                    type="text"
                    required
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder={lang === 'EN' ? 'Type Hotel / Villa name (e.g. Ayana, Meruorah, Sudamala...)' : lang === 'ZH' ? '输入酒店/度假村名称 (如 Ayana, Meruorah...)' : 'Ketik nama Hotel / Villa (contoh Ayana, Meruorah...)'}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 outline-hidden"
                  />
                </div>
              )}
            </div>

            {/* Price Calculator Summary Box & Action */}
            <div className="pt-3 border-t border-stone-200 bg-stone-50 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="text-xs font-semibold text-slate-600">
                  {calculation.totalUnits} {lang === 'EN' ? (calculation.totalUnits > 1 ? 'Scooters' : 'Scooter') : 'Unit'} ({durationDays} {durationDays > 1 ? 'Days' : 'Day'}) + Delivery
                </p>
                <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase">{lang === 'EN' ? 'Total Est:' : 'Total:'}</span>
                  <span className="text-xl sm:text-2xl font-black text-teal-700">
                    Rp {new Intl.NumberFormat('id-ID').format(calculation.totalEstimate)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-teal-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{lang === 'EN' ? 'Send WhatsApp Booking' : lang === 'ZH' ? '通过 WA 发送预订' : 'Kirim Booking ke WhatsApp'}</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

