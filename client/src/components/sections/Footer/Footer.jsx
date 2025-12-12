import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaTiktok, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loadGlobalData } from '../../../services/GlobalData';
import { logoTambahanData } from '../../../assets/Datafull';

const Footer = () => {
  const [kontak, setKontak] = useState(null);
  const [perusahaan, setPerusahaan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadGlobalData();

      setKontak(data.kontak);
      setPerusahaan(data.perusahaan);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-white pt-16">
        <div>Loading...</div>
      </footer>
    );
  }

  if (!kontak || !perusahaan) return null;

  const socialLinks = [
    { link: kontak.linkTiktok, icon: <FaTiktok />, label: 'Kunjungi TikTok kami' },
    { link: kontak.linkInstagram, icon: <FaInstagram />, label: 'Kunjungi Instagram kami' },
    { link: kontak.linkFacebook, icon: <FaFacebook />, label: 'Kunjungi Facebook kami' },
    { link: kontak.linkYoutube, icon: <FaYoutube />, label: 'Kunjungi YouTube kami' },
  ];

  return (
    <footer className="bg-white pt-16">
      <div className="bg-red-800 w-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* LEFT */}
            <div>
              <h3 className="font-staatliches text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{perusahaan.identitas}</h3>

              <p className="text-sm sm:text-base md:text-lg font-light mb-6 text-gray-200">{perusahaan.deskripsi}</p>

              <div className="flex flex-wrap gap-4">
                {logoTambahanData.map((logo, index) => (
                  <div key={index} className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <img src={logo.src} alt={logo.alt} loading="lazy" className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* MIDDLE */}
            <div>
              <h3 className="font-staatliches text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Navigasi</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/paket-lava-tour" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                    Paket Lava Tour
                  </Link>
                </li>
                <li>
                  <Link to="/restoran-terdekat" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                    Rumah Makan
                  </Link>
                </li>
                <li>
                  <Link to="/galeri-wisata" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                    Galeri
                  </Link>
                </li>
                <li>
                  <Link to="/profil-perusahaan" className="text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="font-staatliches text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Contact</h3>
              <ul className="space-y-4">
                {kontak.alamat && (
                  <li className="flex items-start gap-2">
                    <a href={kontak.linkMaps} target="_blank" rel="noopener noreferrer" aria-label="Lihat lokasi di Google Maps" className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                      <FaMapMarkerAlt className="text-lg md:text-xl flex-shrink-0" />
                      <span>{kontak.alamat}</span>
                    </a>
                  </li>
                )}

                {kontak.linkWhatsapp && (
                  <li className="flex items-start gap-2">
                    <a href={kontak.linkWhatsapp} target="_blank" rel="noopener noreferrer" aria-label="Hubungi via WhatsApp" className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                      <FaWhatsapp className="text-lg md:text-xl flex-shrink-0" />
                      <span>{kontak.whatsapp}</span>
                    </a>
                  </li>
                )}

                {kontak.email && (
                  <li className="flex items-start gap-2">
                    <a href={`mailto:${kontak.email}`} aria-label="Kirim email" className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-gray-200 hover:text-yellow-500">
                      <FaEnvelope className="text-lg md:text-xl flex-shrink-0" />
                      <span>{kontak.email}</span>
                    </a>
                  </li>
                )}
              </ul>

              <div className="mt-8">
                <h3 className="font-staatliches text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((s, i) =>
                    s.link ? (
                      <a key={i} href={s.link} target="_blank" aria-label={s.label} className="text-gray-300 hover:text-yellow-500 text-3xl sm:text-4xl">
                        {s.icon}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="bg-red-900 text-center py-4 text-white/90 text-xs sm:text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} Powered by AAP Tour. Developed by DavinTech.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
