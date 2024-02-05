import express from 'express';
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from '../controllers/gigController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

//creating first endpoint
router.post('/', verifyToken, createGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id', verifyToken, getGig);
router.get('/', verifyToken, getGigs);

export default router;
