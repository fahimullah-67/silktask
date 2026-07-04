import { useEffect, useState } from 'react'

const defaultSettings = {
  theme: 'light',
  accent: 'indigo',
  emailAlerts: true,
  mentionAlerts: true,
  deadlineReminders: true,
  twoFactorAuth: true,
}

const accentOptions = [
  { id: 'indigo', color: '#6366f1' },
  { id: 'violet', color: '#7c3aed' },
  { id: 'emerald', color: '#10b981' },
  { id: 'amber', color: '#f59e0b' },
]

function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('silkSettings')
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch {
        setSettings(defaultSettings)
      }
    }
  }, [])

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [settings.theme])

  const saveSettings = () => {
    localStorage.setItem('silkSettings', JSON.stringify(settings))
    setMessage('Settings saved')
    window.setTimeout(() => setMessage(''), 3000)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('silkSettings')
    setMessage('Settings reset to defaults')
    window.setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="space-y-8">
      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Settings</p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Workspace preferences</h1>
        <p className="mt-3 text-[#585a68]">Configure your theme, notifications, and security behavior for the Silk workspace.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="neo-raised rounded-4xl bg-[#e8eaf0] p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#2e3040]">Appearance</h2>
            <p className="mt-3 text-[#585a68]">Choose your theme and accent palette for a consistent workspace look.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-4xl bg-white/80 p-6 neo-inset">
              <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Theme mode</p>
              <div className="mt-5 grid gap-4">
                {['light', 'dark'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSettings((prev) => ({ ...prev, theme: mode }))}
                    className={`w-full rounded-3xl px-4 py-4 text-left font-semibold transition ${settings.theme === mode ? 'bg-[#e8eaf0] text-[#2e3040]' : 'bg-[#f0f2f8] text-[#585a68]'}`}
                  >
                    {mode === 'light' ? 'Light mode' : 'Dark mode'}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-4xl bg-white/80 p-6 neo-inset">
              <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Accent color</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {accentOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSettings((prev) => ({ ...prev, accent: option.id }))}
                    className={`h-12 w-12 rounded-full border-2 ${settings.accent === option.id ? 'border-[#6366f1] scale-110' : 'border-transparent'} transition-transform`}
                    style={{ backgroundColor: option.color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-4xl bg-white/80 p-6 neo-inset">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-[#585a68]">Notification preferences</p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: 'Daily task summary', key: 'emailAlerts' },
                { label: 'Mention alerts', key: 'mentionAlerts' },
                { label: 'Deadline reminders', key: 'deadlineReminders' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-3xl bg-[#f0f2f8] p-4">
                  <div>
                    <p className="font-semibold text-[#2e3040]">{item.label}</p>
                    <p className="text-sm text-[#585a68]">Keep your inbox and workspace in sync.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`h-10 w-20 rounded-full transition ${settings[item.key] ? 'bg-[#6366f1]' : 'bg-[#d1d5db]'}`}
                  >
                    <span className={`block h-8 w-8 rounded-full bg-white transition-transform ${settings[item.key] ? 'translate-x-10' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="neo-raised rounded-4xl bg-[#e8eaf0] p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#2e3040]">Security center</h2>
            <p className="mt-3 text-[#585a68]">Manage security settings that keep your account safe.</p>
          </div>
          <div className="rounded-4xl bg-white/80 p-6 neo-inset space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#2e3040]">Two-factor authentication</p>
                <p className="text-sm text-[#585a68]">Add an extra layer of account protection.</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings((prev) => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                className={`h-10 w-20 rounded-full transition ${settings.twoFactorAuth ? 'bg-[#6366f1]' : 'bg-[#d1d5db]'}`}
              >
                <span className={`block h-8 w-8 rounded-full bg-white transition-transform ${settings.twoFactorAuth ? 'translate-x-10' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="rounded-3xl bg-[#f0f2f8] p-4">
              <p className="text-sm text-[#585a68]">Enable 2FA to secure login sessions and reduce unauthorized access risk.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={saveSettings}
              className="rounded-3xl bg-[#e8eaf0] px-6 py-4 font-semibold text-[#6366f1] transition hover:-translate-y-px"
            >
              Save preferences
            </button>
            <button
              type="button"
              onClick={resetSettings}
              className="rounded-3xl bg-white/80 px-6 py-4 font-semibold text-[#585a68] border border-[#d1d5db] transition hover:-translate-y-px"
            >
              Reset defaults
            </button>
          </div>
          {message ? <p className="text-sm text-[#16a34a]">{message}</p> : null}
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
