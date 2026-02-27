import express from 'express';
import { getAllExams } from '../controllers/examController.js';

const router = express.Router();

// Route: GET /api/exams
router.get('/', getAllExams);

export default router;