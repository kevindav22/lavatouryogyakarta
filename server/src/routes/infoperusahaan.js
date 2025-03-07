import express from 'express';
import { upload, compressAndConvertToWebp } from '../middleware/upload.js';
import {
  getInfoPerusahaan,
  getInfoById,
  createInfoPerusahaan,
  updateInfoPerusahaan,
  deleteInfoPerusahaan,
  createCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
  getAllCarouselImages,
} from '../controllers/InfoPerusahaanController.js'; 

const router = express.Router();


router.get('/', getInfoPerusahaan); 
router.get('/:id', getInfoById); 
router.post('/', upload.single('image'),compressAndConvertToWebp, createInfoPerusahaan); 
router.put('/:id', upload.single('image'),compressAndConvertToWebp, updateInfoPerusahaan); 
router.delete('/:id', deleteInfoPerusahaan); 


router.get('/carousel', getAllCarouselImages); 
router.post('/carousel', upload.single('image'),compressAndConvertToWebp, createCarouselImage); 
router.put('/carousel/:id', upload.single('image'),compressAndConvertToWebp, updateCarouselImage); 
router.delete('/carousel/:id', deleteCarouselImage);

export default router;
