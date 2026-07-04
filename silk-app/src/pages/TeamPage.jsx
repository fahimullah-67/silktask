import { teamMembers } from '../data/siteContent'

function TeamPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Team overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#2e3040]">A collaborative unit built for momentum</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {teamMembers.map((member) => (
            <div key={member.name} className="rounded-3xl bg-white/50 p-5 neo-inset">
              <p className="font-semibold text-[#2e3040]">{member.name}</p>
              <p className="mt-1 text-sm text-[#585a68]">{member.role}</p>
              <p className="mt-4 text-sm text-[#404252]">{member.focus}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="neo-raised rounded-4xl bg-[#e8eaf0] p-8">
        <h3 className="text-xl font-semibold text-[#2e3040]">Current sync</h3>
        <ul className="mt-6 space-y-4 text-sm text-[#585a68]">
          <li className="rounded-2xl bg-white/50 p-4 neo-inset">Weekly planning in 15 minutes.</li>
          <li className="rounded-2xl bg-white/50 p-4 neo-inset">Q3 launch prep is on track.</li>
          <li className="rounded-2xl bg-white/50 p-4 neo-inset">Design QA checkpoints are shared.</li>
        </ul>
      </div>
    </div>
  )
}

export default TeamPage
