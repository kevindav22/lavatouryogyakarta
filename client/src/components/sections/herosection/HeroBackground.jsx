import React, { useEffect, useState } from 'react';
import apiClient from '../../../services/apiClient';

const HeroBackground = ({ currentIndex, carouselImages }) => {
  const [zoomScale, setZoomScale] = useState(1.05);

  useEffect(() => {
    let animationFrameId;
    let scale = 1.05;

    const animateZoom = () => {
      scale += 0.0005;
      setZoomScale(scale);
      animationFrameId = requestAnimationFrame(animateZoom);
    };

    animateZoom();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentIndex]);

  return (
    <>
      {carouselImages.map((image, index) => (
        <img
        key={index}
        src={image.image ? `${apiClient.defaults.baseURL}${image.image}` : undefined}
        alt={image.altImage || 'Background Image'}
        className="fixed inset-0 h-full w-full object-cover transition-opacity duration-[1.5s] ease-in-out"
        style={{
          transform: index === currentIndex ? `scale(${zoomScale})` : 'scale(1)',
          opacity: index === currentIndex ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out, transform 4s linear',
          zIndex: -1,
        }}
      />
      ))}
    </>
  );
};

export default HeroBackground;
