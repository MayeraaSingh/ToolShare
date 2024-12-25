import { errorHandler } from '../middleware/error.js';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';

class UserController {
    // Register a new user with only the email
    async register(req, res, next) {
        try {
            const { email } = req.body;

            // Validate email input
            if (!email) {
                return next(errorHandler(400, "Email is required"));
            }

            // Check if the email already exists
            const user = await UserModel.findByEmail(email);

            if (user) {
                // If user exists, treat as login
                // Generate JWT token
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_SECRET, // Use a secret key from environment variables
                    { expiresIn: '7d' } // Token expiry (e.g., 7 days)
                );

                res
                    .status(200)
                    .cookie('access-token',token,{
                        httpOnly:true,
                    })
                    .json({
                    message: 'User logged in successfully',
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                    },
                });
            }

            // Create a new user if not found
            const newuser = await UserModel.createUser({
                email,
                profilePicture: "", // Empty initially, can be updated later
                flatNumber: "", // Flat number can be updated later
                toolsBorrowed: [], // Empty array for tools initially
                toolsOwned: [],
            });

            // Generate JWT token for new user
            const token = jwt.sign(
                { id: newuser._id, email: newuser.email },
                process.env.JWT_SECRET, // Use a secret key from environment variables
                { expiresIn: '7d' } // Token expiry 
            );

            res
                .status(201)
                .cookie('access-token',token,{
                    httpOnly:true,
                })
                .json({
                    message: 'User registered successfully',
                    user: {
                        id: newuser._id,
                        name: newuser.name,
                        email: newuser.email,
                        profilePicture: newuser.profilePicture,
                    },
                });
        } catch (error) {
            // Handle unexpected errors
            return next(errorHandler(500, error.message || 'An unexpected error occurred'));
        }
    }


    async registerGoogle(req, res, next) {
        try {
            const { name, email, googlePhotoUrl } = req.body;

            // Validate input
            if (!name || !email || !googlePhotoUrl) {
                return next(errorHandler(400, 'All fields (name, email, photo) are required'));
            }

            // Check if user exists
            const user = await UserModel.findByEmail(email);

            if (!user) {
                // Create a new user if not found
                user = await UserModel.createUser({
                    name,
                    email,
                    profilePicture: googlePhotoUrl 
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET, // Use a secret key from environment variables
                { expiresIn: '7d' } // Token expiry (e.g., 7 days)
            );

            // Send response
            res
                .status(200)
                .cookie('access-token',token,{
                    httpOnly: true,
                })
                .json({
                    message: 'User authenticated successfully',
                    user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    flatNumber: user.flatNumber,
                    toolsBorrowed,
                    toolsOwned
                    },
                });
        } catch (error) {
            next(errorHandler(500, error.message || 'An unexpected error occurred'));
        }
    }

    // Get user by email
    async getUserByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const user = await UserModel.findByEmail(email);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    // Update user details (e.g., name, flatNumber)
    async updateUser(req, res) {
        try {
            const { userId } = req.params;
            const updatedData = req.body;

            const updatedUser = await UserModel.updateUser(userId, updatedData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User updated successfully', updatedUser });
        } catch (error) {
            res.status(400).json({ message: 'Error updating user', error: error.message });
        }
    }
}

export default new UserController();
