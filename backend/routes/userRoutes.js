import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { verifyToken } from '../middleware/auth.js';
// import admin from "firebase-admin";
import UserModel from '../models/User.js';

// Route to logout (clears cookies)
router.post('/logout', UserController.logout);

// Route to get all users (public for now, should be admin only)
router.get('/', UserController.getAllUsers);

// Route to register a new user (public)
router.post('/register', UserController.register);
// Route to login an existing user (public)
router.post('/login', UserController.login);
// Temporarily disabled Google auth route for local normal-login testing.
// router.post("/google", async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);
//
//     const { idToken } = req.body;
//
//     if (!idToken) {
//       return res.status(400).json({ message: "No token provided" });
//     }
//
//     const decoded = await admin.auth().verifyIdToken(idToken);
//
//     console.log("Decoded user:", decoded);
//
//     // Example user creation / lookup
//     const email = decoded.email;
//     const name = decoded.name;
//
//     let user = await UserModel.findByEmail(email);
//
//     if (!user) {
//       user = await UserModel.createUser({
//         email,
//         name,
//       });
//     }
//
//     res.status(200).json({
//       message: "Login successful",
//       user,
//     });
//
//   } catch (error) {
//     console.error("🔥 GOOGLE AUTH ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// Route to get user by email (public)
router.get('/:email', UserController.getUserByEmail);

// Route to update user details (protected)
router.put('/:userId', verifyToken, UserController.updateUser);

// Route to delete user (protected)
router.delete('/:userId', verifyToken, UserController.deleteUser);

export default router;
