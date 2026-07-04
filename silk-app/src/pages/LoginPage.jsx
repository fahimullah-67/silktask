import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('fahim@silktask.com')
  const [password, setPassword] = useState('silk2026')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, from, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to authenticate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-4xl bg-[#e8eaf0] p-8 neo-raised">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8eaf0] neo-raised">
            <span className="material-symbols-outlined text-4xl text-[#6366f1]" style={{ fontVariationSettings: 'FILL 1' }}>task_alt</span>
          </div>
          <h2 className="text-3xl font-semibold text-[#2e3040]">Welcome back</h2>
          <p className="mt-2 text-[#585a68]">Continue your calm, coordinated workflow.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Email Address</span>
            <div className="neo-inset flex items-center rounded-2xl bg-[#e8eaf0] px-4 py-3">
              <span className="material-symbols-outlined mr-3 text-[#585a68]">mail</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border-none bg-transparent text-[#2e3040] outline-none placeholder:text-[#8a8c9a]"
                placeholder="name@company.com"
              />
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Password</span>
            <div className="neo-inset flex items-center rounded-2xl bg-[#e8eaf0] px-4 py-3">
              <span className="material-symbols-outlined mr-3 text-[#585a68]">lock</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border-none bg-transparent text-[#2e3040] outline-none placeholder:text-[#8a8c9a]"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </label>
          <button className="neo-raised flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e8eaf0] px-4 py-4 font-semibold text-[#6366f1]" type="submit" disabled={loading}>
            {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">login</span>}
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        {error ? <p className="mt-5 rounded-2xl bg-white/50 px-4 py-3 text-sm text-[#dc2626]">{error}</p> : null}
        <div className="mt-8 border-t border-white/70 pt-6 text-center text-sm text-[#585a68]">
          <p>Don&apos;t have an account?</p>
          <Link to="/register" className="mt-3 inline-flex rounded-2xl bg-[#e8eaf0] px-4 py-3 font-semibold text-[#2e3040] neo-raised">Create new account</Link>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
