// Campaign links: /go/<name>/ pages that count a click and then forward.
//
// Cloudflare Web Analytics deliberately drops query strings, so ?utm_source=
// never reaches the dashboard — a UTM-tagged link is indistinguishable from an
// untagged one. Path is a reported dimension, so a campaign has to be a path.
// Every hit on /go/<name>/ becomes its own row in the Paths report, which is
// the only way to tell which LinkedIn post sent the visit. It also survives
// the mobile LinkedIn app stripping the referrer.
//
// Every note gets /go/<slug>/ for free. Add an entry here for a destination
// that is not a note, or for a second run at a note that already has one —
// a repost needs its own row or it just inflates the first one's count.

export const CAMPAIGNS = [
  { name: 'home', to: '/', note: 'Portfolio home' },
  { name: 'notes', to: '/blog/', note: 'Field Notes index' },
  { name: 'call', to: '/#contact', note: 'Book a free architecture call' },
]
