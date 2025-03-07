import express from 'express';
import {
  getAllJudulContents,
  createJudulContent,
  getJudulContentById,
  updateJudulContent,
  deleteJudulContent,
} from '../controllers/JudulContentController.js';

const router = express.Router();

router.get('/', getAllJudulContents);
router.post('/', createJudulContent);
router.get('/:id', getJudulContentById);
router.put('/:id', updateJudulContent);
router.delete('/:id', deleteJudulContent);

export default router;
