import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const TambahRestoran = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaResto: '',
    altImage: '',
    alamat: '',
    linkMaps: '',
    deskripsi: '',
    kontak: '',
    linkKontak: '',
    namaPaket: '',
    menuUnggulan: ['', ''],
    fasilitas: ['', ''],
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  const validateForm = () => {
    const requiredFields = ['namaResto', 'alamat', 'deskripsi', 'kontak'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Field ${field} harus diisi!`, { position: 'top-right' });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const newData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData[key]) {
          newData.append('image', formData[key]);
        } else if (key === 'menuUnggulan' || key === 'fasilitas') {
          newData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key]) {
          newData.append(key, formData[key]);
        }
      });

      const response = await apiClient.post('/api/restoran', newData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Restoran berhasil ditambahkan!', { position: 'top-right' });
      navigate('/dashboard/resto');
    } catch (error) {
      toast.error(`Terjadi kesalahan: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  return (
    <div className="p-4 min-h-screen">
      <ToastContainer />
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="hover:underline">Restoran</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Tambah Restoran</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Restoran Baru</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar Restoran
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
            <label htmlFor="namaResto" className="block text-sm font-semibold text-gray-600 mb-2">
              Nama Restoran
            </label>
            <input
              type="text"
              id="namaResto"
              name="namaResto"
              value={formData.namaResto}
              onChange={handleChange}
              placeholder="Masukkan nama restoran anda"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-600 mb-2">
              Deskripsi Restoran
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Jelaskan dengan detail mengenai keunikan Restoran anda"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 h-32"
            />
          </div>

          <div>
            <label htmlFor="alamat" className="block text-sm font-semibold text-gray-600 mb-2">
              Alamat Restoran
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Berikan Alamat lengkap Restoran anda"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="linkMaps" className="block text-sm font-semibold text-gray-600 mb-2">
              Link Maps
            </label>
            <input
              type="url"
              id="linkMaps"
              name="linkMaps"
              value={formData.linkMaps}
              onChange={handleChange}
              placeholder="Tempelkan link Google Maps untuk memudahkan pelanggan menemukan lokasi restoran."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="kontak" className="block text-sm font-semibold text-gray-600 mb-2">
              Kontak Restoran
            </label>
            <input
              type="text"
              id="kontak"
              name="kontak"
              value={formData.kontak}
              onChange={handleChange}
              placeholder="WhatsApp yang dapat dihubungi pelanggan."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="linkKontak" className="block text-sm font-semibold text-gray-600 mb-2">
              Link Kontak
            </label>
            <input
              type="url"
              id="linkKontak"
              name="linkKontak"
              value={formData.linkKontak}
              onChange={handleChange}
              placeholder="Tempelkan link Whatsap untuk memudahkan pelanggan untuk menuju ke Chat Whatsapp."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="namaPaket" className="block text-sm font-semibold text-gray-600 mb-2">
              Jenis Hidangan
            </label>
            <input
              type="text"
              id="namaPaket"
              name="namaPaket"
              value={formData.namaPaket}
              onChange={handleChange}
              placeholder="Masukkan jenis hidangan yang ditawarkan"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Menu Unggulan - Input Dinamis */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Menu Unggulan</label>
            {formData.menuUnggulan.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('menuUnggulan', index, e.target.value)}
                  placeholder="Cantumkan menu andalan restoran Anda yang paling disukai pelanggan."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button type="button" onClick={() => removeItem('menuUnggulan', index)} className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('menuUnggulan')} className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg">
              <FaPlus />
            </button>
          </div>

          {/* Fasilitas - Input Dinamis */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Fasilitas</label>
            {formData.fasilitas.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('fasilitas', index, e.target.value)}
                  placeholder="Sebutkan fasilitas yang tersedia, seperti Wi-Fi, area parkir, atau ruang VIP"
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button type="button" onClick={() => removeItem('fasilitas', index)} className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem('fasilitas')} className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg">
              <FaPlus />
            </button>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Link to="/dashboard/resto" className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className={`px-5 py-3 rounded-lg text-white transition ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahRestoran;
