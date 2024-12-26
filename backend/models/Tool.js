import mongoose from "mongoose";

class ToolModel {
    constructor() {
        const toolSchema = new mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who owns the tool
            availability: { type: Boolean, default: true }, // True = Available, False = Borrowed
            max: { type: Number, default: 1 },
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
        return await this.model.findById(toolId).populate('owner');
    }

    // Update tool details
    async updateTool(toolId, updatedData) {
        return await this.model.findByIdAndUpdate(toolId, updatedData, { new: true });
    }
}

export default new ToolModel();
