import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";  // Import HelmetProvider
import router from "./components/routes/MainRoutes";
import "./app.css";
import Analytics from "./components/commons/Analytics";

Analytics.init();

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css'; // Pastikan untuk mengimport CSS AOS

// Inisialisasi AOS
AOS.init({
  duration: 1000, // Durasi animasi dalam milidetik
  once: true, // Animasi hanya dijalankan sekali
  easing: 'ease-out',
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> 
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
