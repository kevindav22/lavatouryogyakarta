import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../../commons/InputForm';
import apiClient from '../../../services/apiCLient';  // Gunakan apiClient

const FormRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/users', { name, email, password, confirmPassword }); // Gunakan apiClient
      navigate('/login'); // Redirect ke halaman login setelah berhasil daftar
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg); // Menampilkan pesan error
      }
    }
  };

  return (
    <div className="bg-gray-300 flex justify-center items-center min-h-screen px-6 sm:px-12 md:px-16 lg:px-20">
      <div className="w-full max-w-md bg-white border-2 border-gray-600 rounded-2xl shadow-lg p-6">
        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-staatliches text-orange-500 mb-2">Register</h1>
          <p className="text-lg font-poppins text-gray-700">Selamat datang, silakan daftar untuk melanjutkan.</p>
        </div>

        {/* Display Error Message */}
        {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}

        {/* Form */}
        <form onSubmit={Register}>
          <InputForm
            label="Name"
            type="text"
            placeholder="JohnDoe"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputForm
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            label="Password"
            type="password"
            placeholder="*********"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputForm
            label="Confirm Password"
            type="password"
            placeholder="*********"
            name="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-4 bg-red-700 text-white text-xl font-semibold rounded-xl hover:bg-red-600 transition duration-300 shadow-lg"
          >
            Daftar
          </button>
        </form>

        {/* Footer */}
        <p className="text-base font-poppins text-gray-700 text-center mt-6">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="text-red-700 font-bold hover:underline transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormRegister;
