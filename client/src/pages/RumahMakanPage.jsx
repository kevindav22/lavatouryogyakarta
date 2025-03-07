import React from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import DetailResto from '../components/sections/resto/DetailResto';
import { heroPageRumahMakan } from '../assets/Datafull';

const RumahMakan = () => {
  return (
    <>
      <Helmet>
        <title>Rumah Makan AAP TOUR ADVENTURE - Pilihan Menu Makan Lezat di Merapi</title>
        <meta
          name="description"
          content="Temukan pengalaman kuliner yang tak terlupakan di Rumah Makan AAP TOUR ADVENTURE. Menyajikan hidangan khas Nusantara dan internasional dengan berbagai paket menu mulai dari Rp 17k. Nikmati suasana nyaman dan fasilitas lengkap seperti free Wi-Fi dan parkir luas."
        />
        <meta name="keywords" content="rumah makan, restoran di Merapi, menu makanan murah, menu nasi box, menu prasmanan, makanan enak di Merapi, makanan nusantara, restoran jogja, makan siang jogja, rumah makan AAP TOUR ADVENTURE" />
        <meta name="author" content="AAP TOUR ADVENTURE" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Rumah Makan AAP TOUR ADVENTURE - Pilihan Menu Makan Lezat di Merapi" />
        <meta
          property="og:description"
          content="Rumah Makan AAP TOUR ADVENTURE menyajikan hidangan Nusantara dan internasional dalam suasana nyaman. Pilih paket menu prasmanan dan nasi box dengan harga terjangkau. Nikmati pengalaman kuliner di Merapi."
        />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/resto-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/restoran-terdekat" />
        <meta property="og:type" content="website" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rumah Makan AAP TOUR ADVENTURE - Pilihan Menu Makan Lezat di Merapi" />
        <meta name="twitter:description" content="Temukan berbagai pilihan menu lezat di Rumah Makan AAP TOUR ADVENTURE, mulai dari nasi box hingga prasmanan, dengan suasana nyaman di Merapi." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/resto-preview.webp" />
      </Helmet>
      <Navbar />
      <HeroPageCarousel data={heroPageRumahMakan} />
      <DetailResto />
      <Footer />
    </>
  );
};

export default RumahMakan;
