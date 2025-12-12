import { useState, useEffect, lazy } from 'react';
import { loadGlobalData } from '../../../services/GlobalData';

const HeroBackground = lazy(() => import('./HeroBackground'));
const HeroContent = lazy(() => import('./HeroContent'));

const HeroCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [linkWhatsapp, setLinkWhatsapp] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const global = await loadGlobalData(); // ✅ fetch + cache

      setCompanyInfo({
        nama: global.perusahaan?.nama || '',
        identitas: global.perusahaan?.identitas || '',
        tagline: global.perusahaan?.tagline || '',
        deskripsi: global.perusahaan?.deskripsi || '',
      });

      setCarouselImages(global.perusahaan?.carouselImages || []);
      setLinkWhatsapp(global.kontak?.linkWhatsapp || '');
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages]);

  return (
    <div className="relative w-full h-screen">
      <HeroBackground currentIndex={currentIndex} carouselImages={carouselImages} />
      <HeroContent companyInfo={companyInfo} linkWhatsapp={linkWhatsapp} />
    </div>
  );
};

export default HeroCarousel;
