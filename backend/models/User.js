import mongoose from "mongoose";

class UserModel {
    constructor() {
        const userSchema = new mongoose.Schema(
            {
                name: { type: String },
                email: { type: String, required: true, unique: true },
                flatNumber: { type: String}, // New field for flat number
                tools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }], // Tools owned by the user
            },
            { timestamps: true }
        );

        this.model = mongoose.model('User', userSchema);
    }

    // Create a new user
    async createUser(userData) {
        const user = new this.model(userData);
        return await user.save();
    }

    // Find user by email
    async findByEmail(email) {
        return await this.model.findOne({ email }).populate('tools');
    }

    // Update user details
    async updateUser(userId, updatedData) {
        return await this.model.findByIdAndUpdate(userId, updatedData, { new: true });
    }

    // Find user by flat number (optional utility method)
    async findByFlatNumber(flatNumber) {
        return await this.model.findOne({ flatNumber }).populate('tools');
    }
}

export default new UserModel();
