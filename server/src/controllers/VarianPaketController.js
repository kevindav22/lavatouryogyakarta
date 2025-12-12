import VarianPaket from '../models/VarianPaket.js';
import Restoran from '../models/Restoran.js';

const formatArrayResponse = (field) => {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return field.split(',').map((item) => item.trim());
    }
  } else if (Array.isArray(field)) {
    return field;
  }
  return [];
};

export const addVarianPaket = async (req, res) => {
  try {
    const { RestoranId } = req.params;
    const { title, items } = req.body;

    // Validate input
    if (!title || !items) {
      return res.status(400).json({ message: 'Title dan items harus diisi' });
    }
    const parsedItems = formatArrayResponse(items);

    const restoran = await Restoran.findByPk(RestoranId);
    if (!restoran) {
      return res.status(404).json({ message: 'Restoran tidak ditemukan' });
    }

    const paket = await VarianPaket.create({
      title,
      items: JSON.stringify(parsedItems),
      restoranId: RestoranId,
    });

    res.status(201).json({
      ...paket.toJSON(),
      items: parsedItems,
    });
  } catch (error) {
    console.error('Error saat menambahkan varian paket:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateVarianPaket = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, items } = req.body; 

    if (!title || !items) {
      return res.status(400).json({ message: 'Title dan items harus diisi' });
    }

    const paket = await VarianPaket.findByPk(id);

    if (!paket) {
      return res.status(404).json({ message: 'Varian Paket tidak ditemukan' });
    }

    const parsedItems = formatArrayResponse(items);

    await paket.update({ title, items: JSON.stringify(parsedItems) });

    res.status(200).json({
      id: paket.id,
      title: paket.title,
      items: parsedItems,
      restoranId: paket.restoranId,
      updatedAt: paket.updatedAt,
      createdAt: paket.createdAt,
    });
  } catch (error) {
    console.error('Error saat memperbarui varian paket:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteVarianPaket = async (req, res) => {
  try {
    const { id } = req.params;

    const paket = await VarianPaket.findByPk(id);
    if (!paket) {
      return res.status(404).json({ message: 'Varian Paket tidak ditemukan' });
    }

    await paket.destroy();
    res.status(200).json({ message: 'Varian Paket berhasil dihapus' });
  } catch (error) {
    console.error('Error saat menghapus varian paket:', error);
    res.status(500).json({ error: error.message });
  }
};
