import { errorHandler } from '../middleware/error.js';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';

// HttpOnly for the auth token (not readable by JS - security)
const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// NOT httpOnly for user-data so JS can read it for state hydration on page refresh
const dataCookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

class UserController {
    // LOGIN - email + password
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return next(errorHandler(400, 'Email and password are required'));

            const user = await UserModel.findByEmail(email);
            if (!user) return next(errorHandler(404, 'No account found with that email. Please register first.'));

            if (!user.password) return next(errorHandler(400, 'This account uses Google sign-in. Please continue with Google.'));

            const valid = await UserModel.comparePassword(password, user.password);
            if (!valid) return next(errorHandler(401, 'Incorrect password'));

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return res
                .status(200)
                .cookie('access-token', token, authCookieOptions)
                .cookie('user-data', JSON.stringify({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    flatNumber: user.flatNumber,
                    phone: user.phone,
                }), dataCookieOptions)
                .json({
                    message: 'Logged in successfully',
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        flatNumber: user.flatNumber,
                        phone: user.phone,
                        toolsBorrowed: user.toolsBorrowed,
                        toolsOwned: user.toolsOwned,
                        toolsReviewed: user.toolsReviewed,
                    },
                });
        } catch (error) {
            return next(errorHandler(500, error.message || 'An unexpected error occurred'));
        }
    }

    // REGISTER - name + email + password
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) return next(errorHandler(400, 'Name, email and password are required'));

            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) return next(errorHandler(409, 'An account with this email already exists. Please log in.'));

            const hashedPassword = await UserModel.hashPassword(password);

            const newUser = await UserModel.createUser({
                name,
                email,
                password: hashedPassword,
                profilePicture: '',
                phone: '',
                flatNumber: '',
                toolsBorrowed: [],
                toolsOwned: [],
                toolsReviewed: [],
            });

            const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res
                .status(201)
                .cookie('access-token', token, authCookieOptions)
                .cookie('user-data', JSON.stringify({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    flatNumber: newUser.flatNumber,
                    phone: newUser.phone,
                }), dataCookieOptions)
                .json({
                    message: 'Registered successfully',
                    user: {
                        _id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        profilePicture: newUser.profilePicture,
                        flatNumber: newUser.flatNumber,
                        phone: newUser.phone,
                        toolsBorrowed: newUser.toolsBorrowed,
                        toolsOwned: newUser.toolsOwned,
                        toolsReviewed: newUser.toolsReviewed,
                    },
                });
        } catch (error) {
            return next(errorHandler(500, error.message || 'An unexpected error occurred'));
        }
    }

    async registerGoogle(req, res, next) {
        try {
            const { name, email, googlePhotoUrl } = req.body;

            if (!name || !email || !googlePhotoUrl) {
                return next(errorHandler(400, 'All fields (name, email, photo) are required'));
            }

            let user = await UserModel.findByEmail(email);

            if (!user) {
                user = await UserModel.createUser({
                    name,
                    email,
                    profilePicture: googlePhotoUrl,
                    flatNumber: '',
                    toolsBorrowed: [],
                    toolsOwned: [],
                    toolsReviewed: [],
                });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res
                .status(200)
                .cookie('access-token', token, authCookieOptions)
                .cookie(
                    'user-data',
                    JSON.stringify({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        flatNumber: user.flatNumber,
                        phone: user.phone,
                    }),
                    dataCookieOptions
                )
                .json({
                    message: 'User authenticated successfully',
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        flatNumber: user.flatNumber,
                        phone: user.phone,
                        toolsBorrowed: user.toolsBorrowed,
                        toolsOwned: user.toolsOwned,
                        toolsReviewed: user.toolsReviewed,
                    },
                });
        } catch (error) {
            next(errorHandler(500, error.message || 'An unexpected error occurred'));
        }
    }

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

    async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { name, email, flatNumber, profilePicture, phone } = req.body;

            // Authorization: Check if user is updating their own profile
            if (userId !== req.userId) {
                return next(errorHandler(403, 'Not authorized to update this profile'));
            }

            const updatedUser = await UserModel.updateUser(userId, {
                name,
                email,
                flatNumber,
                profilePicture,
                phone,
            });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const token = jwt.sign(
                { id: updatedUser._id, email: updatedUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res
                .status(200)
                .cookie('access-token', token, authCookieOptions)
                .cookie(
                    'user-data',
                    JSON.stringify({
                        _id: updatedUser._id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        profilePicture: updatedUser.profilePicture,
                        flatNumber: updatedUser.flatNumber,
                        phone: updatedUser.phone,
                    }),
                    dataCookieOptions
                )
                .json({
                    message: 'User updated successfully',
                    user: updatedUser,
                });
        } catch (error) {
            next(errorHandler(500, error.message || 'Error updating user'));
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            return next(errorHandler(500, error.message || 'Error fetching users'));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            
            // Authorization: Check if user is deleting their own account
            if (userId !== req.userId) {
                return next(errorHandler(403, 'Not authorized to delete this account'));
            }
            
            const deletedUser = await UserModel.deleteUser(userId);
            if (!deletedUser) {
                return next(errorHandler(404, 'User not found'));
            }
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } catch (error) {
            return next(errorHandler(500, error.message || 'Error deleting user'));
        }
    }

    async logout(req, res) {
        res.clearCookie('access-token').clearCookie('user-data').status(200).json({ message: 'Logged out successfully' });
    }
}

export default new UserController();

