import PaketJeep from '../models/PaketJeep.js';
import fs from 'fs';
import path from 'path';

// Fungsi untuk memvalidasi dan memproses `spotWisata`
const processSpotWisata = (spotWisata) => {
  if (typeof spotWisata === 'string') {
    try {
      // Jika `spotWisata` adalah JSON string valid, parse menjadi objek/array
      return JSON.parse(spotWisata);
    } catch {
      // Jika parsing gagal, kembalikan nilai asli sebagai string
      return spotWisata;
    }
  }
  // Jika `spotWisata` bukan string, kembalikan nilainya langsung
  return spotWisata;
};

// Mendapatkan semua paket jeep
export const getAllPaketJeep = async (req, res) => {
  try {
    console.log('Fetching Paket Jeep...');
    const paketJeep = await PaketJeep.findAll();

    console.log('Data fetched from database:', paketJeep);

    const processedPaketJeep = paketJeep.map((item) => {
      let formattedSpotWisata;

      console.log('Processing item:', item);

      // Normalisasi `spotWisata`
      if (typeof item.spotWisata === 'string') {
        try {
          formattedSpotWisata = JSON.parse(item.spotWisata);
          console.log('Parsed spotWisata as JSON:', formattedSpotWisata);
        } catch {
          formattedSpotWisata = item.spotWisata.split(',').map((spot) => spot.trim());
          console.log('Split spotWisata by commas:', formattedSpotWisata);
        }
      } else if (Array.isArray(item.spotWisata)) {
        formattedSpotWisata = item.spotWisata;
        console.log('spotWisata is already an array:', formattedSpotWisata);
      } else {
        formattedSpotWisata = item.spotWisata;
        console.log('spotWisata is of unknown type, using as-is:', formattedSpotWisata);
      }

      return {
        ...item.toJSON(),
        spotWisata: formattedSpotWisata,
      };
    });

    console.log('Processed Paket Jeep:', processedPaketJeep);
    res.status(200).json(processedPaketJeep);
  } catch (error) {
    console.error('Error fetching Paket Jeep:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan paket jeep berdasarkan ID
export const getPaketJeepById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching Paket Jeep with ID: ${id}`);

    const paketJeep = await PaketJeep.findByPk(id);

    if (!paketJeep) {
      console.error('Paket Jeep not found');
      return res.status(404).json({ message: 'Paket Jeep tidak ditemukan' });
    }

    // Normalisasi `spotWisata`
    let formattedSpotWisata;

    console.log('Processing spotWisata:', paketJeep.spotWisata);

    if (typeof paketJeep.spotWisata === 'string') {
      try {
        formattedSpotWisata = JSON.parse(paketJeep.spotWisata);
        console.log('Parsed spotWisata as JSON:', formattedSpotWisata);
      } catch {
        formattedSpotWisata = paketJeep.spotWisata.split(',').map((spot) => spot.trim());
        console.log('Split spotWisata by commas:', formattedSpotWisata);
      }
    } else if (Array.isArray(paketJeep.spotWisata)) {
      formattedSpotWisata = paketJeep.spotWisata;
      console.log('spotWisata is already an array:', formattedSpotWisata);
    } else {
      formattedSpotWisata = paketJeep.spotWisata;
      console.log('spotWisata is of unknown type, using as-is:', formattedSpotWisata);
    }

    const response = {
      ...paketJeep.toJSON(),
      spotWisata: formattedSpotWisata,
    };

    console.log('Fetched Paket Jeep:', response);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching Paket Jeep by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan paket jeep baru
export const createPaketJeep = async (req, res) => {
  try {
    const { NamaPaket, deskripsiPaket, hargaAwal, diskon, durasi, spotWisata, isPopular, altImage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Proses `spotWisata` sebelum menyimpan
    const formattedSpotWisata = processSpotWisata(spotWisata);

    const newPaketJeep = await PaketJeep.create({
      NamaPaket,
      deskripsiPaket,
      hargaAwal,
      diskon,
      durasi,
      spotWisata: formattedSpotWisata,
      isPopular,
      image,
      altImage,
    });

    res.status(201).json(newPaketJeep);
  } catch (error) {
    console.error('Error creating Paket Jeep:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate paket jeep
export const updatePaketJeep = async (req, res) => {
  try {
    const { id } = req.params;
    const { NamaPaket, deskripsiPaket, hargaAwal, diskon, durasi, spotWisata, isPopular, altImage } = req.body;

    const paketJeep = await PaketJeep.findByPk(id);
    if (!paketJeep) return res.status(404).json({ message: 'Paket Jeep tidak ditemukan' });

    const oldImagePath = paketJeep.image;

    // Proses `spotWisata` sebelum update
    const formattedSpotWisata = spotWisata ? processSpotWisata(spotWisata) : paketJeep.spotWisata;

    const updatedData = {
      NamaPaket: NamaPaket ?? paketJeep.NamaPaket,
      deskripsiPaket: deskripsiPaket ?? paketJeep.deskripsiPaket,
      hargaAwal: hargaAwal ?? paketJeep.hargaAwal,
      diskon: diskon ?? paketJeep.diskon,
      durasi: durasi ?? paketJeep.durasi,
      spotWisata: formattedSpotWisata,
      isPopular: isPopular !== undefined ? isPopular : paketJeep.isPopular,
      altImage: altImage ?? paketJeep.altImage,
      image: req.file ? `/uploads/${req.file.filename}` : paketJeep.image,
    };

    await paketJeep.update(updatedData);

    if (req.file && oldImagePath && fs.existsSync(`.${oldImagePath}`)) {
      fs.unlink(`.${oldImagePath}`, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    res.status(200).json({ message: 'Paket Jeep updated successfully', data: paketJeep });
  } catch (error) {
    console.error('Error updating Paket Jeep:', error);
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
};

// Menghapus paket jeep
export const deletePaketJeep = async (req, res) => {
  try {
    const { id } = req.params;
    const paketJeep = await PaketJeep.findByPk(id);
    if (!paketJeep) return res.status(404).json({ message: 'Paket Jeep tidak ditemukan' });

    if (paketJeep.image && fs.existsSync(`.${paketJeep.image}`)) {
      fs.unlink(`.${paketJeep.image}`, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await paketJeep.destroy();
    res.status(200).json({ message: 'Paket Jeep berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting Paket Jeep:', error);
    res.status(500).json({ message: error.message });
  }
};
