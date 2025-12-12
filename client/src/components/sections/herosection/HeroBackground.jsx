import React from 'react';

const HeroBackground = ({ currentIndex, carouselImages }) => {
  return (
    <>
      {carouselImages.map((image, index) => {
        // fallback width/height
        const width = image.width || 1920;
        const height = image.height || 1080;

        // srcset untuk responsive
        const srcSet = `
          ${image.imageSmall || image.image} 768w,
          ${image.imageMedium || image.image} 1280w,
          ${image.image || image} 1920w
        `;

        return (
          <img
            key={index}
            src={image.image || undefined}
            srcSet={srcSet}
            sizes="(max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
            width={width}
            height={height}
            loading="lazy"
            alt={image.altImage || 'Background Image'}
            className={`hero-bg ${index === currentIndex ? 'active' : ''}`}
            style={{ objectFit: 'cover' }}
          />
        );
      })}
    </>
  );
};

export default HeroBackground;
