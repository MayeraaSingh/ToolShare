import UserModel from '../models/User.js';

class UserController {
    // Register a new user
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await UserModel.createUser({ name, email, password });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(400).json({ message: 'Error registering user', error: error.message });
        }
    }

    // Get user by email
    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    }

    // Update user details
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
