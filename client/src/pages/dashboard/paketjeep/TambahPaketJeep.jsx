import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const TambahPaketJeep = () => {
  const navigate = useNavigate();

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

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const validateFormData = (data) => {
    const cleanedData = {};
    Object.keys(data).forEach((key) => {
      if (key === 'spotWisata') {
        // Filter out empty values in spotWisata array
        const filteredArray = data[key].filter((item) => item.trim() !== '');
        if (filteredArray.length > 0) {
          cleanedData[key] = filteredArray;
        }
      } else if (key === 'image' && data[key]) {
        cleanedData[key] = data[key];
      } else if (typeof data[key] === 'boolean' || (data[key] && data[key].trim() !== '')) {
        cleanedData[key] = data[key];
      }
    });
    return cleanedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cleanedData = validateFormData(formData);

      const newData = new FormData();
      Object.keys(cleanedData).forEach((key) => {
        if (key === 'image' && cleanedData[key]) {
          newData.append('image', cleanedData[key]);
        } else if (key === 'spotWisata') {
          newData.append(key, JSON.stringify(cleanedData[key]));
        } else {
          newData.append(key, cleanedData[key]);
        }
      });

      await apiClient.post('/api/paket-jeep', newData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Paket Jeep berhasil ditambahkan!', { position: 'top-right' });
      navigate('/dashboard/paket-jeep');
    } catch (error) {
      toast.error(`Terjadi kesalahan: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <ToastContainer />
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="hover:underline">Paket Jeep</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Tambah Paket</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Paket Baru </h2>
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
              placeholder="Deskripsi singkat gambar untuk aksesibilitas"
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
              placeholder="Berikan nama yang menarik untuk paket Jeep Anda"
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
              placeholder="Jelaskan dengan detail mengenai keunikan paket wisata Jeep ini,"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 h-32"
            />
          </div>
          <div>
            <label htmlFor="hargaAwal" className="block text-sm font-semibold text-gray-600 mb-2">
              Harga Asli (Hanya Angka)
            </label>
            <input
              type="number"
              id="hargaAwal"
              name="hargaAwal"
              value={formData.hargaAwal}
              onChange={handleChange}
              placeholder="Masukkan harga asli paket anda"
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
              placeholder="Masukkan persentase diskon yang berlaku (misalnya 20)"
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
              placeholder="Masukkan lama perjalanan paket ini (misalnya 3 jam)"
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
                  placeholder="Masukkan lokasi atau tempat wisata yang akan dikunjungi dalam paket ini"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button type="button" onClick={() => removeItem('spotWisata', index)} className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('spotWisata')} className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg">
              <FaPlus/>
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
            <button type="submit" disabled={isSubmitting} className={`px-5 py-3 rounded-lg text-white transition ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isSubmitting ? 'Menambahkan...' : 'Tambah Paket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPaketJeep;
