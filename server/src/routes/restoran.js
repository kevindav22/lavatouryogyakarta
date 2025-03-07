// routes/restoranRoutes.js
import express from 'express';
import { upload, compressAndConvertToWebp } from '../middleware/upload.js';
import {  getRestoranById, createRestoran, deleteRestoran, getAllRestorans, updateRestoran } from '../controllers/RestoranController.js';
import { addVarianPaket, updateVarianPaket, deleteVarianPaket } from '../controllers/VarianPaketController.js';
const router = express.Router();

router.get('/', getAllRestorans);
router.get('/:id', getRestoranById);
router.post('/', upload.single('image'),compressAndConvertToWebp, createRestoran);
router.put('/:id', upload.single('image'),compressAndConvertToWebp, updateRestoran);
router.delete('/:id', deleteRestoran);

router.post('/:RestoranId/varianpaket', addVarianPaket);
router.put('/varianpaket/:id', upload.single('image'), compressAndConvertToWebp, updateVarianPaket);
router.delete('/varianpaket/:id', deleteVarianPaket);

export default router;
