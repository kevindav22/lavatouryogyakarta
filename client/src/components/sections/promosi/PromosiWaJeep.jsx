import { useState, useEffect } from 'react';
import TitleSection from '../../commons/TitleSection';
import Button from '../../commons/Button';
import CtaImage from './CtaImage';
import { loadGlobalData } from '../../../services/GlobalData';
import { promosiWaData } from '../../../assets/Datafull';

const PromosiWaJeep = () => {
  const { title, backgroundImage } = promosiWaData;

  const [linkWhatsapp, setLinkWhatsapp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadGlobalData(); 
      setLinkWhatsapp(data.kontak?.linkWhatsapp || '');
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-white">
      <div className="relative px-8 py-28 md:px-16 lg:px-24 rounded-xl mx-auto text-white flex flex-col items-center justify-center">
        <CtaImage backgroundImage={backgroundImage} />

        <div className="relative z-10 text-center space-y-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <TitleSection data={[{ title }]} titleColor="text-white text-shadow" />

          <Button link={linkWhatsapp} target="_blank" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition">
            Hubungi Kami
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromosiWaJeep;
