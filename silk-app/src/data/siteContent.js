export const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/tasks', label: 'My Tasks', icon: 'assignment' },
  { to: '/profile', label: 'Profile', icon: 'person' },
  { to: '/team', label: 'Team', icon: 'group' },
  { to: '/analytics', label: 'Analytics', icon: 'bar_chart' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
  { to: '/pricing', label: 'Pricing', icon: 'workspace_premium' },
]

export const featureCards = [
  {
    title: 'Ironclad Security',
    body: 'Enterprise-grade encryption and smart access control protect every workflow from top to bottom.',
    icon: 'shield_person',
    accent: 'text-[#6366f1]',
    href: '/pricing',
    linkText: 'Privacy Policy',
  },
  {
    title: 'Seamless Teamwork',
    body: 'Coordinate work, assign ownership, and keep every decision visible in context.',
    icon: 'groups_3',
    accent: 'text-[#7c3aed]',
    href: '/team',
    linkText: 'Team Features',
  },
  {
    title: 'Deep Analytics',
    body: 'Understand velocity, delivery health, and team focus through elegant live metrics.',
    icon: 'monitoring',
    accent: 'text-[#6366f1]',
    href: '/analytics',
    linkText: 'View Demo',
  },
]

export const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for solo operators shaping the first version of their workflow.',
    features: ['Up to 5 projects', 'Basic automations', 'Community support'],
    highlight: false,
    badge: 'Current Plan',
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'Everything a scaling team needs to orchestrate work with clarity.',
    features: ['Unlimited projects', 'Advanced logic engine', '10GB storage'],
    highlight: true,
    badge: 'Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated controls for large organizations with strict governance needs.',
    features: ['Priority support', 'Custom integrations', 'Advanced security'],
    highlight: false,
    badge: 'Contact Sales',
  },
]

export const teamMembers = [
  { name: 'Alicia Chen', role: 'Design Lead', focus: 'Experience systems' },
  { name: 'Noah Patel', role: 'Product Strategist', focus: 'Roadmap clarity' },
  { name: 'Maya Singh', role: 'Operations', focus: 'Execution health' },
]

export const quickFocusItems = [
  'Review launch checklist for the client rollout.',
  'Confirm handoff for the new onboarding experience.',
  'Prep analytics report for the leadership sync.',
]

export const analyticsBars = [72, 48, 84, 66, 92]
