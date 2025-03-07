import React, { useState, useEffect } from 'react';
import Button from '../../commons/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TitleSection from '../../commons/TitleSection';
import apiClient from '../../../services/apiClient';

const DetailPaket = () => {
  const [judulContent, setJudulContent] = useState();
  const [paketJeepData, setPaketJeepData] = useState([]);
  const [linkWhatsapp, setLinkWhatsapp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [judulRes, paketRes, kontakRes] = await Promise.all([apiClient.get('/api/judul-content'), apiClient.get('/api/paket-jeep'), apiClient.get('/api/kontak')]);

        setJudulContent(judulRes.data.find((item) => item.type === 'paketJeep'));
        setPaketJeepData(paketRes.data);
        setLinkWhatsapp(kontakRes.data?.[0]?.linkWhatsapp ?? '');
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const calculateDiscountPrice = (hargaAwal, diskon) => {
    const discountPercentage = parseFloat(diskon) / 100;
    return Math.floor((hargaAwal * (1 + discountPercentage)) / 1000) * 1000;
  };

  const formatRupiah = (number) => `Rp ${number.toLocaleString('id-ID').replace(/,/g, '.')}`;

  return (
    <section className="bg-gray-300 py-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="mb-12 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        {judulContent && <TitleSection data={[{ title: judulContent.judul, subtitle: judulContent.deskripsi }]} />}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {paketJeepData.map((paket, index) => (
          <div
            key={paket.id}
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay={Math.min(index * 400, 1600)}
            className={`relative rounded-2xl border-2 bg-gray-200 flex flex-col shadow-lg ${
              paket.isPopular ? 'border-red-700' : 'border-gray-600'
            } hover:shadow-2xl transition duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]`}
          >
            {paket.isPopular && <div className="absolute top-4 right-6 rounded-xl px-4 py-2 bg-red-700 text-white text-sm font-semibold">Paling Populer</div>}

            <div className="w-full">
              <img src={`${apiClient.defaults.baseURL}${paket.image}`} alt={paket.altImage} className="w-full aspect-[1/1.1] object-cover rounded-t-xl" loading="lazy" />
            </div>

            <div className="w-full p-6 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-lg font-semibold text-red-700">Paket</h4>
                <h2 className="font-staatliches tracking-wide text-4xl text-orange-500 font-bold mb-2">{paket.NamaPaket}</h2>
                <p className="font-poppins text-gray-600 mb-6">{paket.deskripsiPaket}</p>
                <div className="flex items-center gap-4">
                  <span className="text-lg text-gray-500 line-through">{formatRupiah(calculateDiscountPrice(paket.hargaAwal, paket.diskon))}</span>
                  <span className="text-sm font-semibold bg-red-200 px-4 py-1 rounded-full text-red-700">
                    Diskon <span className="text-xl">{paket.diskon}</span> %
                  </span>
                </div>
                <h3 className="font-staatliches text-4xl text-red-700 my-4">
                  {formatRupiah(paket.hargaAwal)} <span className="text-lg font-normal text-gray-600">/ Jeep</span>
                </h3>
                <h4 className="font-poppins text-md font-medium text-gray-500">Durasi: {paket.durasi}</h4>
                <ul className="list-none mt-4 space-y-2">
                  <h4 className="text-lg font-semibold text-red-700">Spot Wisata:</h4>
                  {paket.spotWisata.map((spot, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-800">
                      <FontAwesomeIcon icon={faCheck} className="text-green-700" />
                      {spot}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Button link={linkWhatsapp} target="_blank" className="bg-red-700 text-white py-2 px-3 md:py-3 md:px-4 rounded-xl w-full text-center hover:bg-red-600 shadow-lg">
                  Pesan Sekarang
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailPaket;
