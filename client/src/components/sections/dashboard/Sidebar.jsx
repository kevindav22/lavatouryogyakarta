import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTruckPickup, faUtensils, faImages, faSignOutAlt, faContactBook, faBusinessTime, faUserTie, faQuestionCircle, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(1);

  const handleLogout = async () => {
    try {
      await apiClient.delete('/logout'); // Menggunakan apiClient untuk logout
      navigate('/login'); // Redirect ke halaman login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const currentLink = sidebarLinks.find((link) => link.link === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.id);
    }
  }, [location.pathname]);

  const sidebarLinks = [
    { id: 1, name: 'Beranda', icon: faTachometerAlt, link: '/dashboard' },
    { id: 2, name: 'Profile', icon: faUserTie, link: '/dashboard/profile' },
    { id: 3, name: 'Paket Jeep', icon: faTruckPickup, link: '/dashboard/paket-jeep' },
    { id: 4, name: 'Rumah Makan', icon: faUtensils, link: '/dashboard/resto' },
    { id: 5, name: 'Galery', icon: faImages, link: '/dashboard/gallery' },
    { id: 6, name: 'Quotes', icon: faQuoteLeft, link: '/dashboard/quotes' },
    { id: 7, name: 'Kontak', icon: faContactBook, link: '/dashboard/kontak' },
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-gray-500 text-white">
      {/* Logo */}
      <div className="flex justify-center items-center mb-8">
        <img src="/img/logoaaptour.webp" alt="logo" className="w-30 hidden md:block" />
        <img src="/img/aaptour.webp" alt="logo" className="w-30 block md:hidden" />
      </div>
      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {sidebarLinks.map((link) => (
          <li key={link.id} className={`font-medium rounded-md py-2 px-5 hover:bg-red-700 hover:text-white ${activeLink === link.id ? 'bg-red-700 text-white' : ''}`}>
            <Link to={link.link} onClick={() => setActiveLink(link.id)} className="flex justify-center md:justify-start items-center md:space-x-5">
              <FontAwesomeIcon icon={link.icon} className={`${activeLink === link.id ? 'text-white' : 'text-gray-300'}`} />
              <span className="text-sm hidden md:block">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <div className="w-full absolute bottom-5 left-0 px-4">
        <button onClick={handleLogout} className="w-full flex items-center justify-center md:space-x-3 px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-sm md:text-base" />
          <span className="hidden md:inline text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
