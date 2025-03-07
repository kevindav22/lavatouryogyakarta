import React from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import ProfileSection from '../components/sections/profile/ProfileSection';
import { heroPageProfile } from '../assets/Datafull';

const TentangKami = () => {
  return (
    <>
      <Helmet>
        <title>Tentang Kami - AAP TOUR ADVENTURE | Jelajahi Keindahan Gunung Merapi</title>
        <meta
          name="description"
          content="AAP TOUR ADVENTURE adalah penyedia layanan perjalanan wisata yang berfokus pada eksplorasi Gunung Merapi. Nikmati pengalaman wisata tak terlupakan dengan tur jeep dan rumah makan yang menyajikan hidangan lezat khas lokal."
        />
        <meta name="keywords" content="tentang AAP TOUR, wisata gunung merapi, tur jeep merapi, wisata jogja, rumah makan jogja, wisata alam merapi, kuliner merapi, pengalaman wisata merapi" />
        <meta name="author" content="AAP TOUR ADVENTURE" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Tentang Kami - AAP TOUR ADVENTURE | Jelajahi Keindahan Gunung Merapi" />
        <meta property="og:description" content="AAP TOUR ADVENTURE adalah penyedia layanan perjalanan wisata dengan fokus utama di Gunung Merapi. Jelajahi keindahan alam Merapi dan nikmati kuliner khas Jogja di rumah makan kami." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/tentang-kami" />
        <meta property="og:type" content="website" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tentang Kami - AAP TOUR ADVENTURE | Jelajahi Keindahan Gunung Merapi" />
        <meta name="twitter:description" content="Jelajahi wisata Gunung Merapi dan nikmati hidangan khas lokal di AAP TOUR ADVENTURE. Kami menyediakan pengalaman tak terlupakan yang menggabungkan alam dan kuliner." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
      </Helmet>
      <Navbar />
      <HeroPageCarousel data={heroPageProfile} />
      <ProfileSection />

      <Footer />
    </>
  );
};

export default TentangKami;
