import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { resetPassword } from '../utils/api'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function ResetPasswordPage() {
  const query = useQuery()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const tokenFromQuery = query.get('token') || ''
    setToken(tokenFromQuery)
  }, [query])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!token) {
      setError('Reset token is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await resetPassword(token, password)
      setMessage('Your password has been reset successfully. You can now sign in.')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message || 'Unable to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8eaf0] px-4 py-20">
      <div className="w-full max-w-lg rounded-4xl bg-[#e8eaf0] p-10 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Reset password</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Create a new password</h1>
          <p className="mt-3 text-[#585a68]">Use the token from your reset request to update your account password.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Password reset token</span>
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
              placeholder="Enter reset token"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">New password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="neo-raised w-full rounded-3xl bg-[#e8eaf0] px-5 py-4 text-sm font-semibold text-[#6366f1] transition hover:-translate-y-px"
          >
            {loading ? 'Resetting password...' : 'Reset password'}
          </button>
        </form>

        {message ? <p className="mt-6 rounded-3xl bg-white/70 p-4 text-sm text-[#166534]">{message}</p> : null}
        {error ? <p className="mt-6 rounded-3xl bg-[#fee2e2] p-4 text-sm text-[#b91c1c]">{error}</p> : null}

        <div className="mt-10 flex flex-col gap-3 text-center text-sm text-[#585a68] sm:flex-row sm:justify-center sm:gap-6">
          <Link to="/login" className="rounded-3xl bg-[#f8f8fb] px-5 py-3 text-[#2e3040] transition hover:bg-white">Sign in</Link>
          <Link to="/forgot-password" className="rounded-3xl bg-[#f8f8fb] px-5 py-3 text-[#2e3040] transition hover:bg-white">Request new token</Link>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordPage
