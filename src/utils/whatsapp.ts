import { Language } from '../data/translations';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * Generates a context-aware WhatsApp URL based on the current page path and language.
 */
export function getContextualWhatsAppUrl(pathname: string, lang: Language): string {
  let message = '';
  const cleanPath = pathname.toLowerCase();

  if (cleanPath.startsWith('/cars')) {
    if (lang === 'EN') {
      message = 'Hi HelloBajo! I am interested in Private Car Charter / Overland & City Tour in Labuan Bajo.';
    } else if (lang === 'ZH') {
      message = '你好 HelloBajo！我想咨询拉布安巴佐私人包车 / 城市与陆地游服务。';
    } else {
      message = 'Halo HelloBajo! Saya tertarik info sewa mobil private / tur darat di Labuan Bajo.';
    }
  } else if (cleanPath.startsWith('/boats')) {
    if (lang === 'EN') {
      message = 'Hi HelloBajo! I am interested in Komodo Speedboat & Boat Charter / Island Hopping.';
    } else if (lang === 'ZH') {
      message = '你好 HelloBajo！我想咨询科莫多快艇 / 跃岛游包船服务。';
    } else {
      message = 'Halo HelloBajo! Saya tertarik info sewa speedboat / island hopping Komodo.';
    }
  } else if (cleanPath.startsWith('/blog')) {
    if (lang === 'EN') {
      message = 'Hi HelloBajo! I am reading your Labuan Bajo travel guide and have a question.';
    } else if (lang === 'ZH') {
      message = '你好 HelloBajo！我正在浏览您的拉布安巴佐旅游指南，想咨询一些行程问题。';
    } else {
      message = 'Halo HelloBajo! Saya sedang membaca panduan wisata Labuan Bajo dan ingin bertanya.';
    }
  } else if (cleanPath === '/' || cleanPath === '' || cleanPath.includes('scooter')) {
    if (lang === 'EN') {
      message = 'Hi HelloBajo! I would like to inquire about scooter rental & travel services in Labuan Bajo.';
    } else if (lang === 'ZH') {
      message = '你好 HelloBajo！我想咨询拉布安巴佐的租摩托车与旅游服务。';
    } else {
      message = 'Halo HelloBajo! Saya mau tanya sewa motor & layanan wisata di Labuan Bajo.';
    }
  } else {
    if (lang === 'EN') {
      message = 'Hi HelloBajo! I would like to inquire about your travel services in Labuan Bajo.';
    } else if (lang === 'ZH') {
      message = '你好 HelloBajo！我想咨询 HelloBajo 在拉布安巴佐的旅游与租车服务。';
    } else {
      message = 'Halo HelloBajo! Saya ingin bertanya mengenai layanan HelloBajo di Labuan Bajo.';
    }
  }

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
