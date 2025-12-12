import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import ProfileSection from '../components/sections/profile/ProfileSection';
import { heroPageProfile } from '../assets/Datafull';

const TentangKami = () => {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>Tentang Kami – Profil & Layanan lavatouryogyakarta</title>

        {/* CANONICAL */}
        <link rel="canonical" href="https://lavatouryogyakarta.com/tentang-kami" />

        {/* DESCRIPTION */}
        <meta
          name="description"
          content="Kenali lavatouryogyakarta sebagai penyedia layanan wisata Merapi, tur jeep, dan kuliner. Kami menghadirkan pengalaman terbaik untuk penjelajahan Gunung Merapi dan pelayanan ramah untuk setiap pengunjung."
        />

        {/* ROBOTS */}
        <meta name="robots" content="index, follow" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tentang Kami – Profil & Layanan lavatouryogyakarta" />
        <meta property="og:description" content="lavatouryogyakarta adalah penyedia layanan perjalanan wisata Merapi yang menawarkan tur jeep, eksplorasi alam, dan layanan kuliner berkualitas." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/tentang-kami" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tentang Kami – Profil & Layanan lavatouryogyakarta" />
        <meta name="twitter:description" content="Pelajari lebih dalam tentang lavatouryogyakarta yang menyediakan tur jeep Merapi, wisata alam, dan layanan kuliner terbaik." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />

        {/* JSON-LD SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'lavatouryogyakarta',
            url: 'https://lavatouryogyakarta.com/tentang-kami',
            image: 'https://lavatouryogyakarta.com/img/lavatour-preview.webp',
            description: 'Penyedia layanan Lava Tour Merapi, tur jeep, serta pengalaman wisata dan kuliner di kawasan Gunung Merapi.',
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
      <HeroPageCarousel data={heroPageProfile} />
      <ProfileSection />
      <Footer />
    </>
  );
};

export default TentangKami;
