import React, { useState, useEffect, Suspense } from 'react';
import TitleSection from '../../commons/TitleSection';
import apiClient from '../../../services/apiClient';

const PackageGrid = React.lazy(() => import('./PackageGrid'));

const Paket = () => {
  const [judulContent, setJudulContent] = useState(null);
  const [paketJeepData, setPaketJeepData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [judulResponse, paketResponse] = await Promise.all([apiClient.get('/api/judul-content'), apiClient.get('/api/paket-jeep')]);

        const filteredJudul = judulResponse.data.filter((item) => item.type === 'paketJeep');
        setJudulContent(filteredJudul.length > 0 ? filteredJudul[0] : null);
        setPaketJeepData(paketResponse.data);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 py-12 font-poppins px-4 sm:px-6 md:px-16 lg:px-20">
      <div className="max-w-8xl mx-auto">
        <div className="mb-12 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
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
        <Suspense fallback={<div></div>}>
          <PackageGrid packages={paketJeepData} />
        </Suspense>
      </div>
    </div>
  );
};

export default Paket;
