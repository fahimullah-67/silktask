import asyncHandler from 'express-async-handler'
import Task from '../models/Task.js'

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body

  if (!title) {
    res.status(400)
    throw new Error('Title is required')
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    status,
    dueDate,
  })

  res.status(201).json(task)
})

const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search, page = 1, limit = 10 } = req.query
  const query = { user: req.user._id }

  if (status) query.status = status
  if (priority) query.priority = priority
  if (search) query.title = { $regex: search, $options: 'i' }

  const pageNumber = Number(page)
  const pageSize = Number(limit)

  const total = await Task.countDocuments(query)
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize)

  res.json({
    tasks,
    page: pageNumber,
    pages: Math.ceil(total / pageSize),
    total,
  })
})

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task && task.user.toString() === req.user._id.toString()) {
    res.json(task)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task && task.user.toString() === req.user._id.toString()) {
    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.status = req.body.status || task.status
    task.dueDate = req.body.dueDate || task.dueDate

    const updatedTask = await task.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task && task.user.toString() === req.user._id.toString()) {
    await task.remove()
    res.json({ message: 'Task removed' })
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

const getDashboardStats = asyncHandler(async (req, res) => {
  const total = await Task.countDocuments({ user: req.user._id })
  const completed = await Task.countDocuments({ user: req.user._id, status: 'Done' })
  const inProgress = await Task.countDocuments({ user: req.user._id, status: 'In Progress' })
  const backlog = await Task.countDocuments({ user: req.user._id, status: 'Backlog' })

  const recent = await Task.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(5)

  res.json({ total, completed, inProgress, backlog, recent })
})

export { createTask, getTasks, getTaskById, updateTask, deleteTask, getDashboardStats }
