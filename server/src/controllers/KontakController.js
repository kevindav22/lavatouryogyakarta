// controllers/kontakController.js
import { Kontak } from '../models/index.js'; // Menggunakan import dengan ekstensi .js

// Get All Kontak
export const getAllKontak = async (req, res) => {
  try {
    const kontak = await Kontak.findAll();
    res.status(200).json(kontak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Kontak by ID
export const getKontakById = async (req, res) => {
  try {
    const { id } = req.params;
    const kontak = await Kontak.findOne({ where: { id } });
    if (kontak) {
      res.status(200).json(kontak);
    } else {
      res.status(404).json({ message: 'Kontak not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Kontak
export const createKontak = async (req, res) => {
  try {
    const newKontak = await Kontak.create(req.body);
    res.status(201).json(newKontak);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Kontak
export const updateKontak = async (req, res) => {
  try {
    const { id } = req.params;
    const kontak = await Kontak.findOne({ where: { id } });
    if (!kontak) {
      return res.status(404).json({ message: 'Kontak not found' });
    }

    Object.assign(kontak, req.body); // Mengupdate kontak dengan data dari request
    await kontak.save(); // Memicu hooks beforeUpdate
    res.status(200).json(kontak);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Kontak
export const deleteKontak = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Kontak.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Kontak deleted' });
    } else {
      res.status(404).json({ message: 'Kontak not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
