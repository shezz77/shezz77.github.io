// Content for the portfolio, mirrored from the source design (Portfolio.dc.html).
// Kept in one place so sections stay data-driven.

// Keywords for the scrolling marquee under the hero.
export const marquee = [
  'System Design',
  'Microservices',
  'Event-Driven',
  'Laravel',
  'Node.js',
  'React.js',
  'Electron.js',
  'AWS ECS',
  'Docker',
  'RabbitMQ',
  'CI/CD',
]

export const services = [
  {
    no: '01',
    title: 'System & Solution Architecture',
    desc: "Event-driven microservices, domain-driven design, and REST APIs built to scale — or a pragmatic monolith when that's the smarter call.",
  },
  {
    no: '02',
    title: 'Fractional Engineering Leadership',
    desc: 'A Principal Engineer / EM to set technical direction, run architecture reviews, mentor your team, and raise delivery velocity.',
  },
  {
    no: '03',
    title: 'Cloud & DevOps Modernization',
    desc: 'Dockerized builds, AWS ECS/ECR, and CI/CD pipelines that make deployments reliable, repeatable, and boring — in the best way.',
  },
  {
    no: '04',
    title: 'AI-Assisted Product Development',
    desc: 'LLM integration and AI-driven workflows that ship real products faster — including native Android apps, concept to store.',
  },
  {
    no: '05',
    title: 'Full-Stack Product Delivery',
    desc: 'End-to-end builds across Laravel, Node.js, React.js, and Electron.js — web, SaaS, and cross-platform desktop.',
  },
  {
    no: '06',
    title: 'Scale & Reliability Reviews',
    desc: 'Pinpoint bottlenecks and de-risk high-volume workloads through architecture audits, data modeling, and async processing.',
  },
]

export const process = [
  {
    no: '01',
    title: 'Discover',
    desc: 'Understand the business, the constraints, and where the real risk lives — before writing a line of code.',
  },
  {
    no: '02',
    title: 'Architect',
    desc: 'Design the system: services, data, events, and the infrastructure to run it reliably at scale.',
  },
  {
    no: '03',
    title: 'Build & harden',
    desc: 'Ship it with tested code, Dockerized builds, and CI/CD pipelines you can actually trust.',
  },
  {
    no: '04',
    title: 'Lead & hand off',
    desc: 'Level up the team through reviews and mentoring so the work outlasts the engagement.',
  },
]

export const engagements = [
  {
    client: 'Moon Group',
    role: 'Software Architect · 2023–2024',
    title: 'CryptoJobs & TheMoonShow, architected from the ground up',
    desc: 'Defined the technical architecture for a Web3 talent marketplace and a media/streaming platform — event-driven communication with RabbitMQ and containerized services on AWS ECS/ECR for scalability and decoupling.',
    tags: ['Event-Driven', 'RabbitMQ', 'AWS ECS/ECR', 'Web3 · Media'],
  },
  {
    client: 'Bayt.com',
    role: 'Principal Engineer · 2020–2023',
    title: "HR-tech SaaS for the Middle East's largest job site",
    desc: 'Led two engineering teams delivering AfterHire (onboarding) and Evalufy (video interviewing & assessment) — owning API design, data modeling, and async processing tuned for high-volume recruitment workloads.',
    tags: ['Led 2 Teams', 'HR-Tech SaaS', 'High Volume', 'CI/CD'],
  },
  {
    client: 'Trustshoot',
    role: 'Engineering Manager · 2024–Present',
    title: 'One product across desktop, web, and services',
    desc: 'Own end-to-end engineering for an Electron.js desktop client, React.js web app, and Node.js service layer — a modular service architecture behind a hardened, Dockerized CI/CD pipeline.',
    tags: ['Cross-Platform', 'Electron.js', 'Node.js', 'CI/CD'],
  },
  {
    client: 'Powersoft19',
    role: 'Full-Stack Engineer · 2018–2020',
    title: 'RailComm Yard Portal — real-time railcar tracking',
    desc: 'Built a safety-critical, real-time train-tracking system for international rail operations, delivering full-stack features and APIs across the React.js / Node.js and PHP / Laravel stacks.',
    tags: ['Safety-Critical', 'Real-Time', 'Full-Stack', 'Enterprise'],
  },
]

export const competencies = [
  {
    no: 'A',
    name: 'Architecture',
    skills: [
      { name: 'System & Solution Design', level: 96 },
      { name: 'Microservices', level: 92 },
      { name: 'Event-Driven Architecture', level: 90 },
      { name: 'Domain-Driven Design', level: 85 },
      { name: 'REST APIs · Scalability & HA', level: 93 },
    ],
  },
  {
    no: 'B',
    name: 'Backend',
    skills: [
      { name: 'PHP / Laravel', level: 96 },
      { name: 'Node.js', level: 90 },
      { name: 'MySQL', level: 90 },
      { name: 'RabbitMQ (message queues)', level: 85 },
      { name: 'Server-Side Rendering', level: 82 },
    ],
  },
  {
    no: 'C',
    name: 'Frontend',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Electron.js (desktop)', level: 88 },
      { name: 'Progressive & Reactive Web Apps', level: 85 },
      { name: 'SEO / Isomorphic Rendering', level: 80 },
    ],
  },
  {
    no: 'D',
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS (ECS, ECR)', level: 88 },
      { name: 'Docker', level: 91 },
      { name: 'CI/CD Pipelines', level: 88 },
      { name: 'Cloud Infrastructure', level: 85 },
    ],
  },
  {
    no: 'E',
    name: 'AI Engineering',
    skills: [
      { name: 'AI-Assisted Product Development', level: 85 },
      { name: 'LLM Integration', level: 82 },
      { name: 'AI-Driven Mobile App Delivery', level: 80 },
    ],
  },
  {
    no: 'F',
    name: 'Leadership',
    skills: [
      { name: 'Engineering Management', level: 92 },
      { name: 'Technical Direction', level: 92 },
      { name: 'Team Leadership & Mentoring', level: 90 },
      { name: 'Code Review · Hiring · Agile/SDLC', level: 88 },
    ],
  },
]

export const stats = [
  { value: '11+', label: 'Years building & scaling products' },
  { value: '2', label: 'Engineering teams led as Principal' },
  { value: '6+', label: 'Production products architected' },
  { value: 'Gold', label: 'Medalist — MSc Information Technology' },
]

export const links = [
  { label: 'github.com/shezz77', href: 'https://github.com/shezz77' },
  { label: 'shezz77.github.io', href: 'https://shezz77.github.io' },
  {
    label: 'Google Play Portfolio',
    href: 'https://play.google.com/store/apps/developer?id=shezz77',
  },
  { label: 'shezz77.se@gmail.com', href: 'mailto:shezz77.se@gmail.com' },
]

// Floating monospace tokens scattered across the hero backdrop.
export const heroTokens = [
  { label: 'event-driven', top: '20%', left: '5%', tone: 'rust', dur: '7s', delay: '0s' },
  { label: 'Docker', top: '74%', left: '9%', tone: 'muted', dur: '9s', delay: '.8s' },
  { label: 'Laravel', top: '16%', left: '42%', tone: 'muted', dur: '11s', delay: '.6s' },
]

// Scripted lines for the hero terminal typing animation.
// c: 'cmd' (prompt) or 'out' (output).
export const terminalLines = [
  { c: 'cmd', s: '$ whoami' },
  { c: 'out', s: 'Shehzad Aslam — Software Architect' },
  { c: 'cmd', s: '$ ./design --system' },
  { c: 'out', s: '✓ event-driven microservices' },
  { c: 'out', s: '✓ dockerized · AWS ECS/ECR · CI/CD' },
  { c: 'cmd', s: '$ ./lead --team' },
  { c: 'out', s: '✓ shipped. team leveled up.' },
]
