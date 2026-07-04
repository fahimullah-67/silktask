import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-16 text-center">
      <div className="max-w-lg rounded-4xl bg-[#e8eaf0] p-10 neo-raised">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Page not found</p>
        <h2 className="mt-3 text-4xl font-semibold text-[#2e3040]">The route you requested is not available.</h2>
        <p className="mt-4 text-[#585a68]">Return to the workspace and continue from a known board or screen.</p>
        <Link to="/dashboard" className="mt-8 inline-flex rounded-2xl bg-[#e8eaf0] px-6 py-3 font-semibold text-[#6366f1] neo-raised">Back to dashboard</Link>
      </div>
    </main>
  )
}

export default NotFoundPage
