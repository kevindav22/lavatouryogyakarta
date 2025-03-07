-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jan 2025 pada 13.33
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aaptour_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `carousel_image`
--

CREATE TABLE `carousel_image` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `altImage` varchar(255) DEFAULT NULL,
  `infoPerusahaanId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `carousel_image`
--

INSERT INTO `carousel_image` (`id`, `image`, `altImage`, `infoPerusahaanId`, `createdAt`, `updatedAt`) VALUES
(33, '/uploads/1736810719387-439084773-IMG-20241227-WA0024.jpg', 'LavaTourJogja', 10, '2025-01-13 23:25:19', '2025-01-13 23:25:19'),
(34, '/uploads/1736810742515-962641787-IMG-20241227-WA0025.jpg', 'LavatourJogja2', 10, '2025-01-13 23:25:42', '2025-01-13 23:25:42'),
(36, '/uploads/1736815688449-689842545-IMG-20250101-WA0014.jpg', 'gambar ', 10, '2025-01-14 00:48:08', '2025-01-14 00:48:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `gallery_image`
--

CREATE TABLE `gallery_image` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `altImage` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `gallery_image`
--

INSERT INTO `gallery_image` (`id`, `image`, `altImage`, `category`, `createdAt`, `updatedAt`) VALUES
(17, '/uploads/1736813876656-995135068-IMG-20241227-WA0021.jpg', 'LavaTour Merapi', 'jeep', '2025-01-14 00:17:56', '2025-01-14 00:17:56'),
(18, '/uploads/1736813900253-569099831-IMG-20241227-WA0020.jpg', 'Jeep Kaliuran ', 'jeep', '2025-01-14 00:18:20', '2025-01-14 00:18:20'),
(19, '/uploads/1736813919736-648464416-IMG-20241227-WA0023.jpg', 'Lavatur JOgja', 'jeep', '2025-01-14 00:18:39', '2025-01-14 00:18:39'),
(20, '/uploads/1736813936987-833003984-IMG-20241227-WA0022.jpg', 'Aap Tour', 'jeep', '2025-01-14 00:18:56', '2025-01-14 00:18:56'),
(21, '/uploads/1736813954514-917014432-IMG-20241227-WA0024.jpg', 'Keindahan Merapi', 'jeep', '2025-01-14 00:19:14', '2025-01-14 00:19:14'),
(22, '/uploads/1736813983903-262407719-IMG-20241227-WA0025.jpg', 'Jeep  Offroad Jogja', 'jeep', '2025-01-14 00:19:43', '2025-01-14 00:19:43'),
(23, '/uploads/1736814003397-251673450-IMG-20241227-WA0030.jpg', 'Restoku', 'kuliner', '2025-01-14 00:20:03', '2025-01-14 00:20:03'),
(24, '/uploads/1736814021244-213760401-IMG-20241227-WA0029.jpg', 'Ruang Restoku', 'kuliner', '2025-01-14 00:20:21', '2025-01-14 00:20:21'),
(25, '/uploads/1736814045869-978044933-IMG-20241227-WA0031.jpg', 'Lesehan Restoku', 'kuliner', '2025-01-14 00:20:45', '2025-01-14 00:20:45'),
(26, '/uploads/1736814068078-698983609-IMG-20241227-WA0033.jpg', 'Parkiran Restoku', 'kuliner', '2025-01-14 00:21:08', '2025-01-14 00:21:08'),
(27, '/uploads/1736814085702-763428157-IMG-20241231-WA0015.jpg', 'Nasi Box', 'kuliner', '2025-01-14 00:21:25', '2025-01-14 00:21:25'),
(28, '/uploads/1736814108462-294165281-IMG-20241231-WA0022.jpg', 'Nasi Kuning', 'kuliner', '2025-01-14 00:21:48', '2025-01-14 00:21:48'),
(29, '/uploads/1736814124018-592265025-IMG-20241231-WA0023.jpg', 'Ayan', 'kuliner', '2025-01-14 00:22:04', '2025-01-14 00:22:04'),
(30, '/uploads/1736814146341-806522020-IMG-20241231-WA0045.jpg', 'Nasi Enak', 'kuliner', '2025-01-14 00:22:26', '2025-01-14 00:22:26'),
(31, '/uploads/1736814167453-460462471-IMG-20241231-WA0027.jpg', 'Sunrise', 'jeep', '2025-01-14 00:22:47', '2025-01-14 00:22:47'),
(32, '/uploads/1736814185821-341640464-IMG-20250101-WA0014.jpg', 'VIew dipagi hari', 'wisata', '2025-01-14 00:23:05', '2025-01-14 00:23:05'),
(33, '/uploads/1736814201269-115597754-IMG-20250101-WA0016.jpg', 'View Merapi', 'jeep', '2025-01-14 00:23:21', '2025-01-14 00:23:21'),
(34, '/uploads/1736814216954-487260963-IMG-20250102-WA0004.jpg', 'BaseCamp', 'jeep', '2025-01-14 00:23:36', '2025-01-14 00:23:36'),
(35, '/uploads/1736814232234-108925400-IMG-20250102-WA0006.jpg', 'basecamp', 'wisata', '2025-01-14 00:23:52', '2025-01-14 00:23:52'),
(37, '/uploads/1736815804597-867748315-IMG-20250102-WA0008.jpg', 'basecamp', 'jeep', '2025-01-14 00:50:04', '2025-01-14 00:50:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `info_perusahaan`
--

CREATE TABLE `info_perusahaan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `identitas` varchar(255) NOT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `tentang` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `altImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `info_perusahaan`
--

INSERT INTO `info_perusahaan` (`id`, `nama`, `identitas`, `tagline`, `deskripsi`, `tentang`, `image`, `altImage`, `createdAt`, `updatedAt`) VALUES
(10, 'AAP TOUR', 'AAP TOUR ADVENTURE', 'Explore Merapi Tourisme Further', '\"Jadikan setiap perjalanan lebih berkesan bersama AAP TOUR, tempat petualangan bertemu dengan kelezatan kuliner.\"', 'AAP TOUR adalah penyedia berbagai layanan perjalanan wisata yang mengkhususkan diri dalam memberikan pengalaman eksplorasi yang mendalam dan tak terlupakan. Dengan fokus utama pada keindahan dan keunikan kawasan Gunung Merapi.\r\nAAP TOUR juga memiliki rumah makan yang menyajikan hidangan lezat khas lokal sebagai pelengkap pengalaman wisata Anda dengan sajian makanan tradisional yang menggugah selera, sehingga Anda dapat menikmati kehangatan budaya lokal dalam setiap gigitan.', '/uploads/1736810644733-70049790-IMG-20250102-WA0004.jpg', 'Aap Tour Adventure', '2025-01-08 09:21:53', '2025-01-13 23:24:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `judul_content`
--

CREATE TABLE `judul_content` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `judul_content`
--

INSERT INTO `judul_content` (`id`, `type`, `judul`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
(1, 'paketJeep', 'Pilihan Paket Lava Tour Merapi Terbaik', 'Temukan pengalaman wisata yang tak terlupakan dengan berbagai pilihan paket, dari perjalanan singkat hingga eksplorasi menyeluruh di Merapi', '2025-01-08 13:39:25', '2025-01-13 23:32:19'),
(2, 'rumahMakan', 'Pilihan Paket Menu Makan', 'Temukan pengalaman wisata yang tak terlupakan dengan berbagai pilihan paket, dari perjalanan singkat hingga eksplorasi menyeluruh di Merapi', '2025-01-08 13:42:28', '2025-01-14 00:01:55'),
(3, 'gallery', 'Eksplorasi Visual Wisata, Jeep, dan Kuliner', 'Lihat momen spesial dari perjalanan kami, mulai dari alam hingga pengalaman kuliner', '2025-01-08 13:43:03', '2025-01-14 00:17:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kontak`
--

CREATE TABLE `kontak` (
  `id` int(11) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `templateTeks` text NOT NULL,
  `linkWhatsapp` text DEFAULT NULL,
  `linkMaps` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `linkEmail` varchar(255) DEFAULT NULL,
  `linkTiktok` varchar(255) DEFAULT NULL,
  `linkInstagram` varchar(255) DEFAULT NULL,
  `linkFacebook` varchar(255) DEFAULT NULL,
  `linkYoutube` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kontak`
--

INSERT INTO `kontak` (`id`, `whatsapp`, `templateTeks`, `linkWhatsapp`, `linkMaps`, `email`, `linkEmail`, `linkTiktok`, `linkInstagram`, `linkFacebook`, `linkYoutube`, `createdAt`, `updatedAt`, `alamat`) VALUES
(5, '6288233634050', 'Saya Ingin Memesan Sekarang Juga', 'https://wa.me/6288233634050?text=Saya%20Ingin%20Memesan%20Sekarang%20Juga', 'https://goo.gl/maps/URiHwFaK3BgDnY4E9', 'test@example.com', NULL, 'https://www.tiktok.com/', 'https://www.instagram.com/', 'https://www.instagram.com/', NULL, '2025-01-11 18:12:35', '2025-01-13 09:19:57', 'Jl. Padjajaran, Ring Road Utara, Kel. Condongcatur, Kec. Depok, Kab. Sleman, Prop. Daerah Istimewa Yogyakarta 55283');

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket_jeep`
--

CREATE TABLE `paket_jeep` (
  `id` int(11) NOT NULL,
  `NamaPaket` varchar(255) NOT NULL,
  `deskripsiPaket` varchar(255) NOT NULL,
  `hargaAwal` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `durasi` varchar(255) NOT NULL,
  `isPopular` tinyint(1) DEFAULT 0,
  `spotWisata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`spotWisata`)),
  `image` varchar(255) DEFAULT NULL,
  `altImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `paket_jeep`
--

INSERT INTO `paket_jeep` (`id`, `NamaPaket`, `deskripsiPaket`, `hargaAwal`, `diskon`, `durasi`, `isPopular`, `spotWisata`, `image`, `altImage`, `createdAt`, `updatedAt`) VALUES
(12, 'Mini Short', 'Nikmati keindahan alam Merapi dengan rute pendek yang aman dan menyenangkan. Cocok untuk Anda yang ingin pengalaman wisata singkat namun tetap berkesan.', 400000, 10, '90 Menit', 0, '[\"Museum Mini Sisa Hartaku\",\"Batu Alien/The Lost World Park\",\"Track Air Kali Kuning\"]', '/uploads/1736811118740-62046398-IMG-20241227-WA0022.jpg', 'Paket Mini Short', '2025-01-11 20:30:15', '2025-01-14 12:04:22'),
(17, 'Short', '\'Nikmati keindahan alam Merapi dengan rute pendek yang aman dan menyenangkan. Cocok untuk Anda yang ingin pengalaman wisata singkat namun tetap berkesan', 450000, 5, '150 Menit', 1, '[\"Museum Mini Sisa Hartaku\",\"Batu Alien/ The Lost World Park\",\"Petilasan Rumah Mbah Maridjan\",\"Track Air Kali Kuning\"]', '/uploads/1736811874157-625460237-IMG-20241227-WA0021.jpg', 'Paket Short', '2025-01-12 21:37:56', '2025-01-14 18:38:30'),
(20, 'Medium', 'Jelajahi keindahan Merapi dengan rute wisata yang lebih lengkap dan seru. Paket ini dirancang untuk memberikan pengalaman yang penuh kesan dalam waktu yang cukup', 550000, 20, '180 Menit', 1, '[\"Museum Mini Sisa Hartaku\",\"Batu Alien/ The Lost World Park\",\"Bunker Kali Adem\",\"Petilasan Rumah Mbah Maridjan\",\"Track Air Kali Kuning\"]', '/uploads/1736812068646-573356895-IMG-20241227-WA0025.jpg', 'Paket Medium', '2025-01-13 22:21:53', '2025-01-14 18:38:43'),
(21, 'Long', 'Paket ideal untuk keluarga atau grup besar yang ingin menjelajahi lebih banyak destinasi di Merapi dengan waktu yang fleksibel dan nyaman', 650000, 5, '180 Menit', 0, '[\"Museum Sisa Hartaku\",\"Batu Alien / The Lost World Park\",\"Bunker Kali Adem\",\"Petilasan Mbah Maridjan/ Lost Word Castle\",\"Track Air Kuning\"]', '/uploads/1736812250294-337208437-IMG-20241227-WA0020.jpg', 'Long', '2025-01-13 22:22:16', '2025-01-14 18:39:04'),
(22, 'Sunsrise', 'Rasakan keindahan matahari terbit di Merapi dengan rute khusus yang dirancang untuk memberikan pengalaman wisata pagi yang spektakuler', 500000, 25, '240 Menit', 1, '[\"Museum Mini Sisa Hartaku\",\"Batu Alient / The Lost World Park\",\"Bunker Kali Adem\",\"Track Air Kali Kuning\"]', '/uploads/1736812423960-282916969-IMG-20241231-WA0027.jpg', 'sunsire', '2025-01-13 22:22:41', '2025-01-14 18:39:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `quotes`
--

INSERT INTO `quotes` (`id`, `text`, `nama`, `jabatan`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Kesuksesan tidak datang dengan mudah, tetapi melalui perjuangan yang tidak kenal lelah. Jangan takut menghadapi tantangan, karena setiap rintangan adalah kesempatan untuk tumbuh dan memperlihatkan kemampuan terbaik kita. ', 'Prabowo Subianto', 'Presiden Republik Indonesia', '/uploads/1736764810520-773566936-IMG-20200328-WA0024.jpg', '2025-01-12 08:13:44', '2025-01-13 10:40:10'),
(3, 'wrgyawrhhhhhhhhhhhhhhhhhhhhhh', 'hawrhawrh', 'awrawrh', '/uploads/1736708486400-565336100-img4.jpg', '2025-01-12 19:01:26', '2025-01-12 19:01:26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `restoran`
--

CREATE TABLE `restoran` (
  `id` int(11) NOT NULL,
  `namaResto` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `altImage` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) NOT NULL,
  `linkMaps` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `linkKontak` varchar(255) DEFAULT NULL,
  `menuUnggulan` text DEFAULT NULL,
  `fasilitas` text DEFAULT NULL,
  `namaPaket` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `restoran`
--

INSERT INTO `restoran` (`id`, `namaResto`, `image`, `altImage`, `alamat`, `linkMaps`, `deskripsi`, `kontak`, `linkKontak`, `menuUnggulan`, `fasilitas`, `namaPaket`, `createdAt`, `updatedAt`) VALUES
(23, 'RM - Restoku', '/uploads/1736812887862-506050542-IMG-20241227-WA0029.jpg', 'Restoku', 'Jl. Raya Merapi Golf, Karanggeneng, Umbulharjo, Kec. Cangkringan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55583', 'https://www.google.com/maps/place/RESTOKU,+Jl.+Raya+Merapi+Golf,+Karanggeneng,+Umbulharjo,+Kec.+Cangkringan,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta+55583/data=!4m2!3m1!1s0x2e7a5db5eadb604d:0xc6a2af3a606e9000?utm_source=mstt_1&entry=gps&lucs=47068615', 'Restoku adalah rumah makan modern yang menyajikan hidangan khas Nusantara dan internasional dalam suasana yang nyaman', '0821 3739 5506', 'https://api.whatsapp.com/send/?phone=6288233634050&text=Halo+admin+ku+yang+ganteng+saya+mau+pesan&type=phone_number&app_absent=0', '[\"Paket 20k\",\"Paket 23k\",\"Paket 28k\"]', '[\"Kamar Mandi\",\"Free Wifi\",\"Lokasi Nyaman\",\"Parkiran Luas\"]', 'Prasmanan', '2025-01-12 19:10:19', '2025-01-14 00:01:27'),
(26, 'Kedai Kebon', '/uploads/1736813455875-37378282-IMG-20241231-WA0045.jpg', 'Kdeai Kebon', 'Balong, Umbulharjo, Kec. Cangkringan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55583', 'https://www.google.com/maps/place/Kedai+Kebon/@-7.6233093,110.437181,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a67574db6b135:0x89c9b5711a148b7f!8m2!3d-7.6233093!4d110.437181!16s%2Fg%2F11g01sblv1?hl=id-id&entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D', 'Kedai Kebon adalah rumah makan modern yang menyajikan hidangan khas Nusantara dan internasional dalam suasana yang nyaman.', '0894 5223 199212', 'https://api.whatsapp.com/send/?phone=6288233634050&text=Halo+admin+ku+yang+ganteng+saya+mau+pesan&type=phone_number&app_absent=0', '[\"Nasi Box 17k\",\"Nasi Box 27k\"]', '[\"Wifi\",\"Parkiran\",\"Tempat Cuci Tangan\"]', 'Nasi BOX', '2025-01-14 00:10:55', '2025-01-14 00:10:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_Token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_Token`, `createdAt`, `updatedAt`) VALUES
(3, 'admin lavatour', 'admin@aaptour.com', '$2b$10$PK2oQyxKSscgPA1ixIoSVO05AJOu.kG5Zat4kmS8Kx832psOA/86W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIm5hbWUiOiJhZG1pbiBsYXZhdG91ciIsImVtYWlsIjoiYWRtaW5AYWFwdG91ci5jb20iLCJpYXQiOjE3MzY5Mzg1ODgsImV4cCI6MTczNzAyNDk4OH0.OmVO6pjJ6B6QLPIpGzxQdN4MJm3Aslv5GtY_QocN2VM', '2025-01-03 12:15:17', '2025-01-15 10:56:28'),
(4, 'kevindav', 'sajasendi82@gmail.com', '$2b$10$RxhVPkpOu6nFWHVqx8cHPu5iP6FcmSUTzHWIi1haWqIvqhqUacUF6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQsIm5hbWUiOiJrZXZpbmRhdiIsImVtYWlsIjoic2FqYXNlbmRpODJAZ21haWwuY29tIiwiaWF0IjoxNzM1OTM3MDQ4LCJleHAiOjE3MzYwMjM0NDh9.ApuFXzET6Vu7gCEVjQOkvmJKC4XsPJEdcw8zOUAyXiI', '2025-01-03 17:33:04', '2025-01-03 20:44:08'),
(5, '', '', '$2b$10$XJls8y0dkL3hK7sWIrXzMOgGDGgb8u96ssSuAAcJvh.gA4N9szQDC', NULL, '2025-01-06 19:27:20', '2025-01-15 10:30:33'),
(6, '', '', '$2b$10$Q6nO5zDVeJ3tnsqFvVz8M.zArEnWvyzvv2ykwwNJCb/ua0t1HefGy', NULL, '2025-01-06 19:27:23', '2025-01-06 19:27:23'),
(7, 'kevindav', 'tinamantap86@gmail.com', '$2b$10$FeNYxgwa07o5U7IajzDMVOpnPvgwSs1IBHsTg42p4.vc1m6Twd5eK', NULL, '2025-01-11 23:20:54', '2025-01-12 20:57:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `varian-paket`
--

CREATE TABLE `varian-paket` (
  `id` int(11) NOT NULL,
  `restoranId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `items` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `varian-paket`
--

INSERT INTO `varian-paket` (`id`, `restoranId`, `title`, `items`, `createdAt`, `updatedAt`) VALUES
(38, 23, 'Paket 20k', '[\"Nasi Putih\",\"Telur Semur\",\"Capcay Sayur\",\"Tempe Mendoan\",\"Tahu Goreng\",\"Sambal dan Krupuk\",\"Buah\",\"Teh dan Air Putih\"]', '2025-01-14 00:03:23', '2025-01-14 00:03:23'),
(39, 23, 'Paket 23k', '[\"Nasi\",\"Ayam Gule / Opor\",\"Tumis Kacang Panjang\",\"Tempe Mendoan\",\"Sambal dan Krupuk\",\"Buah\",\"Teh dan Air Putih\"]', '2025-01-14 00:05:07', '2025-01-14 00:05:07'),
(40, 23, 'Paket 28k', '[\"Nasih Putih\",\"Lele / Nila \",\"Sayur Asem \",\"Lalapan \",\"Bakwan\",\"Sambal dan Krupuk\",\"Buah\",\"Teh Air Putih\"]', '2025-01-14 00:06:19', '2025-01-14 00:06:19'),
(41, 23, 'Paket 35k', '[\"Nasi Putih\",\"Mangut Nila / Lele\",\"Telur Dadar\",\"Capcay Sayur\",\"Tumis Tempe Lombok Ijo\",\"Tahu Goreng\",\"Sambal dan Krupuk\",\"Buah\",\"Teh dan Air Putih\"]', '2025-01-14 00:07:42', '2025-01-14 00:07:42'),
(42, 26, 'Nasi Box 17k', '[\"Ayam Kfc (Sayap/Dada)\",\"Nasi Putih\",\"Lalapan\",\"Sambal\",\"Sayur (Boleh Request)\"]', '2025-01-14 00:12:01', '2025-01-14 00:12:01'),
(43, 26, 'Nasi BOX 22k', '[\"Ayam Bakar / Kremes\",\"Nasi Putih\",\"Kerupuk\",\"Sambal\",\"Lalapan\",\"Buah\",\"Satu Macam Sayur\"]', '2025-01-14 00:13:14', '2025-01-14 00:13:14'),
(44, 26, 'Nasi Box 27k', '[\"Ayam Bakar / Kremes\",\"Nasi Putih\",\"Sambal\",\"Lalapan\",\"Buah \",\"2 Macam Sayur\",\"1 Snack\"]', '2025-01-14 00:14:27', '2025-01-14 00:14:27'),
(45, 26, 'Paket 35k', '[\"Mangut Nila / Lele\",\"Nasi Putih\",\"Telur Dadar\",\"Capcay Sayur\",\"Tumis Tempe Lombok Ijo\",\"Tahu Goreng\",\"Sambal Kerupuk\",\"Buah\",\"Teh dan Air Putih\"]', '2025-01-14 00:16:16', '2025-01-14 00:16:16');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `carousel_image`
--
ALTER TABLE `carousel_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `infoPerusahaanId` (`infoPerusahaanId`);

--
-- Indeks untuk tabel `gallery_image`
--
ALTER TABLE `gallery_image`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `info_perusahaan`
--
ALTER TABLE `info_perusahaan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `judul_content`
--
ALTER TABLE `judul_content`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kontak`
--
ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `paket_jeep`
--
ALTER TABLE `paket_jeep`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `restoran`
--
ALTER TABLE `restoran`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `varian-paket`
--
ALTER TABLE `varian-paket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restoranId` (`restoranId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `carousel_image`
--
ALTER TABLE `carousel_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `gallery_image`
--
ALTER TABLE `gallery_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `info_perusahaan`
--
ALTER TABLE `info_perusahaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `judul_content`
--
ALTER TABLE `judul_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `paket_jeep`
--
ALTER TABLE `paket_jeep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `restoran`
--
ALTER TABLE `restoran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `varian-paket`
--
ALTER TABLE `varian-paket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `carousel_image`
--
ALTER TABLE `carousel_image`
  ADD CONSTRAINT `carousel_image_ibfk_1` FOREIGN KEY (`infoPerusahaanId`) REFERENCES `info_perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `varian-paket`
--
ALTER TABLE `varian-paket`
  ADD CONSTRAINT `varian-paket_ibfk_1` FOREIGN KEY (`restoranId`) REFERENCES `restoran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
