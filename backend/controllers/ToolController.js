import ToolModel from '../models/Tool.js';

class ToolController {
    // Add a new tool
    async addTool(req, res) {
        try {
            const { name, category, owner } = req.body;
            const tool = await ToolModel.createTool({ name, category, owner });
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
