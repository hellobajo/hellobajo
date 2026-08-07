// ============================================================================
// PUSAT PENGATURAN FOTO & GAMBAR LOKAL (CENTRAL MEDIA ASSETS)
// TERISOLASI SECARA TOTAL PER HALAMAN, ARTIKEL, & ITINERARY
// ============================================================================

// 1. BRANDING & LOGO
export const SITE_LOGO = '/logo.png';

// 2. HOMEPAGE & HERO IMPORTS
import heroBgLocal from '../assets/images/scooter_hero_1785763110302.jpg';
import scooterHeroAlt from '../assets/images/scooter_hero_1785763110302-alt.jpg';
import beatImg from '../assets/images/scooter_beat_1785763028729.jpg';
import scoopyImg from '../assets/images/scooter_scoopy_1785763049796.jpg';
import nmaxImg from '../assets/images/scooter_nmax_1785763064245.jpg';

export const HERO_IMAGE = heroBgLocal;

export const SCOOTER_IMAGES = {
  beat: beatImg,
  scoopy: scoopyImg,
  nmax: nmaxImg,
};

// 3. PRIVATE CITY TOUR HERO & BANNERS
import cityTourHeroImg from '../assets/images/city_tour_hero.jpg';
import tourCarImg from '../assets/images/tourcar.jpg';

export const CITY_TOUR_HERO = cityTourHeroImg;
export const CAR_CHARTER_BANNER = tourCarImg;

// 4. PRIVATE CITY TOUR 1-DAY ITINERARY STEPS
import cityStep1Pickup from '../assets/images/city_step1_pickup.jpg';
import cityStep2BatuCermin from '../assets/images/city_step2_batucermin.jpg';
import cityStep3BukitCinta from '../assets/images/city_step3_bukitcinta.jpg';
import cityStep4Lunch from '../assets/images/city_step4_lunch.jpg';
import cityStep5Souvenir from '../assets/images/city_step5_souvenir.jpg';
import cityStep6Sunset from '../assets/images/city_step6_sunset.jpg';
import cityStep7Dinner from '../assets/images/city_step7_dinner.jpg';

export const CITY_TOUR_ITINERARY_IMAGES = {
  step1Pickup: cityStep1Pickup,
  step2BatuCermin: cityStep2BatuCermin,
  step3BukitCinta: cityStep3BukitCinta,
  step4Lunch: cityStep4Lunch,
  step5Souvenir: cityStep5Souvenir,
  step6Sunset: cityStep6Sunset,
  step7Dinner: cityStep7Dinner,
};

// 5. PRIVATE CITY TOUR OPTIONAL SPOTS
import cityOptGoloMori from '../assets/images/city_opt_golomori.jpg';
import cityOptGuaRangko from '../assets/images/city_opt_guarangko.jpg';
import cityOptDesaMelo from '../assets/images/city_opt_desamelo.jpg';

export const CITY_TOUR_OPTIONAL_IMAGES = {
  goloMori: cityOptGoloMori,
  guaRangko: cityOptGuaRangko,
  desaMelo: cityOptDesaMelo,
};

// 6. SPEEDBOAT HERO & BANNERS
import speedboatHeroImg from '../assets/images/speedboat_hero.jpg';
import speedboatImg from '../assets/images/speedboat.jpg';

export const SPEEDBOAT_HERO = speedboatHeroImg;
export const SPEEDBOAT_BANNER = speedboatHeroImg;

// 7. SPEEDBOAT 6 DESTINATIONS (1-DAY KOMODO TOUR)
import speedboatPadar from '../assets/images/speedboat_dest_padar.jpg';
import speedboatPinkBeach from '../assets/images/speedboat_dest_pinkbeach.jpg';
import speedboatKomodo from '../assets/images/speedboat_dest_komodo.jpg';
import speedboatTakaMakassar from '../assets/images/speedboat_dest_takamakassar.jpg';
import speedboatMantaPoint from '../assets/images/speedboat_dest_mantapoint.jpg';
import speedboatKanawa from '../assets/images/speedboat_dest_kanawa.jpg';

export const SPEEDBOAT_DESTINATIONS = {
  padar: speedboatPadar,
  pinkBeach: speedboatPinkBeach,
  komodo: speedboatKomodo,
  takaMakassar: speedboatTakaMakassar,
  mantaPoint: speedboatMantaPoint,
  kanawa: speedboatKanawa,
};

// 8. SPEEDBOAT FLEET (KAPAL-KAPAL FLEET)
import boatAthena from '../assets/images/boat_athena.jpg';
import boatShining from '../assets/images/boat_shining.jpg';
import boatArsiva from '../assets/images/boat_arsiva.jpg';
import boatSeaZaydan from '../assets/images/boat_seazaydan.jpg';
import boatPhinisi from '../assets/images/boat_phinisi.jpg';

export const BOAT_FLEET_IMAGES = {
  athena: boatAthena,
  shining: boatShining,
  arsiva: boatArsiva,
  seaZaydan: boatSeaZaydan,
  phinisi: boatPhinisi,
};

// 9. MULTIDAY OVERLAND FLORES DESTINATIONS
import overlandWaeRebo from '../assets/images/overland_waerebo.jpg';
import overlandRuteng from '../assets/images/overland_ruteng.jpg';
import overlandBajawa from '../assets/images/overland_bajawa.jpg';
import kelimutuImg from '../assets/images/kelimutu.jpg';

export const OVERLAND_DESTINATION_IMAGES = {
  waeRebo: overlandWaeRebo,
  ruteng: overlandRuteng,
  bajawa: overlandBajawa,
  kelimutu: kelimutuImg,
};

// 10. MASTER DESTINATIONS & RIDING MAPS
import bukitCintaImg from '../assets/images/3bukitcinta.jpg';
import airportImg from '../assets/images/airport.jpg';

export const DESTINATION_IMAGES = {
  padarIsland: speedboatPadar,
  pinkBeach: speedboatPinkBeach,
  komodoDragon: speedboatKomodo,
  mantaPoint: speedboatMantaPoint,
  guaRangko: cityOptGuaRangko,
  goloMori: cityOptGoloMori,
  bukitCinta: bukitCintaImg,
  bukitSilvia: cityStep6Sunset,
  waeRebo: overlandWaeRebo,
  kelimutu: kelimutuImg,
  cuncaWulang: overlandRuteng,
  seafoodMarket: cityStep4Lunch,
  komodoAirport: airportImg,
  scooterSafety: heroBgLocal,
  packingGuide: scooterHeroAlt,
  carCharter: tourCarImg,
  speedboat: speedboatHeroImg,
  phinisi: boatPhinisi,
};

export const RIDING_DESTINATIONS = {
  goloMori: cityOptGoloMori,
  guaRangko: cityOptGuaRangko,
  bukitCinta: bukitCintaImg,
  waeRebo: overlandWaeRebo,
  waecicu: cityStep6Sunset,
  bukitSilvia: cityStep6Sunset,
  padarIsland: speedboatPadar,
  pinkBeach: speedboatPinkBeach,
  komodoDragon: speedboatKomodo,
  mantaPoint: speedboatMantaPoint,
  guaRangkoImg: cityOptGuaRangko,
  kelimutu: kelimutuImg,
  cuncaWulang: overlandRuteng,
  seafoodMarket: cityStep4Lunch,
  komodoAirport: airportImg,
};

// 11. 13 BLOG ARTICLES (COVER & 3 GALLERY PHOTOS EACH)
import art1_cover from '../assets/images/art1_cover.jpg';
import art1_g1 from '../assets/images/art1_gallery1.jpg';
import art1_g2 from '../assets/images/art1_gallery2.jpg';
import art1_g3 from '../assets/images/art1_gallery3.jpg';

import art2_cover from '../assets/images/art2_cover.jpg';
import art2_g1 from '../assets/images/art2_gallery1.jpg';
import art2_g2 from '../assets/images/art2_gallery2.jpg';
import art2_g3 from '../assets/images/art2_gallery3.jpg';

import art3_cover from '../assets/images/art3_cover.jpg';
import art3_g1 from '../assets/images/art3_gallery1.jpg';
import art3_g2 from '../assets/images/art3_gallery2.jpg';
import art3_g3 from '../assets/images/art3_gallery3.jpg';

import art4_cover from '../assets/images/art4_cover.jpg';
import art4_g1 from '../assets/images/art4_gallery1.jpg';
import art4_g2 from '../assets/images/art4_gallery2.jpg';
import art4_g3 from '../assets/images/art4_gallery3.jpg';

import art5_cover from '../assets/images/art5_cover.jpg';
import art5_g1 from '../assets/images/art5_gallery1.jpg';
import art5_g2 from '../assets/images/art5_gallery2.jpg';
import art5_g3 from '../assets/images/art5_gallery3.jpg';

import art6_cover from '../assets/images/art6_cover.jpg';
import art6_g1 from '../assets/images/art6_gallery1.jpg';
import art6_g2 from '../assets/images/art6_gallery2.jpg';
import art6_g3 from '../assets/images/art6_gallery3.jpg';

import art7_cover from '../assets/images/art7_cover.jpg';
import art7_g1 from '../assets/images/art7_gallery1.jpg';
import art7_g2 from '../assets/images/art7_gallery2.jpg';
import art7_g3 from '../assets/images/art7_gallery3.jpg';

import art8_cover from '../assets/images/art8_cover.jpg';
import art8_g1 from '../assets/images/art8_gallery1.jpg';
import art8_g2 from '../assets/images/art8_gallery2.jpg';
import art8_g3 from '../assets/images/art8_gallery3.jpg';

import art9_cover from '../assets/images/art9_cover.jpg';
import art9_g1 from '../assets/images/art9_gallery1.jpg';
import art9_g2 from '../assets/images/art9_gallery2.jpg';
import art9_g3 from '../assets/images/art9_gallery3.jpg';

import art10_cover from '../assets/images/art10_cover.jpg';
import art10_g1 from '../assets/images/art10_gallery1.jpg';
import art10_g2 from '../assets/images/art10_gallery2.jpg';
import art10_g3 from '../assets/images/art10_gallery3.jpg';

import art11_cover from '../assets/images/art11_cover.jpg';
import art11_g1 from '../assets/images/art11_gallery1.jpg';
import art11_g2 from '../assets/images/art11_gallery2.jpg';
import art11_g3 from '../assets/images/art11_gallery3.jpg';

import art12_cover from '../assets/images/art12_cover.jpg';
import art12_g1 from '../assets/images/art12_gallery1.jpg';
import art12_g2 from '../assets/images/art12_gallery2.jpg';
import art12_g3 from '../assets/images/art12_gallery3.jpg';

import art13_cover from '../assets/images/art13_cover.jpg';
import art13_g1 from '../assets/images/art13_gallery1.jpg';
import art13_g2 from '../assets/images/art13_gallery2.jpg';
import art13_g3 from '../assets/images/art13_gallery3.jpg';

export const BLOG_IMAGES = {
  firstTimerGuide: { cover: art1_cover, gallery: [art1_g1, art1_g2, art1_g3] },
  airportScooter: { cover: art2_cover, gallery: [art2_g1, art2_g2, art2_g3] },
  kelimutuLakes: { cover: art3_cover, gallery: [art3_g1, art3_g2, art3_g3] },
  culinarySeafood: { cover: art4_cover, gallery: [art4_g1, art4_g2, art4_g3] },
  divingManta: { cover: art5_cover, gallery: [art5_g1, art5_g2, art5_g3] },
  packingSailing: { cover: art6_cover, gallery: [art6_g1, art6_g2, art6_g3] },
  carCharter: { cover: art7_cover, gallery: [art7_g1, art7_g2, art7_g3] },
  safetyGuide: { cover: art8_cover, gallery: [art8_g1, art8_g2, art8_g3] },
  guaRangko: { cover: art9_cover, gallery: [art9_g1, art9_g2, art9_g3] },
  goloMori: { cover: art10_cover, gallery: [art10_g1, art10_g2, art10_g3] },
  sunsetSpots: { cover: art11_cover, gallery: [art11_g1, art11_g2, art11_g3] },
  waeRebo: { cover: art12_cover, gallery: [art12_g1, art12_g2, art12_g3] },
  gettingAround: { cover: art13_cover, gallery: [art13_g1, art13_g2, art13_g3] },
};
