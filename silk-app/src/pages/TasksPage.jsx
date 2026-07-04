import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchTasks } from '../utils/api'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [limit] = useState(8)
  const { token } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''
  const priority = searchParams.get('priority') || ''
  const page = Number(searchParams.get('page') || '1')

  useEffect(() => {
    if (!token) return

    setLoading(true)
    setError('')

    fetchTasks(token, { search, status, priority, page, limit })
      .then((data) => {
        setTasks(data.tasks || [])
        setTotal(data.total || 0)
        setPages(data.pages || 1)
      })
      .catch((err) => {
        setError(err.message || 'Unable to load tasks')
        setTasks([])
        setTotal(0)
        setPages(1)
      })
      .finally(() => setLoading(false))
  }, [token, search, status, priority, page, limit])

  const updateParams = (key, value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }
    nextParams.set('page', '1')
    setSearchParams(nextParams)
  }

  const goToPage = (nextPage) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('page', String(nextPage))
    setSearchParams(nextParams)
  }

  const clearFilters = () => {
    const nextParams = new URLSearchParams()
    nextParams.set('page', '1')
    setSearchParams(nextParams)
  }

  return (
    <div className="space-y-6">
      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Task board</p>
            <h2 className="text-2xl font-semibold text-[#2e3040]">Open work items</h2>
            <p className="mt-2 text-sm text-[#585a68]">Filter, search, and page through your tasks from the database.</p>
          </div>
          <Link to="/create-task" className="rounded-2xl bg-white/70 px-4 py-2 font-semibold text-[#6366f1] neo-inset">Add item</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="neo-inset rounded-3xl bg-white/70 p-4">
            <label className="block text-sm font-semibold text-[#585a68]">Search tasks</label>
            <input
              value={search}
              onChange={(event) => updateParams('search', event.target.value)}
              placeholder="Search by title..."
              className="mt-3 w-full rounded-3xl border-none bg-[#f0f2f8] px-4 py-3 text-[#2e3040] outline-none"
            />
          </div>
          <div className="neo-inset rounded-3xl bg-white/70 p-4">
            <label className="block text-sm font-semibold text-[#585a68]">Status</label>
            <select
              value={status}
              onChange={(event) => updateParams('status', event.target.value)}
              className="mt-3 w-full rounded-3xl border-none bg-[#f0f2f8] px-4 py-3 text-[#2e3040] outline-none"
            >
              <option value="">All statuses</option>
              <option value="Backlog">Backlog</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="neo-inset rounded-3xl bg-white/70 p-4">
            <label className="block text-sm font-semibold text-[#585a68]">Priority</label>
            <select
              value={priority}
              onChange={(event) => updateParams('priority', event.target.value)}
              className="mt-3 w-full rounded-3xl border-none bg-[#f0f2f8] px-4 py-3 text-[#2e3040] outline-none"
            >
              <option value="">All priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#585a68]">Showing {tasks.length} of {total} tasks</p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-2xl bg-[#e8eaf0] px-4 py-2 text-sm font-semibold text-[#6366f1] neo-inset"
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        {loading ? (
          <p className="text-[#585a68]">Loading tasks from the REST API…</p>
        ) : error ? (
          <p className="text-[#dc2626]">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-[#585a68]">No tasks match your current filters.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="flex flex-col gap-4 rounded-3xl bg-white/50 p-5 neo-inset md:flex-row md:items-center md:justify-between">
                <div>
                  <Link to={`/tasks/${task._id}`} className="text-xl font-semibold text-[#2e3040] hover:text-[#6366f1]">
                    {task.title}
                  </Link>
                  <p className="mt-2 text-sm text-[#585a68]">{task.description || 'No description provided.'}</p>
                  <p className="mt-3 text-sm text-[#585a68]">{task.priority || 'Medium'} priority • {task.status || 'Backlog'}</p>
                </div>
                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${task.status === 'Done' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#ede9fe] text-[#7c3aed]'}`}>
                    {task.status || 'Backlog'}
                  </span>
                  <Link to={`/tasks/${task._id}`} className="rounded-2xl bg-[#e8eaf0] px-3 py-2 text-sm font-semibold text-[#6366f1] neo-raised">
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
              className="rounded-3xl bg-[#f0f2f8] px-4 py-2 text-sm font-semibold text-[#2e3040] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index + 1)}
                className={`rounded-3xl px-4 py-2 text-sm font-semibold ${page === index + 1 ? 'bg-[#6366f1] text-white' : 'bg-[#f0f2f8] text-[#2e3040]'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= pages}
              onClick={() => goToPage(page + 1)}
              className="rounded-3xl bg-[#f0f2f8] px-4 py-2 text-sm font-semibold text-[#2e3040] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TasksPage
