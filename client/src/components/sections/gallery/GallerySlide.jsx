import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../services/apiClient';

const GallerySlide = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Fetch gallery images
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await apiClient.get('/api/gallery');
        setGalleryImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchGalleryImages();
    const intervalId = setInterval(fetchGalleryImages, 10000); // Re-fetch images every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Effect to smoothly scroll when currentIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * 320, // Setiap gambar memiliki lebar 320px
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };

  // Render images
  const renderImages = () => {
    return galleryImages.map((item, index) => (
      <div key={item.id} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={index * 150} className="w-[320px] h-60 md:h-72 lg:h-80 overflow-hidden rounded-lg flex-shrink-0">
        <img src={item.image ? `${apiClient.defaults.baseURL}${item.image}` : undefined} alt={item.altImage || 'Image'} className="w-full h-full object-cover transition-transform transform hover:scale-105 rounded-lg" />
      </div>
    ));
  };

  return (
    <div className="relative bg-white py- px-4 sm:px-8 md:px-16 lg:px-20">
      {galleryImages.length > 0 && (
        <>
          <div ref={carouselRef} className="flex space-x-4 transition-all duration-500 ease-in-out overflow-hidden">
            {renderImages()}
          </div>
          <div className="flex justify-end items-center space-x-4 mt-4">
            <button onClick={prevSlide} className="text-red-600  hover:text-red-700">
              <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
            </button>
            <button onClick={nextSlide} className=" text-red-600  hover:text-red-700">
              <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GallerySlide;
