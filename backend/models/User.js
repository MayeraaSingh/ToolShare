import mongoose from "mongoose";
import bcrypt from "bcryptjs";

class UserModel {
    constructor() {
        const userSchema = new mongoose.Schema(
            {
                name: { type: String },
                email: { type: String, unique: true },
                password: { type: String }, // hashed
                phone: { type: String, default: '' },
                flatNumber: { type: String },
                toolsBorrowed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
                toolsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
                toolsReviewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
                profilePicture:{ type: String,
                    default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg", 
                },
            },
            { timestamps: true }
        );

        this.model = mongoose.model('User', userSchema);
    }

    // Hash a password
    async hashPassword(plainText) {
        return await bcrypt.hash(plainText, 10);
    }

    // Compare a plain password against a hash
    async comparePassword(plainText, hash) {
        return await bcrypt.compare(plainText, hash);
    }

    // Create a new user
    async createUser(userData) {
        const user = new this.model(userData);
        return await user.save();
    }

    async findByName(name) {
        return await this.model.findOne({ name })
            .populate('toolsBorrowed')
            .populate('toolsOwned')
            .populate('toolsReviewed');
    }    

    // Find user by email
    async findByEmail(email) {
        return await this.model.findOne({ email })
            .populate('toolsBorrowed')
            .populate('toolsOwned')
            .populate('toolsReviewed');
    }

    // Update user details
    async updateUser(userId, updatedData) {
        return await this.model.findByIdAndUpdate(userId, updatedData, { new: true });
    }

    // Find user by flat number (optional utility method)
    async findByFlatNumber(flatNumber) {
        return await this.model.findOne({ flatNumber }).populate('toolsBorrowed')
            .populate('toolsOwned')
            .populate('toolsReviewed');
    }

    // Get all users
    async getAllUsers() {
        return await this.model.find()
            .populate('toolsBorrowed')
            .populate('toolsOwned')
            .populate('toolsReviewed');
    }

    // Find user by ID
    async findById(userId) {
        return await this.model.findById(userId)
            .populate('toolsBorrowed')
            .populate('toolsOwned')
            .populate('toolsReviewed');
    }

    // Delete user
    async deleteUser(userId) {
        return await this.model.findByIdAndDelete(userId);
    }
}

export default new UserModel();
