import { errorHandler } from '../middleware/error.js';
import UserModel from '../models/User.js';

class UserController {
    // Register a new user with only the email
    async register(req, res,next) {
        try {
            const { email } = req.body;

            // Check if the email already exists
            let user = await UserModel.findByEmail(email);
            if (user) {
                res.status(200).json({ message: 'User registered successfully', user });
            }

            // Create a new user with just the email
            user = await UserModel.createUser({ email });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            next(errorHandler(400,error));
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
