import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './src/config/Database.js'; 
import './src/models/RelasiRestoran.js'; 
import router from './src/routes/index.js';
import infoperusahaan from './src/routes/infoperusahaan.js';
import paketJeepRoutes from './src/routes/paketjeep.js';
import judulContentRoutes from './src/routes/judulcontent.js';
import galleryRoutes from './src/routes/galleryimages.js';
import kontakRoutes from './src/routes/kontak.js';
import restoranRoutes from './src/routes/restoran.js';
import quotesRoutes from './src/routes/quotes.js';

// Konfigurasi dotenv untuk mengakses variabel lingkungan
dotenv.config();

const app = express();

// Middleware CORS dengan pengaturan yang fleksibel
const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
};
app.use(cors(corsOptions));

// Middleware untuk parsing body dan cookie
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Koneksi ke Database dengan handling error
const connectToDatabase = async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Jika gagal koneksi, server akan berhenti
  }
};

connectToDatabase();

// Middleware untuk akses static files (misalnya upload)
app.use('/uploads', express.static('uploads'));

// Routing
app.use(router);
app.use('/api/info-perusahaan', infoperusahaan);
app.use('/api/judul-content', judulContentRoutes);
app.use('/api/paket-jeep', paketJeepRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/kontak', kontakRoutes);
app.use('/api/restoran', restoranRoutes);
app.use('/api/quotes', quotesRoutes);

// Middleware untuk menangani error secara global
app.use((err, req, res, next) => {
  console.error(err.stack); // Menampilkan stack trace error
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Opsional: Sinkronisasi model database hanya untuk non-production
if (process.env.NODE_ENV !== 'production') {
  // db.sync({ alter: true }); // Bisa diaktifkan jika perlu sinkronisasi
  // .then(() => console.log('Database synchronized'))
  // .catch((error) => console.error('Error syncing database:', error));
}

// Menjalankan server pada port tertentu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
