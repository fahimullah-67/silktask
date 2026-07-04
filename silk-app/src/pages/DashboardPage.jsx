import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchDashboardStats } from '../utils/api'

function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, backlog: 0, recent: [] })
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    if (!token) return

    let isSubscribed = true
    setLoading(true)

    fetchDashboardStats(token)
      .then((data) => {
        if (isSubscribed) {
          setStats({
            total: data.total || 0,
            completed: data.completed || 0,
            inProgress: data.inProgress || 0,
            backlog: data.backlog || 0,
            recent: data.recent || [],
          })
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setStats({ total: 0, completed: 0, inProgress: 0, backlog: 0, recent: [] })
        }
      })
      .finally(() => {
        if (isSubscribed) setLoading(false)
      })

    return () => {
      isSubscribed = false
    }
  }, [token])

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Tasks', value: stats.total, delta: '+12%', icon: 'format_list_bulleted', tone: 'text-[#6366f1]' },
          { label: 'Completed', value: stats.completed, delta: 'Live', icon: 'check_circle', tone: 'text-[#16a34a]' },
          { label: 'In Progress', value: stats.inProgress, delta: 'Ready', icon: 'sync', tone: 'text-[#7c3aed]' },
          { label: 'Backlog', value: stats.backlog, delta: 'Needs focus', icon: 'priority_high', tone: 'text-[#dc2626]' },
        ].map((card) => (
          <div key={card.label} className="neo-raised rounded-[1.75rem] bg-[#e8eaf0] p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl neo-inset ${card.tone}`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#404252]">{card.delta}</span>
            </div>
            <p className="text-sm font-semibold text-[#585a68]">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-[#2e3040]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Live integration</p>
              <h3 className="text-2xl font-semibold text-[#2e3040]">Workload overview</h3>
            </div>
            <div className="rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-[#404252]">REST API</div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {loading ? (
              <p className="text-[#585a68]">Loading task data…</p>
            ) : stats.recent.length === 0 ? (
              <p className="text-[#585a68]">No recent tasks available yet.</p>
            ) : (
              stats.recent.map((task) => (
                <div key={task._id} className="rounded-3xl bg-white/50 p-4 neo-inset">
                  <p className="text-sm font-semibold text-[#2e3040]">{task.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#585a68]">{task.status} • {task.priority}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <h3 className="text-2xl font-semibold text-[#2e3040]">Today&apos;s focus</h3>
          <ul className="mt-6 space-y-4 text-sm text-[#585a68]">
            <li className="rounded-2xl bg-white/50 p-4 neo-inset">Review launch checklist for the client rollout.</li>
            <li className="rounded-2xl bg-white/50 p-4 neo-inset">Confirm handoff for the new onboarding experience.</li>
            <li className="rounded-2xl bg-white/50 p-4 neo-inset">Prep analytics report for the leadership sync.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
