import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../utils/api'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetToken, setResetToken] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const data = await forgotPassword(email)
      setResetToken(data.resetToken || '')
      setMessage('A password reset token was generated. Use it on the reset password page below.')
    } catch (err) {
      setError(err.message || 'Unable to request password reset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e8eaf0] px-4 py-20">
      <div className="w-full max-w-lg rounded-4xl bg-[#e8eaf0] p-10 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Reset access</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Forgot your password?</h1>
          <p className="mt-3 text-[#585a68]">Enter your account email and we will send a reset token.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#585a68]">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="neo-raised w-full rounded-3xl bg-[#e8eaf0] px-5 py-4 text-sm font-semibold text-[#6366f1] transition hover:-translate-y-px"
          >
            {loading ? 'Sending token...' : 'Request reset token'}
          </button>
        </form>

        {message ? (
          <div className="mt-6 rounded-3xl bg-white/70 p-4 text-sm text-[#166534]">
            <p>{message}</p>
            {resetToken ? (
              <p className="mt-3 break-all">Token: <span className="font-semibold">{resetToken}</span></p>
            ) : null}
            <p className="mt-3">Then visit <Link to={`/reset-password?token=${encodeURIComponent(resetToken)}`} className="text-[#6366f1] underline">Reset Password</Link>.</p>
          </div>
        ) : null}

        {error ? <p className="mt-6 rounded-3xl bg-[#fee2e2] p-4 text-sm text-[#b91c1c]">{error}</p> : null}

        <div className="mt-10 flex flex-col gap-3 text-center text-sm text-[#585a68] sm:flex-row sm:justify-center sm:gap-6">
          <Link to="/login" className="rounded-3xl bg-[#f8f8fb] px-5 py-3 text-[#2e3040] transition hover:bg-white">Sign in</Link>
          <Link to="/register" className="rounded-3xl bg-[#f8f8fb] px-5 py-3 text-[#2e3040] transition hover:bg-white">Create account</Link>
        </div>
      </div>
    </main>
  )
}

export default ForgotPasswordPage
