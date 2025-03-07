import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import TitleSection from '../../commons/TitleSection';
import apiClient from '../../../services/apiClient';

const DetailResto = () => {
  const [judulContent, setJudulContent] = useState(null);
  const [restoData, setRestoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [judulResponse, restoResponse] = await Promise.all([apiClient.get('/api/judul-content'), apiClient.get('/api/restoran')]);

        const filteredJudul = judulResponse.data.filter((item) => item.type === 'rumahMakan');
        setJudulContent(filteredJudul.length > 0 ? filteredJudul[0] : null);
        setRestoData(restoResponse.data);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-300 py-16 px-4 sm:px-6 md:px-16 lg:px-20">
      <div className="mb-12 text-center" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="600">
        {judulContent ? (
          <TitleSection
            data={[
              {
                title: judulContent.judul,
                subtitle: judulContent.deskripsi,
              },
            ]}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="container mx-auto max-w-8xl">
        {restoData.map((resto, index) => (
          <div key={resto.id} className="mb-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 300}>
            <div className="flex flex-col lg:flex-row bg-white rounded-t-2xl shadow-md">
              <div className="lg:w-1/2 aspect-[16/9] overflow-hidden rounded-2xl shadow-md">
                <img src={`${apiClient.defaults.baseURL}${resto.image}`} alt={resto.altImage} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="lg:w-1/2 flex flex-col justify-between p-6">
                <div className="mb-6">
                  <h1 className="font-staatliches tracking-wide text-4xl text-orange-500 font-bold mb-2">{resto.namaResto}</h1>
                  <div className="flex items-center text-gray-600 mb-4 hover:text-yellow-500">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 mr-2" />
                    <a href={resto.linkMaps} target="_blank" rel="noopener noreferrer">
                      {resto.alamat}
                    </a>
                  </div>
                  <p className="text-gray-700 font-poppins leading-relaxed">{resto.deskripsi}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 font-poppins">Menu Unggulan</h2>
                  <p className="text-gray-600">{resto.menuUnggulan.join(', ')}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 font-poppins">Fasilitas</h2>
                  <p className="text-gray-600">{resto.fasilitas.join(', ')}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 font-poppins">Kontak</h2>
                  <a href={resto.linkKontak} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-500">
                    {resto.kontak}
                  </a>
                </div>

                <a href={resto.linkMaps} target="_blank" rel="noopener noreferrer" className="text-white bg-red-600 hover:bg-red-500 font-semibold py-2 px-4 rounded text-center">
                  Lihat di Google Maps
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-b-2xl shadow-md">
              <h2 className="font-staatliches tracking-wide text-4xl text-orange-500 font-bold mb-6">Pilihan Menu - {resto.namaPaket}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resto['varian-paket'].map((menu) => (
                  <div key={menu.id} className="bg-red-50 p-4 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold text-red-600 mb-4 font-poppins">{menu.title}</h3>
                    <ul className="text-gray-600 space-y-1">
                      {menu.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faArrowRight} className="text-red-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailResto;
