// Rules behind the "Scope your project" section. No AI: the visitor answers a
// handful of questions and buildScope() assembles a first-pass scope from the
// phases, risks and first steps below, which come from real past projects.
// Weeks are for one senior engineer; ranges widen with integrations, scale,
// an existing live system and sensitive data.

export const QUESTIONS = [
  {
    id: 'type',
    label: 'What do you need?',
    options: [
      { value: 'agent', label: 'An AI agent or automation' },
      { value: 'llm', label: 'AI features in my product' },
      { value: 'product', label: 'A new web or SaaS product' },
      { value: 'scale', label: 'Fix a system that is slowing down' },
      { value: 'devops', label: 'Reliable deploys and cloud' },
      { value: 'lead', label: 'A fractional tech lead' },
    ],
  },
  {
    id: 'stage',
    label: 'What exists today?',
    options: [
      { value: 'idea', label: 'Just the idea' },
      { value: 'prototype', label: 'A prototype or MVP' },
      { value: 'live', label: 'A live product with users' },
      { value: 'large', label: 'A large live system and team' },
    ],
  },
  {
    id: 'integrations',
    label: 'What does it connect to?',
    hint: 'Pick any that apply.',
    multi: true,
    options: [
      { value: 'crm', label: 'CRM or helpdesk' },
      { value: 'payments', label: 'Payments' },
      { value: 'messaging', label: 'Email, chat or SMS' },
      { value: 'internal', label: 'Internal database or ERP' },
      { value: 'ai', label: 'Third-party AI APIs' },
      { value: 'mobile', label: 'A mobile app' },
    ],
  },
  {
    id: 'users',
    label: 'Who uses it, and how many?',
    options: [
      { value: 'internal', label: 'An internal team' },
      { value: 'hundreds', label: 'Hundreds of customers' },
      { value: 'thousands', label: 'Thousands' },
      { value: 'large', label: '100k+ or high volume' },
    ],
  },
  {
    id: 'timeline',
    label: 'When do you need it?',
    options: [
      { value: 'asap', label: 'Within a month' },
      { value: 'quarter', label: 'In 1–3 months' },
      { value: 'flexible', label: 'Flexible' },
    ],
  },
  {
    id: 'sensitive',
    label: 'Does it handle health, financial or other sensitive personal data?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
]

export const REQUIRED = ['type', 'stage', 'users', 'timeline', 'sensitive']

const TYPES = {
  agent: {
    title: 'AI agent for your workflow',
    approach: [
      'Map the workflow the agent takes over, and collect real examples of the inputs it will see.',
      'Agree what "good" looks like and turn the examples into an evaluation set.',
      'Build the agent with tools for your systems, and run it in shadow mode next to your team.',
      'Go live with a human approval step, then remove approvals where the numbers hold up.',
    ],
    phases: [
      { name: 'Discovery and evaluation set', weeks: [1, 1], deliverable: 'The workflow mapped, 50–200 real examples, and success criteria' },
      { name: 'Agent build', weeks: [2, 4], build: true, deliverable: 'A working agent with tools for your systems, running in shadow mode' },
      { name: 'Shadow run and tuning', weeks: [1, 2], deliverable: 'Accuracy measured against the evaluation set, failure cases fixed' },
      { name: 'Rollout with review', weeks: [1, 2], deliverable: 'Live in the workflow with approvals, logging and cost tracking' },
    ],
    risks: [
      ['Accuracy on edge cases', 'Build the evaluation set from real examples first, and keep a human approval step until the numbers hold up.'],
      ['Running costs creep up', 'Track cost per task from day one, and use caching or smaller models where quality allows.'],
    ],
    firstStep: 'A one-week discovery sprint that ends with an evaluation set and a clear go or no-go.',
  },
  llm: {
    title: 'AI features in your product',
    approach: [
      'Pick the one or two features where AI saves your users the most time.',
      'Prototype them on your real data so you can judge quality before committing.',
      'Integrate behind a feature flag, with guardrails, fallbacks and cost limits.',
      'Add an evaluation suite and monitoring so quality doesn\'t drift after launch.',
    ],
    phases: [
      { name: 'Use-case selection', weeks: [1, 1], deliverable: 'The features worth building, with data and success measures for each' },
      { name: 'Prototype on real data', weeks: [1, 2], deliverable: 'A working feature behind a flag, tested on your data' },
      { name: 'Production integration', weeks: [2, 3], build: true, deliverable: 'The feature in your product with guardrails, fallbacks and cost limits' },
      { name: 'Evaluation and monitoring', weeks: [1, 1], deliverable: 'An evaluation suite and dashboards that catch quality regressions' },
    ],
    risks: [
      ['Made-up or off-brand answers', 'Ground answers in your own data, add guardrails, and test against an evaluation set before launch.'],
      ['Lock-in to one AI vendor', 'Keep the model behind a thin interface so you can switch providers later.'],
    ],
    firstStep: 'A one-to-two-week prototype on your real data, so you see the quality before committing.',
  },
  product: {
    title: 'A new web or SaaS product',
    approach: [
      'Pin the first release to one core workflow, and keep a written list of everything that comes later.',
      'Design the data model and architecture so growth doesn\'t force a rebuild.',
      'Build in short releases you can click through every week.',
      'Ship with tests, CI/CD and monitoring from day one, not bolted on at the end.',
    ],
    phases: [
      { name: 'Discovery and architecture', weeks: [1, 2], deliverable: 'A fixed MVP scope, the data model and the architecture' },
      { name: 'MVP build', weeks: [6, 10], build: true, deliverable: 'The first releasable version of the core workflow' },
      { name: 'Hardening and launch', weeks: [2, 3], deliverable: 'Tests, CI/CD, monitoring and a launch you can roll back' },
    ],
    risks: [
      ['Scope creep before launch', 'Fix the first release to one core workflow and keep a written "later" list.'],
      ['Shortcuts that force a rewrite', 'Spend the first week on the data model and architecture, while changes are still cheap.'],
    ],
    firstStep: 'A one-to-two-week discovery and architecture sprint that ends with a fixed MVP scope.',
  },
  scale: {
    title: 'Scaling and fixing your existing system',
    approach: [
      'Measure first: profile the slow paths, read the logs and map where the time and errors go.',
      'Fix the worst bottlenecks quickly, usually queries, caching and moving slow work onto queues.',
      'Restructure only the parts that need it, step by step, behind a safe migration path.',
      'Leave tests and monitoring in place so the problems don\'t come back.',
    ],
    phases: [
      { name: 'Architecture review', weeks: [1, 2], deliverable: 'A written assessment: bottlenecks, risks and a ranked plan' },
      { name: 'Quick wins', weeks: [2, 3], deliverable: 'Fixes for the worst bottlenecks, such as queries, caching and queues' },
      { name: 'Structural changes', weeks: [4, 8], build: true, deliverable: 'The parts that need it restructured or extracted, migrated safely' },
    ],
    risks: [
      ['Breaking a live system while changing it', 'Add tests and monitoring around each part before changing it.'],
      ['The urge to rewrite everything', 'Change the system step by step, strangler-style, rather than in one big rewrite.'],
    ],
    firstStep: 'A one-to-two-week architecture review with a written, ranked plan you can act on with or without me.',
  },
  devops: {
    title: 'Reliable deploys and cloud setup',
    approach: [
      'Audit how code gets from a laptop to production today, and where it breaks.',
      'Containerise the app so every environment builds the same way.',
      'Set up a CI/CD pipeline with tests, so a deploy is one click and boring.',
      'Move to managed cloud infrastructure with monitoring and a tested rollback.',
    ],
    phases: [
      { name: 'Build and infrastructure audit', weeks: [1, 1], deliverable: 'The current setup mapped, with a migration plan' },
      { name: 'Containers and CI/CD', weeks: [2, 3], build: true, deliverable: 'Dockerised builds and a CI/CD pipeline with tests' },
      { name: 'Cloud setup and cut-over', weeks: [1, 3], deliverable: 'Production on AWS ECS or your cloud, with rollback and monitoring' },
    ],
    risks: [
      ['Downtime during the cut-over', 'Run the old and new pipelines side by side, and cut over with a tested rollback.'],
      ['Secrets scattered across machines', 'Move them into a secrets manager as part of the setup.'],
    ],
    firstStep: 'A one-week audit of your build, deploys and infrastructure, ending with a migration plan.',
  },
  lead: {
    title: 'Fractional engineering leadership',
    approach: [
      'Listen first: meet the team, read the code, and trace how work gets from idea to production.',
      'Fix the two or three things slowing delivery the most before adding any new process.',
      'Set technical direction with lightweight architecture reviews and written decisions.',
      'Mentor the senior engineers and help hire, so the team outgrows the engagement.',
    ],
    phases: [
      { name: 'First 30 days', weeks: [4, 4], deliverable: 'An assessment of team, codebase and delivery, and a 90-day technical plan' },
      { name: 'Ongoing leadership', weeksLabel: 'ongoing', deliverable: 'Architecture reviews, mentoring and hiring support, 1–3 days a week' },
    ],
    risks: [
      ['Change fatigue in the team', 'Start by listening, and fix the top pain points before introducing new process.'],
    ],
    firstStep: 'A 30-day engagement to assess the team and codebase and agree a 90-day plan.',
  },
}

const INTEGRATION_RISKS = {
  crm: ['Rate limits and messy data in your CRM or helpdesk', 'Check API limits and data quality in week one, and sync through a queue.'],
  payments: ['Payment edge cases: refunds, failed charges, disputes', "Build against the provider's test mode and handle webhooks idempotently."],
  messaging: ['Email or SMS deliverability', 'Set up proper sending domains and use a provider with delivery tracking.'],
  internal: ['Legacy or undocumented internal systems', 'Map the data early and put an adapter layer between it and the new work.'],
  ai: ['Third-party AI API limits and outages', 'Add timeouts, retries and a fallback path, and cap spend per day.'],
  mobile: ['App store review delays', 'Ship early builds to internal testing tracks so review never blocks launch.'],
}

const STAGE_PHRASE = {
  idea: 'starting from an idea',
  prototype: 'building on a prototype or MVP',
  live: 'in a live product',
  large: 'inside a large live system',
}

const USERS_PHRASE = {
  internal: 'used by an internal team',
  hundreds: 'for hundreds of customers',
  thousands: 'for thousands of users',
  large: 'at high volume (100k+ users)',
}

export const label =(questionId, value) =>
  QUESTIONS.find((q) => q.id === questionId)?.options.find((o) => o.value === value)?.label ?? value

const fmt = ([lo, hi]) => (lo === hi ? `${lo}` : `${lo}–${hi}`)

export function buildScope(answers) {
  const type = TYPES[answers.type]
  const integrations = answers.integrations || []
  const live = answers.stage === 'live' || answers.stage === 'large'

  // How much the build phase grows. Each integration adds half a week to a
  // week; a large live system or high volume makes every change slower.
  let factor = 1
  if (answers.stage === 'large') factor *= 1.4
  else if (answers.stage === 'live' && ['agent', 'llm', 'product'].includes(answers.type)) factor *= 1.15
  if (answers.stage === 'prototype' && answers.type === 'product') factor *= 0.7
  if (answers.users === 'large' && ['product', 'scale', 'llm'].includes(answers.type)) factor *= 1.3

  const phases = type.phases.map((p) => {
    if (!p.weeks) return { ...p, weeks: p.weeksLabel }
    let [lo, hi] = p.weeks
    if (p.build) {
      lo = Math.round(lo * factor + integrations.length * 0.5)
      hi = Math.round(hi * factor + integrations.length)
    }
    return { ...p, range: [lo, hi], weeks: fmt([lo, hi]) }
  })

  if (answers.sensitive !== 'no') {
    phases.splice(phases.length - 1, 0, {
      name: 'Security and data review',
      range: [1, 2],
      weeks: '1–2',
      deliverable: 'Data handling, access rules and logging agreed and checked before launch',
    })
  }

  const ranged = phases.filter((p) => p.range)
  const total = [ranged.reduce((s, p) => s + p.range[0], 0), ranged.reduce((s, p) => s + p.range[1], 0)]

  const risks = type.risks.map(([risk, mitigation]) => ({ risk, mitigation }))
  integrations.forEach((i) => {
    const [risk, mitigation] = INTEGRATION_RISKS[i]
    risks.push({ risk, mitigation })
  })
  if (answers.sensitive !== 'no') {
    risks.push({
      risk: 'Handling sensitive data',
      mitigation: 'Agree data handling and access up front, and keep personal data out of logs and AI prompts.',
    })
  }
  if (answers.users === 'large') {
    risks.push({
      risk: 'Load at peak volume',
      mitigation: 'Load-test the critical paths before launch, and design for queues and horizontal scaling.',
    })
  }
  if (answers.timeline === 'asap') {
    risks.push({
      risk: 'A deadline under a month',
      mitigation: 'Cut to the smallest slice that proves the value. Some phases can overlap with a second engineer.',
    })
  }

  const assumptions = ['One senior engineer (me), with your team providing access, domain knowledge and quick feedback.']
  if (answers.stage === 'idea') assumptions.push('No existing code or system to work around.')
  if (live) assumptions.push('Access to a staging environment, production logs and the people who know the current system.')
  if (answers.sensitive === 'unsure') assumptions.push('Whether the data is sensitive gets settled in the first week.')

  const summary =
    `${label('type', answers.type)}, ${STAGE_PHRASE[answers.stage]}, ${USERS_PHRASE[answers.users]}` +
    (integrations.length
      ? `, connecting to ${integrations.map((i) => label('integrations', i).replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase())).join(', ')}.`
      : '.')

  return {
    title: type.title,
    summary,
    approach: type.approach,
    phases,
    total: answers.type === 'lead' ? null : fmt(total),
    risks,
    assumptions,
    firstStep: type.firstStep,
  }
}

export function scopeAsText(scope, answers, notes) {
  const lines = [
    scope.title,
    scope.summary,
    `Timeline wanted: ${label('timeline', answers.timeline)}. Sensitive data: ${label('sensitive', answers.sensitive)}.`,
  ]
  if (notes) lines.push('', 'Notes:', notes)
  lines.push(
    '',
    'Phases',
    ...scope.phases.map((p) => `- ${p.name} (${p.weeks}${p.range ? ' wk' : ''}): ${p.deliverable}`),
  )
  if (scope.total) lines.push(`Total: ${scope.total} weeks`)
  lines.push('', 'Risks', ...scope.risks.map((r) => `- ${r.risk}. ${r.mitigation}`), '', `First step: ${scope.firstStep}`)
  return lines.join('\n')
}
