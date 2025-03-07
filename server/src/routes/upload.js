import express from 'express';
import { upload, compressAndConvertToWebp } from '../middleware/upload.js';
import { uploadImage, deleteImage } from '../controllers/UploadController.js';

const router = express.Router();

router.post('/upload', upload.single('image'), compressAndConvertToWebp, uploadImage);
router.delete('/upload', deleteImage);

export default router;
