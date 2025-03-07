import React from 'react';
import { Helmet } from "react-helmet-async";
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
        <title>Paket Lava Tour Merapi - Petualangan Jeep Off-road Terbaik</title>
        <meta
          name="description"
          content="Temukan berbagai pilihan Paket Lava Tour Merapi dengan pengalaman wisata seru dan penuh petualangan. Nikmati keindahan Gunung Merapi dengan jeep Willys, dari perjalanan singkat hingga eksplorasi mendalam, dengan harga terjangkau dan diskon menarik!"
        />
        <meta name="keywords" content="paket lava tour merapi, jeep off-road merapi, paket jeep merapi, wisata merapi, paket lava tour termurah, wisata alam merapi, sewa jeep jogja murah, wisata lava merapi, diskon lava tour merapi" />
        <meta name="author" content="AAP TOUR ADVENTURE" />

        {/* Open Graph */}
        <meta property="og:title" content="Paket Lava Tour Merapi - Petualangan Jeep Off-road Terbaik" />
        <meta property="og:description" content="Nikmati pengalaman wisata seru di Merapi dengan berbagai pilihan paket Lava Tour. Mulai dari paket mini hingga paket sunrise untuk pengalaman yang tak terlupakan. Dapatkan diskon menarik!" />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/paket-lava-tour" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paket Lava Tour Merapi - Petualangan Jeep Off-road Terbaik" />
        <meta name="twitter:description" content="Jelajahi keindahan Gunung Merapi dengan berbagai pilihan paket Lava Tour yang menarik, termasuk diskon spesial. Pesan sekarang untuk petualangan seru bersama AAP TOUR ADVENTURE!" />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
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
