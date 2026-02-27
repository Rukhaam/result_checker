import express from 'express';
import { getUserByRollNumber } from '../controllers/userController.js';

const router = express.Router();

// Define the route
router.get('/:rollNumber', getUserByRollNumber);

export default router;