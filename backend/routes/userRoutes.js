import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { verifyToken } from '../middleware/auth.js';
import admin from "firebase-admin";
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hasServiceAccountJson = !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const hasGoogleApplicationCredentials = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
const localServiceAccountPath = path.join(__dirname, '..', 'firebase-service-account.json');
const hasLocalServiceAccountFile = fs.existsSync(localServiceAccountPath);

if (!admin.apps.length) {
	if (hasServiceAccountJson) {
		try {
			const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
			});
			console.log("Firebase Admin initialized using FIREBASE_SERVICE_ACCOUNT_JSON");
		} catch (error) {
			console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", error.message);
		}
	} else if (hasGoogleApplicationCredentials) {
		try {
			admin.initializeApp({
				credential: admin.credential.applicationDefault(),
			});
			console.log("Firebase Admin initialized using GOOGLE_APPLICATION_CREDENTIALS");
		} catch (error) {
			console.error("Failed to initialize Firebase Admin with GOOGLE_APPLICATION_CREDENTIALS:", error.message);
		}
	} else if (hasLocalServiceAccountFile) {
		try {
			const serviceAccount = JSON.parse(fs.readFileSync(localServiceAccountPath, 'utf-8'));
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
			});
			console.log("Firebase Admin initialized using backend/firebase-service-account.json");
		} catch (error) {
			console.error("Failed to initialize Firebase Admin from local service account file:", error.message);
		}
	} else {
		console.warn("Firebase Admin not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.");
	}
}

// Route to logout (clears cookies)
router.post('/logout', UserController.logout);

// Route to get all users (public for now, should be admin only)
router.get('/', UserController.getAllUsers);

// Route to register a new user (public)
router.post('/register', UserController.register);
// Route to login an existing user (public)
router.post('/login', UserController.login);
router.post("/google", async (req, res) => {
	try {
		console.log("Incoming body:", req.body);

		const { idToken } = req.body;

		if (!idToken) {
			return res.status(400).json({ message: "No token provided" });
		}

		if (!admin.apps.length) {
			return res.status(500).json({
				message: "Firebase Admin is not configured on backend. Set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.",
			});
		}

		const decoded = await admin.auth().verifyIdToken(idToken);

		console.log("Decoded user:", decoded);

		// Example user creation / lookup
		const email = decoded.email;
		const name = decoded.name;

		let user = await UserModel.findByEmail(email);

		if (!user) {
			user = await UserModel.createUser({
				email,
				name,
			});
		}

		const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

		res
			.status(200)
			.cookie('access-token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})
			.cookie('user-data', JSON.stringify({
				_id: user._id,
				name: user.name,
				email: user.email,
				profilePicture: user.profilePicture,
				flatNumber: user.flatNumber,
				phone: user.phone,
			}), {
				httpOnly: false,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})
			.json({
				message: "Login successful",
				user,
			});

	} catch (error) {
		console.error("🔥 GOOGLE AUTH ERROR:", error);
		res.status(500).json({ message: error.message });
	}
});

// Route to get user by email (public)
router.get('/:email', UserController.getUserByEmail);

// Route to update user details (protected)
router.put('/:userId', verifyToken, UserController.updateUser);

// Route to delete user (protected)
router.delete('/:userId', verifyToken, UserController.deleteUser);

export default router;
