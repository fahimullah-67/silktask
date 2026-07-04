import { Link } from 'react-router-dom'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#e8eaf0] text-[#2e3040]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/60 bg-[#e8eaf0]/90 px-6 py-4 backdrop-blur md:px-10 lg:px-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="neo-raised flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8eaf0]">
            <span className="material-symbols-outlined text-[#6366f1]" style={{ fontVariationSettings: 'FILL 1' }}>dataset</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#2e3040]">Silk Task</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#585a68]">Management Platform</p>
          </div>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#585a68] md:flex">
          <a href="#features" className="transition hover:text-[#6366f1]">Features</a>
          <a href="#solutions" className="transition hover:text-[#6366f1]">Solutions</a>
          <Link to="/pricing" className="transition hover:text-[#6366f1]">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="rounded-2xl px-5 py-2.5 font-semibold text-[#2e3040] transition hover:text-[#6366f1]">Log In</Link>
          <Link to="/register" className="neo-raised rounded-2xl bg-[#e8eaf0] px-5 py-2.5 font-semibold text-[#6366f1] transition hover:-translate-y-px">Get Started</Link>
        </div>
      </nav>
      {children}
      <footer className="border-t border-white/70 bg-[#e8eaf0] px-6 py-10 text-center text-sm text-[#585a68] md:px-10 lg:px-16">
        © 2026 Silk Task Inc. Designed for modern product teams and high-trust operations.
      </footer>
    </div>
  )
}

export default PublicLayout
