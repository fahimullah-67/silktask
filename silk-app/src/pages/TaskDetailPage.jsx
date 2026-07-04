import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchTaskById, updateTask, deleteTask } from '../utils/api'

function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [task, setTask] = useState(null)
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!token) return

    const loadTask = async () => {
      try {
        const found = await fetchTaskById(id, token)
        setTask(found)
        setStatus(found.status)
        setPriority(found.priority)
      } catch (err) {
        setError(err.message || 'Unable to load task')
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id, token])

  const handleUpdate = async () => {
    if (!task) return
    setError('')
    setSuccess('')

    try {
      await updateTask(id, { status, priority }, token)
      setSuccess('Task updated successfully')
    } catch (err) {
      setError(err.message || 'Unable to update task')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(id, token)
      navigate('/tasks', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to delete task')
    }
  }

  if (loading) {
    return <div className="p-8 text-[#585a68]">Loading task...</div>
  }

  if (error) {
    return <div className="p-8 text-[#dc2626]">{error}</div>
  }

  return (
    <div className="space-y-8">
      <div className="rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#6366f1]">Task detail</p>
            <h1 className="mt-3 text-3xl font-semibold text-[#2e3040]">{task.title}</h1>
          </div>
          <button onClick={handleDelete} className="rounded-2xl bg-[#e8eaf0] px-5 py-3 font-semibold text-[#dc2626] shadow-inner transition hover:-translate-y-px" type="button">
            Delete task
          </button>
        </div>
        <p className="mt-6 text-[#585a68]">{task.description || 'No description provided.'}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Status</p>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-4 w-full rounded-3xl bg-[#f0f2f8] px-4 py-3 text-[#2e3040] outline-none">
            {['Backlog', 'To Do', 'In Progress', 'Review', 'Done'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Priority</p>
          <select value={priority} onChange={(event) => setPriority(event.target.value)} className="mt-4 w-full rounded-3xl bg-[#f0f2f8] px-4 py-3 text-[#2e3040] outline-none">
            {['Low', 'Medium', 'High', 'Urgent'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Due date</p>
          <p className="mt-4 text-[#585a68]">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date set'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button onClick={handleUpdate} className="rounded-2xl bg-[#e8eaf0] px-6 py-4 font-semibold text-[#6366f1] shadow-inner transition hover:-translate-y-px">Save changes</button>
        {success ? <p className="text-[#16a34a]">{success}</p> : null}
      </div>
    </div>
  )
}

export default TaskDetailPage
