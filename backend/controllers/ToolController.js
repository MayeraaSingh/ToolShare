import ToolModel from '../models/Tool.js';

class ToolController {
    // Add a new tool
    async addTool(req, res, next) {
        try {
            const { name, description, owner, availability, max, price, image } = req.body;
    
            if (!name || !description || !owner) {
                return res.status(400).json({ message: 'Name, description, and owner are required.' });
            }

            const imagePath = image || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";
    
            const tool = await ToolModel.createTool({
                name,
                description,
                owner,
                availability: availability !== undefined ? availability : true,
                max: max || 1,
                price: price || 0.00,
                image: imagePath,
            });

            // Keep user.toolsOwned in sync
            const UserModel = (await import('../models/User.js')).default;
            await UserModel.model.findByIdAndUpdate(owner, {
                $addToSet: { toolsOwned: tool._id }
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
            
            // Authorization: Check if user owns the tool
            const tool = await ToolModel.findById(toolId);
            if (!tool) {
                return res.status(404).json({ message: 'Tool not found' });
            }
            
            if (tool.owner.toString() !== req.userId) {
                return res.status(403).json({ message: 'Not authorized to update this tool' });
            }
            
            const updatedTool = await ToolModel.updateTool(toolId, updatedData);
            res.status(200).json({ message: 'Tool updated successfully', updatedTool });
        } catch (error) {
            res.status(400).json({ message: 'Error updating tool', error: error.message });
        }
    }

    // Get all tools
    async getAllTools(req, res) {
        try {
            const tools = await ToolModel.getAllTools(req.userId);
            res.status(200).json(tools);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tools', error: error.message });
        }
    }

    // Search tools
    async searchTools(req, res) {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ message: 'Search query is required' });
            }
            const tools = await ToolModel.searchTools(q, req.userId);
            res.status(200).json(tools);
        } catch (error) {
            res.status(500).json({ message: 'Error searching tools', error: error.message });
        }
    }

    // Get tools by owner
    async getToolsByOwner(req, res) {
        try {
            const { userId } = req.params;
            const tools = await ToolModel.getToolsByOwner(userId);
            res.status(200).json(tools);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching owned tools', error: error.message });
        }
    }

    // Get borrowed tools by user
    async getBorrowedToolsByUser(req, res) {
        try {
            const { userId } = req.params;
            const UserModel = (await import('../models/User.js')).default;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user.toolsBorrowed);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching borrowed tools', error: error.message });
        }
    }

    // Rent a tool (mark as unavailable, add to user's borrowedTools)
    async rentTool(req, res) {
        try {
            const { toolId } = req.params;
            const userId = req.userId;

            const tool = await ToolModel.findById(toolId);
            if (!tool) {
                return res.status(404).json({ message: 'Tool not found' });
            }
            if (!tool.availability) {
                return res.status(400).json({ message: 'Tool is not available for rent' });
            }
            if (tool.owner._id.toString() === userId) {
                return res.status(400).json({ message: 'You cannot rent your own tool' });
            }

            const UserModel = (await import('../models/User.js')).default;

            const newRentedCount = (tool.rentedCount || 0) + 1;
            const nowFull = newRentedCount >= tool.max;

            await ToolModel.updateTool(toolId, {
                rentedCount: newRentedCount,
                availability: !nowFull,
            });
            await ToolModel.model.findByIdAndUpdate(toolId, { $addToSet: { rentedBy: userId } });

            // Add to user's borrowed list
            await UserModel.model.findByIdAndUpdate(userId, {
                $addToSet: { toolsBorrowed: toolId }
            });

            res.status(200).json({ message: 'Tool rented successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error renting tool', error: error.message });
        }
    }

    // Return a borrowed tool
    async returnTool(req, res) {
        try {
            const { toolId } = req.params;
            const userId = req.userId;

            const tool = await ToolModel.findById(toolId);
            if (!tool) return res.status(404).json({ message: 'Tool not found' });

            const UserModel = (await import('../models/User.js')).default;

            const newRentedCount = Math.max(0, (tool.rentedCount || 0) - 1);

            await ToolModel.updateTool(toolId, {
                rentedCount: newRentedCount,
                availability: true,
            });
            await ToolModel.model.findByIdAndUpdate(toolId, { $pull: { rentedBy: userId } });

            // Remove from user's borrowed list
            await UserModel.model.findByIdAndUpdate(userId, {
                $pull: { toolsBorrowed: toolId }
            });

            res.status(200).json({ message: 'Tool returned successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error returning tool', error: error.message });
        }
    }

    // Save a tool to user's reviewed list
    async saveTool(req, res) {
        try {
            const { toolId } = req.params;
            const userId = req.userId;

            const tool = await ToolModel.findById(toolId);
            if (!tool) return res.status(404).json({ message: 'Tool not found' });

            const UserModel = (await import('../models/User.js')).default;
            await UserModel.model.findByIdAndUpdate(userId, {
                $addToSet: { toolsReviewed: toolId }
            });

            res.status(200).json({ message: 'Tool saved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving tool', error: error.message });
        }
    }

    // Remove a tool from user's reviewed list
    async unsaveTool(req, res) {
        try {
            const { toolId } = req.params;
            const userId = req.userId;

            const UserModel = (await import('../models/User.js')).default;
            await UserModel.model.findByIdAndUpdate(userId, {
                $pull: { toolsReviewed: toolId }
            });

            res.status(200).json({ message: 'Tool removed from saved' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing saved tool', error: error.message });
        }
    }

    // Delete tool
    async deleteTool(req, res) {
        try {
            const { toolId } = req.params;
            
            // Authorization: Check if user owns the tool
            const tool = await ToolModel.findById(toolId);
            if (!tool) {
                return res.status(404).json({ message: 'Tool not found' });
            }
            
            if (tool.owner.toString() !== req.userId) {
                return res.status(403).json({ message: 'Not authorized to delete this tool' });
            }
            
            const deletedTool = await ToolModel.deleteTool(toolId);
            res.status(200).json({ message: 'Tool deleted successfully', deletedTool });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting tool', error: error.message });
        }
    }
}

export default new ToolController();
