import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck, FaPlus } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../../services/apiClient';

const PaketJeep = () => {
  const [paketJeepData, setPaketJeepData] = useState([]);
  const [judulContent, setJudulContent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ judul: '', deskripsi: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi
  const location = useLocation(); // Hook untuk membaca URL saat ini

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/paket-jeep');
        setPaketJeepData(response.data);
      } catch (error) {
        toast.error(`Error fetching data: ${error.response?.data?.message || error.message}`, {
          position: 'top-right',
        });
      }
    };

    const fetchJudulContent = async () => {
      try {
        const response = await apiClient.get('/api/judul-content'); // Ganti dengan endpoint judulContent
        const data = response.data.filter((item) => item.type === 'paketJeep'); // Filter data berdasarkan type
        setJudulContent(data.length > 0 ? data[0] : null); // Ambil data pertama jika ada
      } catch (error) {
        toast.error(`Error fetching judul content: ${error.response?.data?.message || error.message}`, {
          position: 'top-right',
        });
      }
    };

    fetchData();
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
        type: 'paketJeep',
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

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm('Apakah Anda yakin ingin menghapus paket ini?');
      if (!confirmation) return;

      const response = await apiClient.delete(`/api/paket-jeep/${id}`);
      setPaketJeepData(paketJeepData.filter((paket) => paket.id !== id));
      toast.success(response.data.message || 'Paket berhasil dihapus', {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(`Gagal menghapus paket: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    }
  };

  // Fungsi untuk menghitung harga setelah diskon ditambahkan
  const calculateDiscountPrice = (hargaAwal, diskon) => {
    const discountPercentage = parseFloat(diskon) / 100;
    return Math.floor((hargaAwal * (1 + discountPercentage)) / 1000) * 1000;
  };

  // Fungsi untuk memformat angka menjadi Rupiah
  const formatRupiah = (number) => `Rp ${number.toLocaleString('id-ID').replace(/,/g, '.')}`;

  return (
    <div className="p-4 min-h-screen">
      <ToastContainer />
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Paket Jeep</li>
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Informasi Gallery</h3>
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
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Daftar Paket Jeep */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daftar Paket Jeep</h2>
        <div className="space-y-6">
          {paketJeepData.length > 0 ? (
            paketJeepData.map((paket) => (
              <div key={paket.id} className="border rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-stretch sm:space-x-6">
                <div className="flex-shrink-0 w-full sm:w-1/3 h-48 sm:h-auto">
                  <img src={`${apiClient.defaults.baseURL}${paket.image}`} alt={paket.altImage || 'Gambar perusahaan'} className="w-full h-full object-cover rounded-lg shadow-md border" />
                </div>
                <div className="flex-1 mt-4 sm:mt-0 space-y-6">
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Nama Paket</p>
                    <h3 className="text-gray-800">{paket.NamaPaket}</h3>
                  </div>
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Harga</p>
                    <p className="text-gray-800">
                      <span className="line-through text-gray-400"> {formatRupiah(calculateDiscountPrice(paket.hargaAwal, paket.diskon))}</span> <span className="text-gray-800"> {formatRupiah(paket.hargaAwal)}</span>
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
                      <p className="text-gray-600 font-semibold">Diskon</p>
                      <p className="text-gray-800">{paket.diskon}%</p>
                    </div>
                    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
                      <p className="text-gray-600 font-semibold">Populer</p>
                      <p className="text-gray-800">{paket.isPopular ? 'Ya' : 'Tidak'}</p>
                    </div>
                    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
                      <p className="text-gray-600 font-semibold">Durasi</p>
                      <p className="text-gray-800">{paket.durasi}</p>
                    </div>
                  </div>
                  <div className="space-y-1 border-b pb-4">
                    <p className="text-gray-600 font-semibold">Deskripsi</p>
                    <p className="text-gray-800">{paket.deskripsiPaket}</p>
                  </div>
                  <ul className="list-none mt-4 space-y-2">
                    <h4 className="font-semibold text-gray-600">Spot Wisata:</h4>
                    {Array.isArray(paket.spotWisata) ? (
                      paket.spotWisata.map((spot, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-800">
                          <FaCheck className="text-green-700" />
                          {spot}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">Tidak ada data spot wisata.</p>
                    )}
                  </ul>
                  <div className="flex space-x-4 mt-4">
                    <Link to={`edit/${paket.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition flex items-center space-x-2">
                      <FaEdit/>
                      <span>Edit</span>
                    </Link>
                    <button onClick={() => handleDelete(paket.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition flex items-center space-x-2">
                      <FaTrash/>
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Tidak ada data paket jeep tersedia.</p>
          )}
          <div className="flex justify-center mt-8">
            <Link to="tambah" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center space-x-2">
              <FaPlus />
              <span>Tambah Paket</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaketJeep;
