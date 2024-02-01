import express from 'express';
import { deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

//creating first endpoint
router.delete('/:id', verifyToken, deleteUser);

export default router;
