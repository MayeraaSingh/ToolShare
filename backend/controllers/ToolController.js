import ToolModel from '../models/Tool.js';

class ToolController {
    // Add a new tool
    async addTool(req, res, next) {
        try {
            const { name, description, owner, availability, max, price, image } = req.body;
    
            if (!name || !description || !owner) {
                return res.status(400).json({ message: 'Name, description, and owner are required.' });
            }
    
            const tool = await ToolModel.createTool({
                name,
                description,
                owner,
                availability: availability !== undefined ? availability : true, // default to true if not provided
                max: max || 1, // default to 1 if not provided
                price: price || 0.00, // default to 0.00 if not provided
                image: image || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg", // default image if not provided
            });
    
            res.status(201).json({ message: 'Tool added successfully', tool });
        } catch (error) {
            res.status(400).json({ message: 'Error adding tool', error: error.message });
        }
    }
    
    // Get tool by ID
    async getToolById(req, res) {
        try {
            const { toolId } = req.params;
            const tool = await ToolModel.findById(toolId);
            if (!tool) {
                return res.status(404).json({ message: 'Tool not found' });
            }
            res.status(200).json(tool);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tool', error: error.message });
        }
    }

    // Update tool details
    async updateTool(req, res) {
        try {
            const { toolId } = req.params;
            const updatedData = req.body;
            const updatedTool = await ToolModel.updateTool(toolId, updatedData);
            if (!updatedTool) {
                return res.status(404).json({ message: 'Tool not found' });
            }
            res.status(200).json({ message: 'Tool updated successfully', updatedTool });
        } catch (error) {
            res.status(400).json({ message: 'Error updating tool', error: error.message });
        }
    }
}

export default new ToolController();
