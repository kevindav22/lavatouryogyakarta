import React, { useState, useEffect, lazy} from 'react';
import apiClient from '../../../services/apiClient';

const HeroBackground = lazy(() => import('./HeroBackground'));
const HeroContent = lazy(() => import('./HeroContent'));

const HeroCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [linkWhatsapp, setLinkWhatsapp] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse, kontakResponse] = await Promise.all([apiClient.get('/api/info-perusahaan'), apiClient.get('/api/kontak')]);

        if (companyResponse.data.length > 0) {
          const companyData = companyResponse.data[0];
          setCompanyInfo({
            nama: companyData.nama,
            identitas: companyData.identitas,
            tagline: companyData.tagline,
            deskripsi: companyData.deskripsi,
          });
          setCarouselImages(companyData.carouselImages || []);
        }

        const kontakData = kontakResponse.data[0];
        setLinkWhatsapp(kontakData?.linkWhatsapp || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
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
