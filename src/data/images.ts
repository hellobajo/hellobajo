// ============================================================================
// PUSAT PENGATURAN FOTO & GAMBAR LOKAL (CENTRAL MEDIA ASSETS)
// TERISOLASI SECARA TOTAL PER HALAMAN, ARTIKEL, & ITINERARY
// ============================================================================
// 📖 PETUNJUK SANGAT MUDAH UNTUK MENGGANTI/UPDATE FOTO LOKAL:
//
// Semua foto disimpan secara LOKAL di folder: `/src/assets/images/`
// Untuk mengganti foto, Anda CUKUP menimpa/mengganti file .jpg di folder tersebut
// dengan nama file yang sama! Tidak perlu mengubah struktur kodingannya lagi.
//
// DAFATAR NAMA FILE FISIK LOKAL DI `/src/assets/images/`:
//
// 📌 1. PRIVATE CITY TOUR (1-DAY ITINERARY STEPS):
// - Step 1 (Penjemputan Hotel/Airport) : city_step1_pickup.jpg
// - Step 2 (Gua Batu Cermin)            : city_step2_batucermin.jpg
// - Step 3 (Bukit Cinta Viewpoint)     : city_step3_bukitcinta.jpg
// - Step 4 (Makan Siang & Seafood)      : city_step4_lunch.jpg
// - Step 5 (Pusat Oleh-Oleh & Tenun)   : city_step5_souvenir.jpg
// - Step 6 (Puncak Waringin Sunset)    : city_step6_sunset.jpg
// - Step 7 (Makan Malam & Drop Hotel)   : city_step7_dinner.jpg
//
// 📌 2. ALTERNATIVE / OPTIONAL SPOTS (CITY TOUR):
// - Jalan Pesisir Golo Mori            : city_opt_golomori.jpg
// - Gua Rangko (Kolam Air Asin)        : city_opt_guarangko.jpg
// - Desa Adat Melo (Budaya Manggarai)   : city_opt_desamelo.jpg
//
// 📌 3. MULTIDAY OVERLAND FLORES DESTINATIONS:
// - Desa Adat Wae Rebo                 : overland_waerebo.jpg
// - Ruteng & Sawah Cancar              : overland_ruteng.jpg
// - Bajawa & Desa Adat Bena            : overland_bajawa.jpg
// - Danau 3 Warna Kelimutu             : overland_kelimutu.jpg
//
// 📌 4. BLOG ARTICLES (13 ARTIKEL MANDIRI):
// - Artikel 1-13 (art1_first_timer_cover.jpg, art2_airport_cover.jpg, dll)
// ============================================================================

// ----------------------------------------------------------------------------
// 1. BRANDING & LOGO
// ----------------------------------------------------------------------------
export const SITE_LOGO = '/logo.png';

// ----------------------------------------------------------------------------
// 2. HOMEPAGE HERO & BANNER IMPORTS
// ----------------------------------------------------------------------------
import heroBgLocal from '../assets/images/scooter_hero_1785763110302.jpg';
import beatImg from '../assets/images/scooter_beat_1785763028729.jpg';
import scoopyImg from '../assets/images/scooter_scoopy_1785763049796.jpg';
import nmaxImg from '../assets/images/scooter_nmax_1785763064245.jpg';

import tourCarImg from '../assets/images/tourcar.jpg';
import speedboatImg from '../assets/images/speedboat.jpg';

export const HERO_IMAGE = heroBgLocal;

export const SCOOTER_IMAGES = {
  beat: beatImg,
  scoopy: scoopyImg,
  nmax: nmaxImg,
};

export const CAR_CHARTER_BANNER = tourCarImg;
export const SPEEDBOAT_BANNER = speedboatImg;

import boatAthenaImg from '../assets/images/boat_athena.jpg';
import boatShiningImg from '../assets/images/boat_shining.jpg';
import boatArsivaImg from '../assets/images/boat_arsiva.jpg';
import boatSeaZaydanImg from '../assets/images/boat_sea_zaydan.jpg';
import boatPhinisiGenImg from '../assets/images/boat_phinisi_general.jpg';

export const BOAT_FLEET_IMAGES = {
  athena: boatAthenaImg,       // File: src/assets/images/boat_athena.jpg
  shining: boatShiningImg,     // File: src/assets/images/boat_shining.jpg
  arsiva: boatArsivaImg,       // File: src/assets/images/boat_arsiva.jpg
  seaZaydan: boatSeaZaydanImg, // File: src/assets/images/boat_sea_zaydan.jpg
  phinisi: boatPhinisiGenImg,  // File: src/assets/images/boat_phinisi_general.jpg
};

// ----------------------------------------------------------------------------
// 3. PRIVATE CITY TOUR 1-DAY ITINERARY STEPS (VARIABEL IMPOR LOKAL)
// ----------------------------------------------------------------------------
import cityStep1Pickup from '../assets/images/city_step1_pickup.jpg';
import cityStep2BatuCermin from '../assets/images/city_step2_batucermin.jpg';
import cityStep3BukitCinta from '../assets/images/city_step3_bukitcinta.jpg';
import cityStep4Lunch from '../assets/images/city_step4_lunch.jpg';
import cityStep5Souvenir from '../assets/images/city_step5_souvenir.jpg';
import cityStep6Sunset from '../assets/images/city_step6_sunset.jpg';
import cityStep7Dinner from '../assets/images/city_step7_dinner.jpg';

export const CITY_TOUR_ITINERARY_IMAGES = {
  step1Pickup: cityStep1Pickup,             // File: src/assets/images/city_step1_pickup.jpg
  step2BatuCermin: cityStep2BatuCermin,     // File: src/assets/images/city_step2_batucermin.jpg
  step3BukitCinta: cityStep3BukitCinta,     // File: src/assets/images/city_step3_bukitcinta.jpg
  step4Lunch: cityStep4Lunch,               // File: src/assets/images/city_step4_lunch.jpg
  step5Souvenir: cityStep5Souvenir,         // File: src/assets/images/city_step5_souvenir.jpg
  step6Sunset: cityStep6Sunset,             // File: src/assets/images/city_step6_sunset.jpg
  step7Dinner: cityStep7Dinner,             // File: src/assets/images/city_step7_dinner.jpg
};

// ----------------------------------------------------------------------------
// 4. ALTERNATIVE / OPTIONAL SPOTS (CITY TOUR) (VARIABEL IMPOR LOKAL)
// ----------------------------------------------------------------------------
import cityOptGoloMori from '../assets/images/city_opt_golomori.jpg';
import cityOptGuaRangko from '../assets/images/city_opt_guarangko.jpg';
import cityOptDesaMelo from '../assets/images/city_opt_desamelo.jpg';

export const CITY_TOUR_OPTIONAL_IMAGES = {
  goloMori: cityOptGoloMori,   // File: src/assets/images/city_opt_golomori.jpg
  guaRangko: cityOptGuaRangko, // File: src/assets/images/city_opt_guarangko.jpg
  desaMelo: cityOptDesaMelo,   // File: src/assets/images/city_opt_desamelo.jpg
};

// ----------------------------------------------------------------------------
// 5. MULTIDAY OVERLAND FLORES DESTINATIONS (VARIABEL IMPOR LOKAL)
// ----------------------------------------------------------------------------
import overlandWaeRebo from '../assets/images/overland_waerebo.jpg';
import overlandRuteng from '../assets/images/overland_ruteng.jpg';
import overlandBajawa from '../assets/images/overland_bajawa.jpg';
import overlandKelimutu from '../assets/images/overland_kelimutu.jpg';

export const OVERLAND_DESTINATION_IMAGES = {
  waeRebo: overlandWaeRebo,   // File: src/assets/images/overland_waerebo.jpg
  ruteng: overlandRuteng,     // File: src/assets/images/overland_ruteng.jpg
  bajawa: overlandBajawa,     // File: src/assets/images/overland_bajawa.jpg
  kelimutu: overlandKelimutu, // File: src/assets/images/overland_kelimutu.jpg
};

// ----------------------------------------------------------------------------
// 6. MASTER DESTINATION & RIDING IMAGES
// ----------------------------------------------------------------------------
import padarImg from '../assets/images/padar.jpg';
import pinkbeachImg from '../assets/images/pinkbeach.jpg';
import komodoImg from '../assets/images/komodo.jpg';
import guaRangkoImg from '../assets/images/guarangko.jpg';
import goloMoriImg from '../assets/images/golomori.jpg';
import bukitCintaImg from '../assets/images/3bukitcinta.jpg';
import waereboImg from '../assets/images/waerebo.jpg';
import kelimutuImg from '../assets/images/kelimutu.jpg';
import seafoodImg from '../assets/images/seafood.jpg';
import airportImg from '../assets/images/airport.jpg';
import safetyImg from '../assets/images/safety.jpg';
import packingImg from '../assets/images/packing.jpg';
import sunsetImg from '../assets/images/sunset.jpg';
import phinisiImg from '../assets/images/phinisi.jpg';
import mantaImg from '../assets/images/manta.jpg';

export const DESTINATION_IMAGES = {
  padarIsland: padarImg,
  pinkBeach: pinkbeachImg,
  komodoDragon: komodoImg,
  mantaPoint: mantaImg,
  guaRangko: guaRangkoImg,
  goloMori: goloMoriImg,
  bukitCinta: bukitCintaImg,
  bukitSilvia: sunsetImg,
  waeRebo: waereboImg,
  kelimutu: kelimutuImg,
  cuncaWulang: kelimutuImg,
  seafoodMarket: seafoodImg,
  komodoAirport: airportImg,
  scooterSafety: safetyImg,
  packingGuide: packingImg,
  carCharter: tourCarImg,
  speedboat: speedboatImg,
  phinisi: phinisiImg,
};

export const RIDING_DESTINATIONS = {
  goloMori: goloMoriImg,
  guaRangko: guaRangkoImg,
  bukitCinta: bukitCintaImg,
  waeRebo: waereboImg,
  waecicu: pinkbeachImg,
  bukitSilvia: sunsetImg,
  padarIsland: padarImg,
  pinkBeach: pinkbeachImg,
  komodoDragon: komodoImg,
  mantaPoint: mantaImg,
  guaRangkoImg: guaRangkoImg,
  kelimutu: kelimutuImg,
  cuncaWulang: kelimutuImg,
  seafoodMarket: seafoodImg,
  komodoAirport: airportImg,
};

// ----------------------------------------------------------------------------
// 7. BLOG ARTICLES (13 ARTIKEL TERISOLASI SECARA TOTAL)
// ----------------------------------------------------------------------------
import art1_cover from '../assets/images/art1_first_timer_cover.jpg';
import art1_g1 from '../assets/images/art1_gallery1.jpg';
import art1_g2 from '../assets/images/art1_gallery2.jpg';
import art1_g3 from '../assets/images/art1_gallery3.jpg';
import art1_g4 from '../assets/images/art1_gallery4.jpg';

import art2_cover from '../assets/images/art2_airport_cover.jpg';
import art2_g1 from '../assets/images/art2_gallery1.jpg';
import art2_g2 from '../assets/images/art2_gallery2.jpg';
import art2_g3 from '../assets/images/art2_gallery3.jpg';
import art2_g4 from '../assets/images/art2_gallery4.jpg';

import art3_cover from '../assets/images/art3_kelimutu_cover.jpg';
import art3_g1 from '../assets/images/art3_gallery1.jpg';
import art3_g2 from '../assets/images/art3_gallery2.jpg';
import art3_g3 from '../assets/images/art3_gallery3.jpg';
import art3_g4 from '../assets/images/art3_gallery4.jpg';

import art4_cover from '../assets/images/art4_seafood_cover.jpg';
import art4_g1 from '../assets/images/art4_gallery1.jpg';
import art4_g2 from '../assets/images/art4_gallery2.jpg';
import art4_g3 from '../assets/images/art4_gallery3.jpg';
import art4_g4 from '../assets/images/art4_gallery4.jpg';

import art5_cover from '../assets/images/art5_diving_manta_cover.jpg';
import art5_g1 from '../assets/images/art5_gallery1.jpg';
import art5_g2 from '../assets/images/art5_gallery2.jpg';
import art5_g3 from '../assets/images/art5_gallery3.jpg';
import art5_g4 from '../assets/images/art5_gallery4.jpg';

import art6_cover from '../assets/images/art6_packing_cover.jpg';
import art6_g1 from '../assets/images/art6_gallery1.jpg';
import art6_g2 from '../assets/images/art6_gallery2.jpg';
import art6_g3 from '../assets/images/art6_gallery3.jpg';
import art6_g4 from '../assets/images/art6_gallery4.jpg';

import art7_cover from '../assets/images/art7_car_charter_cover.jpg';
import art7_g1 from '../assets/images/art7_gallery1.jpg';
import art7_g2 from '../assets/images/art7_gallery2.jpg';
import art7_g3 from '../assets/images/art7_gallery3.jpg';
import art7_g4 from '../assets/images/art7_gallery4.jpg';

import art8_cover from '../assets/images/art8_safety_cover.jpg';
import art8_g1 from '../assets/images/art8_gallery1.jpg';
import art8_g2 from '../assets/images/art8_gallery2.jpg';
import art8_g3 from '../assets/images/art8_gallery3.jpg';
import art8_g4 from '../assets/images/art8_gallery4.jpg';

import art9_cover from '../assets/images/art9_gua_rangko_cover.jpg';
import art9_g1 from '../assets/images/art9_gallery1.jpg';
import art9_g2 from '../assets/images/art9_gallery2.jpg';
import art9_g3 from '../assets/images/art9_gallery3.jpg';
import art9_g4 from '../assets/images/art9_gallery4.jpg';

import art10_cover from '../assets/images/art10_golo_mori_cover.jpg';
import art10_g1 from '../assets/images/art10_gallery1.jpg';
import art10_g2 from '../assets/images/art10_gallery2.jpg';
import art10_g3 from '../assets/images/art10_gallery3.jpg';
import art10_g4 from '../assets/images/art10_gallery4.jpg';

import art11_cover from '../assets/images/art11_sunset_cover.jpg';
import art11_g1 from '../assets/images/art11_gallery1.jpg';
import art11_g2 from '../assets/images/art11_gallery2.jpg';
import art11_g3 from '../assets/images/art11_gallery3.jpg';
import art11_g4 from '../assets/images/art11_gallery4.jpg';

import art12_cover from '../assets/images/art12_wae_rebo_cover.jpg';
import art12_g1 from '../assets/images/art12_gallery1.jpg';
import art12_g2 from '../assets/images/art12_gallery2.jpg';
import art12_g3 from '../assets/images/art12_gallery3.jpg';
import art12_g4 from '../assets/images/art12_gallery4.jpg';

import art13_cover from '../assets/images/art13_getting_around_cover.jpg';
import art13_g1 from '../assets/images/art13_gallery1.jpg';
import art13_g2 from '../assets/images/art13_gallery2.jpg';
import art13_g3 from '../assets/images/art13_gallery3.jpg';
import art13_g4 from '../assets/images/art13_gallery4.jpg';

export const BLOG_IMAGES = {
  firstTimerGuide: { cover: art1_cover, gallery: [art1_g1, art1_g2, art1_g3, art1_g4] },
  airportScooter: { cover: art2_cover, gallery: [art2_g1, art2_g2, art2_g3, art2_g4] },
  kelimutuLakes: { cover: art3_cover, gallery: [art3_g1, art3_g2, art3_g3, art3_g4] },
  culinarySeafood: { cover: art4_cover, gallery: [art4_g1, art4_g2, art4_g3, art4_g4] },
  divingManta: { cover: art5_cover, gallery: [art5_g1, art5_g2, art5_g3, art5_g4] },
  packingSailing: { cover: art6_cover, gallery: [art6_g1, art6_g2, art6_g3, art6_g4] },
  carCharter: { cover: art7_cover, gallery: [art7_g1, art7_g2, art7_g3, art7_g4] },
  safetyGuide: { cover: art8_cover, gallery: [art8_g1, art8_g2, art8_g3, art8_g4] },
  guaRangko: { cover: art9_cover, gallery: [art9_g1, art9_g2, art9_g3, art9_g4] },
  goloMori: { cover: art10_cover, gallery: [art10_g1, art10_g2, art10_g3, art10_g4] },
  sunsetSpots: { cover: art11_cover, gallery: [art11_g1, art11_g2, art11_g3, art11_g4] },
  waeRebo: { cover: art12_cover, gallery: [art12_g1, art12_g2, art12_g3, art12_g4] },
  gettingAround: { cover: art13_cover, gallery: [art13_g1, art13_g2, art13_g3, art13_g4] },
};
