import mongoose from 'mongoose'

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'],
      default: 'To Do',
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', taskSchema)
export default Task
