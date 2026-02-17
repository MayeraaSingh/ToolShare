import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { verifyToken } from '../middleware/auth.js';

// Route to get all users (public for now, should be admin only)
router.get('/', UserController.getAllUsers);

// Route to register a new user (public)
router.post('/register', UserController.register);
router.post('/google', UserController.registerGoogle);

// Route to get user by email (public)
router.get('/:email', UserController.getUserByEmail);

// Route to update user details (protected)
router.put('/:userId', verifyToken, UserController.updateUser);

// Route to delete user (protected)
router.delete('/:userId', verifyToken, UserController.deleteUser);

export default router;
