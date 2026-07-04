import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchDashboardStats } from '../utils/api'

function AnalyticsPage() {
  const { token } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [range, setRange] = useState('Weekly')

  const rangeOptions = ['Weekly', 'Monthly', 'Yearly']

  useEffect(() => {
    if (!token) return

    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats(token)
        setStats(data)
      } catch (err) {
        setError(err.message || 'Unable to load analytics')
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [token, range])

  if (loading) {
    return <div className="p-8 text-[#585a68]">Loading analytics...</div>
  }

  if (error) {
    return <div className="p-8 text-[#dc2626]">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Analytics Dashboard</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#2e3040]">Team performance overview</h2>
              <p className="mt-3 text-sm text-[#585a68]">Track productivity, completion, and goal progress across your active workload.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {rangeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRange(option)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${range === option ? 'bg-[#6366f1] text-white' : 'bg-[#f0f2f8] text-[#585a68]'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-4xl bg-white/80 p-6 neo-inset">
              <p className="text-xs uppercase tracking-[0.2em] text-[#585a68]">Total tasks</p>
              <p className="mt-3 text-4xl font-semibold text-[#2e3040]">{stats.total}</p>
              <p className="mt-2 text-sm text-[#585a68]">All tasks assigned to your workspace.</p>
            </div>
            <div className="rounded-4xl bg-white/80 p-6 neo-inset">
              <p className="text-xs uppercase tracking-[0.2em] text-[#585a68]">In progress</p>
              <p className="mt-3 text-4xl font-semibold text-[#2e3040]">{stats.inProgress}</p>
              <p className="mt-2 text-sm text-[#585a68]">Tasks currently being worked on.</p>
            </div>
            <div className="rounded-4xl bg-white/80 p-6 neo-inset">
              <p className="text-xs uppercase tracking-[0.2em] text-[#585a68]">Completed</p>
              <p className="mt-3 text-4xl font-semibold text-[#2e3040]">{stats.completed}</p>
              <p className="mt-2 text-sm text-[#585a68]">Tasks closed successfully.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-4xl bg-[#f8f8fb] p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Backlog</p>
                <span className="rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-semibold text-[#7c3aed]">{range}</span>
              </div>
              <p className="mt-4 text-5xl font-bold text-[#2e3040]">{stats.backlog}</p>
              <p className="mt-2 text-sm text-[#585a68]">Pending tasks that need prioritization.</p>
            </div>
            <div className="rounded-4xl bg-[#f8f8fb] p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Goal status</p>
                <p className="text-xs font-semibold text-[#585a68]">Target 2,000</p>
              </div>
              <div className="mt-4 h-4 rounded-full bg-[#e5e7ed] overflow-hidden">
                <div className="h-full rounded-full bg-[#6366f1] transition-all duration-700" style={{ width: `${Math.min(100, (stats.completed / 2000) * 100)}%` }} />
              </div>
              <p className="mt-3 text-3xl font-semibold text-[#2e3040]">{Math.round(Math.min(100, (stats.completed / 2000) * 100))}%</p>
              <p className="mt-2 text-sm text-[#585a68]">Of the monthly completion goal achieved.</p>
            </div>
          </div>
        </div>

        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Priority distribution</p>
              <h3 className="mt-2 text-xl font-semibold text-[#2e3040]">Active task mix</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#f0f2f8] px-3 py-2 text-xs font-semibold text-[#585a68]">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#dc2626]" /> Critical
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full">
                <circle className="text-[#d0d2dc]" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle className="text-[#dc2626]" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="25" strokeLinecap="round" />
                <circle className="text-[#6366f1]" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="45 100" strokeDashoffset="0" strokeLinecap="round" />
                <circle className="text-[#7c3aed]" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 100" strokeDashoffset="-45" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#2e3040]">{stats.total}</span>
                <span className="text-xs uppercase tracking-[0.24em] text-[#585a68]">Active tasks</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="rounded-4xl bg-white/80 p-4">
              <div className="flex items-center justify-between text-sm text-[#585a68]">
                <span>Critical</span>
                <span>25%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#e5e7ed]"><div className="h-full rounded-full bg-[#dc2626]" style={{ width: '25%' }} /></div>
            </div>
            <div className="rounded-4xl bg-white/80 p-4">
              <div className="flex items-center justify-between text-sm text-[#585a68]">
                <span>Medium</span>
                <span>45%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#e5e7ed]"><div className="h-full rounded-full bg-[#6366f1]" style={{ width: '45%' }} /></div>
            </div>
            <div className="rounded-4xl bg-white/80 p-4">
              <div className="flex items-center justify-between text-sm text-[#585a68]">
                <span>Low</span>
                <span>30%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#e5e7ed]"><div className="h-full rounded-full bg-[#7c3aed]" style={{ width: '30%' }} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <h3 className="text-xl font-semibold text-[#2e3040] mb-4">Top performers</h3>
          <div className="space-y-4">
            {stats.recent.slice(0, 3).map((task) => (
              <div key={task._id} className="rounded-4xl bg-white/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#2e3040]">{task.title}</p>
                    <p className="text-sm text-[#585a68]">{task.status || 'Backlog'}</p>
                  </div>
                  <span className="rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-semibold text-[#7c3aed]">{task.priority || 'Medium'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Monthly goal</p>
              <h3 className="mt-2 text-xl font-semibold text-[#2e3040]">Team completion</h3>
            </div>
            <span className="rounded-full bg-[#f0f2f8] px-3 py-1 text-xs font-semibold text-[#585a68]">On track</span>
          </div>
          <div className="mt-6 rounded-4xl bg-white/80 p-6">
            <div className="flex items-center justify-between text-sm text-[#585a68] mb-3">
              <span>Target</span>
              <span className="font-semibold text-[#2e3040]">2,000 tasks</span>
            </div>
            <div className="h-5 rounded-full bg-[#e5e7ed] overflow-hidden">
              <div className="h-full rounded-full bg-[#6366f1] transition-all duration-700" style={{ width: `${Math.min(100, (stats.completed / 2000) * 100)}%` }} />
            </div>
            <p className="mt-4 text-sm text-[#585a68]">Completion progress is based on tasks marked done.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
