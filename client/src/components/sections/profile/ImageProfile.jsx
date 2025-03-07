import React from 'react';
import apiClient from '../../../services/apiClient';

const ImageProfile = ({ image, altImage }) => {
  return (
    <div className="w-full md:w-1/2 flex justify-center group">
      <div data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200" className="relative w-full max-w-md md:max-w-none rounded-lg overflow-hidden shadow-lg aspect-video">
        <img src={`${apiClient.defaults.baseURL}${image}`} alt={altImage} className="w-full h-full object-cover rounded-lg" />
        {/* Overlay untuk efek hover */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg transition-all duration-300 group-hover:bg-opacity-20"></div>
      </div>
    </div>
  );
};

export default ImageProfile;
