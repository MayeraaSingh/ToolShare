import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';

// Route to register a new user
router.post('/register', UserController.register);
router.post('/google',UserController.registerGoogle);

// Route to get user by email
router.get('/:email', UserController.getUserByEmail);

// Route to update user details
router.put('/:userId', UserController.updateUser);

export default router;
