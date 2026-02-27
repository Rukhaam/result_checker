import express from 'express';
import { searchResult } from '../controllers/resultController.js';

const router = express.Router();
router.post('/search', searchResult);

export default router;