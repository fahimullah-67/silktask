import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProfile, updateProfile } from '../utils/api'

function ProfilePage() {
  const { token, user, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) return

    const fetchData = async () => {
      try {
        const profile = await getProfile(token)
        setName(profile.name)
        setEmail(profile.email)
      } catch {
        setError('Unable to load profile')
      }
    }

    fetchData()
  }, [token])

  const handleUpdate = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match')
      setLoading(false)
      return
    }

    try {
      await updateProfile({ name, email, password: newPassword }, token)
      setMessage('Profile updated successfully')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message || 'Unable to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#e8eaf0] px-6 py-8 text-[#2e3040]">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Profile</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Your account</h1>
          <p className="mt-3 text-[#585a68]">Update your personal details, change your password, and manage your profile settings.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="space-y-6 rounded-4xl bg-[#e8eaf0] p-8 neo-raised">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-[#f8f8fb] shadow-inner" />
                <span className="material-symbols-outlined absolute bottom-0 right-0 rounded-full bg-[#e8eaf0] p-3 text-[#6366f1] neo-raised">photo_camera</span>
              </div>
              <div>
                <p className="text-xl font-semibold text-[#2e3040]">{user?.name || 'Profile name'}</p>
                <p className="text-sm text-[#585a68]">{user?.email || 'Email address'}</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 neo-inset">
              <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Account quick stats</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#f0f2f8] p-4 text-center">
                  <p className="text-2xl font-bold text-[#2e3040]">{new Date().getFullYear() - 2023 + 1}</p>
                  <p className="text-xs uppercase text-[#585a68]">Years active</p>
                </div>
                <div className="rounded-3xl bg-[#f0f2f8] p-4 text-center">
                  <p className="text-2xl font-bold text-[#2e3040]">94%</p>
                  <p className="text-xs uppercase text-[#585a68]">Completion rate</p>
                </div>
              </div>
            </div>
            <button onClick={logout} className="w-full rounded-3xl bg-[#e8eaf0] px-5 py-4 font-semibold text-[#6366f1] transition hover:-translate-y-px">Sign out</button>
          </aside>

          <section className="space-y-6">
            <div className="rounded-4xl bg-[#e8eaf0] p-8 neo-raised">
              <h2 className="text-2xl font-semibold text-[#2e3040]">Personal information</h2>
              <p className="mt-3 text-[#585a68]">Edit your name, email, or password below.</p>
              <form className="mt-8 space-y-6" onSubmit={handleUpdate}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#585a68]">Full name</label>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#585a68]">Email address</label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#585a68]">New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#585a68]">Confirm password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="w-full rounded-3xl border-none bg-[#f0f2f8] px-5 py-4 text-[#2e3040] outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    disabled={loading}
                    type="submit"
                    className="rounded-3xl bg-[#e8eaf0] px-6 py-4 font-semibold text-[#6366f1] shadow-inner transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save changes'}
                  </button>
                  <p className="text-sm text-[#585a68]">Changes will be applied to your profile immediately.</p>
                </div>

                {message ? <p className="text-sm text-[#16a34a]">{message}</p> : null}
                {error ? <p className="text-sm text-[#dc2626]">{error}</p> : null}
              </form>
            </div>

            <div className="rounded-4xl bg-[#e8eaf0] p-8 neo-raised">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#2e3040]">Security</h3>
                  <p className="mt-2 text-[#585a68]">Protect your account with strong passwords and recovery options.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#f0f2f8] p-5">
                  <p className="text-sm text-[#585a68]">Two-factor authentication</p>
                  <p className="mt-2 text-2xl font-semibold text-[#2e3040]">Enabled</p>
                </div>
                <div className="rounded-3xl bg-[#f0f2f8] p-5">
                  <p className="text-sm text-[#585a68]">Password reset</p>
                  <a href="/forgot-password" className="mt-2 inline-flex rounded-full bg-[#e8eaf0] px-4 py-2 text-sm font-semibold text-[#6366f1]">Send reset link</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
