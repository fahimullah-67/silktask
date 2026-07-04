import { Link } from 'react-router-dom'
import { featureCards } from '../data/siteContent'

function HomePage() {
  return (
    <main>
      <section className="px-6 py-16 text-center md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="neo-inset mb-8 inline-flex items-center rounded-full bg-[#e8eaf0] px-4 py-2 text-sm font-medium text-[#6366f1]">
            <span className="mr-2 text-xs font-bold uppercase tracking-[0.2em]">New release</span>
            <span className="text-[#585a68]">v4.0 now includes AI-assisted task orchestration.</span>
          </div>
          <h2 className="text-5xl font-semibold tracking-tight text-[#2e3040] md:text-7xl">
            Manage work like it&apos;s <span className="italic text-[#6366f1]">flowing silk.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#585a68]">
            A tactile, modern workspace for product teams that need calm, clarity, and measurable momentum in every sprint.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/dashboard" className="neo-raised flex items-center gap-3 rounded-2xl bg-[#e8eaf0] px-8 py-4 font-semibold text-[#6366f1] transition hover:-translate-y-px">
              Get Started for Free
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <a href="#features" className="neo-inset rounded-2xl bg-[#e8eaf0] px-8 py-4 font-semibold text-[#585a68]">Learn More</a>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-4xl border border-white/70 bg-[#e8eaf0] p-4 neo-raised md:p-8">
          <img className="h-105 w-full rounded-3xl object-cover" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80" alt="Modern task dashboard" />
        </div>
      </section>

      <section id="features" className="bg-[#e8eaf0] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h3 className="text-4xl font-semibold text-[#2e3040]">Core dimensions</h3>
            <p className="mx-auto mt-4 max-w-2xl text-[#585a68]">Every touchpoint is built to feel calm, reliable, and precise from first login to final delivery.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featureCards.map((card) => (
              <article key={card.title} className="neo-raised flex flex-col gap-6 rounded-4xl bg-[#e8eaf0] p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl neo-inset">
                  <span className={`material-symbols-outlined text-3xl ${card.accent}`} style={{ fontVariationSettings: 'FILL 1' }}>{card.icon}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-[#2e3040]">{card.title}</h4>
                  <p className="mt-3 leading-relaxed text-[#585a68]">{card.body}</p>
                </div>
                <Link to={card.href} className={`mt-auto font-semibold ${card.accent}`}>{card.linkText}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          <div className="neo-raised relative flex h-128 flex-col justify-end overflow-hidden rounded-[2.5rem] bg-[#e8eaf0] p-8 lg:col-span-2 lg:row-span-2">
            <img className="absolute inset-0 h-full w-full object-cover opacity-30" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Focused workflow" />
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold text-[#2e3040]">Focused flow state</h3>
              <p className="mt-4 max-w-xl text-[#404252]">Reduce noise, surface priorities, and keep your team on the same page without overwhelming them.</p>
              <Link to="/tasks" className="mt-8 inline-flex rounded-2xl bg-[#e8eaf0] px-6 py-3 font-semibold text-[#6366f1] neo-inset">Explore Workflows</Link>
            </div>
          </div>
          <div className="neo-raised flex items-center gap-4 rounded-4xl bg-[#e8eaf0] p-8 lg:col-span-2">
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-[#2e3040]">Mobile first</h4>
              <p className="mt-2 text-sm text-[#585a68]">The experience stays tactile and accessible whether you are planning on desktop or on the move.</p>
            </div>
            <div className="neo-inset flex h-24 w-24 items-center justify-center rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-[#6366f1]">smartphone</span>
            </div>
          </div>
          <div className="neo-raised flex flex-col items-center justify-center rounded-4xl bg-[#e8eaf0] p-8 text-center">
            <div className="text-4xl font-semibold text-[#6366f1]">99.9%</div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#585a68]">Uptime</div>
          </div>
          <div className="neo-raised flex flex-col items-center justify-center rounded-4xl bg-[#e8eaf0] p-8 text-center">
            <div className="text-4xl font-semibold text-[#7c3aed]">20k+</div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#585a68]">Users</div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl rounded-[3rem] bg-[#e8eaf0] p-10 text-center neo-inset md:p-16">
          <h3 className="text-4xl font-semibold text-[#2e3040]">Ready to feel the difference?</h3>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#585a68]">Join teams that value calm operations, beautiful design, and higher delivery confidence.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input className="neo-inset w-full rounded-2xl border-none bg-[#e8eaf0] px-5 py-4 text-[#2e3040] outline-none placeholder:text-[#8a8c9a] sm:w-80" placeholder="Enter your work email" />
            <button className="neo-raised rounded-2xl bg-[#e8eaf0] px-8 py-4 font-semibold text-[#6366f1]" type="button">Join the Waitlist</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
