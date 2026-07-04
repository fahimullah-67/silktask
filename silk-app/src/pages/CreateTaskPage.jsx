import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createTask } from '../utils/api'

function CreateTaskPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [status, setStatus] = useState('To Do')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await createTask({ title, description, priority, status }, token)
      setSubmitted(true)
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setStatus('To Do')
      navigate('/tasks', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to save task')
      setSubmitted(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Task details</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#2e3040]">Create a new task</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Task title</span>
            <div className="neo-inset rounded-2xl bg-[#e8eaf0] px-4 py-3">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full border-none bg-transparent text-[#2e3040] outline-none placeholder:text-[#8a8c9a]"
                placeholder="Launch onboarding refresh"
              />
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Description</span>
            <div className="neo-inset rounded-2xl bg-[#e8eaf0] px-4 py-3">
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-32 w-full resize-none border-none bg-transparent text-[#2e3040] outline-none placeholder:text-[#8a8c9a]"
                placeholder="Describe the objective, owner, and launch details."
              />
            </div>
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[#585a68]">Priority</span>
              <div className="neo-inset rounded-2xl bg-[#e8eaf0] px-4 py-3">
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="w-full border-none bg-transparent text-[#2e3040] outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[#585a68]">Status</span>
              <div className="neo-inset rounded-2xl bg-[#e8eaf0] px-4 py-3">
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full border-none bg-transparent text-[#2e3040] outline-none"
                >
                  <option value="Backlog">Backlog</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </label>
          </div>
          <button className="rounded-2xl bg-[#e8eaf0] px-4 py-3 font-semibold text-[#6366f1] neo-raised" type="submit">Save task</button>
        </form>
        {error ? <p className="mt-6 rounded-2xl bg-white/70 px-4 py-3 text-sm text-[#dc2626]">{error}</p> : null}
        {submitted ? <p className="mt-6 rounded-2xl bg-white/70 px-4 py-3 text-sm text-[#404252]">Task captured. It will appear in your task board shortly.</p> : null}
      </div>
      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        <h3 className="text-xl font-semibold text-[#2e3040]">What matters most</h3>
        <ul className="mt-6 space-y-4 text-sm text-[#585a68]">
          <li className="rounded-2xl bg-white/50 p-4 neo-inset">Keep ownership explicit.</li>
          <li className="rounded-2xl bg-white/50 p-4 neo-inset">Tie tasks to launch milestones.</li>
          <li className="rounded-2xl bg-white/50 p-4 neo-inset">Review blockers early.</li>
        </ul>
      </div>
    </div>
  )
}

export default CreateTaskPage
