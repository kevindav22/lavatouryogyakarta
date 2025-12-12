import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus } from 'react-icons/fa';
import apiClient from '../../../services/apiClient';


const EditMenuRestoran = () => {
  const [formMenuData, setFormMenuData] = useState({
    title: '',
    items: ['', '', ''],
  });
  const { id: restoranId } = useParams(); // Mengambil parameter "id" dari rute
  const navigate = useNavigate();

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setFormMenuData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, value) => {
    const updatedItems = [...formMenuData.items];
    updatedItems[index] = value;
    setFormMenuData({ ...formMenuData, items: updatedItems });
  };

  const addItem = () => {
    setFormMenuData({ ...formMenuData, items: [...formMenuData.items, ''] });
  };

  const removeItem = (index) => {
    const updatedItems = formMenuData.items.filter((_, i) => i !== index);
    setFormMenuData({ ...formMenuData, items: updatedItems });
  };

  const handleAddMenuSubmit = async (e) => {
    e.preventDefault();

    if (!restoranId) {
      toast.error('ID Restoran tidak ditemukan!', { position: 'top-right' });
      return;
    }

    const { title, items } = formMenuData;

    // Validasi input
    if (!title.trim()) {
      toast.error('Judul paket tidak boleh kosong!', { position: 'top-right' });
      return;
    }

    if (items.some((item) => item.trim() === '')) {
      toast.error('Item paket tidak boleh kosong!', { position: 'top-right' });
      return;
    }

    try {
      console.log('Data yang dikirim:', { title, items });
      // Mengirim data ke backend
      const response = await apiClient.post(`/api/restoran/${restoranId}/varianpaket`, {
        title,
        items,
      });

      toast.success('Varian paket berhasil ditambahkan!', { position: 'top-right' });
      navigate(-1); // Kembali ke halaman sebelumnya
    } catch (error) {
      toast.error(`Gagal menambahkan varian paket: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="hover:underline">Resto Perusahaan</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Tambah Menu Paket</li>
        </ol>
      </nav>

      <div className="p-6 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tambah Menu Paket</h2>
        <form onSubmit={handleAddMenuSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Paket</label>
            <input type="text" name="title" value={formMenuData.title} onChange={handleMenuChange} placeholder="Masukkan judul paket" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600" />
          </div>

          {/* Dynamic Inputs for Item Paket */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">List Menu</label>
            {formMenuData.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder={`List Menu ${index + 1}`}
                />
                <button type="button" onClick={() => removeItem(index)} className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg">
              <FaPlus />
            </button>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuRestoran;
