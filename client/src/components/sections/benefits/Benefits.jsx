import TitleSection from '../../commons/TitleSection';
import { benefitsData } from '../../../assets/Datafull';
import { FaCar, FaBoxOpen, FaTools, FaHandshake, FaUserTie, FaClock } from 'react-icons/fa';

const iconMap = {
  car: FaCar,
  'box-open': FaBoxOpen,
  tools: FaTools,
  handshake: FaHandshake,
  'user-tie': FaUserTie,
  clock: FaClock,
};

const BenefitsSection = () => {
  const { judul, deskripsi, benefits } = benefitsData[0];

  return (
    <section id="benefits-section" className="py-16 px-4 sm:px-6 md:px-16 lg:px-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <TitleSection data={[{ title: judul, subtitle: deskripsi }]} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-y-8 gap-x-6">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <div key={benefit.id} className="flex flex-col items-center group transition-transform hover:scale-105" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={index * 150}>
                {/* Ikon */}
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-red-700 rounded-full mb-3 shadow-md group-hover:bg-red-600 transition-colors">
                  {IconComponent && <IconComponent className="text-white text-3xl lg:text-4xl" />}
                </div>

                {/* Teks */}
                <p className="text-gray-800 text-center text-sm md:text-base lg:text-lg font-semibold">{benefit.judul}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
