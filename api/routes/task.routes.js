import express from 'express';
import { createTask, getTasks } from '../controllers/task.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create-task', verifyToken,createTask);
router.post('/get-tasks', verifyToken, getTasks);

export default router;