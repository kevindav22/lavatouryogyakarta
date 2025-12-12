import { useState, useEffect } from 'react';
import TitleSection from '../../commons/TitleSection';
import Button from '../../commons/Button';
import GridResto from './GridResto';
import { loadGlobalData } from '../../../services/GlobalData';

const RestoSection = () => {
  const [judulContent, setJudulContent] = useState(null);
  const [restoData, setRestoData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const global = await loadGlobalData();
      const filtered = global.judulContent.find((item) => item.type === 'rumahMakan');
      setJudulContent(filtered || null);
      setRestoData(global.restoran);
    };

    loadData();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 md:px-16 lg:px-20 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="mb-12 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
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

        <GridResto data={restoData} />

        <div className="mt-8 flex justify-center">
          <Button className="bg-red-700 hover:bg-red-600 text-white w-full max-w-[400px] py-4 rounded-xl text-sm sm:text-base md:text-lg font-medium shadow-lg transition" onClick={() => (window.location.href = '/restoran-terdekat')}>
            Lihat Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RestoSection;
