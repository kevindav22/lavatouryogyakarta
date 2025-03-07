import React from 'react';
import HeroPageContent from './HeroPageContent';

const HeroPageCarousel = ({ data }) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {data.map((item) => (
        <div
          key={item.id}
          className="absolute inset-0 h-full w-full bg-black/70"
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
          <HeroPageContent title={item.title} breadcrumbs={item.breadcrumbs} />
        </div>
      ))}
    </div>
  );
};

export default HeroPageCarousel;
