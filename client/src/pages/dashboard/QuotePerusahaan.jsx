import React, { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuotesPerusahaan = () => {
  const [editingQuote, setEditingQuote] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    nama: '',
    jabatan: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null); // Default kosong

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await apiClient.get('/api/quotes');
      const quote = response.data[0]; // Mengambil satu data yang ada
      setEditingQuote(quote);
      setFormData({
        text: quote.text || '',
        nama: quote.nama || '',
        jabatan: quote.jabatan || '',
        image: null, // Pastikan default `image` kosong
      });
      setPreviewImage(null); // Default pratinjau kosong
    } catch (error) {
      toast.error(`Error fetching quote: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result); // Simpan data URL gambar
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null); // Jika file dihapus, kosongkan pratinjau
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await apiClient.put(`/api/quotes/${editingQuote.id}`, data);
      toast.success('Quote updated successfully');
      fetchQuote(); // Refresh data after update
    } catch (error) {
      toast.error(`Error updating quote: ${error.message}`);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <ToastContainer />
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Quotes</li>
        </ol>
      </nav>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Quote (Kata Bijak)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Gambar */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar
            </label>
            <div className="flex items-center space-x-4">
              {/* Tampilkan pratinjau gambar hanya jika `previewImage` memiliki nilai */}
              {previewImage && <img src={previewImage} alt="Pratinjau gambar" className="w-24 h-24 border object-cover shadow-md" />}
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

          {/* Nama */}
          <div>
            <label htmlFor="nama" className="block text-sm font-semibold text-gray-600 mb-2">
              Nama
            </label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Penulis" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600" />
          </div>

          {/* Jabatan */}
          <div>
            <label htmlFor="jabatan" className="block text-sm font-semibold text-gray-600 mb-2">
              Jabatan
            </label>
            <input type="text" id="jabatan" name="jabatan" value={formData.jabatan} onChange={handleChange} placeholder="Jabatan Penulis" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600" />
          </div>

          {/* Quote */}
          <div>
            <label htmlFor="text" className="block text-sm font-semibold text-gray-600 mb-2">
              Quote
            </label>
            <textarea id="text" name="text" value={formData.text} onChange={handleChange} placeholder="Masukkan Quote" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 h-32" />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="submit" className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotesPerusahaan;
