import { pricingPlans } from '../data/siteContent'

function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Flexible plans</p>
        <h2 className="mt-3 text-4xl font-semibold text-[#2e3040]">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-[#585a68]">Choose the plan that matches your team&apos;s current stage and future scale.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className={`neo-raised rounded-4xl bg-[#e8eaf0] p-8 ${plan.highlight ? 'ring-2 ring-[#6366f1]/20' : ''}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-[#2e3040]">{plan.name}</h3>
              {plan.highlight ? <span className="rounded-full bg-[#6366f1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">Popular</span> : null}
            </div>
            <p className="mt-4 text-sm text-[#585a68]">{plan.description}</p>
            <div className="mt-8 text-4xl font-semibold text-[#2e3040]">{plan.price}</div>
            <ul className="mt-6 space-y-3 text-sm text-[#585a68]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 rounded-2xl bg-white/50 p-3 neo-inset">
                  <span className="material-symbols-outlined text-[#6366f1]">check_circle</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-2xl bg-[#e8eaf0] px-4 py-3 font-semibold text-[#6366f1] neo-raised" type="button">{plan.badge}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingPage
