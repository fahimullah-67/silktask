import { Link } from 'react-router-dom'

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#e8eaf0] px-6 py-24 text-[#2e3040]">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="rounded-4xl bg-[#e8eaf0] p-10 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Legal & Compliance</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Privacy Policy</h1>
          <p className="mt-4 text-[#585a68]">Last updated: October 24, 2023. We value your trust and are committed to protecting your personal data with tactile security and transparency.</p>
        </div>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8 rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <div>
              <h2 className="text-2xl font-semibold text-[#2e3040]">Our Commitment</h2>
              <p className="mt-4 text-[#585a68]">At Silk Task, your data is never sold. We utilize advanced neomorphic encryption structures to ensure that your task management remains private, secure, and under your absolute control.</p>
            </div>

            <div id="data-collection" className="space-y-6 rounded-4xl bg-white/70 p-8 shadow-inner">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed] shadow-inner">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2e3040]">Data Collection</h3>
              </div>
              <p className="text-[#585a68]">We collect information to provide better services to all our users. The types of information we gather include:</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-[#f8f8fb] p-5">
                  <h4 className="font-semibold text-[#2e3040]">Account Information</h4>
                  <p className="mt-2 text-sm text-[#585a68]">Name, email address, and organization details provided during registration.</p>
                </div>
                <div className="rounded-3xl bg-[#f8f8fb] p-5">
                  <h4 className="font-semibold text-[#2e3040]">Usage Data</h4>
                  <p className="mt-2 text-sm text-[#585a68]">Log files, device information, and interaction patterns within the Silk platform.</p>
                </div>
                <div className="rounded-3xl bg-[#f8f8fb] p-5">
                  <h4 className="font-semibold text-[#2e3040]">Content Data</h4>
                  <p className="mt-2 text-sm text-[#585a68]">Tasks, project descriptions, and team comments you create within the app.</p>
                </div>
                <div className="rounded-3xl bg-[#f8f8fb] p-5">
                  <h4 className="font-semibold text-[#2e3040]">Cookies</h4>
                  <p className="mt-2 text-sm text-[#585a68]">We use soft-tracking cookies to remember your workspace preferences and login sessions.</p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl bg-white/70 p-8 shadow-inner">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e0e2ff] text-[#6366f1] shadow-inner">
                  <span className="material-symbols-outlined">gpp_good</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2e3040]">Security Protocols</h3>
              </div>
              <p className="text-[#585a68]">We employ multi-layered security measures to protect your information against unauthorized access, alteration, or destruction:</p>
              <ul className="mt-6 space-y-4 text-[#585a68]">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#6366f1] mt-1">check_circle</span>
                  <span><strong>End-to-End Encryption:</strong> All data in transit is protected using TLS 1.3 protocols, and data at rest is encrypted with AES-256.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#6366f1] mt-1">check_circle</span>
                  <span><strong>Biometric Access:</strong> Mobile users can enable face or fingerprint authentication for an extra layer of security.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#6366f1] mt-1">check_circle</span>
                  <span><strong>Regular Audits:</strong> We conduct quarterly security assessments and penetration testing to identify and mitigate potential vulnerabilities.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-4xl bg-white/70 p-8 shadow-inner">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edeef4] text-[#7c3aed] shadow-inner">
                  <span className="material-symbols-outlined">person_check</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2e3040]">User Rights</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-[#f8f8fb] p-6 text-center">
                  <p className="font-semibold text-[#2e3040]">Access</p>
                  <p className="mt-2 text-sm text-[#585a68]">Request a copy of all personal data we hold about you at any time.</p>
                </div>
                <div className="rounded-3xl bg-[#f8f8fb] p-6 text-center">
                  <p className="font-semibold text-[#2e3040]">Rectify</p>
                  <p className="mt-2 text-sm text-[#585a68]">Update or correct any inaccuracies in your profile or organizational data.</p>
                </div>
                <div className="rounded-3xl bg-[#f8f8fb] p-6 text-center">
                  <p className="font-semibold text-[#2e3040]">Erasure</p>
                  <p className="mt-2 text-sm text-[#585a68]">Exercise your "Right to be Forgotten" and request permanent account deletion.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-8 rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <div className="rounded-4xl bg-white/80 p-8 shadow-inner">
              <h3 className="text-2xl font-semibold text-[#2e3040]">Questions about your privacy?</h3>
              <p className="mt-4 text-[#585a68]">Our dedicated Data Protection Officer is here to help you understand how we safeguard your information.</p>
              <div className="mt-6 flex flex-col gap-3">
                <button className="rounded-2xl bg-[#e8eaf0] px-6 py-3 font-semibold text-[#6366f1]">Email Privacy Team</button>
                <button className="rounded-2xl bg-[#f0f2f8] px-6 py-3 font-semibold text-[#2e3040]">Help Center</button>
              </div>
            </div>
            <div className="rounded-4xl bg-[#f8f8fb] p-6 text-center">
              <p className="text-sm text-[#585a68]">© 2026 Silk Task Inc. All rights reserved.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-[#6366f1]">
                <Link to="/privacy-policy" className="transition hover:text-[#7c3aed]">Privacy Policy</Link>
                <span>•</span>
                <Link to="/pricing" className="transition hover:text-[#7c3aed]">Terms of Service</Link>
                <span>•</span>
                <Link to="/solutions" className="transition hover:text-[#7c3aed]">GDPR Compliance</Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
