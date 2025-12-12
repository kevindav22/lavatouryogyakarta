import { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import apiClient from '../../services/apiClient';

const KontakPerusahaan = () => {
  const [formData, setFormData] = useState({
    whatsapp: '',
    alamat: '',
    email: '',
    linkWhatsapp: '',
    linkMaps: '',
    linkEmail: '',
    linkTiktok: '',
    linkInstagram: '',
    linkFacebook: '',
    linkYoutube: '',
  });
  const [originalData, setOriginalData] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchKontakData = async () => {
      try {
        const response = await apiClient.get('/api/kontak');
        const data = response.data[0] || {};
        setFormData(data);
        setOriginalData(data);
      } catch (error) {
        console.error('Error fetching kontak data:', error);
        toast.error('Gagal mengambil data kontak.');
      }
    };

    fetchKontakData();
  }, []);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value !== '');
    const noErrors = Object.values(error).every((err) => err === null || err === undefined);

    setIsFormValid(allFieldsFilled && noErrors);
  }, [formData, error]);

  const validateInput = (name, value) => {
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Masukkan format email yang valid (contoh: user@example.com)';
    }
    if (name.startsWith('link') && !/^(https?:\/\/[^\s]+)$/.test(value)) {
      return 'Masukkan URL yang valid (contoh: https://example.com)';
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validationError = validateInput(name, value);

    setError((prevError) => ({
      ...prevError,
      [name]: validationError, // Tetap simpan error jika input tidak valid
    }));

    if (!validationError) {
      // Jika input valid, hapus error untuk field ini
      setError((prevError) => ({
        ...prevError,
        [name]: null,
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditingField(null);

    // Reset semua error saat tombol Kembali diklik
    setError({});
  };

  const handleSave = async () => {
    if (Object.values(error).some((err) => err)) {
      toast.error('Harap perbaiki kesalahan pada input sebelum menyimpan.');
      return;
    }

    try {
      const response = await apiClient.put(`/api/kontak/${formData.id}`, formData);
      setFormData(response.data);
      setOriginalData(response.data);
      setEditingField(null);
      toast.success('Data berhasil diperbarui!');
    } catch (error) {
      console.error('Error saving kontak data:', error);
      toast.error('Gagal menyimpan data kontak.');
    }
  };

  const renderField = (label, fieldName, isLink = false) => (
    <div className="space-y-2">
      <label className="block text-gray-700 font-bold text-sm md:text-base">{label}</label>
      <div className="flex items-start space-x-3">
        {editingField === fieldName ? (
          <>
            {isLink || fieldName === 'templateTeks' ? (
              <textarea
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleInputChange}
                placeholder={`Masukkan ${label.toLowerCase()}...`}
                className={`flex-1 max-w-full ${fieldName === 'templateTeks' ? 'h-40' : 'h-24'} border ${error[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                  error[fieldName] ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } transition`}
              />
            ) : (
              <input
                type="text"
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleInputChange}
                placeholder={`Masukkan ${label.toLowerCase()}...`}
                className={`flex-1 max-w-full border ${error[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                  error[fieldName] ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } transition`}
              />
            )}
            <div className="flex space-x-2">
              <button onClick={handleSave} disabled={!isFormValid} className={`px-4 py-2 rounded-lg shadow-md transition ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 '}`}>
                <FaSave />
              </button>
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-500 rounded-lg shadow-md transition">
                <FaTimes />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`flex-1 ${fieldName === 'templateTeks' ? 'h-40' : 'h-auto'} bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 text-gray-800 overflow-hidden`}>
              {isLink && formData[fieldName] ? (
                <a href={formData[fieldName]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {formData[fieldName]}
                </a>
              ) : (
                formData[fieldName] || '-'
              )}
            </div>
            <button
              onClick={() => setEditingField(fieldName)}
              disabled={editingField !== null}
              className={`px-3 py-2 rounded-lg transition flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700`}
              title={editingField !== null ? 'Selesaikan pengeditan saat ini terlebih dahulu' : ''}
            >
              <FaEdit className="text-sm md:text-base" />
              <span className="hidden md:inline text-sm">Edit</span>
            </button>
          </>
        )}
      </div>
      {error[fieldName] && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <FaExclamationCircle className="mr-1" />
          {error[fieldName]}
        </p>
      )}
    </div>
  );

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <ToastContainer />
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-500 text-sm">
          <li className="hover:underline">Dashboard</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Kontak</li>
        </ol>
      </nav>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Kontak Perusahaan</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {renderField('WhatsApp (Awali dengan 62)', 'whatsapp')}
            {renderField('Alamat', 'alamat')}
            {renderField('Email', 'email')}
            {renderField('Template Pesan', 'templateTeks')}
          </div>
          <div className="space-y-6">
            {renderField('Link Maps', 'linkMaps', true)}
            {renderField('Link TikTok', 'linkTiktok', true)}
            {renderField('Link Instagram', 'linkInstagram', true)}
            {renderField('Link Facebook', 'linkFacebook', true)}
            {renderField('Link YouTube', 'linkYoutube', true)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontakPerusahaan;
