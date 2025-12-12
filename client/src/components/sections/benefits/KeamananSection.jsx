import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { keamananData } from '../../../assets/Datafull';

const KeamananSection = () => {
  return (
    <section id="security-card" className="py-12 px-4 sm:px-6 lg:px-16 bg-gray-300 font-poppins">
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition-shadow min-h-[30rem] flex flex-col justify-between items-center">
          <div className="text-center" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
            <div className="flex items-center justify-center w-16 h-16 bg-red-700 rounded-full mb-4 shadow-md hover:bg-red-600 transition-colors mx-auto">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            <h3 className="text-gray-800 text-xl font-semibold mb-2">{keamananData.judul}</h3>
            <p className="text-gray-600 text-base break-words">{keamananData.deskripsi}</p>
          </div>

          <ul className="space-y-4 w-full py-12">
            {keamananData.keamanan.map((feature, index) => (
              <li key={feature.id} className="flex items-center text-gray-700 text-md font-semibold bg-slate-50 p-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 200}>
                <FaCheckCircle className="text-green-500 mr-3" />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KeamananSection;
