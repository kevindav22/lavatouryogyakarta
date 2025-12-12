import React from 'react';
import { FaUserTie, FaTruckPickup, FaUtensils, FaImages, FaQuoteLeft, FaAddressBook, FaInternetExplorer } from 'react-icons/fa';

const Home = () => {
  const cards = [
    { id: 1, name: 'Kunjungi Website', icon: FaInternetExplorer, link: '/', target: '_blank' },
    { id: 2, name: 'Profile', icon: FaUserTie, link: '/dashboard/profile' },
    { id: 3, name: 'Paket Jeep', icon: FaTruckPickup, link: '/dashboard/paket-jeep' },
    { id: 4, name: 'Rumah Makan', icon: FaUtensils, link: '/dashboard/resto' },
    { id: 5, name: 'Galery', icon: FaImages, link: '/dashboard/gallery' },
    { id: 6, name: 'Quotes', icon: FaQuoteLeft, link: '/dashboard/quotes' },
    { id: 7, name: 'Kontak', icon: FaAddressBook, link: '/dashboard/kontak' },
  ];

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-wrap justify-center gap-6">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <a
              key={card.id}
              href={card.link}
              target={card.target}
              className="flex flex-col items-center justify-center bg-red-800 text-white p-6 rounded-lg shadow-lg transition-all hover:scale-105 hover:bg-red-700 hover:shadow-xl transform duration-300 ease-in-out w-72 h-72"
            >
              <div className="bg-white p-4 rounded-full mb-4 flex items-center justify-center">
                <IconComponent className="text-5xl text-red-800" />
              </div>
              <span className="font-medium text-lg">{card.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
