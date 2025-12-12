////////////////////////////////////////////////////////////////////////////////////////////////////
// Statis ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

export const logoData = {
  imageLogo: '/img/logoaaptour.webp',
  altLogo: 'Logo',
};

export const logoTambahanData = [
  { src: '/img/logoaaptour.webp', alt: 'Logo 1' },
  { src: '/img/aaptour.webp', alt: 'Logo 2' },
];

//Benefit
export const promosiWaData = {
  id: 1,
  title: 'Sudah Siap Berpetualangan Seru Bersama Kami? Klik Tombol dibawah',
  backgroundImage: '/img/bg1.webp',
};

export const promosiData = {
  id: 1,
  title: ' Klik Tombol Hijau Untuk Pemesanan Sekarang! Atau lihat detail paket',
  backgroundImage: '/img/bg2.webp',
};

//Hero Page

export const heroPagePaketJeep = [
  {
    id: 1,
    title: 'Paket Lava Tour',
    breadcrumbs: ['Beranda', 'Paket Lava Tour'],
    backgroundImage: '/img/bg.webp',
  },
];

export const heroPageRumahMakan = [
  {
    id: 1,
    title: 'Rumah Makan',
    breadcrumbs: ['Beranda', 'Rumah-Makan'],
    backgroundImage: '/img/bg.webp',
  },
];

export const heroPageGallery = [
  {
    id: 1,
    title: 'Gallery',
    breadcrumbs: ['Beranda', ' Gallery'],
    backgroundImage: '/img/bg.webp',
  },
];

export const heroPageProfile = [
  {
    id: 1,
    title: 'Tentang Kami',
    breadcrumbs: ['Beranda', ' Tentnag Kami'],
    backgroundImage: '/img/bg.webp',
  },
];

export const layananData = [
  //"Hanya Gunakan nama ikon dari daftar FontAwesome (kategori Solid Icons)."
  //penulisan icon harus sama dengan nama ikon
  //penulisan menggunakan huruf kecil
  //jika ada nama icon ada spasi maka di ganti dengan -
  //Contoh: fas-Mountain => mountain,fas-Car-Side => carside
  {
    id: 1,
    icon: 'mountain',
    judul: 'Eksplorasi Gunung Merapi',
    deskripsi: 'Nikmati pengalaman mendaki dan menjelajah keindahan Gunung Merapi bersama tim profesional.',
  },
  {
    id: 2,
    icon: 'car-side',
    judul: 'Jeep Offroad Terbaik',
    deskripsi: 'Rasakan sensasi berkendara dengan jeep offroad terbaik di jalur menantang sekitar Merapi.',
  },
  {
    id: 3,
    icon: 'utensils',
    judul: 'Kuliner Lokal',
    deskripsi: 'Cicipi beragam kuliner khas lokal dengan cita rasa autentik yang tak terlupakan.',
  },
];

export const keamananData = {
  id: 1,
  judul: 'Jaminan Keamanan',
  deskripsi: 'Kami menjamin keamanan dan kenyamanan perjalanan Anda dengan layanan terbaik.',
  keamanan: [
    {
      id: 1,
      text: 'Asuransi Perjalanan',
    },
    {
      id: 2,
      text: 'Pengemudi Berpengalaman',
    },
    {
      id: 3,
      text: 'Emergency Support',
    },
  ],
};

export const benefitsData = [
  {
    id: 1,
    judul: 'Nilai Lebih yang Kami Tawarkan',
    deskripsi: 'Memberikan pengalaman yang tak tertandingi, untuk melayani kebutuhan Anda dengan fokus pada kualitas dan kenyamanan.',
    benefits: [
      {
        id: 1,
        icon: 'car',
        judul: 'Kendaraan Terawat',
      },
      {
        id: 2,
        icon: 'box-open',
        judul: 'Paket Hemat dan Praktis',
      },
      {
        id: 3,
        icon: 'tools',
        judul: 'Fasilitas Lengkap',
      },
      {
        id: 4,
        icon: 'handshake',
        judul: 'Pelayanan Prima',
      },
      {
        id: 5,
        icon: 'user-tie',
        judul: 'Tim Profesional',
      },
      {
        id: 6,
        icon: 'clock',
        judul: 'Fast Respon',
      },
    ],
  },
];
