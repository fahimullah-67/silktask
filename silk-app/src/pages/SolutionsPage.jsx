function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#e8eaf0] px-6 py-24 text-[#2e3040]">
      <div className="mx-auto max-w-7xl space-y-12">
        <section className="rounded-[3rem] bg-[#e8eaf0] p-10 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Solutions</p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Tailored workflows for every team.</h1>
          <p className="mt-4 text-[#585a68]">Discover how Silk Task adapts its tactile interface and dimensional architecture to the demands of modern engineering, creative, and operations teams.</p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-[2.5rem] bg-[#e8eaf0] p-10 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#6366f1]">Tech & Product</p>
                <h2 className="mt-4 text-3xl font-semibold text-[#2e3040]">High-velocity teams move with confidence.</h2>
                <p className="mt-4 text-[#585a68]">Sync your release loop, engineering telemetry, and backlog planning in a single tactile workspace.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-white/70 p-6 shadow-inner">
                  <p className="font-semibold text-[#2e3040]">Automated sprint planning</p>
                  <p className="mt-2 text-sm text-[#585a68]">Reduce manual triage by surfacing priorities automatically.</p>
                </div>
                <div className="rounded-3xl bg-white/70 p-6 shadow-inner">
                  <p className="font-semibold text-[#2e3040]">Deep GitHub & GitLab Sync</p>
                  <p className="mt-2 text-sm text-[#585a68]">Connect code and work without leaving your task board.</p>
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-[2.5rem] bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white/70 p-6 shadow-inner">
                <p className="text-sm uppercase tracking-[0.24em] text-[#6366f1]">Creative Agencies</p>
                <p className="mt-4 text-[#585a68]">Visual-first workflows for client reviews, campaigns, and brand launches.</p>
              </div>
              <div className="rounded-3xl bg-white/70 p-6 shadow-inner">
                <p className="text-sm uppercase tracking-[0.24em] text-[#6366f1]">Enterprise Ops</p>
                <p className="mt-4 text-[#585a68]">Governance, reporting, and cross-team orchestration at scale.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="rounded-[3rem] bg-[#f8f8fb] p-10 shadow-inner">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-[#e8eaf0] p-6">
              <p className="font-semibold text-[#2e3040]">AI-driven tagging</p>
              <p className="mt-2 text-sm text-[#585a68]">Understand task intent automatically so teams can move faster.</p>
            </div>
            <div className="rounded-3xl bg-[#e8eaf0] p-6">
              <p className="font-semibold text-[#2e3040]">Global reporting</p>
              <p className="mt-2 text-sm text-[#585a68]">Surface cross-portfolio performance from one place.</p>
            </div>
            <div className="rounded-3xl bg-[#e8eaf0] p-6">
              <p className="font-semibold text-[#2e3040]">Dedicated support</p>
              <p className="mt-2 text-sm text-[#585a68]">Get guided onboarding and enterprise success planning.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SolutionsPage
