// routes/galleryRoutes.js
import express from 'express';
import { upload, compressAndConvertToWebp } from '../middleware/upload.js';
import { createGalleryImage, getGalleryImages, getGalleryImageById, updateGalleryImage, deleteGalleryImage, getCategories } from '../controllers/GalleryImagesController.js';

const router = express.Router();

router.post('/', upload.single('image'), compressAndConvertToWebp, createGalleryImage);
router.get('/', getGalleryImages);
router.get('/categories', getCategories);
router.get('/:id', getGalleryImageById);
router.put('/:id', upload.single('image'), updateGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router;
