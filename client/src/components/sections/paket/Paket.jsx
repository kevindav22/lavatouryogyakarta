import React, { useState, useEffect, Suspense } from 'react';
import TitleSection from '../../commons/TitleSection';
import { loadGlobalData } from '../../../services/GlobalData';

const PackageGrid = React.lazy(() => import('./PackageGrid'));

const Paket = () => {
  const [judulContent, setJudulContent] = useState(null);
  const [paketJeepData, setPaketJeepData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadGlobalData();
      setJudulContent(data.judulContent?.find((item) => item.type === 'paketJeep') || null);
      setPaketJeepData(data.paketJeep || []);
    };

    loadData();
  }, []);

  return (
    <div className="bg-gray-300 py-12 font-poppins px-4 sm:px-6 md:px-16 lg:px-20">
      <div className="max-w-8xl mx-auto">
        {/* Judul */}
        <div className="mb-12 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
          {judulContent && (
            <TitleSection
              data={[
                {
                  title: judulContent.judul,
                  subtitle: judulContent.deskripsi,
                },
              ]}
            />
          )}
        </div>

        {/* Grid Paket */}
        <Suspense fallback={<div></div>}>
          <PackageGrid packages={paketJeepData} />
        </Suspense>
      </div>
    </div>
  );
};

export default Paket;
