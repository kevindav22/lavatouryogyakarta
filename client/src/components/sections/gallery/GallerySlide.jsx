import { useState, useEffect, useRef } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { loadGlobalData } from '../../../services/GlobalData';

const GallerySlide = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await loadGlobalData();
      if (data.gallery) {
        setGalleryImages(data.gallery);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * 320,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const nextSlide = () => {
    if (galleryImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    if (galleryImages.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="relative bg-white py-4 px-4 sm:px-8 md:px-16 lg:px-20">
      {galleryImages.length > 0 && (
        <>
          <div ref={carouselRef} className="flex space-x-4 transition-all duration-500 ease-in-out overflow-hidden">
            {galleryImages.map((item, index) => (
              <div key={item.id} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={index * 150} className="w-[320px] h-60 md:h-72 lg:h-80 overflow-hidden rounded-lg flex-shrink-0">
                {/* FIX CLS: tambahkan width & height eksplisit */}
                <img src={item.image} alt={item.altImage || 'Image'} width="320" height="240" className="w-full h-full object-cover transition-transform transform hover:scale-105 rounded-lg" />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center space-x-4 mt-4">
            <button onClick={prevSlide} className="text-red-600 hover:text-red-700" aria-label="Sebelumnya">
              <FaArrowCircleLeft size={32} />
            </button>

            <button onClick={nextSlide} className="text-red-600 hover:text-red-700" aria-label="Berikutnya">
              <FaArrowCircleRight size={32} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GallerySlide;
