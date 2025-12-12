import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import Button from '../../commons/Button';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import { loadGlobalData } from '../../../services/GlobalData';
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
    const loadData = async () => {
      const data = await loadGlobalData();
      if (data.kontak) {
        setLinkWhatsapp(data.kontak.linkWhatsapp || '');
      }
    };

    loadData();
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
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
      className={`fixed top-0 left-4 right-4 sm:left-6 sm:right-6 md:left-16 md:right-16 lg:left-20 lg:right-20 
      z-50 bg-red-800/85 shadow-md rounded-b-2xl backdrop-blur-md transform 
      transition-transform duration-1000 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="px-10 md:px-12 py-6 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <div className="h-10 sm:h-14 lg:h-16 w-32 sm:w-40 lg:w-48 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${logoData.imageLogo})` }} role="img" aria-label={logoData.altLogo}></div>
        </Link>

        {/* DESKTOP NAV */}
        <DesktopNav navLinks={navLinks} activePath={location.pathname} />

        {/* WHATSAPP BUTTON DESKTOP */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button link={linkWhatsapp} target="_blank" className="text-white px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium shadow-lg transition border border-white hover:bg-green-800">
            Hubungi Kami
          </Button>
        </div>

        {/* MOBILE MENU BUTTON (INI YANG KENA ERROR A11Y) */}
        <button className="lg:hidden text-white focus:outline-none" onClick={() => setOpenNav(!openNav)} aria-label={openNav ? 'Tutup Navigasi' : 'Buka Navigasi'} aria-expanded={openNav}>
          {openNav ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* MOBILE NAV MENU */}
      <MobileNav navLinks={navLinks} openNav={openNav} activePath={location.pathname} linkWhatsapp={linkWhatsapp} />
    </nav>
  );
};

export default Navbar;
