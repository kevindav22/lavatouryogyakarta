import TitleSection from '../../commons/TitleSection';
import Button from '../../commons/Button';

const TextProfile = ({ title, subtitle, description }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
      {/* Kirim data sebagai array */}
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <TitleSection data={[{ title, subtitle }]} />
      </div>
      <p className="text-gray-800 leading-relaxed text-base sm:text-lg lg:text-xl text-justify" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
        {description}
      </p>
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
        <Button className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium shadow-lg transition" onClick={() => (window.location.href = '/paket-lava-tour')}>
          Lihat Paket
        </Button>
      </div>
    </div>
  );
};

export default TextProfile;
