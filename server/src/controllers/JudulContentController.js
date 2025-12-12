// Menggunakan import untuk mengimpor model
import JudulContent from '../models/JudulContent.js';

// Ambil semua data
export const getAllJudulContents = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { where: { type } } : {};
    const judulContents = await JudulContent.findAll(filter);
    res.status(200).json(judulContents);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memuat data', error: error.message });
  }
};

// Tambahkan data baru
export const createJudulContent = async (req, res) => {
  try {
    const { type, judul, deskripsi } = req.body;

    // Validasi input
    if (!type || !judul || !deskripsi) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const newJudulContent = await JudulContent.create({ type, judul, deskripsi });
    res.status(201).json(newJudulContent);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan data', error: error.message });
  }
};

// Ambil data berdasarkan ID
export const getJudulContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const judulContent = await JudulContent.findByPk(id);

    if (!judulContent) {
      return res.status(404).json({ message: 'JudulContent tidak ditemukan' });
    }

    res.status(200).json(judulContent);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memuat data', error: error.message });
  }
};

// Update data
export const updateJudulContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, judul, deskripsi } = req.body;
    const judulContent = await JudulContent.findByPk(id);

    if (!judulContent) {
      return res.status(404).json({ message: 'JudulContent tidak ditemukan' });
    }

    // Validasi input
    if (!type || !judul || !deskripsi) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    judulContent.type = type;
    judulContent.judul = judul;
    judulContent.deskripsi = deskripsi;
    await judulContent.save();

    res.status(200).json(judulContent);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate data', error: error.message });
  }
};

// Hapus data
export const deleteJudulContent = async (req, res) => {
  try {
    const { id } = req.params;
    const judulContent = await JudulContent.findByPk(id);

    if (!judulContent) {
      return res.status(404).json({ message: 'JudulContent tidak ditemukan' });
    }

    await judulContent.destroy();
    res.status(200).json({ message: 'JudulContent berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data', error: error.message });
  }
};
