import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import PaketLavaTour from '../../pages/PaketLavaTour';
import RumahMakan from '../../pages/RumahMakanPage';
import GalleryPage from '../../pages/GalleryPage';
import ProfilePage from '../../pages/TentangKamiPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import DashboardRoutes from './DashboardRoutes';
import RootLayout from './RootLayout';
import NotFound from '../../pages/NotFound';
import axios from 'axios';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/paket-lava-tour', element: <PaketLavaTour /> },
      { path: '/restoran-terdekat', element: <RumahMakan /> },
      { path: '/galeri-wisata', element: <GalleryPage /> },
      { path: '/profil-perusahaan', element: <ProfilePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/dashboard/*', element: <DashboardRoutes /> },
      // Rute Fallback
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
