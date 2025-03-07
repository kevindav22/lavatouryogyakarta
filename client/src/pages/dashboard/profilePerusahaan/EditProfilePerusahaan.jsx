import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

const EditProfilePerusahaan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    identitas: '',
    tagline: '',
    deskripsi: '',
    tentang: '',
    profilImage: null,
    altImage: '',
  });

  const [originalData, setOriginalData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/info-perusahaan');
        const data = response.data[0];
        setOriginalData(data);
        setFormData({
          id: data.id,
          nama: data.nama || '',
          identitas: data.identitas || '',
          tagline: data.tagline || '',
          deskripsi: data.deskripsi || '',
          tentang: data.tentang || '',
          altImage: data.altImage || '',
        });
      } catch (err) {
        setError('Gagal memuat data perusahaan.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilImage: file });
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const hasChanges = () => {
    for (const key of Object.keys(formData)) {
      if (key === 'profilImage' && formData.profilImage !== null) return true; // Tambahkan ini
      if (formData[key] && formData[key] !== originalData[key]) return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!hasChanges()) {
      setError('Tidak ada perubahan yang dibuat.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'profilImage' && formData[key]) {
          updateData.append('image', formData[key]);
        } else if (formData[key]) {
          updateData.append(key, formData[key]);
        }
      });

      const response = await apiClient.put(`/api/info-perusahaan/${originalData.id}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/dashboard/profile');
      }
    } catch (err) {
      console.error('Error updating company data:', err);
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
          <li className="hover:underline">Profile Perusahaan</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Edit Profile</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Informasi Perusahaan</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profilImage" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar Profil
            </label>
            <div className="flex items-center space-x-4">
              {previewImage && <img src={previewImage} alt={formData.altImage || 'Pratinjau gambar'} className="w-24 h-24 border object-cover shadow-md" />}
              <input
                type="file"
                id="profilImage"
                name="profilImage"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          <div>
            <label htmlFor="altImage" className="block text-sm font-semibold text-gray-600 mb-2">
              Gambar Thubnail
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
          {['nama', 'identitas', 'tagline', 'deskripsi', 'tentang'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-semibold text-gray-600 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === 'deskripsi' || field === 'tentang' ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows="4"
                  placeholder={`Masukkan ${field}`}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                ></textarea>
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${field}`}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-4 mt-6">
            <Link to="/dashboard/profile" className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
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

export default EditProfilePerusahaan;
