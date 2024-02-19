import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import { getOrders, createOrder } from '../controllers/orderController.js';

const router = express.Router();

//creating first endpoint
router.post('/:gigId', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);

export default router;
