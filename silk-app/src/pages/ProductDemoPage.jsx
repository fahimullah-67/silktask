function ProductDemoPage() {
  return (
    <main className="min-h-screen bg-[#e8eaf0] px-6 py-24 text-[#2e3040]">
      <div className="mx-auto max-w-7xl space-y-12">
        <section className="rounded-[3rem] bg-[#e8eaf0] p-10 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Interactive Demo</p>
              <h1 className="mt-4 text-4xl font-semibold text-[#2e3040]">Experience Silk Task</h1>
              <p className="mt-4 text-[#585a68]">A hands-on walkthrough of the tactile product experience, showing how modern teams can move faster with calm, contextual workflows.</p>
            </div>
            <button className="rounded-3xl bg-[#e8eaf0] px-6 py-4 font-semibold text-[#6366f1] shadow-inner transition hover:-translate-y-px">Launch Sandbox</button>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-[2.5rem] bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <div className="relative overflow-hidden rounded-4xl bg-[#f8f8fb] p-8">
              <div className="aspect-video rounded-3xl bg-[#e8eaf0] shadow-inner" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-lg transition hover:scale-105">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </button>
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { title: 'Smart Categorization', value: 'AI', icon: 'auto_awesome' },
                { title: 'Dimensional Views', value: '3D', icon: 'layers' },
                { title: 'Real-time Collab', value: 'Live', icon: 'sync' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-white/70 p-6 shadow-inner">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ede9fe] text-[#7c3aed]">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#2e3040]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#585a68]">{item.value} workflow acceleration for every stage of your rollout.</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="space-y-6 rounded-4xl bg-[#e8eaf0] p-8 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
            <div className="rounded-4xl bg-white/70 p-6 shadow-inner">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Demo Chapters</p>
              <ul className="mt-6 space-y-4 text-[#585a68]">
                <li className="rounded-3xl bg-[#f8f8fb] p-4">00:00 - 02:30 Tactile Foundations</li>
                <li className="rounded-3xl bg-[#f8f8fb] p-4">02:30 - 05:45 Advanced Analytics</li>
                <li className="rounded-3xl bg-[#f8f8fb] p-4">05:45 - 08:15 Team Orchestration</li>
                <li className="rounded-3xl bg-[#f8f8fb] p-4">08:15 - 12:00 Enterprise Security</li>
              </ul>
            </div>
            <div className="rounded-4xl bg-white/70 p-6 shadow-inner text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-[#585a68]">Focus Score</p>
              <p className="mt-4 text-4xl font-semibold text-[#6366f1]">98%</p>
              <p className="mt-2 text-sm text-[#585a68]">Avg. user improvement across demo participants.</p>
            </div>
            <button className="w-full rounded-3xl bg-[#e8eaf0] px-6 py-4 font-semibold text-[#6366f1] transition hover:-translate-y-px">Download PDF Guide</button>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default ProductDemoPage
