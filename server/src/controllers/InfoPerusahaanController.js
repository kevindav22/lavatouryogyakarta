import fs from 'fs';
import InfoPerusahaan from '../models/InfoPerusahaan.js';
import CarouselImage from '../models/CarouselImage.js';

export const getInfoPerusahaan = async (req, res) => {
  try {
    const data = await InfoPerusahaan.findAll({
      include: [
        {
          model: CarouselImage,
          as: 'carouselImages',
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

// Get InfoPerusahaan by ID
export const getInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await InfoPerusahaan.findByPk(id, {
      include: [
        {
          model: CarouselImage,
          as: 'carouselImages',
        },
      ],
    });

    if (!info) return res.status(404).json({ message: 'Info not found' });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

// Membuat InfoPerusahaan baru tanpa gambar carousel
export const createInfoPerusahaan = async (req, res) => {
  try {
    const { nama, identitas, tagline, deskripsi, tentang, altImage } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newInfo = await InfoPerusahaan.create({
      nama,
      identitas,
      tagline,
      deskripsi,
      tentang,
      image: imagePath,
      altImage,
    });

    res.status(201).json(newInfo);
  } catch (error) {
    console.error('Error creating InfoPerusahaan:', error);
    res.status(500).json({ message: 'Error creating data', error: error.message });
  }
};

// Update InfoPerusahaan
export const updateInfoPerusahaan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, identitas, tagline, deskripsi, tentang, altImage } = req.body;

    const info = await InfoPerusahaan.findByPk(id);
    if (!info) return res.status(404).json({ message: 'InfoPerusahaan not found' });

    const oldImagePath = info.image;

    // Update data
    const updatedData = {
      nama: nama ?? info.nama,
      identitas: identitas ?? info.identitas,
      tagline: tagline ?? info.tagline,
      deskripsi: deskripsi ?? info.deskripsi,
      tentang: tentang ?? info.tentang,
      altImage: altImage ?? info.altImage,
      image: req.file ? `/uploads/${req.file.filename}` : info.image,
    };

    await info.update(updatedData);

    // Hapus gambar lama jika ada gambar baru
    if (req.file && oldImagePath && fs.existsSync(`.${oldImagePath}`)) {
      fs.unlink(`.${oldImagePath}`, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    res.status(200).json({ message: 'Data updated successfully', data: info });
  } catch (error) {
    console.error('Error updating InfoPerusahaan:', error);
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
};

// Menghapus InfoPerusahaan beserta gambar terkait
export const deleteInfoPerusahaan = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await InfoPerusahaan.findByPk(id, {
      include: [
        {
          model: CarouselImage,
          as: 'carouselImages',
        },
      ],
    });

    if (!info) return res.status(404).json({ message: 'InfoPerusahaan not found' });

    // Hapus gambar perusahaan
    if (info.image && fs.existsSync(`.${info.image}`)) {
      try {
        fs.unlinkSync(`.${info.image}`);
      } catch (error) {
        console.error('Error deleting InfoPerusahaan image:', error);
      }
    }

    // Hapus gambar carousel terkait
    if (info.carouselImages && info.carouselImages.length > 0) {
      for (const carouselImage of info.carouselImages) {
        if (carouselImage.image && fs.existsSync(`.${carouselImage.image}`)) {
          try {
            fs.unlinkSync(`.${carouselImage.image}`);
          } catch (error) {
            console.error('Error deleting CarouselImage file:', error);
          }
        }
        await carouselImage.destroy();
      }
    }

    // Hapus data InfoPerusahaan
    await info.destroy();

    res.status(200).json({ message: 'InfoPerusahaan deleted successfully' });
  } catch (error) {
    console.error('Error deleting InfoPerusahaan:', error);
    res.status(500).json({ message: 'Error deleting InfoPerusahaan', error: error.message });
  }
};

// Membuat gambar carousel baru, dan menghubungkannya ke InfoPerusahaan yang pertama
export const createCarouselImage = async (req, res) => {
  try {
    const infoPerusahaan = await InfoPerusahaan.findOne();
    if (!infoPerusahaan) return res.status(404).json({ message: 'InfoPerusahaan not found' });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newImage = await CarouselImage.create({
      image: imagePath,
      altImage: req.body.altImage,
      infoPerusahaanId: infoPerusahaan.id,
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error creating CarouselImage:', error);
    res.status(500).json({ message: 'Error creating carousel image', error: error.message });
  }
};

// Mengupdate gambar carousel berdasarkan ID
export const updateCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;
    const carouselImage = await CarouselImage.findByPk(id);

    if (!carouselImage) return res.status(404).json({ message: 'Carousel image not found' });

    if (req.file) {
      if (carouselImage.image && fs.existsSync(`.${carouselImage.image}`)) {
        fs.unlinkSync(`.${carouselImage.image}`);
      }
      carouselImage.image = `/uploads/${req.file.filename}`;
    }

    await carouselImage.update({
      image: carouselImage.image,
      altImage: req.body.altImage,
    });

    res.status(200).json(carouselImage);
  } catch (error) {
    console.error('Error updating CarouselImage:', error);
    res.status(500).json({ message: 'Error updating carousel image', error: error.message });
  }
};

// Mengambil semua gambar carousel
export const getAllCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.findAll();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching CarouselImages:', error);
    res.status(500).json({ message: 'Error fetching carousel images', error: error.message });
  }
};

// Menghapus gambar carousel berdasarkan ID
export const deleteCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;
    const carouselImage = await CarouselImage.findByPk(id);

    if (!carouselImage) return res.status(404).json({ message: 'Carousel image not found' });

    if (carouselImage.image && fs.existsSync(`.${carouselImage.image}`)) {
      fs.unlinkSync(`.${carouselImage.image}`);
    }

    await carouselImage.destroy();
    res.status(200).json({ message: 'Carousel image deleted successfully' });
  } catch (error) {
    console.error('Error deleting CarouselImage:', error);
    res.status(500).json({ message: 'Error deleting carousel image', error: error.message });
  }
};
