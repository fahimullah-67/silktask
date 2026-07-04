import express from 'express'
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboardStats,
} from '../controllers/taskController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getTasks).post(protect, createTask)
router.route('/stats').get(protect, getDashboardStats)
router.route('/:id').get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask)

export default router
