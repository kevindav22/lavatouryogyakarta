import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link dari react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Button from '../../commons/Button';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import apiClient from '../../../services/apiClient';
import { logoData } from '../../../assets/Datafull';

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [linkWhatsapp, setLinkWhatsapp] = useState('');
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Paket Lava Tour', href: '/paket-lava-tour' },
    { label: 'Rumah Makan', href: '/restoran-terdekat' },
    { label: 'Galery', href: '/galeri-wisata' },
    { label: 'Tentang Kami', href: '/profil-perusahaan' },
  ];

  useEffect(() => {
    const fetchKontakData = async () => {
      try {
        const response = await apiClient.get('/api/kontak');
        const kontakData = response.data[0]; // Ambil data kontak pertama
        setLinkWhatsapp(kontakData?.linkWhatsapp || ''); // Set linkWhatsApp
      } catch (error) {
        console.error('Error fetching kontak data:', error);
      }
    };

    fetchKontakData();
    const intervalId = setInterval(fetchKontakData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowNavbar(false); // Hide navbar on scroll down
    } else {
      setShowNavbar(true); // Show navbar on scroll up
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 960) {
      setOpenNav(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-4 right-4 sm:left-6 sm:right-6 md:left-16 md:right-16 lg:left-20 lg:right-20 z-50 bg-red-800/85 shadow-md rounded-b-2xl backdrop-blur-md transform transition-transform duration-1000 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="px-10 md:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoData.imageLogo} alt={logoData.altLogo} className="h-10 w-auto sm:h-14 lg:h-16 object-contain" width="64" height="64" fetchpriority="high" />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav navLinks={navLinks} activePath={location.pathname} />

        {/* Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            link={linkWhatsapp} // WhatsApp link dari API
            target="_blank"
            className="text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium shadow-lg transition border border-white hover:bg-green-500 hover:border-none"
          >
            Hubungi Kami
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white focus:outline-none" onClick={() => setOpenNav(!openNav)}>
          <FontAwesomeIcon icon={openNav ? faTimes : faBars} className="h-6 w-6 transition-transform duration-300" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav navLinks={navLinks} openNav={openNav} activePath={location.pathname} linkWhatsapp={linkWhatsapp} />
    </nav>
  );
};

export default Navbar;
