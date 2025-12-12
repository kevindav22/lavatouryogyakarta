import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import { heroPageGallery } from '../assets/Datafull';
import MasonryGridGallery from '../components/sections/gallery/Gallery';
import QuoteSections from '../components/sections/quote/QuoteSections';
import TikTokGallery from '../components/sections/gallery/VideoTiktok';

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>Galeri Wisata Merapi, Jeep Offroad & Kuliner Jogja – lavatouryogyakarta</title>

        {/* CANONICAL */}
        <link rel="canonical" href="https://lavatouryogyakarta.com/galeri-wisata" />

        {/* DESCRIPTION */}
        <meta name="description" content="Nikmati galeri foto resmi lavatouryogyakarta. Lihat momen petualangan Lava Tour Merapi, jeep offroad, wisata alam, dan pengalaman kuliner khas Jogja dalam visual berkualitas tinggi." />

        {/* ROBOTS */}
        <meta name="robots" content="index, follow" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Galeri Wisata Merapi, Jeep Offroad & Kuliner Jogja – lavatouryogyakarta" />
        <meta property="og:description" content="Eksplorasi visual terbaik dari petualangan Lava Tour Merapi, jeep offroad, wisata alam, hingga kuliner khas Jogja hanya di lavatouryogyakarta." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/galeri-wisata" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Galeri Wisata Merapi, Jeep Offroad & Kuliner Jogja – lavatouryogyakarta" />
        <meta name="twitter:description" content="Lihat koleksi foto petualangan jeep Merapi, wisata alam, dan kuliner Jogja dalam galeri resmi lavatouryogyakarta." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />

        {/* JSON-LD SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['TouristAttraction', 'LocalBusiness'],
            name: 'lavatouryogyakarta',
            url: 'https://lavatouryogyakarta.com/galeri-wisata',
            image: 'https://lavatouryogyakarta.com/img/lavatour-preview.webp',
            description: 'Galeri visual Lava Tour Merapi, jeep offroad, wisata alam, dan kuliner Jogja.',
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
      <HeroPageCarousel data={heroPageGallery} />
      <MasonryGridGallery />
      <TikTokGallery/>

      <QuoteSections />
      <Footer />
    </>
  );
};

export default GalleryPage;
