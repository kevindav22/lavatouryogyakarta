import { useState, useEffect } from 'react';
import TitleSection from '../../commons/TitleSection';
import Button from '../../commons/Button';
import CtaImage from './CtaImage';
import { loadGlobalData } from '../../../services/GlobalData';
import { promosiData } from '../../../assets/Datafull';

const PromosiJeep = () => {
  const { title, backgroundImage } = promosiData;
  const [linkWhatsapp, setLinkWhatsapp] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await loadGlobalData();
      setLinkWhatsapp(data.kontak?.linkWhatsapp || '');
    };
    loadData();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-gray-300">
      <div className="relative px-8 py-28 md:px-16 lg:px-24 rounded-xl mx-auto text-white">
        <CtaImage backgroundImage={backgroundImage} />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-2/3 text-center md:text-left space-y-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <TitleSection data={[{ title }]} titleColor="text-white text-shadow" />
          </div>
          <div className="w-full md:w-1/3 flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
            <Button className="border border-white hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium shadow-lg transition" onClick={() => (window.location.href = '/paket-lava-tour')}>
              Detail Paket
            </Button>
            <Button link={linkWhatsapp} target="_blank" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium shadow-lg transition">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromosiJeep;
