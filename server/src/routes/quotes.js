// routes/quotesRoutes.js
import express from 'express';
import { upload, compressAndConvertToWebp } from '../middleware/upload.js';
import { getQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } from '../controllers/QuotesController.js';

const router = express.Router();

router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.post('/', upload.single('image'), compressAndConvertToWebp, createQuote);
router.put('/:id', upload.single('image'), compressAndConvertToWebp, updateQuote);
router.delete('/:id', deleteQuote);

export default router;
