import express from 'express';
const router = express.Router();
import ToolController from '../controllers/ToolController.js';
import ToolModel from '../models/Tool.js';

// Route to add a new tool
router.post('/add', ToolController.addTool);

// Route to get tool by ID
router.get('/:toolId', ToolController.getToolById);

// Route to update tool details
router.put('/:toolId', ToolController.updateTool);

// Fetch all tools
router.get('/gettools', async (req, res) => {
    try {
      const tools = await ToolModel.model.find(); // This fetches all tools from MongoDB
      res.json(tools);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

export default router;