import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { FaTachometerAlt, FaTruckPickup, FaUtensils, FaImages, FaSignOutAlt, FaAddressBook, FaUserTie, FaQuoteLeft } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(1);

  const handleLogout = async () => {
    try {
      await apiClient.delete('/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sidebarLinks = [
    { id: 1, name: 'Beranda', icon: FaTachometerAlt, link: '/dashboard' },
    { id: 2, name: 'Profile', icon: FaUserTie, link: '/dashboard/profile' },
    { id: 3, name: 'Paket Jeep', icon: FaTruckPickup, link: '/dashboard/paket-jeep' },
    { id: 4, name: 'Rumah Makan', icon: FaUtensils, link: '/dashboard/resto' },
    { id: 5, name: 'Galery', icon: FaImages, link: '/dashboard/gallery' },
    { id: 6, name: 'Quotes', icon: FaQuoteLeft, link: '/dashboard/quotes' },
    { id: 7, name: 'Kontak', icon: FaAddressBook, link: '/dashboard/kontak' },
  ];

  useEffect(() => {
    const currentLink = sidebarLinks.find((link) => link.link === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.id);
    }
  }, [location.pathname]);

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-gray-500 text-white">
      {/* Logo */}
      <div className="flex justify-center items-center mb-8">
        <img src="/img/logoaaptour.webp" alt="logo" className="w-30 hidden md:block" />
        <img src="/img/aaptour.webp" alt="logo" className="w-30 block md:hidden" />
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {sidebarLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <li key={link.id} className={`font-medium rounded-md py-2 px-5 hover:bg-red-700 hover:text-white ${activeLink === link.id ? 'bg-red-700 text-white' : ''}`}>
              <Link to={link.link} onClick={() => setActiveLink(link.id)} className="flex justify-center md:justify-start items-center md:space-x-5">
                <IconComponent className={`${activeLink === link.id ? 'text-white' : 'text-gray-300'}`} />
                <span className="text-sm hidden md:block">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div className="w-full absolute bottom-5 left-0 px-4">
        <button onClick={handleLogout} className="w-full flex items-center justify-center md:space-x-3 px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition">
          <FaSignOutAlt className="text-sm md:text-base" />
          <span className="hidden md:inline text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
