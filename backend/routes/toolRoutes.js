import express from 'express';
const router = express.Router();
import ToolController from '../controllers/ToolController.js';

// Route to add a new tool
router.post('/add', ToolController.addTool);

// Route to get tool by ID
router.get('/:toolId', ToolController.getToolById);

// Route to update tool details
router.put('/:toolId', ToolController.updateTool);

export default router;