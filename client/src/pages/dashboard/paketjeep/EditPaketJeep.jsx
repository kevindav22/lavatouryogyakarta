import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import apiClient from '../../../services/apiClient';

const EditPaketJeep = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    NamaPaket: '',
    deskripsiPaket: '',
    hargaAwal: '',
    diskon: '',
    durasi: '',
    spotWisata: [''],
    isPopular: false,
    altImage: '',
    image: null,
  });

  const [originalData, setOriginalData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/paket-jeep/${id}`);
        const data = response.data;

        setOriginalData(data);
        setFormData({
          NamaPaket: data.NamaPaket || '',
          deskripsiPaket: data.deskripsiPaket || '',
          hargaAwal: data.hargaAwal || '',
          diskon: data.diskon || '',
          durasi: data.durasi || '',
          spotWisata: data.spotWisata.length ? [...data.spotWisata] : [''],
          isPopular: data.isPopular || false,
          altImage: data.altImage || '',
          image: null,
        });
      } catch (err) {
        setError('Gagal memuat data paket jeep.');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeItem = (field, index) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray };
    });
  };

  const hasChanges = () => {
    for (const key of Object.keys(formData)) {
      if (key === 'spotWisata') {
        if (JSON.stringify(formData.spotWisata) !== JSON.stringify(originalData.spotWisata)) {
          return true;
        }
      } else if (key === 'image' && formData.image !== null) {
        return true;
      } else if (formData[key] !== originalData[key]) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const filteredSpotWisata = formData.spotWisata.filter((item) => item.trim() !== '');
    const finalData = { ...formData, spotWisata: filteredSpotWisata };
    if (!hasChanges()) {
      setError('Tidak ada perubahan yang dibuat.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = new FormData();

      Object.keys(finalData).forEach((key) => {
        if (key === 'image' && finalData[key]) {
          updateData.append('image', finalData[key]);
        } else if (Array.isArray(finalData[key])) {
          finalData[key].forEach((item, index) => {
            updateData.append(`${key}[${index}]`, item);
          });
        } else if (finalData[key] !== '' && finalData[key] !== null) {
          updateData.append(key, finalData[key]);
        }
      });

      const response = await apiClient.put(`/api/paket-jeep/${id}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/dashboard/paket-jeep');
      }
    } catch (err) {
      console.error('Error updating Paket Jeep:', err);
      setError('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="hover:underline">Paket Jeep</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Edit Paket</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Paket Jeep</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar Paket
            </label>
            <div className="flex items-center space-x-4">
              {previewImage && <img src={previewImage} alt={formData.altImage || 'Pratinjau gambar'} className="w-24 h-24 border object-cover shadow-md" />}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="altImage" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar Thumbnail
            </label>
            <input
              type="text"
              id="altImage"
              name="altImage"
              value={formData.altImage}
              onChange={handleChange}
              placeholder={originalData?.altImage || 'Deskripsi singkat gambar untuk aksesibilitas'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="NamaPaket" className="block text-sm font-semibold text-gray-600 mb-2">
              Nama Paket Jeep
            </label>
            <input
              type="text"
              id="NamaPaket"
              name="NamaPaket"
              value={formData.NamaPaket}
              onChange={handleChange}
              placeholder={originalData?.NamaPaket || 'Berikan nama yang menarik untuk paket Jeep Anda'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="deskripsiPaket" className="block text-sm font-semibold text-gray-600 mb-2">
              Deskripsi Paket
            </label>
            <textarea
              id="deskripsiPaket"
              name="deskripsiPaket"
              value={formData.deskripsiPaket}
              onChange={handleChange}
              placeholder={originalData?.deskripsiPaket || 'Jelaskan dengan detail mengenai keunikan paket wisata Jeep ini,'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 h-32"
            />
          </div>
          <div>
            <label htmlFor="hargaAwal" className="block text-sm font-semibold text-gray-600 mb-2">
              Harga Asli (Input hanya angka)
            </label>
            <input
              type="number"
              id="hargaAwal"
              name="hargaAwal"
              value={formData.hargaAwal}
              onChange={handleChange}
              placeholder={originalData?.hargaAwal || 'Masukkan harga Asli Paket anda'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="diskon" className="block text-sm font-semibold text-gray-600 mb-2">
              Diskon yang diberikan (%)
            </label>
            <input
              type="number"
              id="diskon"
              name="diskon"
              value={formData.diskon}
              onChange={handleChange}
              placeholder={originalData?.diskon || 'Masukkan persentase diskon yang berlaku'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="durasi" className="block text-sm font-semibold text-gray-600 mb-2">
              Durasi
            </label>
            <input
              type="text"
              id="durasi"
              name="durasi"
              value={formData.durasi}
              onChange={handleChange}
              placeholder={originalData?.durasi || 'Masukkan lama perjalanan paket ini'}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Destinasi Wisata</label>
            {formData.spotWisata.map((spot, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={spot}
                  onChange={(e) => handleArrayChange('spotWisata', index, e.target.value)}
                  placeholder={originalData?.spotWisata?.[index] || `wisata yang akan dikunjungi ${index + 1}`}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button type="button" onClick={() => removeItem('spotWisata', index)} className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('spotWisata')} className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg">
              <FaPlus />
            </button>
          </div>
          <div className="flex items-center space-x-3 p-4 ">
            <label htmlFor="isPopular" className={`toggle-label w-12 h-6 rounded-full cursor-pointer transition duration-300 flex items-center ${formData.isPopular ? 'bg-blue-500' : 'bg-gray-300'}`}>
              <span className={`toggle-dot block w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${formData.isPopular ? 'translate-x-0' : 'translate-x-6'}`}></span>
            </label>
            <label htmlFor="isPopular" className="text-sm text-gray-700 font-medium">
              Tandai sebagai paket populer
            </label>

            <input type="checkbox" id="isPopular" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="sr-only" />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Link to="/dashboard/paket-jeep" className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Batal
            </Link>
            <button type="submit" disabled={!hasChanges() || isSubmitting} className={`px-5 py-3 rounded-lg text-white transition ${!hasChanges() || isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaketJeep;
