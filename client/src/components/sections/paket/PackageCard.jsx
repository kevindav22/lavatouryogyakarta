import React, { useEffect, useRef, useState } from 'react';
import apiClient from '../../../services/apiClient';

const PackageCard = ({ data }) => {
  const imgRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const checkInView = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(checkInView, { threshold: 0.1 });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const discountedPrice = Math.floor((data.hargaAwal * (1 + parseFloat(data.diskon) / 100)) / 1000) * 1000;

  const formatRupiah = (number) => `Rp ${number.toLocaleString('id-ID').replace(/,/g, '.')}`;

  return (
    <div className="relative h-full w-full group">
      {/* Gambar dan Konten */}
      <div className="relative h-full w-full">
        {/* Gambar dengan Lazy Loading */}
        <img ref={imgRef} src={isInView ? `${apiClient.defaults.baseURL}${data.image}` : undefined} alt={data.altImage || 'Paket wisata'} className="h-full w-full object-cover rounded-lg" loading="lazy" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg transition-all duration-300 group-hover:bg-opacity-20"></div>

        {/* Konten */}
        <div className="absolute bottom-8 left-8 text-white text-shadow font-poppins">
          <p className="text-lg font-medium">Paket </p>
          <h2 className="font-staatliches text-4xl text-orange-500 font-bold">{data.NamaPaket}</h2>
          <p className="font-staatliches text-xl line-through text-gray-400">{formatRupiah(discountedPrice)}</p>
          <p className="font-staatliches text-4xl text-white">{formatRupiah(data.hargaAwal)}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
