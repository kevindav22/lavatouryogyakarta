import { FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';

const CardResto = ({ resto }) => {
  return (
    <div className="relative h-full px-2">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          {/* FIX CLS: Tambahkan width & height */}
          <img
            loading="lazy"
            src={resto.image}
            alt={resto.altImage}
            width="1600" // ukuran natural (boleh diubah)
            height="900" // agar tidak shifting
            className="w-full h-[500px] object-cover"
          />

          <div className="absolute bottom-0 bg-black bg-opacity-70 text-white p-6 w-full">
            <h3 className="text-4xl font-staatliches text-orange-500 font-bold mb-3">{resto.namaResto}</h3>

            <p className="text-base sm:text-lg mb-4 max-w-md">{resto.deskripsi}</p>

            <ul className="text-sm sm:text-base space-y-2">
              <li className="flex items-center">
                <FaUtensils className="mr-2" />
                <span>{resto.menuUnggulan.join(', ')}</span>
              </li>

              <li className="flex items-center hover:text-yellow-500">
                <FaMapMarkerAlt className="mr-2" />
                <a href={resto.linkMaps} target="_blank" rel="noopener noreferrer">
                  {resto.alamat}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResto;
