import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaTiktok, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { logoTambahanData } from '../../../assets/Datafull';

const Footer = () => {
  const [data, setData] = useState({ kontak: null, perusahaan: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kontakResponse, perusahaanResponse] = await Promise.all([apiClient.get('/api/kontak'), apiClient.get('/api/info-perusahaan')]);

        setData({
          kontak: kontakResponse.data[0],
          perusahaan: perusahaanResponse.data[0],
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-white pt-16">
        <div>Loading...</div>
      </footer>
    );
  }

  const { kontak, perusahaan } = data;

  if (!kontak || !perusahaan) {
    return null;
  }

  const socialLinks = [
    { link: kontak.linkTiktok || '#', icon: <FaTiktok /> },
    { link: kontak.linkInstagram || '#', icon: <FaInstagram /> },
    { link: kontak.linkFacebook || '#', icon: <FaFacebook /> },
    { link: kontak.linkYoutube || '#', icon: <FaYoutube /> },
  ];

  return (
    <footer className="bg-white pt-16">
      {/* Section Red Background */}
      <div className="bg-red-800 w-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Left Section */}
            <div>
              <h3 className="font-staatliches text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{perusahaan.identitas}</h3>
              <p className="text-sm sm:text-base md:text-lg font-light mb-6 text-gray-200">{perusahaan.deskripsi}</p>
              <div className="flex flex-wrap gap-4">
                {logoTambahanData.map((logo, index) => (
                  <div key={index} className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <img src={logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Section */}
            <div>
              <h3 className="font-staatliches text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Navigasi</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/paket-lava-tour" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                    Paket Lava Tour
                  </Link>
                </li>
                <li>
                  <Link to="/restoran-terdekat" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                    Rumah Makan
                  </Link>
                </li>
                <li>
                  <Link to="/galeri-wisata" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                    Galeri
                  </Link>
                </li>
                <li>
                  <Link to="/profil-perusahaan" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="font-staatliches text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Contact</h3>
              <ul className="space-y-4">
                {kontak.alamat && (
                  <li className="flex items-start gap-2">
                    <a href={kontak.linkMaps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                      <FaMapMarkerAlt className="text-current text-lg md:text-xl flex-shrink-0" />
                      <span className="leading-normal">{kontak.alamat}</span>
                    </a>
                  </li>
                )}
                {kontak.linkWhatsapp && (
                  <li className="flex items-start gap-2">
                    <a href={kontak.linkWhatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                      <FaWhatsapp className="text-current text-lg md:text-xl flex-shrink-0" />
                      <span className="leading-normal">{kontak.whatsapp}</span>
                    </a>
                  </li>
                )}
                {kontak.email && (
                  <li className="flex items-start gap-2">
                    <a href={`mailto:${kontak.email}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500 transition-colors">
                      <FaEnvelope className="text-current text-lg md:text-xl flex-shrink-0" />
                      <span className="leading-normal">{kontak.email}</span>
                    </a>
                  </li>
                )}
              </ul>
              <div className="mt-8">
                <h3 className="font-staatliches text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map(
                    (social, index) =>
                      social.link && (
                        <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500 transition-colors text-3xl sm:text-4xl">
                          {social.icon}
                        </a>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="bg-red-900 text-center py-4 text-gray-400 text-xs sm:text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} Powered by AAP Tour. Developed by Davin Company.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
