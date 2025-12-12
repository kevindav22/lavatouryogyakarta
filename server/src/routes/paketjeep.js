import express from 'express';
import { upload, compressAndConvertToWebp } from '../middleware/upload.js';
import { getAllPaketJeep, getPaketJeepById, createPaketJeep, updatePaketJeep, deletePaketJeep } from '../controllers/PaketJeepController.js';


const router = express.Router();

router.get('/', getAllPaketJeep);
router.get('/:id', getPaketJeepById);
router.post('/', upload.single('image'), compressAndConvertToWebp, createPaketJeep);
router.put('/:id', upload.single('image'), compressAndConvertToWebp, updatePaketJeep);
router.delete('/:id', deletePaketJeep);

export default router;
