import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register({ name, email, password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-4xl bg-[#e8eaf0] p-8 neo-raised">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8eaf0] neo-raised">
            <span className="material-symbols-outlined text-4xl text-[#6366f1]" style={{ fontVariationSettings: 'FILL 1' }}>
              person_add
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-[#2e3040]">Create account</h2>
          <p className="mt-2 text-[#585a68]">Start managing your tasks with Silk Task.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Full name</span>
            <div className="neo-inset flex items-center rounded-2xl bg-[#e8eaf0] px-4 py-3">
              <span className="material-symbols-outlined mr-3 text-[#585a68]">person</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full border-none bg-transparent text-[#2e3040] outline-none placeholder:text-[#8a8c9a]"
                placeholder="Fahim Ullah"
              />
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Email address</span>
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
                type="password"
                className="w-full border-none bg-transparent text-[#2e3040] outline-none placeholder:text-[#8a8c9a]"
                placeholder="••••••••"
              />
            </div>
          </label>
          <button
            className="neo-raised flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e8eaf0] px-4 py-4 font-semibold text-[#6366f1]"
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">check</span>}
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        {error ? <p className="mt-5 rounded-2xl bg-white/50 px-4 py-3 text-sm text-[#dc2626]">{error}</p> : null}
        <div className="mt-8 border-t border-white/70 pt-6 text-center text-sm text-[#585a68]">
          <p>Already have an account?</p>
          <Link to="/login" className="mt-3 inline-flex rounded-2xl bg-[#e8eaf0] px-4 py-3 font-semibold text-[#2e3040] neo-raised">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
