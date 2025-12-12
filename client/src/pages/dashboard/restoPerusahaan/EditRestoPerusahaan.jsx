import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';
import apiClient from '../../../services/apiClient';

const EditRestoPerusahaan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [originalData, setOriginalData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/restoran/${id}`);
        const data = response.data;
        setOriginalData(data);
        setFormData({
          namaResto: data.namaResto || '',
          altImage: data.altImage || '',
          alamat: data.alamat || '',
          linkMaps: data.linkMaps || '',
          deskripsi: data.deskripsi || '',
          kontak: data.kontak || '',
          linkKontak: data.linkKontak || '',
          namaPaket: data.namaPaket || '',
          menuUnggulan: data.menuUnggulan.length ? [...data.menuUnggulan] : ['', ''],
          fasilitas: data.fasilitas.length ? [...data.fasilitas] : ['', ''],
          image: null,
        });
      } catch (err) {
        setError('Gagal memuat data restoran.');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      if (key === 'image' && formData.image !== null) return true;
      if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Filter data untuk menghapus item kosong
    const finalData = {
      ...formData,
      menuUnggulan: formData.menuUnggulan.filter((item) => item.trim() !== ''),
      fasilitas: formData.fasilitas.filter((item) => item.trim() !== ''),
    };

    // Hapus properti yang tidak diubah dari formData
    Object.keys(finalData).forEach((key) => {
      if (key !== 'image' && JSON.stringify(finalData[key]) === JSON.stringify(originalData[key])) {
        delete finalData[key];
      }
    });

    // Periksa apakah ada perubahan
    if (!hasChanges()) {
      setError('Tidak ada perubahan yang dibuat.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = new FormData();

      // Tambahkan data ke FormData
      Object.keys(finalData).forEach((key) => {
        if (key === 'image' && finalData[key]) {
          updateData.append('image', finalData[key]);
        } else if (finalData[key] && Array.isArray(finalData[key])) {
          finalData[key].forEach((item, index) => {
            updateData.append(`${key}[${index}]`, item);
          });
        } else if (finalData[key]) {
          updateData.append(key, finalData[key]);
        }
      });

      const response = await apiClient.put(`/api/restoran/${id}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/dashboard/resto');
      }
    } catch (err) {
      console.error('Error updating Restoran:', err);
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
          <li className="hover:underline">Resto Perusahaan</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Edit Resto</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Restoran</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar Resto
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
            <label htmlFor="namaResto" className="block text-sm font-semibold text-gray-600 mb-2">
              Nama Restoran
            </label>
            <input
              type="text"
              id="namaResto"
              name="namaResto"
              value={formData.namaResto}
              onChange={handleChange}
              placeholder={originalData?.namaResto || 'Masukkan nama restoran anda'}
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
              placeholder={originalData?.deskripsi || 'Jelaskan dengan detail mengenai keunikan Restoran anda'}
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
              placeholder={originalData?.alamat || 'Berikan Alamat lengkap Restoran anda'}
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
              placeholder={originalData?.linkMaps || 'Tempelkan link Google Maps untuk memudahkan pelanggan menemukan lokasi restoran.'}
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
              placeholder={originalData?.kontak || 'WhatsApp yang dapat dihubungi pelanggan.'}
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
              placeholder={originalData?.linkKontak || 'Tempelkan link Whatsap untuk memudahkan pelanggan untuk menuju ke Chat Whatsapp.'}
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
              placeholder={originalData?.namaPaket || 'Masukkan jenis hidangan yang ditawarkan'}
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
                  placeholder={originalData?.menuUnggulan?.[index] || `menu andalan restoran ${index + 1}`}
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
                  placeholder={originalData?.fasilitas?.[index] || `Sebutkan fasilitas yang tersedia ${index + 1}`}
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
            <button type="submit" disabled={isSubmitting} className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestoPerusahaan;
