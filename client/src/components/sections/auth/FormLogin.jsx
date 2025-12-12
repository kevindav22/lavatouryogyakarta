import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../commons/InputForm';
import apiClient from '../../../services/apiClient';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email.trim()) {
      setMsg('Email tidak boleh kosong.');
      return false;
    }
    if (!password.trim()) {
      setMsg('Password tidak boleh kosong.');
      return false;
    }
    setMsg(''); // Clear error message if validation passes
    return true;
  };

  const Login = async (e) => {
    e.preventDefault();
    if (!validateInput()) return; // Stop execution if validation fails
    try {
      await apiClient.post('/login', { email, password });
      navigate('/dashboard'); // Redirect ke dashboard setelah login
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg); // Menampilkan pesan error dari API
      }
    }
  };

  return (
    <div className="bg-gray-300 flex justify-center items-center min-h-screen px-6 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-md bg-white border-2 border-gray-600 rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-staatliches text-orange-500 mb-2">Login</h1>
          <p className="text-lg font-poppins text-gray-700">Selamat datang, silakan login untuk melanjutkan.</p>
        </div>

        {/* Display Error Message */}
        {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}

        {/* Form */}
        <form onSubmit={Login}>
          <InputForm label="Email" type="email" placeholder="example@gmail.com" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-6" />
          <InputForm label="Password" type="password" placeholder="*********" name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-8" />
          <button type="submit" className="w-full py-4 bg-red-700 text-white text-xl font-semibold rounded-xl hover:bg-red-600 transition duration-300 shadow-lg">
            Masuk
          </button>
        </form>

        {/* Footer 
        <p className="text-base font-poppins text-gray-700 text-center mt-6">
          Belum memiliki akun?{' '}
          <Link to="/register" className="text-red-700 font-bold hover:underline transition">
            Register
          </Link>
        </p>
        */}
      </div>
    </div>
  );
};

export default FormLogin;
