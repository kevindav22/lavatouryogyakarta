import React, { useState, useEffect } from 'react';
import ImageProfile from './ImageProfile';
import TextProfile from './TextProfile';
import apiClient from '../../../services/apiClient';

const ProfileSection = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await apiClient.get('/api/info-perusahaan');
        if (response.data.length > 0) {
          setCompanyInfo(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
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
