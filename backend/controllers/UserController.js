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
    
                return res
                    .status(200)
                    .cookie('access-token', token, {
                        httpOnly: false
                    })
                    .cookie('user-data', JSON.stringify({
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture
                    }), {
                        httpOnly: false,
                    })
                    .json({
                        message: 'User logged in successfully',
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            profilePicture: user.profilePicture,
                            flatNumber: user.flatNumber,
                            toolsBorrowed: user.toolsBorrowed,
                            toolsOwned: user.toolsOwned,
                            toolsReviewed: user.toolsReviewed,
                        },
                    });
            }
    
            // Create a new user if not found
            const newUser = await UserModel.createUser({
                email,
                profilePicture: "", // Empty initially, can be updated later
                flatNumber: "", // Flat number can be updated later
                toolsBorrowed: [], // Empty array for tools initially
                toolsOwned: [],
                toolsReviewed: [],
            });
    
            // Generate JWT token for new user
            const token = jwt.sign(
                { id: newUser._id, email: newUser.email },
                process.env.JWT_SECRET, // Use a secret key from environment variables
                { expiresIn: '7d' } // Token expiry
            );
    
            res
                .status(201)
                .cookie('access-token', token, {
                    httpOnly: false,
                })
                .cookie('user-data', JSON.stringify({
                    name: newUser.name,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture
                }), {
                    httpOnly: false,
                })
                .json({
                    message: 'User registered successfully',
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        profilePicture: newUser.profilePicture,
                        flatNumber: newUser.flatNumber,
                        toolsBorrowed: newUser.toolsBorrowed,
                        toolsOwned: newUser.toolsOwned,
                        toolsReviewed: newUser.toolsReviewed,
                    },
                });
        } catch (error) {
            // Handle unexpected errors
            return next(errorHandler(500, error.message || 'An unexpected error occurred'));
        }
    }
    

    // Register user with Google
    async registerGoogle(req, res, next) {
        try {
            const { name, email, googlePhotoUrl } = req.body;
    
            // Validate input
            if (!name || !email || !googlePhotoUrl) {
                return next(errorHandler(400, 'All fields (name, email, photo) are required'));
            }
    
            // Check if user exists
            let user = await UserModel.findByEmail(email);
    
            if (!user) {
                // Create a new user if not found
                user = await UserModel.createUser({
                    name,
                    email,
                    profilePicture: googlePhotoUrl,
                    flatNumber: "", // Can be updated later
                    toolsBorrowed: [],
                    toolsOwned: [],
                    toolsReviewed: [],
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
                .cookie('access-token', token, {
                    httpOnly: false,
                })
                .cookie('user-data', JSON.stringify({
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture
                }), {
                    httpOnly: false,
                })
                .json({
                    message: 'User authenticated successfully',
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        flatNumber: user.flatNumber,
                        toolsBorrowed: user.toolsBorrowed,
                        toolsOwned: user.toolsOwned,
                        toolsReviewed: user.toolsReviewed,
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
    async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { name, email, flatNumber, profilePicture, toolsRegistered } = req.body;

            const updatedUser = await UserModel.updateUser(userId, {
                name,
                email,
                flatNumber,
                profilePicture,
                toolsRegistered
            });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate new JWT token with updated data
            const token = jwt.sign(
                { id: updatedUser._id, email: updatedUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res
                .status(200)
                .cookie('access-token', token, { httpOnly: false })
                .cookie('user-data', JSON.stringify({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    profilePicture: updatedUser.profilePicture
                }), { httpOnly: false })
                .json({
                    message: 'User updated successfully',
                    user: updatedUser
                });
        } catch (error) {
            next(errorHandler(500, error.message || 'Error updating user'));
        }
    }

    // Get all users
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            return next(errorHandler(500, error.message || 'Error fetching users'));
        }
    }

    // Delete user
    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            const deletedUser = await UserModel.deleteUser(userId);
            if (!deletedUser) {
                return next(errorHandler(404, 'User not found'));
            }
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } catch (error) {
            return next(errorHandler(500, error.message || 'Error deleting user'));
        }
    }

}

export default new UserController();
