import { BsWhatsapp } from 'react-icons/bs';
import Button from '../../commons/Button';

const HeroContent = ({ companyInfo, linkWhatsapp }) => {
  if (!companyInfo) return null;

  return (
    <section className="absolute inset-0 bg-black/65 flex items-center justify-center">
      <div className="text-center text-white px-6 sm:px-12 md:px-24 space-y-6 mt-12 sm:mt-16 md:mt-20">
        {companyInfo.nama && (
          <h2 data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200" className="bg-white inline-block px-6 py-2 rounded-sm text-red-800 font-staatliches tracking-wide font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            {companyInfo.nama}
          </h2>
        )}
        <h1 data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200" className="font-staatliches tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold">
          {companyInfo.identitas}
        </h1>
        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium opacity-70">
          {companyInfo.tagline}
        </h2>
        <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" className="text-base sm:text-lg lg:text-xl font-light max-w-4xl mx-auto opacity-70">
          {companyInfo.deskripsi}
        </p>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="animate-bounce">
          <Button link={linkWhatsapp || '#'} target="_blank" className="bg-green-800 hover:bg-green-700">
            <div className="flex items-center justify-center space-x-2">
              <BsWhatsapp className="text-3xl sm:text-4xl leading-none mr-1" />
              <span className="leading-none">Pesan Sekarang</span>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroContent;
