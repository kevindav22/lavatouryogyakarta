import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import apiClient from "../../../services/apiClient";
import jwtDecode from 'jwt-decode';

const Header = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Menggunakan apiClient untuk mendapatkan token
      const response = await apiClient.get('/token');
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name); // Set nama dari decoded token
      setEmail(decoded.email); // Set email dari decoded token
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6">
        {/* Welcome Message */}
        <div>
          <h1 className="text-sm">Welcome Back</h1>
          <p className="text-3xl font-staatliches tracking-wide font-bold">{name}</p>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-5">
          {/* Email and Icon */}
          <div className="hidden md:flex items-center space-x-3">
            <p className="font-medium">{email}</p>
            <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <FaUserCircle className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
