import React from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/sections/navbar/Navbar';
import Footer from '../components/sections/Footer/Footer';
import HeroPageCarousel from '../components/sections/herosection/HeroPageCaraousel';
import { heroPageGallery } from '../assets/Datafull';
import MasonryGridGallery from '../components/sections/gallery/Gallery';
import QuoteSections from '../components/sections/quote/QuoteSections';

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        <title>Eksplorasi Visual Wisata, Jeep, dan Kuliner - AAP TOUR ADVENTURE</title>
        <meta
          name="description"
          content="Lihat momen spesial dari perjalanan kami, mulai dari wisata alam Merapi, petualangan jeep, hingga pengalaman kuliner yang memanjakan lidah. Eksplorasi visual dari galeri foto terbaik yang memperlihatkan keindahan Merapi dan kuliner khas AAP TOUR ADVENTURE."
        />
        <meta name="keywords" content="galeri wisata, foto jeep merapi, wisata alam merapi, petualangan jeep jogja, foto kuliner jogja, galeri perjalanan, wisata jogja, galeri foto wisata, eksplorasi merapi, foto jeep merapi" />
        <meta name="author" content="AAP TOUR ADVENTURE" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Eksplorasi Visual Wisata, Jeep, dan Kuliner - AAP TOUR ADVENTURE" />
        <meta property="og:description" content="Lihat galeri foto terbaik dari perjalanan wisata, jeep, dan kuliner di AAP TOUR ADVENTURE. Nikmati visual dari keindahan alam Merapi dan kuliner lezat yang kami sajikan." />
        <meta property="og:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
        <meta property="og:url" content="https://lavatouryogyakarta.com/galeri-wisata" />
        <meta property="og:type" content="website" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eksplorasi Visual Wisata, Jeep, dan Kuliner - AAP TOUR ADVENTURE" />
        <meta name="twitter:description" content="Jelajahi momen tak terlupakan melalui galeri foto kami yang menampilkan keindahan alam Merapi, petualangan jeep, dan kuliner khas AAP TOUR ADVENTURE." />
        <meta name="twitter:image" content="https://lavatouryogyakarta.com/img/lavatour-preview.webp" />
      </Helmet>
      <Navbar />
      <HeroPageCarousel data={heroPageGallery} />
      <MasonryGridGallery />
      <QuoteSections />
      <Footer />
    </>
  );
};

export default GalleryPage;
