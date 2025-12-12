import React from 'react';
import { Helmet } from 'react-helmet-async';
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
        <title>Lava Tour Yogyakarta – Wisata Jeep Merapi, Paket Tour & Kuliner Jogja</title>

        <link rel="canonical" href="https://lavatouryogyakarta.com/" />
        <meta name="robots" content="index, follow" />

        <meta name="description" content="Nikmati pengalaman wisata Lava Tour Merapi dengan jeep offroad, paket tour lengkap, dan kuliner khas Jogja di lavatouryogyakarta. Pilihan paket wisata, restoran, dan layanan profesional." />
        <meta name="keywords" content="lava tour yogyakarta, jeep merapi, sewa jeep merapi, wisata merapi, paket tour jogja, kuliner merapi, rumah makan jogja, resto merapi" />
        <meta name="author" content="lavatouryogyakarta" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lava Tour Yogyakarta – Wisata Jeep Merapi, Paket Tour & Kuliner Jogja" />
        <meta property="og:description" content="Petualangan jeep Merapi dan kuliner khas Jogja dalam paket wisata lengkap di lavatouryogyakarta." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lava Tour Yogyakarta – Wisata Jeep Merapi & Kuliner Jogja" />
        <meta name="twitter:description" content="Eksplorasi wisata Merapi dengan jeep offroad dan kuliner khas Jogja." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['TouristAttraction', 'LocalBusiness'],
            name: 'lavatouryogyakarta',
            url: 'https://lavatouryogyakarta.com',
            image: 'https://lavatouryogyakarta.com/img/lavatour-preview.webp',
            description: 'Layanan wisata Lava Tour Merapi, sewa jeep Jogja, paket tour, dan kuliner khas Jogja.',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Yogyakarta',
              addressCountry: 'ID',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+6282137395506',
              contactType: 'customer service',
            },
          })}
        </script>
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
