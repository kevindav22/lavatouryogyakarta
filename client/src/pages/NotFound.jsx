import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-8xl font-extrabold text-red-700">404</h1>
      <p className="mt-4 text-lg text-gray-600">Oops! Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="mt-6 px-6 py-3 text-white bg-red-700 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
