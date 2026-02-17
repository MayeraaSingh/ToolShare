import express from 'express';
const router = express.Router();
import ToolController from '../controllers/ToolController.js';
import ToolModel from '../models/Tool.js';

// Route to get all tools
router.get('/', ToolController.getAllTools);

// Route to search tools
router.get('/search', ToolController.searchTools);

// Route to get borrowed tools by user
router.get('/borrowed/:userId', ToolController.getBorrowedToolsByUser);

// Route to get owned tools by user
router.get('/owned/:userId', ToolController.getToolsByOwner);

// Fetch all tools (legacy endpoint)
router.get('/gettools', async (req, res) => {
    try {
      const tools = await ToolModel.model.find(); // This fetches all tools from MongoDB
      res.json(tools);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

// Route to add a new tool
router.post('/add', ToolController.addTool);

// Route to get tool by ID
router.get('/:toolId', ToolController.getToolById);

// Route to update tool details
router.put('/:toolId', ToolController.updateTool);

// Route to delete tool
router.delete('/:toolId', ToolController.deleteTool);
  

export default router;