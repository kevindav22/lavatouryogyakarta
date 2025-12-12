import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../hooks/UseScrollPosition';

const RootLayout = () => {
  return (
    <>
      <ScrollToTop /> {/* Menambahkan ScrollToTop */}
      <Outlet /> {/* Menampilkan konten sesuai rute */}
    </>
  );
};

export default RootLayout;
