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
import kampungUjungDinner from '../assets/images/art4_cover.jpg';

export const CITY_TOUR_ITINERARY_IMAGES = {
  step1Pickup: cityStep1Pickup,
  step2BatuCermin: cityStep2BatuCermin,
  step3BukitCinta: cityStep3BukitCinta,
  step4Lunch: cityStep4Lunch,
  step5Souvenir: cityStep5Souvenir,
  step6Sunset: cityStep6Sunset,
  step7Dinner: kampungUjungDinner,
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
import speedboatImg from '../assets/images/speedboat.jpg';

export const SPEEDBOAT_HERO = speedboatImg;
export const SPEEDBOAT_BANNER = speedboatImg;

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
import overlandRuteng from '../assets/images/overland_ruteng.jpg';
import overlandBajawa from '../assets/images/overland_bajawa.jpg';
import kelimutuImg from '../assets/images/kelimutu.jpg';
import art12_cover from '../assets/images/art12_cover.jpg';

export const OVERLAND_DESTINATION_IMAGES = {
  waeRebo: art12_cover,
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
  waeRebo: art12_cover,
  kelimutu: kelimutuImg,
  cuncaWulang: overlandRuteng,
  seafoodMarket: cityStep4Lunch,
  komodoAirport: airportImg,
  scooterSafety: heroBgLocal,
  packingGuide: scooterHeroAlt,
  carCharter: tourCarImg,
  speedboat: speedboatImg,
  phinisi: boatPhinisi,
};

export const RIDING_DESTINATIONS = {
  goloMori: cityOptGoloMori,
  guaRangko: cityOptGuaRangko,
  bukitCinta: bukitCintaImg,
  waeRebo: art12_cover,
  waecicu: cityStep6Sunset,
  bukitSilvia: cityStep6Sunset,
  padarIsland: speedboatPadar,
  pinkBeach: speedboatPinkBeach,
  komodoDragon: speedboatKomodo,
  mantaPoint: speedboatMantaPoint,
  guaRangkoImg: cityOptGuaRangko,
  kelimutu: kelimutuImg,
  cuncaWulang: overlandRuteng,
  seafoodMarket: kampungUjungDinner,
  komodoAirport: airportImg,
};

// 11. 13 BLOG ARTICLES (COVER & SELECTED HIGHLIGHT PHOTOS)
import art1_cover from '../assets/images/art1_cover.jpg';

import art3_cover from '../assets/images/art3_cover.jpg';
import art3_g1 from '../assets/images/art3_gallery1.jpg';
import art3_g2 from '../assets/images/art3_gallery2.jpg';
import art3_g3 from '../assets/images/art3_gallery3.jpg';

import art4_cover from '../assets/images/art4_cover.jpg';
import art5_cover from '../assets/images/art5_diving_manta_cover.jpg';

import art10_cover from '../assets/images/art10_cover.jpg';
import art10_g1 from '../assets/images/art10_gallery1.jpg';
import art10_g2 from '../assets/images/art10_gallery2.jpg';
import art10_g3 from '../assets/images/art10_gallery3.jpg';

import art11_cover from '../assets/images/art11_cover.jpg';
import art12_g1 from '../assets/images/art12_gallery1.jpg';
import art12_g2 from '../assets/images/art12_gallery2.jpg';
import art12_g3 from '../assets/images/art12_gallery3.jpg';
import art13_g4 from '../assets/images/art13_gallery4.jpg';

// GALLERY BLOG ARTICLES (COVER & SELECTED HIGHLIGHT PHOTOS)
import artCanyourent3Img from '../assets/images/art-canyourent3.jpg';
import kelimutulakeImg from '../assets/images/kelimutulake.jpg';
import roadkelimutuImg from '../assets/images/kelimutulake.jpg';

export const BLOG_IMAGES = {
  firstTimerGuide: { cover: art1_cover },
  airportScooter: { cover: airportImg },
  canyourent3: { cover: artCanyourent3Img },
  kelimutuLakes: { cover: art3_cover, gallery: [art3_g1, art3_g2, art3_g3] },
  kelimutu3warna: { cover: kelimutulakeImg },
  roadkelimutu: { cover: roadkelimutuImg },
  culinarySeafood: { cover: art4_cover },
  divingManta: { cover: art5_cover, gallery: [art5_cover, speedboatMantaPoint, speedboatTakaMakassar] },
  packingSailing: { cover: boatPhinisi, gallery: [boatAthena, boatShining, boatArsiva] },
  carCharter: { cover: tourCarImg },
  safetyGuide: { cover: heroBgLocal },
  guaRangko: { cover: cityOptGuaRangko, gallery: [cityOptGuaRangko, cityOptGoloMori, bukitCintaImg] },
  goloMori: { cover: art10_cover, gallery: [art10_g1, art10_g2, art10_g3] },
  sunsetSpots: { cover: art11_cover },
  waeRebo: { cover: art12_cover, gallery: [art12_g1, art12_g2, art12_g3] },
  gettingAround: { cover: art13_g4 },
};


