import React, { useEffect } from 'react';
import PackageCard from './PackageCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PackageGrid = ({ packages }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-6">
      {/* Kolom Kiri */}
      <div className="flex-[1_1_100%] md:flex-[1.8] h-[300px] md:h-[500px] relative group" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
        {packages[0] && <PackageCard data={packages[0]} />}
      </div>

      {/* Kolom Kanan */}
      <div className="flex flex-col gap-6 flex-[1_1_100%] md:flex-[2]">
        <div className="relative h-[200px] sm:h-[300px] group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          {packages[1] && <PackageCard data={packages[1]} />}
        </div>
        <div className="flex flex-wrap gap-6">
          {packages.slice(2).map((pkg, index) => (
            <div key={pkg.id} className="relative h-[200px] sm:h-[300px] flex-[1_1_100%] sm:flex-[1_1_calc(50%-1rem)] group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 200}>
              <PackageCard data={pkg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageGrid;
