// routes/kontakRoutes.js
import express from 'express';
import { getAllKontak, getKontakById, createKontak, updateKontak, deleteKontak } from '../controllers/KontakController.js';

const router = express.Router();

router.get('/', getAllKontak);
router.get('/:id', getKontakById); 
router.post('/', createKontak);
router.put('/:id', updateKontak);
router.delete('/:id', deleteKontak);

export default router;
