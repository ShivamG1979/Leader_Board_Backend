import express from 'express';
import { getUsers, addUser, claimPoints, getHistory } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.post('/claim', claimPoints); 
router.get('/history', getHistory);

export default router;
