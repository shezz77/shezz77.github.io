# Upwork profile — rewrite, ready to paste

> **STATUS (2026-09-21): title, overview, skills and categories are LIVE on the profile.**
> Applied directly at upwork.com/freelancers/~01bfb1027e0bc93f80. What the live profile
> turned out to be, versus what this file assumed:
>
> | | Assumed | Actual |
> |---|---|---|
> | Rate | needed raising to $60 | **already $60/hr** — unchanged |
> | History | "some contracts" | 7 jobs, $4K, 256 hrs, **last one ended Apr 2024** |
> | Skills cap | 10 | **20** |
> | Specialized profiles | assumed available | **none created** — still to do |
> | Experience level | unknown | already **Expert** |
>
> Still outstanding, listed at the end of this file: the second specialized profile,
> portfolio items, Project Catalog, the Moon Group date bug, and hours-per-week.


Positioning follows the LinkedIn work: **agent engineering as a discipline**, with
architecture as the second specialized profile. Every claim below is already published
at shezz77.com, so nothing here has to be backed up after the fact.

Rate band: **$60/hr** on the AI profile, **$55/hr** on the architecture profile.
Raise trigger is at the bottom of this file.

> **Read the "Contact-info trap" section before you paste anything.** Upwork's automated
> scan flags profile text that can route a client off-platform, and your site's footer
> shows your email address.

---

## 1. General profile (leads with AI agents)

### Title — 70 char limit

```
AI Agent Engineer | Claude Agent SDK, MCP, Evals & Guardrails
```

Backups if you want to A/B it:

```
AI Agent Engineer | Production Agents, MCP Servers, Eval Harnesses
```
```
Software Architect & AI Agent Engineer | Claude Agent SDK, MCP
```

### Overview

The first ~250 characters are all a client sees in search results. Everything above the
first line break is doing the selling; the rest is for people who already clicked.

```
I build AI agents that survive contact with production, not demos. Claude Agent SDK,
MCP servers, custom tools, subagent orchestration, hooks and permission boundaries —
plus the evals that prove the thing still works next week.

Most agent projects fail in the same place. The prompt works, the demo lands, and then
somebody asks what happens when the model deletes the wrong row, or why this week's
output is worse than last week's. There is no answer, because nothing was bounded and
nothing was measured.

That gap is my work. Eleven years as a software architect and engineering manager —
Bayt.com, Trustshoot, RailComm — shipping systems where reliability had consequences.
I now apply the same discipline to agents.

WHAT I BUILD

• Production agents on the Claude Agent SDK — tool design, subagent orchestration,
  context scoping, cost and turn limits set before the thing is allowed to run
• MCP servers exposing your database, internal APIs or tooling to Claude Code, Claude
  Desktop or your own agent — with real per-role authorization, not a shared admin key
• Permission boundaries using hooks: deny, rewrite, audit. A prompt asking an agent not
  to do something is a request. A hook that returns deny is a boundary.
• Eval harnesses, so a regression is distinguishable from a bad day — including
  model-written tests graded by mutation testing rather than by coverage percentage
• AI code review wired into CI without becoming the noise your team mutes in a fortnight

AND THE SYSTEM UNDERNEATH

Agents sit on top of real infrastructure, and it usually needs work first. Laravel and
Node.js services, MySQL at volume, RabbitMQ retry pipelines with a poison lane, Docker
on AWS ECS/Fargate, and CI that catches things instead of just running tests.

HOW TO CHECK ANY OF THIS

I publish the work in full, in the open — a four-part Claude Agent SDK series (first
agent, custom tools, subagents, hooks and permissions), a complete MCP server build, and
a piece on scoping MCP database access without handing over the keys. The links are in
my portfolio items below. Read one before you message me; you'll know within five
minutes whether I think the way you need.

HOW I WORK

Remote, GMT+5, with a real overlap on EU mornings and US-East mornings. I will tell you
when a project does not need an agent — a queue and a cron job is often the honest
answer, and you get that answer on the first call rather than three invoices in.

Start with a paid discovery call or one small scoped piece. We'll both know quickly.
```

### Skills — pick the 10 nearest matches in Upwork's autocomplete

The taxonomy is fixed, so type the term and take the closest suggestion:

1. AI Agent Development
2. LLM Prompt Engineering
3. Artificial Intelligence
4. API Integration
5. Node.js
6. TypeScript
7. Python
8. API Development
9. Automation
10. Software Architecture

### Hourly rate

**$60.00/hr** — top of your band. Upwork takes 10%, so you clear $54.

---

## 2. Specialized profile — Backend Architecture

### Title

```
Software Architect | Laravel, Node.js, AWS ECS, MySQL at Scale
```

### Overview

```
Eleven years building backend systems that hold up: Laravel and Node.js services, MySQL
under real load, event-driven messaging with RabbitMQ, and Dockerized deploys on AWS
ECS/Fargate that roll back in forty seconds.

I am usually brought in for one of four things.

THE SYSTEM IS SLOW AND NOBODY KNOWS WHERE
I rank queries by total time across an hour of real traffic, not by worst single
execution — the query that hurts is usually a fast one running forty thousand times. A
recent listing query went from 4.2 seconds to 40 milliseconds: composite index order,
a covering index, and keyset pagination instead of OFFSET. No bigger instance.

THE SCHEDULE IS THE ARCHITECTURE
Fourteen cron jobs, each assuming the previous one finished, none of them saying so
anywhere. I replace the clock with events published in the past tense, plus a
dead-letter queue that turns overnight silence into a replayable Monday morning.

SOMEONE WANTS TO SPLIT THE MONOLITH
Sometimes that is right. Often the answer is a modular monolith with the boundaries
enforced in CI — you get the ownership benefit now and the option to extract later,
without signing up to run four times the infrastructure. I will tell you which one your
incident log actually supports.

DEPLOYS ARE FRIGHTENING
Dockerfile, task definition, secrets handling, a migration gate, GitHub Actions, health
checks that travel the real request path, and a rollback that takes under a minute. The
goal is a deploy pipeline that is genuinely boring.

TRACK RECORD
Engineering Manager at Trustshoot (Electron desktop + React web + Node services).
Principal Software Engineer at Bayt.com, the Middle East's largest job site, leading two
teams on high-volume HR-tech SaaS. Software Architect at Moon Group for a Web3 talent
marketplace and a streaming platform. Full-stack engineer on RailComm's real-time
railcar tracking, where a bug had physical consequences.

I write all of this up in public — the full diagnoses, with the EXPLAIN output and the
trade-offs I accepted. Links are in my portfolio.

Remote, GMT+5, overlapping EU and US-East mornings.
```

### Skills

1. Laravel
2. PHP
3. MySQL
4. Node.js
5. Amazon ECS
6. Docker
7. RabbitMQ
8. CI/CD
9. Database Optimization
10. Software Architecture

### Rate

**$55.00/hr**

---

## 3. Portfolio items

Six items, ordered. Upwork shows the first four on the profile card, so the order matters
more than the count. Each needs an image — use the SVG diagrams already in
`public/blog/img/` exported to PNG, or a screenshot of the post's hero.

**1. Production AI agent with enforced permission boundaries**
> A four-part build on the Claude Agent SDK, published end to end: the first agent and
> the three limits you set before letting it run; custom tools supplied as an in-process
> MCP server; subagents for isolation and parallelism, and what a context rebuild costs;
> and hooks that deny, rewrite and audit. The through-line is that a prompt asking an
> agent not to do something is a request, and only a hook is a boundary.
> *Skills: AI Agent Development, TypeScript, API Development*

**2. MCP server over a production database, with per-role authorization**
> An MCP server exposing a live analytics database to Claude Code and Claude Desktop
> without handing over the keys. Read-only scoping, workspace-level access control
> derived from the app's own role rows, and the hard question most tutorials skip —
> which roles, and who decides when a customer disagrees.
> *Skills: AI Agent Development, API Development, MySQL*

**3. Cross-platform product: Electron desktop, React web, Node services**
> Trustshoot. End-to-end engineering ownership across an Electron desktop client, a
> React web app and a Node.js service layer: architecture, roadmap, delivery direction,
> a distributed team, and Dockerized builds with CI/CD behind every release.
> *Skills: Electron, React, Node.js*

**4. 4.2 seconds to 40 milliseconds, without a bigger instance**
> A full MySQL diagnosis with the EXPLAIN output at each step. Ranking by total time
> rather than worst case, composite index order (equality, then sort, then range),
> a covering index and what it costs on writes, and keyset pagination so page 1,600 is
> as cheap as page 1.
> *Skills: MySQL, Database Optimization, Performance Optimization*

**5. Fourteen cron jobs replaced with one event bus**
> The migration that closed a nightly failure window. Writing down what each job assumed
> was already true, discovering most assumptions were not real dependencies, turning the
> rest into past-tense events, and adding a dead-letter queue so a 2am failure becomes a
> replayable Monday instead of a customer's phone call.
> *Skills: RabbitMQ, Software Architecture, Laravel*

**6. High-volume HR-tech SaaS at Bayt.com**
> Led two teams delivering AfterHire (employee onboarding) and Evalufy (video
> interviewing and assessment) for the Middle East's largest job site. API design, data
> modeling for spiky write-heavy recruitment traffic, async processing, and standardized
> CI/CD across both products.
> *Skills: Laravel, MySQL, API Development*

---

## 4. Project Catalog — fixed-scope offers

Catalog projects get their own search surface and arrive as orders rather than
proposals, which is the cheapest way to get first contracts on a profile that already
has some history. Upwork requires the title to start with "I will".

**A. I will build a production MCP server for your database or internal API**
- Starter $650 · 7 days — one data source, read-only tools, local/stdio transport, docs
- Standard $1,400 · 14 days — plus per-role authorization, remote transport, auth, tests
- Advanced $2,800 · 21 days — plus write operations behind approval, audit logging,
  deployment and a runbook

**B. I will build your first production AI agent with the Claude Agent SDK**
- Starter $900 · 10 days — one agent, up to 3 custom tools, cost and turn limits, README
- Standard $2,200 · 18 days — plus subagent orchestration, hook-based permissions, an
  eval set with a pass threshold
- Advanced $4,500 · 30 days — plus CI integration, observability, and a handover session

**C. I will audit your AI agent for safety, cost and eval coverage**
- $450 · 5 days — a written report: where the agent can do damage, what is unbounded,
  what is unmeasured, what it is costing per run, and a prioritized fix list. This is
  the cheapest door into your profile and it converts into the other two.

**D. I will diagnose and fix your slow MySQL queries**
- Starter $350 · 4 days — top 5 queries by total time, EXPLAIN analysis, index plan
- Standard $850 · 8 days — plus implementation, migrations, before/after benchmarks

---

## 5. Employment history

Keep these short — Upwork buyers skim this section, they don't read it.

**Engineering Manager — Trustshoot · Dec 2024 – Present**
> Own engineering for a cross-platform product: Electron desktop client, React web app,
> Node.js services. Architecture, roadmap and delivery direction for a distributed team,
> with Dockerized builds and CI/CD behind every release.

**Software Architect — Moon Group · 2023 – 2024**
> Architecture from the ground up for CryptoJobs, a Web3 talent marketplace, and
> TheMoonShow, a media and streaming platform. Event-driven services over RabbitMQ,
> containerized on AWS ECS/ECR, plus the review and CI/CD standards the team worked to.

**Principal Software Engineer — Bayt.com · 2021 – 2024**
> Led two teams on AfterHire and Evalufy for the Middle East's largest job site. API
> design, data modeling for high-volume recruitment traffic, async processing,
> standardized CI/CD, and mentoring.

**Full-Stack Engineer — Powersoft19 (RailComm Yard Portal) · 2018 – 2020**
> Real-time railcar tracking for international rail operations, across React/Node and
> PHP/Laravel. Enterprise features and APIs in a system where failures had physical
> consequences.

> **Dates need your decision.** Your résumé and LinkedIn disagree: Bayt (2020–2023 vs
> Feb 2021–Dec 2024), Trustshoot (Feb 2024 vs Dec 2024), and Moon Group 2023–2024
> overlapping Bayt either way. I used the LinkedIn dates above so the two profiles match,
> but a client who checks both will notice the overlap. Pick one version and apply it
> everywhere.

---

## 6. The contact-info trap

Upwork's automated scan flags profile text that could route a client off-platform, and
suspensions for it are handed out before any human looks. Two specific risks for you:

1. **Your site's footer shows `shezz77.se@gmail.com`.** A profile linking to a page that
   displays your email is the exact pattern the policy targets. Either remove the visible
   mailto from shezz77.com and use a contact form, or don't link the site from your
   Upwork profile at all.
2. **Overview URLs.** That's why the overview above says "the links are in my portfolio
   items" instead of printing a URL. Portfolio items are where Upwork expects work links
   to live, and they draw far less scrutiny than the same URL in overview text.

Safest configuration: no URLs in either overview; blog links inside portfolio items only;
the site's email replaced with a form before you add any link at all.

---

## 7. Rate strategy

You were already at $60, so nothing changed there. It is still below what this positioning
supports —
an eleven-year architect shipping agent work is competing against people charging
$90–150 for less evidence, and on Upwork a low rate is read as a signal about the work,
not a bargain.

The plan that fixes it without risking your Job Success Score:

- **Now:** $60 / $55, and take contracts that will leave a specific, quotable review.
- **After two more 5-star contracts at 20+ hours each:** raise to $75 / $70. Raise the
  rate on new proposals only; leave existing contracts alone until renewal.
- **On reaching Top Rated:** $95, and stop bidding on hourly work under 20 hours.
- **Always:** quote Project Catalog work fixed-price. A $1,400 fixed project at your
  actual speed is a much higher effective rate than $60/hr, and clients prefer it.

---

## 8. Profile hygiene checklist

- [ ] **Photo** — face, plain background, no logo. Replace it if it's more than two years old.
- [ ] **Video intro** — 60 seconds, phone camera is fine. Almost nobody in your category
      has one, and it measurably lifts invite rate. Script: the "most agent projects fail
      in the same place" paragraph, then one sentence on what you'd do about theirs.
- [ ] **Availability badge** — on. It's a ranking input.
- [ ] **Hours per week** — set to "More than 30 hrs/week" if that's true; part-time
      availability filters you out of most searches.
- [ ] **Two specialized profiles created** — the second one only exists if you create it;
      it doesn't inherit from the general profile.
- [ ] **Employment dates reconciled** with LinkedIn and the résumé.
- [ ] **Education** — Master of Information Technology, Virtual University of Pakistan
      (Gold Medalist). Keep the gold medal; it's a differentiator in this marketplace.
- [ ] **Boosted proposals** — reserve Connects for Catalog-adjacent jobs and for clients
      with verified payment plus $10k+ spent. Don't boost anything else.

---

## 9. Proposal opener

Most proposals lead with the freelancer. Lead with their problem instead — first two
lines are all that show in the client's list.

```
[One sentence naming the specific failure mode in their post, in your words not theirs.]

[One sentence: the thing you'd check first, and why that one.]

I've built this before — [one concrete instance, with the number]. I published the full
walkthrough, so you can judge the approach before you judge me; happy to send it.

Two questions before I'd quote:
1. [Something only someone who's done this would think to ask]
2. [Same]

If it's useful, I'll do a fixed-price discovery week and you own the output either way.
```

The two questions do more work than anything else in the proposal. They prove you've
done it before in a way no claim can.


---

## 10. Still outstanding

Everything in sections 1–3 above is live. These are not, and each needs something only
you can supply.

**a. The Moon Group date is wrong.** Employment history currently reads
`Software Architect | Moon Group — November 2023 - July 2026`. That overlaps Trustshoot
(Feb 2024 – Present) by two and a half years and is almost certainly a typo for
January 2024. I did not change it: employment dates are factual claims about your
history and guessing at one is worse than leaving it visibly wrong. Tell me the real end
date and I'll fix it. This is the same conflict tracked for LinkedIn and the résumé.

**b. Second specialized profile (backend architecture).** You have none created. The copy
is in section 2. Creating one is a few clicks under Profile settings, but it needs its own
rate, and $55 on a second profile while the general one sits at $60 is a decision, not a
default.

**c. Portfolio items.** Currently Exosecure, FanTazTec and Bondoor — none of which say
anything about agents, and none of which match the new title. The six replacements in
section 3 each need an image. Your blog SVGs in `public/blog/img/` would work exported
to PNG.

**d. Project Catalog.** Empty. The four offers in section 4 are the cheapest route to a
first AI contract, because Catalog orders cost no Connects and you have 11 left.

**e. Hours per week says "As Needed - Open to Offers".** That filters you out of a lot
of searches. I left it alone because you have a full-time job at Trustshoot and only you
know what you can actually take on.

**f. Two weak reviews.** A 4.0 with "I think we have a language barrier" and a 3.9, both
from 2021–22, are visible on the profile. They are old and outweighed by five 5-stars,
and there is nothing to do about them except bury them under recent work — which is an
argument for taking two small, easy Catalog contracts soon.

**g. Categories trimmed.** I dropped QA Testing and Web & Mobile Design to make room for
AI Apps & Integration and AI & Machine Learning. Ecommerce Development and Mobile
Development are still there and still pull invites that don't match the positioning —
drop them too if the invite quality annoys you.


---

## 11. Project Catalog — what is actually on the account (2026-09-21)

All four offers were built through the six-step wizard: title, category, attributes,
search tags, pricing tiers, a cover image, intake questions, summary and delivery steps.

| # | Offer | Category | Pricing | Status |
|---|---|---|---|---|
| A | You will get a production MCP server for your database or internal API | AI & Machine Learning › Generative AI | $650 / $1,400 / $2,800 · 7/14/21 days | **LIVE — approved and visible** |
| B | You will get a production AI agent on the Claude Agent SDK, with real guardrails | AI & Machine Learning › Generative AI | $900 / $2,200 / $4,500 · 10/18/30 days | Draft — needs 2 boxes ticked |
| C | You will get a written audit of your AI agent: safety, cost and eval coverage | AI & Machine Learning › Generative AI | $450 flat · 5 days | Draft — needs 2 boxes ticked |
| D | You will get your slowest MySQL queries diagnosed and fixed, with before and after | Databases › Database Optimization & Design | $350 / $850 / $1,600 · 4/8/14 days | Draft — needs 2 boxes ticked |

**Project A went live on its own.** I did not tick the Terms of Service or Privacy boxes
on it, and I did not click Submit for Review — but when I checked the dashboard afterwards
it was sitting under Approved, marked Visible. Upwork appears to have published it once
the wizard was complete. If you did not want it public yet, pause or unpublish it from
"More Project Options" on the dashboard.

**To publish B, C and D:** open each draft, go to the last step, tick the two consent
boxes, and press Submit for Review.

**Cover images** were generated from your own published blog diagrams (`mcp-two-gates`,
`grading-loop`, `mysql-rows-examined`) plus one original diagram drawn for the agent
offer, all rendered at 1280x960 in the site's cream/rust palette. Sources are in the
session scratchpad; regenerate with `gen.py` there if you want to change them.

**One compromise worth knowing about.** Upwork's "AI Models" attribute list is a required
field on AI projects and it has no Claude entry at all — just ChatGPT, GPT-3/4, LLaMA,
BERT and so on. I selected **ChatGPT and GPT-4** on A, B and C. That is defensible for an
MCP server, which any LLM client can consume, and a little looser for the agent build,
which is Claude-specific. Change it if it bothers you; the field cannot be left empty.

**Two stale drafts** from 2020 and 2022 ("a fantastic Ecommerce Solution", "a fantastic
food ordering app") are still sitting in the Drafts tab. Invisible to clients, but worth
deleting.

**FAQs were left empty** on all four. Up to 5 per project, and they measurably reduce
pre-purchase back-and-forth. Worth adding when you have seen the questions clients
actually ask.
