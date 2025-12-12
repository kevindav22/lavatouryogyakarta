import React, { useState, useEffect } from 'react';
import ImageProfile from './ImageProfile';
import TextProfile from './TextProfile';
import { loadGlobalData } from '../../../services/GlobalData';

const ProfileSection = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadGlobalData();
      setCompanyInfo(data.perusahaan || null);
    };

    loadData();
  }, []);

  if (!companyInfo) {
    return (
      <section className="py-24 bg-gray-200 font-poppins">
        <div className="container mx-auto text-center">
          <></>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-gray-200 font-poppins">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <ImageProfile image={companyInfo.image} altImage={companyInfo.altImage} />

        <TextProfile title={companyInfo.identitas} subtitle={companyInfo.tagline} description={companyInfo.tentang} />
      </div>
    </section>
  );
};

export default ProfileSection;
