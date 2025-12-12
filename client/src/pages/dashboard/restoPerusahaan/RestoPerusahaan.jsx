import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck, FaPlus } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { toast, ToastContainer } from 'react-toastify';

const RestoPerusahaan = () => {
  const [judulContent, setJudulContent] = useState(null);
  const [formData, setFormData] = useState({ judul: '', deskripsi: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [restoData, setRestoData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchJudulContent = async () => {
      try {
        const response = await apiClient.get('/api/judul-content');
        const data = response.data.filter((item) => item.type === 'rumahMakan');
        setJudulContent(data.length > 0 ? data[0] : null);
      } catch (error) {
        toast.error(`Error fetching judul content: ${error.response?.data?.message || error.message}`, {
          position: 'top-right',
        });
      }
    };

    const fetchRestoData = async () => {
      try {
        const response = await apiClient.get('/api/restoran');
        setRestoData(response.data);
      } catch (error) {
        console.error('Error fetching resto data:', error);
      }
    };

    fetchJudulContent();
    fetchRestoData();
  }, []);

  useEffect(() => {
    const isValid = formData.judul.trim() !== '' && formData.deskripsi.trim() !== '';
    setIsFormValid(isValid);
  }, [formData]);

  const handleEditClick = () => {
    setFormData({ judul: '', deskripsi: '' });
    setShowEditModal(true);
    navigate(`${location.pathname}?action=edit`);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    navigate(location.pathname);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!judulContent) return;

    try {
      const response = await apiClient.put(`/api/judul-content/${judulContent.id}`, {
        type: 'rumahMakan',
        judul: formData.judul,
        deskripsi: formData.deskripsi,
      });
      setJudulContent(response.data);
      toast.success('Informasi berhasil diperbarui!', { position: 'top-right' });
      handleCloseModal(); // Tutup modal setelah berhasil menyimpan
    } catch (error) {
      toast.error(`Gagal mengupdate data: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    }
  };
  const handleDeleteMenu = async (varianId) => {
    try {
      const confirmation = window.confirm('Apakah Anda yakin ingin menghapus varian paket ini?');
      if (!confirmation) return;

      const response = await apiClient.delete(`/api/restoran/varianpaket/${varianId}`);
      setRestoData((prevData) =>
        prevData.map((resto) => ({
          ...resto,
          'varian-paket': resto['varian-paket'].filter((paket) => paket.id !== varianId),
        }))
      );
      toast.success(response.data.message || 'Varian paket berhasil dihapus', {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(`Gagal menghapus varian paket: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    }
  };

  const handleDeleteResto = async (id) => {
    try {
      const confirmation = window.confirm('Apakah Anda yakin ingin menghapus Restoran ini?');
      if (!confirmation) return;

      const response = await apiClient.delete(`/api/restoran/${id}`);
      setRestoData(restoData.filter((resto) => resto.id !== id));
      toast.success(response.data.message || 'Restoran berhasil dihapus', {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(`Gagal menghapus restoran: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <ToastContainer />
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Resto Perusahaan</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Konten</h2>
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
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 h-32"
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

      {/* Daftar Resto */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daftar Resto</h2>
        <div className="space-y-6">
          {restoData.map((resto) => (
            <div key={resto.id} className="border rounded-lg shadow-md p-4 flex flex-col items-stretch">
              {/* Gambar dan Informasi */}
              <div className="flex flex-col lg:flex-row lg:gap-4">
                {/* Gambar */}
                <div className="w-full sm:w-1/3 rounded-lg shadow-md border overflow-hidden">
                  <img src={`${apiClient.defaults.baseURL}${resto.image}`} alt={resto.altImage || 'Gambar perusahaan'} className="w-full h-full object-cover rounded-lg shadow-md border" />
                </div>

                {/* Informasi Resto */}
                <div className="lg:w-1/2 w-full space-y-6 mt-4 lg:mt-0">
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Nama Resto</p>
                    <h3 className="text-gray-800">{resto.namaResto}</h3>
                  </div>
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Alamat</p>
                    <p className="text-gray-800">
                      <a href={resto.linkMaps} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {resto.alamat}
                      </a>
                    </p>
                  </div>
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Deskripsi</p>
                    <p className="text-gray-800">{resto.deskripsi}</p>
                  </div>
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Kontak</p>
                    <p className="text-gray-800">
                      <a href={resto.linkKontak} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {resto.kontak}
                      </a>
                    </p>
                  </div>

                  {/* Fasilitas dan Menu Unggulan */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Fasilitas */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1">
                      <h4 className="font-semibold text-gray-600">Fasilitas</h4>
                      <ul className="list-none mt-4 space-y-2">
                        {resto.fasilitas.map((fasilitas, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-800">
                            <FaCheck className="text-green-700" />
                            {fasilitas}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Menu Unggulan */}
                    <div className="bg-gray-200 p-4 rounded-lg shadow-md flex-1">
                      <h4 className="font-semibold text-gray-600">Menu Unggulan</h4>
                      <ul className="list-none mt-4 space-y-2">
                        {resto.menuUnggulan.map((menu, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-800">
                            <FaCheck className="text-green-700" />
                            {menu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Tombol Aksi */}
                  <div className="flex space-x-4 mt-4">
                    <Link to={`edit/${resto.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition flex items-center space-x-2">
                      <FaEdit />
                      <span>Edit</span>
                    </Link>
                    <button onClick={() => handleDeleteResto(resto.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition flex items-center space-x-2">
                      <FaTrash />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Varian Paket */}
              <div className="mt-12">
                <div>
                  <h4 className="font-semibold text-gray-600 text-left font-staatliches tracking-wide text-2xl">
                    Pilihan Menu - <span className="text-orange-600">{resto.namaPaket}</span>{' '}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                  {resto['varian-paket'].map((varian) => (
                    <div key={varian.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between w-full min-w-[200px]">
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2 text-left">{varian.title}</h5>
                        <ul className="list-disc text-gray-800 text-sm pl-4">
                          {varian.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <button onClick={() => handleDeleteMenu(varian.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition flex items-center space-x-2">
                          <FaTrash />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-start py-6">
                  <Link to={`/dashboard/resto/${resto.id}/menu`} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center space-x-2">
                    <FaPlus />
                    <span>Tambah Menu</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-8">
            <Link to="tambah" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center space-x-2">
              <FaPlus />
              <span>Tambah Resto</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestoPerusahaan;
