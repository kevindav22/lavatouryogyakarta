import GalleryImage from '../models/GalleryImages.js'; 
import fs from 'fs';

export const getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGalleryImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await GalleryImage.findByPk(id);

    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createGalleryImage = async (req, res) => {
  try {
    const { altImage, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newImage = await GalleryImage.create({ image, altImage, category });
    res.status(201).json({ message: 'Image created', data: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { altImage, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const existingImage = await GalleryImage.findByPk(id);
    if (!existingImage) return res.status(404).json({ error: 'Image not found' });
    if (image && existingImage.image) {
      const oldImagePath = existingImage.image;
      try {
        fs.unlinkSync(oldImagePath);
      } catch (err) {
        console.error('Error deleting old image:', err.message);
      }
    }
    await existingImage.update({
      image: image || existingImage.image,
      altImage,
      category,
    });

    res.status(200).json({ message: 'Image updated', data: existingImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const existingImage = await GalleryImage.findByPk(id);
    if (!existingImage) return res.status(404).json({ error: 'Image not found' });
    if (existingImage.image && fs.existsSync(`.${existingImage.image}`)) {
      try {
        fs.unlinkSync(`.${existingImage.image}`);
      } catch (error) {
        console.error('Error deleting image file:', error.message);
        return res.status(500).json({ error: 'Failed to delete image file' });
      }
    }
    await existingImage.destroy();
    res.status(200).json({ message: 'Image and file deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await GalleryImage.findAll({
      attributes: ['category'],
      group: ['category'],
    });
    if (!categories.length) {
      return res.status(404).json({ message: 'No categories found' });
    }
    const categoryList = categories.map((c) => c.category);
    res.status(200).json(categoryList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
