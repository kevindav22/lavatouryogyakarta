import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { layananData } from '../../../assets/Datafull';

// Tambahkan semua ikon ke library Font Awesome
library.add(fas);

const LayananSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16 bg-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {layananData.map((service, index) => (
            <div
              key={service.id || index} // Gunakan service.id jika tersedia, atau fallback ke index
              data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={index * 300} 
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center group hover:shadow-lg transition-shadow"
              style={{
                minWidth: '250px',
                maxWidth: '300px',
              }}
            >
              {/* Ikon */}
              <div className="flex items-center justify-center w-16 h-16 bg-red-700 rounded-full mb-4 shadow-md group-hover:bg-red-600 transition-colors">
                <FontAwesomeIcon icon={['fas', service.icon]} className="text-white text-3xl" />
              </div>
              {/* Judul */}
              <h3 className="text-gray-800 text-xl font-semibold text-center mb-2">{service.judul}</h3>
              {/* Deskripsi */}
              <p className="text-gray-600 text-base text-center">{service.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayananSection;
