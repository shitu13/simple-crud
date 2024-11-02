import express from 'express';
import { createUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
