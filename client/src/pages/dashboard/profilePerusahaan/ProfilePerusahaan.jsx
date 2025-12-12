import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import apiClient from '../../../services/apiClient';

const ProfilePerusahaan = () => {
  const [infoPerusahaan, setInfoPerusahaan] = useState(null);
  const [images, setImages] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState({ altImage: '', file: null });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await apiClient.get('/api/info-perusahaan');
        const companyData = response.data[0]; 
        if (companyData) {
          setInfoPerusahaan(companyData);
          setImages(companyData.carouselImages || []); 
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchCompanyData();
  }, []);

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append('image', newImage.file);
    formData.append('altImage', newImage.altImage);

    try {
      const response = await apiClient.post('/api/info-perusahaan/carousel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages([...images, response.data]);
      setShowModal(false);
      setNewImage({ altImage: '', file: null }); 
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  // Hapus gambar dari galeri
  const handleDeleteImage = async (id) => {
    try {
      await apiClient.delete(`/api/info-perusahaan/carousel/${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if (!infoPerusahaan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Profile</li>
        </ol>
      </nav>

      {/* Informasi Umum */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Perusahaan</h2>
        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
          <img src={`${apiClient.defaults.baseURL}${infoPerusahaan.image}`} alt={infoPerusahaan.altImage || 'Gambar perusahaan'} className="w-full sm:w-1/3 h-auto rounded-lg shadow-md border object-cover" />

          <div className="flex-1 mt-4 sm:mt-0 space-y-6">
            {[
              { label: 'Nama Perusahaan', value: infoPerusahaan.nama },
              { label: 'Identitas Perusahaan', value: infoPerusahaan.identitas },
              { label: 'Tagline', value: infoPerusahaan.tagline },
              { label: 'Deskripsi', value: infoPerusahaan.deskripsi },
              { label: 'Tentang', value: infoPerusahaan.tentang },
            ].map((item, index) => (
              <div key={index} className="space-y-1 border-b pb-4 last:border-none">
                <p className="text-gray-600 font-semibold">{item.label}</p>
                <p className="text-gray-800">{item.value}</p>
              </div>
            ))}

            <div className="flex justify-start mt-6 space-x-4">
              <Link to="edit" className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center space-x-2">
                <FaEdit />
                <span>Edit Informasi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Manajemen Galeri */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Background Beranda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col items-start">
              <img src={`${apiClient.defaults.baseURL}${image.image}`} alt={image.altImage || 'Gambar galeri'} className="w-full h-80 object-cover rounded-lg border" />
              <div className="flex items-center justify-start w-full mt-2 space-x-2">
                <button onClick={() => handleDeleteImage(image.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <FaTrash /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center space-x-2">
            <FaPlus/>
            <span>Tambah Gambar</span>
          </button>
        </div>
      </div>

      {/* Modal untuk Tambah Gambar */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Gambar</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes size="lg" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-2">Pilih Gambar</label>
                <input type="file" onChange={(e) => setNewImage({ ...newImage, file: e.target.files[0] })} className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Alt Gambar</label>
                <input
                  type="text"
                  value={newImage.altImage}
                  onChange={(e) => setNewImage({ ...newImage, altImage: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Masukkan Deksripsi Gambar"
                />
              </div>
              <button onClick={handleAddImage} className={`w-full px-4 py-2 ${newImage.file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white rounded-lg transition`} disabled={!newImage.file}>
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePerusahaan;
