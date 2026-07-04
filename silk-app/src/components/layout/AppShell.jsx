import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { navigation } from '../../data/siteContent'

function AppShell({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const isTasksPage = location.pathname === '/tasks'
  const handleSearchChange = (event) => {
    const nextValue = event.target.value
    setSearchValue(nextValue)

    if (isTasksPage) {
      const params = new URLSearchParams(searchParams)
      if (nextValue) {
        params.set('search', nextValue)
      } else {
        params.delete('search')
      }
      params.set('page', '1')
      setSearchParams(params)
    } else {
      navigate(`/tasks?search=${encodeURIComponent(nextValue)}`)
    }
  }

  useEffect(() => {
    if (isTasksPage) {
      setSearchValue(searchParams.get('search') || '')
    }
  }, [isTasksPage, searchParams])

  const pageTitle = useMemo(() => {
    const map = {
      '/dashboard': 'Overview',
      '/tasks': 'My Tasks',
      '/team': 'Team',
      '/analytics': 'Analytics',
      '/settings': 'Settings',
      '/pricing': 'Pricing',
      '/create-task': 'Create Task',
    }

    return map[location.pathname] ?? 'Workspace'
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#e8eaf0] text-[#2e3040]">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/70 bg-[#e8eaf0] p-6 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)] lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-3 px-2">
          <div className="neo-raised flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8eaf0]">
            <span className="material-symbols-outlined text-[#6366f1]" style={{ fontVariationSettings: 'FILL 1' }}>task_alt</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#6366f1]">Silk Task</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#585a68]">Management Platform</p>
          </div>
        </Link>
        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'neo-inset bg-[#e8eaf0] text-[#6366f1]' : 'text-[#585a68] hover:translate-x-1 hover:text-[#6366f1]'}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <Link to="/create-task" className="neo-raised mt-auto flex items-center justify-center gap-2 rounded-2xl bg-[#e8eaf0] px-4 py-3 font-semibold text-[#6366f1] transition hover:-translate-y-px">
          <span className="material-symbols-outlined">add</span>
          New Task
        </Link>
      </aside>
      <div className="lg:ml-64">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/70 bg-[#e8eaf0]/90 px-4 shadow-[0px_6px_12px_rgba(0,0,0,0.04)] backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <div className="neo-inset flex h-10 w-[18rem] items-center gap-3 rounded-full bg-[#e8eaf0] px-4">
              <span className="material-symbols-outlined text-[#585a68]">search</span>
              <input
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-[#8a8c9a]"
                placeholder="Search tasks, teams, or documents..."
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="neo-raised flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eaf0] text-[#585a68] transition hover:text-[#6366f1]" type="button">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-3 rounded-full bg-[#e8eaf0] px-4 py-2 neo-raised">
              <div className="text-right">
                <p className="text-sm font-semibold">{user?.name || 'Your Team'}</p>
                <p className="text-[10px] text-[#585a68]">{user ? user.email : 'Member'}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold text-[#6366f1] transition hover:bg-white"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Silk workspace</p>
              <h1 className="text-3xl font-semibold tracking-tight text-[#2e3040]">{pageTitle}</h1>
            </div>
            <Link to="/create-task" className="neo-raised inline-flex items-center gap-2 rounded-2xl bg-[#e8eaf0] px-4 py-2.5 font-semibold text-[#6366f1]">
              <span className="material-symbols-outlined">add_circle</span>
              Create task
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell
