import express from 'express';
const router = express.Router();
import ToolController from '../controllers/ToolController.js';
import ToolModel from '../models/Tool.js';
import { verifyToken, optionalAuth } from '../middleware/auth.js';
import multer from 'multer';

// Configure multer for image uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Route to get all tools (public)
router.get('/', ToolController.getAllTools);

// Route to search tools (public)
router.get('/search', ToolController.searchTools);

// Route to get borrowed tools by user (protected)
router.get('/borrowed/:userId', verifyToken, ToolController.getBorrowedToolsByUser);

// Route to get owned tools by user (protected)
router.get('/owned/:userId', verifyToken, ToolController.getToolsByOwner);

// Fetch all tools (legacy endpoint - public)
router.get('/gettools', async (req, res) => {
    try {
      const tools = await ToolModel.model.find(); // This fetches all tools from MongoDB
      res.json(tools);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

// Route to add a new tool (protected, with image upload)
router.post('/add', verifyToken, upload.single('image'), ToolController.addTool);

// Route to get tool by ID (public)
router.get('/:toolId', ToolController.getToolById);

// Route to update tool details (protected)
router.put('/:toolId', verifyToken, ToolController.updateTool);

// Route to delete tool (protected)
router.delete('/:toolId', verifyToken, ToolController.deleteTool);
  

export default router;