import React from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/sections/navbar/Navbar';
import HeroCarousel from '../components/sections/herosection/HeroCarousel';
import BenefitsSection from '../components/sections/benefits/Benefits';
import PackagesSection from '../components/sections/paket/Paket';
import Footer from '../components/sections/Footer/Footer';
import GallerySlide from '../components/sections/gallery/GallerySlide';
import ProfileSection from '../components/sections/profile/ProfileSection';
import RestoSection from '../components/sections/resto/Resto';
import LayananSection from '../components/sections/benefits/Layanan';
import KeamananSection from '../components/sections/benefits/KeamananSection';
import PromosiJeep from '../components/sections/promosi/PromosiJeep';
import QuoteSections from '../components/sections/quote/QuoteSections';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>AAP TOUR ADVENTURE - Petualangan Jeep Merapi & Kuliner Jogja</title>
        <meta
          name="description"
          content="Jelajahi keindahan Gunung Merapi dengan AAP TOUR ADVENTURE. Nikmati petualangan seru di Lava Tour Merapi menggunakan jeep Willys, tur off-road terbaik di Jogja. Dapatkan pengalaman wisata yang aman, nyaman, dan penuh petualangan. Nikmati juga hidangan lezat di restoran kami. Hubungi kami untuk paket tur, sewa jeep murah, dan pemesanan via WhatsApp."
        />

        <meta
          name="keywords"
          content="tur petualangan merapi, sewa jeep offroad jogja, jeep lava tour merapi, jeep tour jogja, wisata alam merapi, jelajah lava merapi, wisata jeep merapi jogja, petualangan gunung merapi, jeep off-road merapi terbaik, paket wisata merapi, wisata lava jogja, paket sewa jeep merapi, kuliner jogja, rumah makan jogja"
        />
        <meta name="author" content="AAP TOUR ADVENTURE" />

        <meta property="og:title" content="AAP TOUR ADVENTURE - Petualangan Jeep Merapi & Kuliner Jogja" />
        <meta property="og:description" content="Nikmati petualangan jeep di Gunung Merapi dengan paket sewa jeep terbaik, jelajahi Lava Tour Merapi, dan nikmati hidangan lezat di restoran kami. Pesan tur Anda melalui WhatsApp sekarang!" />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AAP TOUR ADVENTURE - Petualangan Jeep Merapi & Kuliner Jogja" />
        <meta name="twitter:description" content="Nikmati pengalaman off-road seru di Lava Tour Merapi dan santap hidangan lezat di restoran kami. Hubungi kami untuk pemesanan melalui WhatsApp." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
      </Helmet>
      <Navbar />
      <HeroCarousel />
      <ProfileSection />
      <LayananSection />
      <PackagesSection />
      <KeamananSection />
      <PromosiJeep />
      <RestoSection />
      <BenefitsSection />
      <GallerySlide />
      <QuoteSections />
      <Footer />
    </>
  );
};

export default HomePage;
