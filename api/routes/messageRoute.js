import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {
  createMessage,
  getMessages,
} from '../controllers/messageController.js';

const router = express.Router();

//creating first endpoint
router.post('/', verifyToken, createMessage);
router.get('/:id', verifyToken, getMessages);

export default router;
