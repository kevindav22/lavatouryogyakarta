import React, { useState, useEffect, useRef } from 'react';

const TitleSection = ({ data, titleColor = 'text-red-700', subtitleColor = 'text-gray-600', slideDuration = 1000 }) => {
  const { title, subtitle } = data[0];
  return (
    <div>
      <h1 className={`text-4xl sm:text-6xl font-staatliches ${titleColor}`}>
        {title}
        {subtitle && <span className={`block text-lg sm:text-xl ${subtitleColor}`}>{subtitle}</span>}
      </h1>
    </div>
  );
};

export default TitleSection;
