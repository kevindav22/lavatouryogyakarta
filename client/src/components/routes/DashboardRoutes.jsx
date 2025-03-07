import { Routes, Route } from "react-router-dom";
import Layout from "../sections/dashboard/Layout";
import Home from "../../pages/dashboard/Home";
import ProfilePerusahaan from "../../pages/dashboard/profilePerusahaan/ProfilePerusahaan";
import EditProfilePerusahaan from "../../pages/dashboard/profilePerusahaan/EditProfilePerusahaan";
import KontakPerusahaan from "../../pages/dashboard/KontakPerusahaan";
import GalleryPerusahaan from "../../pages/dashboard/GalleryPerusahaan";
import PaketJeep from "../../pages/dashboard/paketjeep/PaketJeep";
import EditPaketJeep from "../../pages/dashboard/paketjeep/EditPaketJeep";
import TambahPaketJeep from "../../pages/dashboard/paketjeep/TambahPaketJeep";
import RestoPerusahaan from "../../pages/dashboard/restoPerusahaan/RestoPerusahaan";
import EditRestoPerusahaan from "../../pages/dashboard/restoPerusahaan/EditRestoPerusahaan";
import TambahRestoPerusahaan from "../../pages/dashboard/restoPerusahaan/TambahRestoPerusahaan";
import EditMenuRestoran from "../../pages/dashboard/restoPerusahaan/EditMenuRestoran";
import QuotesPerusahaan from "../../pages/dashboard/QuotePerusahaan";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfilePerusahaan />} />
        <Route path="profile/edit" element={<EditProfilePerusahaan />} />
        <Route path="kontak" element={<KontakPerusahaan />} />
        <Route path="gallery" element={<GalleryPerusahaan />} />
        < Route path="paket-jeep" element={<PaketJeep />} />
        < Route path="paket-jeep/tambah" element={<TambahPaketJeep />} />
        < Route path="paket-jeep/edit/:id" element={<EditPaketJeep />} />
        <Route path="resto" element={<RestoPerusahaan />} />
        <Route path="resto/edit/:id" element={<EditRestoPerusahaan />} />
        <Route path="resto/:id/menu" element={<EditMenuRestoran />} />
        <Route path="resto/tambah" element={<TambahRestoPerusahaan />} />
        <Route path="quotes" element={ <QuotesPerusahaan/>} />

      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
