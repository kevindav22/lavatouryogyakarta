import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import DetailPaket from '../components/sections/paket/DetailPaket';
import QuoteSections from '../components/sections/quote/QuoteSections';
import PromosiWaJeep from '../components/sections/promosi/PromosiWaJeep';
import { heroPagePaketJeep } from '../assets/Datafull';

const PaketLavaTour = () => {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>Paket Lava Tour Merapi – Petualangan Jeep Offroad Jogja</title>

        {/* CANONICAL */}
        <link rel="canonical" href="https://lavatouryogyakarta.com/paket-lava-tour" />

        {/* DESCRIPTION */}
        <meta
          name="description"
          content="Pilih paket resmi Lava Tour Merapi dari lavatouryogyakarta. Nikmati petualangan jeep offroad Jogja, mulai dari paket short, medium, long hingga sunrise. Harga terjangkau, aman, dan berpengalaman."
        />

        {/* ROBOTS */}
        <meta name="robots" content="index, follow" />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Paket Lava Tour Merapi – Petualangan Jeep Offroad Jogja" />
        <meta property="og:description" content="Temukan berbagai paket Lava Tour Merapi berkualitas. Mulai dari jeep short trip hingga sunrise adventure. Harga terbaik, aman, dan cocok untuk keluarga maupun rombongan." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/paket-lava-tour" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paket Lava Tour Merapi – Petualangan Jeep Offroad Jogja" />
        <meta name="twitter:description" content="Pesan paket jeep Merapi resmi dari lavatouryogyakarta. Mulai dari trip singkat hingga sunrise tour dengan pengalaman terbaik." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />

        {/* JSON-LD SCHEMA – KONSISTEN DENGAN HALAMAN SEBELUMNYA */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['TouristAttraction', 'LocalBusiness'],
            name: 'lavatouryogyakarta',
            url: 'https://lavatouryogyakarta.com/paket-lava-tour',
            image: 'https://lavatouryogyakarta.com/img/lavatour-preview.webp',
            description: 'Paket Lava Tour Merapi resmi dengan pilihan trip jeep offroad terbaik di Jogja.',
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
      <HeroPageCarousel data={heroPagePaketJeep} />
      <DetailPaket />
      <PromosiWaJeep />
      <QuoteSections />
      <Footer />
    </>
  );
};

export default PaketLavaTour;
