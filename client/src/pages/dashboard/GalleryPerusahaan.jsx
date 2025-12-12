import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

import apiClient from '../../services/apiClient';

const GalleryPerusahaan = () => {
  const [images, setImages] = useState([]); // State untuk gambar dari server
  const [showModal, setShowModal] = useState(false); // State untuk modal tambah gambar
  const [newImage, setNewImage] = useState({ file: null, altImage: '', category: 'jeep' }); // Data gambar baru
  const [judulContent, setJudulContent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ judul: '', deskripsi: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi
  const location = useLocation(); // Hook untuk membaca URL saat ini

  // Fetch images saat komponen dimuat
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiClient.get('/api/gallery');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    const fetchJudulContent = async () => {
      try {
        const response = await apiClient.get('/api/judul-content'); // Ganti dengan endpoint judulContent
        const data = response.data.filter((item) => item.type === 'gallery'); // Filter data berdasarkan type
        setJudulContent(data.length > 0 ? data[0] : null); // Ambil data pertama jika ada
      } catch (error) {
        toast.error(`Error fetching judul content: ${error.response?.data?.message || error.message}`, {
          position: 'top-right',
        });
      }
    };

    fetchImages();
    fetchJudulContent();
  }, []);

  useEffect(() => {
    // Validasi form
    const isValid = formData.judul.trim() !== '' && formData.deskripsi.trim() !== '';
    setIsFormValid(isValid);
  }, [formData]);

  const handleEditClick = () => {
    setFormData({ judul: '', deskripsi: '' });
    setShowEditModal(true);
    navigate(`${location.pathname}?action=edit`); // Tambahkan query parameter
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    navigate(location.pathname); // Hapus query parameter
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!judulContent) return;

    try {
      const response = await apiClient.put(`/api/judul-content/${judulContent.id}`, {
        type: 'gallery',
        judul: formData.judul,
        deskripsi: formData.deskripsi,
      });
      setJudulContent(response.data); // Perbarui state
      toast.success('Informasi berhasil diperbarui!', { position: 'top-right' });
      handleCloseModal(); // Tutup modal dan kembalikan URL
    } catch (error) {
      toast.error(`Gagal mengupdate data: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    }
  };

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append('image', newImage.file);
    formData.append('altImage', newImage.altImage);
    formData.append('category', newImage.category);

    try {
      const response = await apiClient.post('/api/gallery', formData);
      setImages([...images, response.data.data]); // Tambah gambar ke state
      setShowModal(false);
      setNewImage({ file: null, altImage: '', category: 'jeep' });
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await apiClient.delete(`/api/gallery/${id}`);
      setImages(images.filter((image) => image.id !== id)); // Hapus dari state
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <ToastContainer />
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Gallery</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Gallery</h2>
        {judulContent ? (
          <div className="space-y-6">
            <div className="space-y-1 border-b pb-4 last:border-none">
              <p className="text-gray-600 font-semibold">Judul</p>
              <p className="text-gray-800">{judulContent.judul}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 font-semibold">Deskripsi</p>
              <p className="text-gray-800">{judulContent.deskripsi}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Data judul tidak tersedia</p>
        )}
        <button onClick={handleEditClick} className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition mt-6">
          <FaEdit className="mr-2" />
          Edit Informasi
        </button>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Informasi</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-2">Judul</label>
                <input type="text" name="judul" value={formData.judul} onChange={handleChange} placeholder="Masukkan judul" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition">
                Batal
              </button>
              <button onClick={handleEditSubmit} disabled={!isFormValid} className={`px-4 py-2 rounded-lg shadow-md transition ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Galeri Gambar */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manajemen Galeri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col items-start">
              <img src={`${apiClient.defaults.baseURL}${image.image}` || 'https://via.placeholder.com/150'} alt={image.altImage} className="w-full h-80 object-cover rounded-lg border shadow-md" />
              <div className="flex mt-2 items-center space-x-2">
                <p className="px-3 py-1 border-2 text-gray-500 rounded-lg">{image.category}</p>
                <p className="text-gray-600">{image.altImage}</p>
              </div>
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
            <FaPlus />
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
              <div>
                <label className="block text-gray-600 font-medium mb-2">Kategori</label>
                <select value={newImage.category} onChange={(e) => setNewImage({ ...newImage, category: e.target.value })} className=" w-full px-4 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="jeep">Jeep</option>
                  <option value="wisata">Wisata</option>
                  <option value="kuliner">Kuliner</option>
                </select>
              </div>
              <button onClick={handleAddImage} className={`w-full px-4 py-2 ${newImage.file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 '} text-white rounded-lg transition`} disabled={!newImage.file}>
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPerusahaan;
