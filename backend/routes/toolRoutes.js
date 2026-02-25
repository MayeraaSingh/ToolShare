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

// Route to get all tools (public, own tools excluded when logged in)
router.get('/', optionalAuth, ToolController.getAllTools);

// Route to search tools (public, own tools excluded when logged in)
router.get('/search', optionalAuth, ToolController.searchTools);

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

// Route to rent a tool (protected)
router.post('/rent/:toolId', verifyToken, ToolController.rentTool);

// Route to return a borrowed tool (protected)
router.post('/return/:toolId', verifyToken, ToolController.returnTool);

// Route to renew a borrowed tool (protected)
router.post('/renew/:toolId', verifyToken, ToolController.renewTool);

// Route to save a tool for later (protected)
router.post('/save/:toolId', verifyToken, ToolController.saveTool);

// Route to remove a tool from saved (protected)
router.delete('/save/:toolId', verifyToken, ToolController.unsaveTool);

// Route to add a new tool (protected)
router.post('/add', verifyToken, ToolController.addTool);

// Route to get tool by ID (public)
router.get('/:toolId', ToolController.getToolById);

// Route to update tool details (protected)
router.put('/:toolId', verifyToken, ToolController.updateTool);

// Route to delete tool (protected)
router.delete('/:toolId', verifyToken, ToolController.deleteTool);
  

export default router;