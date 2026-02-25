import mongoose from "mongoose";

class ToolModel {
    constructor() {
        const toolSchema = new mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who owns the tool
            availability: { type: Boolean, default: true }, // True = Available, False = Borrowed
            max: { type: Number, default: 1 },
            rentedCount: { type: Number, default: 0 }, // How many are currently rented out
            rentedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Who currently has this tool
            price: { type: Number, default: 0.00 },
            image: { 
                type: String, 
                default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            },
        }, { timestamps: true });
        
        this.model = mongoose.model('Tool', toolSchema);
        
    }

    // Create a new tool
    async createTool(toolData) {
        const tool = new this.model(toolData);
        return await tool.save();
    }

    // Find tool by ID
    async findById(toolId) {
        return await this.model.findById(toolId).populate('owner').populate('rentedBy', 'name email flatNumber phone');
    }

    // Update tool details
    async updateTool(toolId, updatedData) {
        return await this.model.findByIdAndUpdate(toolId, updatedData, { new: true });
    }

    // Get all tools, optionally excluding a specific owner
    async getAllTools(excludeUserId) {
        const filter = excludeUserId ? { owner: { $ne: excludeUserId } } : {};
        return await this.model.find(filter).populate('owner');
    }

    // Search tools by name or description, optionally excluding a specific owner
    async searchTools(query, excludeUserId) {
        const filter = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        };
        if (excludeUserId) filter.owner = { $ne: excludeUserId };
        return await this.model.find(filter).populate('owner');
    }

    // Get tools by owner (user ID)
    async getToolsByOwner(userId) {
        return await this.model.find({ owner: userId }).populate('owner').populate('rentedBy', 'name email flatNumber phone');
    }

    // Delete tool
    async deleteTool(toolId) {
        return await this.model.findByIdAndDelete(toolId);
    }
}

export default new ToolModel();
