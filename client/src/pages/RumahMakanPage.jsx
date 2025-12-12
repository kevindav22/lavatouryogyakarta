import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import DetailResto from '../components/sections/resto/DetailResto';
import { heroPageRumahMakan } from '../assets/Datafull';

const RumahMakan = () => {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>Rumah Makan lavatouryogyakarta – Kuliner Nusantara & Prasmanan Merapi</title>

        {/* CANONICAL */}
        <link rel="canonical" href="https://lavatouryogyakarta.com/rumah-makan" />

        {/* DESCRIPTION */}
        <meta name="description" content="Nikmati hidangan Nusantara, menu prasmanan, dan nasi box di Rumah Makan lavatouryogyakarta. Suasana nyaman, harga terjangkau, dan fasilitas lengkap untuk rombongan maupun keluarga." />

        {/* ROBOTS */}
        <meta name="robots" content="index, follow" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rumah Makan lavatouryogyakarta – Kuliner Nusantara & Prasmanan Merapi" />
        <meta property="og:description" content="Rumah Makan lavatouryogyakarta menyediakan hidangan Nusantara, menu prasmanan, dan nasi box dengan suasana nyaman dan fasilitas lengkap di kawasan Merapi." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/rumah-makan" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rumah Makan lavatouryogyakarta – Kuliner Nusantara & Prasmanan Merapi" />
        <meta name="twitter:description" content="Pilihan kuliner lezat di Merapi, mulai dari prasmanan hingga nasi box. Tersedia fasilitas nyaman dan layanan profesional dari lavatouryogyakarta." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />

        {/* JSON-LD SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Restaurant', 'LocalBusiness'],
            name: 'Rumah Makan lavatouryogyakarta',
            url: 'https://lavatouryogyakarta.com/rumah-makan',
            image: 'https://lavatouryogyakarta.com/img/lavatour-preview.webp',
            description: 'Hidangan Nusantara, prasmanan, dan nasi box dengan suasana nyaman di Rumah Makan lavatouryogyakarta.',
            servesCuisine: ['Indonesian', 'Nusantara'],
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
      <HeroPageCarousel data={heroPageRumahMakan} />
      <DetailResto />
      <Footer />
    </>
  );
};

export default RumahMakan;
