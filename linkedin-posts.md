# Eight LinkedIn posts, two weeks, drawn from published notes

Every claim below is already on the site — the numbers, the failure modes, the
takeaway lists — so nothing here needs backing up after the fact.

Each post links through `shezz77.com/go/<name>/`, which counts the click as its
own row in Cloudflare's **Paths** report and then forwards to the note. Never
paste the raw `/blog/` URL: an untracked link tells you nothing about which post
did the work.

**The link goes in the first comment, never in the post body.** Measured on this
account on 2026-09-22: every post carrying an outbound link landed between 42 and
148 impressions, every native post between 255 and 3,859, with no overlap and no
explanation from post age. Keep the whole argument in the post itself so it stands
alone in the feed, then drop the `/go/` link in the first comment, where it still
renders a preview card.

Cadence: two a week, Tuesday and Thursday, roughly 9am your audience's time.
Reply to every comment inside the first day — the comment thread reaches more
people than the post does.

---

## Week 1

### Post 1 — Tuesday · The monolith you should keep

Splitting a service is a bet on your ability to run more infrastructure.

Most teams I meet are losing that bet before they place it. The diagram gets cleaner and the on-call rota gets worse: one request now spans four services, one migration becomes four migrations, and nobody can answer "where did this get slow" without three dashboards open.

The question was never monolith or microservices. It's whether you have a reason to split that survives contact with a Tuesday:

— a scaling curve that genuinely differs between two parts of the system
— a failure you need contained, not just isolated on paper
— two teams that keep blocking each other in the same files

None of those show up on an architecture diagram. All three show up in your incident log.

If the reason isn't one of those, enforce the module boundary in CI and keep the boring deploy. You get the ownership benefit now and the option to extract later, once the boundary has proven it holds.

How I make that call: shezz77.com/go/the-monolith-you-should-keep/

What pushed your last split — a scaling problem, or a team one?

---

### Post 2 — Thursday · The health check that lies

Every target green. Every dashboard green. A third of requests failing.

The health check wasn't lying. It had simply never been asked anything about the application — it returned 200 from the edge, from a static file, without touching the code path a customer's request travels.

Three things make a health check worth having:

1. It travels the real request path. No edge-served 200, no separate connection pool, no cached result.
2. It distinguishes slow from gone. SELECT 1 proves reachability, not capacity — and "slow" is a far more common outage than "gone".
3. Liveness never touches a network dependency. Restarting your container cannot fix someone else's database, and a fleet-wide restart loop turns a partial outage into a total one.

The one that catches most teams: readiness is an instruction to withdraw, not a description of health. Every instance shares its dependencies, so a dependency check in readiness fails the whole fleet at the same instant.

Full write-up, including what to do about workers, which can't be probed at all: shezz77.com/go/health-check-that-returns-200/

What does your health check actually assert?

---

### Post 3 — Tuesday · Fourteen cron jobs

Scheduled jobs are the cheapest way to build a distributed system and the most expensive way to run one.

We had fourteen of them. Each assumed the previous had finished. None of them said so anywhere. When one ran long, the next started on half-written data — and we found out from a customer the next morning, because a cron job that fails at 02:00 fails silently by design.

The migration that fixed it started with an unglamorous exercise: writing down what each job assumed was already true. Most of those assumptions turned out not to be real dependencies at all. The ones that were became events.

Publish facts in the past tense — InvoiceIssued, not SendInvoiceEmail — and let consumers decide what to do about them. The coupling that made the schedule fragile disappears, because nothing is waiting on a clock any more.

And a dead-letter queue turns overnight silence into a replayable Monday morning. I'd keep that part even if nothing else changed.

The migration, end to end: shezz77.com/go/event-bus-over-cron/

How many of your cron jobs are load-bearing?

---

### Post 4 — Thursday · The bottleneck moved

My team writes considerably more code than it did a year ago. We ship about the same amount.

The constraint moved and our process didn't move with it. Generation got cheap; review didn't. Every hour saved writing code went straight to the people reading it — and we never staffed for that, measured it, or changed anything about how a pull request is supposed to arrive.

Three changes did more than any tooling:

— Cap change size. A 900-line PR doesn't get reviewed, it gets approved.
— Require intent in the description, plus the alternatives the author rejected. Reviewing a diff without knowing what was considered is guesswork.
— Make the author state how they verified it, including whether they actually read it.

That last one is uncomfortable to introduce, and it's the one that changes behaviour.

If your velocity metrics look great and cycle time hasn't moved, the queue is in review: shezz77.com/go/the-review-bottleneck/

Where did your bottleneck go?

---

## Week 2

### Post 5 — Tuesday · 4.2 seconds to 40 milliseconds

One listing query. 4.2 seconds, down to 40 milliseconds. The fix was not a bigger instance.

It also wasn't the query everyone suspected. That's the first lesson: rank by total time across an hour of real traffic, not by the worst single execution. The query that hurts is usually a fast one running forty thousand times.

What actually moved the number:

— Composite index order: equality columns, then the sort column, then ranges. Get that order wrong and MySQL silently keeps the filesort while the index looks perfectly reasonable.
— A covering index, to remove the per-row table lookup. Paid for with slower writes and a wider index — a trade worth stating out loud rather than discovering later.
— Keyset pagination. OFFSET cost grows with depth no matter what you index. With a tuple comparison, page 1,600 is as cheap as page 1.

The full diagnosis, with the EXPLAIN output at each step: shezz77.com/go/make-a-slow-mysql-query-fast/

What's the most expensive query in your system right now — do you know, or do you assume?

---

### Post 6 — Thursday · An unenforced boundary is a preference

An unenforced boundary is a preference.

Every team I've worked with has module boundaries somewhere: a wiki page, a naming convention, somebody's head. All three decay at the same rate — one urgent Friday at a time.

What survives is a build that fails.

The shape that works:

— Split each module into Contracts/ and Internal/. Only Contracts/ is importable from outside.
— Enforce it in CI with deptrac and --fail-on-uncovered, so new code can't quietly land outside the rules.
— Never pass ORM models across a boundary. A model is a database schema in a costume.
— Prefix tables by module, so database coupling is visible instead of ambient.

You get independent ownership and clear seams without running a distributed system. And if you do extract a service later, the hard part is already done.

One rule I'd add: let a boundary prove itself for two quarters before extracting. Constant violations mean the line is in the wrong place — cheap to learn now, expensive to learn once it's a network call.

Setup and the CI config: shezz77.com/go/modular-monolith-boundaries-laravel/

Which of your boundaries would survive being enforced tomorrow?

---

### Post 7 — Tuesday · Whose calendar is that number on?

A daily total is not a fact about your data. It's a fact about whose calendar you asked — and once you've summed the rows, you can never ask again.

We had a rollup that was correct in UTC and wrong for every customer who wasn't. The failure mode is nastier than a wrong number: a bucketing bug moves seconds between days without changing any wide total. Reconcile over a month and it passes. Every month.

What I'd do differently from day one:

— Keep the UTC rollup even when nothing reads it. It's the only aggregate that means the same thing to every tenant.
— Store the IANA zone name, not an offset, and put it in the primary key. A tenant changing timezone becomes an insert, not a rewrite.
— Store the day's length alongside the bucket. Twice a year a day is 82,800 or 90,000 seconds, and that quietly breaks every percentage and threshold alert you have.
— Recompute buckets, never increment them. At-least-once delivery makes += a double-count waiting to happen.

And test in a zone with a real offset. Fixtures in UTC prove nothing at all.

shezz77.com/go/two-tables-for-the-same-number/

Does your reporting layer know what timezone its numbers are in?

---

### Post 8 — Thursday · The pipeline nobody has an opinion about

The best deploy pipeline I've built is the one nobody has an opinion about.

Docker build, ECR push, rolling update, health check, done. The interesting part is everything I deliberately left out — and the three things I didn't:

— Tag images by commit SHA. Never latest, in any environment. Rollback becomes a redeploy of a tag that already exists, not a rebuild you're attempting at 1am while the graph is red.
— Gate the service update on a one-off migration task that must exit zero. If the migration fails, the new tasks never start and you're still serving traffic on the old ones.
— Health-check the dependencies, not just the process. A container that is running is not the same as an application that is working.

None of it is clever. That's the point. A deploy pipeline earns its keep on the worst day of the quarter, not the best one.

shezz77.com/go/boring-ecs-pipeline/

What's your actual rollback procedure — and when did you last rehearse it?

---

## Reading the results

Cloudflare Web Analytics, **Paths**:

- `/go/<name>/` — clicks on that post's link. This is the only honest per-post
  number; referrers are stripped by the LinkedIn mobile app, and Cloudflare
  discards query strings, so UTM tags would show you nothing.
- `/blog/<slug>/` — total readers of the note, from every source combined.
  Comparing it against the `/go/` row tells you how much of that note's
  traffic LinkedIn is actually responsible for.

Your inbox, for the end of the funnel: an enquiry that started at a `/go/` link
arrives with the campaign in the subject — `Architecture call [rabbitmq-retries]`.
That's the number worth optimising. Search your mail for `[` and the slug.

What to do on day 14: whichever two `/go/` rows are highest, write the next
post on the same problem. Not the same note — the same problem, one layer
deeper. The topic found its audience; give that audience more of it.

---

## Extra — Vibe-coded security (image post)

Image: `social/linkedin-vibe-security.png` (1200x1200, dark card — square beats
1.91:1 on mobile). Posted 2026-09-22. Link lives in the first comment, not the
body; the body's last line is "link in the first comment".

Open any vibe-coded site. Open the JavaScript bundle it loads. The database URL and key are sitting in it.

That part is fine. That key is meant to be public.

What happens next is not: one curl, and every row comes back.

A scan of 1,400 deployed vibe-coded apps found 2,038 critical vulnerabilities, more than 400 exposed secrets, and 175 leaks of personal data. Bank details included. Almost none of it was clever — it's the oldest entry in the OWASP list, broken access control, wearing a new shape.

Here's the shape. These tools generate a front end that talks straight to a hosted database. There's no middle tier, so the place the access check used to live is simply gone. You used to write code to expose data. Now you write policy to hide it, and the failure mode of writing nothing just flipped.

And you can't catch it by clicking through the app, because every broken-access-control bug is invisible to a single account. You signed in as yourself and saw your own three orders, and it looked right. The agent had exactly one user too — so every loop it ran agreed with you.

Cheapest check on the list: make a second test account and re-run the same request with its token. Anything other than an empty array is tonight's work.

Full checklist in blast-radius order, plus a ten-minute curl audit you can run against your own site — link in the first comment.

What's the first thing you check before a generated app gets a public URL?

---

## Extra — The malware that asked your AI (image post)

Image: `social/linkedin-ai-cli-malware.png`. First comment: `shezz77.com/go/malware-that-asked-your-ai-cli/`

This malware didn't bring a file scanner. It brought a paragraph of English.

In August 2025, eight poisoned versions of Nx — a build tool with millions of weekly downloads — shipped an install script that checked whether you had Claude Code, Gemini CLI or Amazon Q installed.

If you did, it launched the agent with the flag that skips every permission prompt and asked it, politely, to search your home directory for keys, wallets and .env files and write the paths to a file. Then it published the results to a public repo in your own GitHub account, using your own token.

The AI part mostly failed. Claude refused almost a quarter of the requests, and the search worked in under a quarter of cases. The hand-written theft next to it leaked 2,000+ live secrets, and 90% of the GitHub tokens still worked a day later.

That's not the reassuring part. The refusals were the model's judgement on the attacker's prompt. Nobody configured them, and nobody can count on them.

What closes it:

— bypass mode disabled in managed settings, where code running as you can't turn it back on
— unattended agents in a container with nothing else mounted
— dependency install scripts off by default
— a one-day release cooldown (every poisoned version was gone within five hours)

The full breakdown, with the exact settings, is in the first comment.

Is --dangerously-skip-permissions aliased in your shell right now?

---

## Extra — Vibe coding's side effects (image post)

Image: `social/linkedin-vibe-side-effects.png`. First comment: `shezz77.com/go/vibe-coding-side-effects/`

Vibe coding works. That's why it needs a leaflet.

Eighteen months in, the evidence is finally good enough to write one, and it isn't the argument either side wanted.

The gains are real. Faros's telemetry across 22,000 developers shows task throughput up 34% and epics completed up 66%.

The same data, further down the pipe:
— median time in review up 441%
— incidents per pull request up 243%
— pull requests merged with no review at all up 31%

Other side effects:
— feeling faster than you are: METR measured experienced devs 19% slower while they believed they were 20% faster
— code that grows and never gets tidier: refactoring down 70%, duplication up 81% (GitClear)
— skills that never form: learners using AI scored 50% vs 67% on concepts they'd just used, worst on debugging (Anthropic)

And effects on people who never used it: curl shut its bug bounty when real vulnerabilities fell below 5% of reports, and Tailwind lost ~80% of its revenue while its downloads hit a record.

None of this says stop. It says dose. Measure lead time and incidents per change, not the feeling. If throughput is up and incidents are up faster, you're only looking at half the chart.

The full leaflet, with the dosage I actually use, is in the first comment.

Which side effect is your team feeling most right now?

---

## Extra — NVIDIA OpenShell (image post)

Image: `social/linkedin-openshell.png`. First comment: `shezz77.com/go/nvidia-openshell-agent-boundary/`

Every AI agent safety control I relied on last year lived inside the agent.

Permission prompts. Deny rules. The model's own refusals. One flag, --dangerously-skip-permissions, and they're all gone. That's exactly how the Nx supply-chain malware used Claude Code, Gemini CLI and Amazon Q to hunt for secrets.

NVIDIA's OpenShell (Apache-2.0, Rust, 12k+ stars since February) does it differently. It moves the boundary outside the agent:

— The agent runs with no network at all. Every connect and DNS lookup is intercepted by seccomp and handed to a separate supervisor process it can't reach.
— Policy is per binary and per HTTP method. Not "this sandbox may reach GitHub" but "curl may GET api.github.com". A POST gets refused.
— Credentials never enter the sandbox. The supervisor attaches them to outgoing requests, and only to approved hosts. What the agent can see isn't worth stealing.
— If the supervisor drops, the agent is frozen. It fails closed.
— A policy prover flags risky policy changes (new credentialed reach, new methods, cloud metadata access) before they ship. You can run it in CI.

It works with Claude Code, Codex, OpenCode and Copilot CLI, on Docker, Podman, Kubernetes or a MicroVM.

It's 0.1 software. Landlock enforcement depends on your kernel, your CNI has to enforce NetworkPolicy, and telemetry is on by default. I wouldn't put it on every laptop tomorrow. I'd put it under every agent that runs without a human watching.

The shift is what matters: stop asking the agent to be careful, and make what it can reach someone else's decision.

The full breakdown, with the policy file and where I'd use it, is in the first comment.

Which of your agents runs unattended with real credentials right now?

---

## Extra — AI writes 75% of Google's code (image post)

Image: `social/linkedin-ai-code-share.png`. First comment: `shezz77.com/go/ai-writes-75-percent-of-the-code/`

AI writes 75% of Google's new code. Here's the arithmetic nobody is putting in the board deck.

That number is real. Pichai said it in April, up from "more than a quarter" in 2024. Anthropic says 80%+ of what it merges is written by Claude.

It's also being read as a headcount plan: AI writes three quarters of the code, so we need a quarter of the engineers.

Two problems.

1. It counts typing, not work. Google's published definition: characters accepted from AI suggestions ÷ (those + characters typed by hand). A team that spends all day reviewing instead of typing hits 75% with zero extra output.

2. Amdahl's law. Speed up one part of a job and the part you didn't touch caps the whole.

IDC and Atlassian both put coding at 16% of a developer's month.

So if AI wrote 75% of the code at zero cost: 1 / (1 − 0.16 × 0.75) = 1.14× faster.
If AI wrote all of it, instantly and perfectly: 1.19×. That's the ceiling.

The "6× faster" stories are real too. They're migrations and refactors, the rare jobs where typing is most of the work. A 6× speed-up needs at least 83% of the job to be work the AI took over.

Google didn't do the headcount sum either. Alphabet grew from 187,103 to 198,933 people while its AI share went from half to three quarters.

If you want a bigger number, point the AI at the other 84%: finding information, review, tests, CI, incidents. None of that shows up in "% of code written by AI".

Full arithmetic, three charts and what I'd put on the slide instead — link in the first comment.

What share of your team's week is actually writing code?

---

## Extra — Microsoft's AI CEO: 18 months vs 5% in 10 years (image post)

Image: `social/linkedin-eighteen-months.png`. First comment: `shezz77.com/go/eighteen-months-or-five-percent/`

Microsoft's AI CEO said in February that most white-collar tasks would be fully automated within 18 months. This week he shared a forecast that AI will replace 5% of human work in 10 years.

Both can be true. Here's the arithmetic.

February, to the Financial Times: for lawyers, accountants, project managers and marketers, most tasks "will be fully automated by an AI within the next 12 to 18 months." That deadline lands between February and August 2027.

This week, Mustafa Suleyman shared Daron Acemoglu's estimate: about 5% of what humans do replaced by AI within a decade.

That 5% is two numbers multiplied:
20% of US work is tasks AI can technically do.
× ¼ of those actually get automated within 10 years.
= 5%.

The February quote is only the first number. What the model can do.

The second number is what organisations actually change. Processes, approvals, liability, retraining, someone willing to sign off on the output. That's where every general-purpose technology slows down. Electricity took decades to show up in factory productivity, because factories had to be rebuilt around it.

It's the same gap as Google's "AI writes 75% of our code". Capability: 75%. Effect on delivery: about 1.14×.

If you run a team:
— Don't plan headcount off the capability number. Plan it off what you've actually handed over.
— The bottleneck is rarely the model. It's review, ownership and who signs off.
— The ¼ isn't a law. It's how fast your org reorganises. That's the part you control.

The full breakdown, with where both numbers come from and a checklist for engineering teams, is in the first comment.

What share of the tasks AI can already do on your team has actually been handed over?

---

## Extra — AI took the first rung (DRAFT for Wed 14 Oct 2026, not posted)

Image: `social/linkedin-first-rung.png`.

Peg: CNBC 11 Oct 2026 on Indeed Hiring Lab data (Guillermo Gallacher, 8 Jul 2026): US software dev postings +~15% since Claude Code launched (24 Feb 2025) while total postings −7%; senior roles = 71% of the net increase May 2025→May 2026. Stanford Digital Economy Lab (Brynjolfsson, Chandar, Chen, "Canaries in the Coal Mine", ADP payroll): software developers aged 22–25 down nearly 20% from the late-2022 peak while older developers grew. No blog post; first comment carries the sources.

Since Claude Code launched, US software developer job postings went up 15%. Total job postings fell 7%.

That's Indeed's data. It's the opposite of the headline everyone expected.

Now look at who's getting hired.

71% of the increase was senior roles (Indeed, May 2025 to May 2026).
Stanford's payroll data: software developers aged 22–25 are down nearly 20% from their late-2022 peak. Older developers grew.

AI didn't take developer jobs. It took the first rung of the ladder.

From inside a team, that's a rational decision. An agent now writes the code a junior used to write. What it can't do is decide whether that code is right. Review, architecture, owning the incident at 3 a.m. is senior work, and that's where the bottleneck moved.

So every team makes the same call: hire one senior, give them agents, skip the junior.

Here's the arithmetic nobody is doing.

Every senior engineer in 2031 is a junior someone hired around 2026. A senior takes five-plus years to make. You can't hire one who was never trained.

If every company only hires seniors, the industry isn't saving money. It's eating its seed corn. In five years the scarce, expensive thing won't be code. It'll be people who can judge it.

If I ran a team:
— Keep hiring juniors, but change the job. Less typing, more reviewing agent output next to a senior.
— Make review the training ground. A junior who reviews 20 agent PRs a week learns faster than one who writes 2.
— Book it as an investment, not a cost. The team that trains in 2026 has the seniors in 2031.

Are you still hiring juniors? If not, where will your seniors come from?

---

## Extra — Gemini 4 Argon is in the $20 plan (image post, posted Wed 14 Oct 2026 ~14:05 PKT, activity 7516060702445490176)

Image: `social/linkedin-argon.png`. First comment: `shezz77.com/go/gemini-4-argon-on-ai-pro/`

Peg: Gemini 4 Argon went public 13 Oct 2026. The launch-day story was "coding tools stay behind the $100 Ultra plan". That's true for Antigravity/AI Studio, not for the model: Google's release notes put Argon in the Gemini app for AI Pro ($19.99) and Ultra. Post this one before the first-rung draft; it's news-pegged and decays fast. Leave ~48h before the next post.

Google's new flagship, Gemini 4 Argon, went public yesterday.

The headline everyone ran: Google keeps it behind the $100 Ultra plan.

That's only half true. The coding tools need Ultra: the Antigravity IDE, AI Studio, Android Studio.

The model doesn't. It's in the $20 Google AI Pro plan, on the web and in the Gemini desktop app.

How to get it:
→ Open Gemini in your browser, or the desktop app (Option + Space on Mac, Alt + Space on Windows)
→ Sign in with the account that pays for Pro
→ Pick "4 Argon" from the model drop-down

Not there yet? The rollout is staged. Reload and check again later.

What the $20 actually buys:
— a 1M-token context window. Free gets 32K, about 30x less
— 4x the free usage, refilled every 5 hours, up to a weekly cap
— Canvas for code, and a Tasks mode that keeps working while you're away

Is it worth switching? Read both halves of Google's own table.

Argon leads on 13 of 19 benchmarks. Long-horizon repo work: 77.9% on DeepSWE, ahead of Claude Opus 5.5 and GPT-6 Astra. Reasoning across 1M tokens: 84.2% against Opus 5.5's 66.8%.

It loses the hard ones. Terminal-Bench: 57.4% against Opus 5.5's 66.4%. Novel software problems: 55.0% against Astra's 65.5%.

Independent testing agrees. Artificial Analysis has Argon tied with GPT-6 Astra at 53, with Opus 5.5 still ahead at 58.

My rule: Argon for big context and long jobs. A whole repo, a stack of contracts, an hour of video.
Claude or GPT for terminal-heavy agent work and genuinely new problems.

One date to remember if you use the API: the launch price, $2 / $10 per million tokens, doubles on 1 December.

The full guide is in the first comment: web and desktop steps, the limits, and all 19 benchmark rows.

Have you switched your model picker yet? What did you give it first?

**First comment** (keep the real text around the link, or LinkedIn hides it under "Most relevant"):

The full guide: where Argon is on each Google plan, the exact steps on gemini.google.com and in the Mac and Windows desktop apps, what the Pro limits really are, and all 19 rows of Google's benchmark table, with five animated diagrams.

https://shezz77.com/go/gemini-4-argon-on-ai-pro/

I checked every claim against Google's own pages. Where Google hasn't said something, like which plans get Antigravity inside the Mac app, the post says so.

---

## Extra — Stop collecting AI prompts, write a brief (image post, posted Thu 15 Oct 2026 ~22:35 PKT, activity 7516552319686041600)

Image: `social/linkedin-better-brief.png`. First comment: `shezz77.com/go/ai-tips-stop-prompting-start-briefing/`

Blog: `/blog/ai-tips-stop-prompting-start-briefing/` (deployed Thu 15 Oct 2026). Evergreen, no news peg, so it can wait for a clean slot after the 48h gap.

"Make it better" is what most of us type into ChatGPT, Claude or Gemini when a draft feels off.

It works when the other person knows what better means. The model doesn't.

Better for whom? Shorter? More accurate? Easier to act on? More like the way you write?

A 500-word "ultimate prompt" from a saved collection usually leaves all of those questions open. A five-line brief can close them.

Outcome: a client update, under 150 words.
Audience: a busy, nontechnical operations manager.
Facts: what shipped, what's blocked, the dates.
Rules: end with one decision we need from the client.
Don't invent dates, progress or commitments.

No "you are a world-class communicator." That isn't a fact the job needs.

Six more habits I use every day:
— Let it ask questions only when the answer would change the result
— Give it a sample for style, and your sources for the facts
— Ask it to separate what the source says from what it concludes
— Fix one thing at a time, not "rewrite the whole thing"
— Start a fresh chat with a clean brief when the old one is full of abandoned ideas
— Time the whole task, checking included, not just the first reply

The last one matters most. A fast first draft is worthless if you spend 20 minutes fixing it.

The best prompt in your collection is the one attached to work you actually finished.

All seven habits, with copy-paste prompts, are in the first comment.

What's the prompt you actually reuse every week?

**First comment** (keep the real text around the link, or LinkedIn hides it under "Most relevant"):

The full guide: seven habits with copy-paste briefs for emails, reports and code, plus a one-week experiment to see whether a better brief actually saves you time on your own work.

https://shezz77.com/go/ai-tips-stop-prompting-start-briefing/

It ends with a fill-in-the-blanks brief you can keep and reuse. No course, no new tool.

---

## LinkedIn deleted your job search filters (image post, posted Thu 22 Oct 2026 ~03:40 PKT)

Image: `social/linkedin-job-filters.png`. First comment: `shezz77.com/go/linkedin-ai-job-search-what-it-reads/`

Blog: `/blog/linkedin-ai-job-search-what-it-reads/` (deployed Thu 22 Oct 2026). News-pegged: LinkedIn began retiring classic job search in September 2026.

LinkedIn quietly deleted the job search filters you relied on.

No more "Past 24 hours" toggle. No location radius. No seniority checkboxes. Just a box asking you to describe the job in your own words.

One member asked support to switch back. The answer: that option "is no longer available."

So I read the 74-author paper LinkedIn published on how the new search works. Three things every job seeker should know:

1. Your words are a hint, not a filter.
The old Remote checkbox removed hybrid jobs before ranking. Now "remote" is interpreted. It might be enforced. It might just push hybrid roles a few places down. You can't see which.

2. Your profile is read on every search.
Headline, past positions, location and an AI-written summary of you all go into the ranker. "Engineer at Acme" tells it far less than "Senior Backend Engineer, Laravel and AWS."

3. Your clicks are part of your query.
The ranker is trained to predict what you'll click, apply to and dismiss, and your recent activity is an input. Spend an evening browsing jobs you'd never take, and you're teaching your next search.

What I'd do now:
— Write the search like a brief: role, level, stack, hard constraints
— Check the first 20 results against each constraint, and rephrase if one is ignored
— Rebuild saved alerts; members say old ones stopped honouring their filters
— Save good postings when you see them. The same search won't return the same list on Thursday.

By LinkedIn's own numbers the new search is better on average. The people who lost are the ones who searched with precision every day, and in this market that's a lot of us.

Have you noticed the difference in your results?

**First comment** (keep the real text around the link, or LinkedIn hides it under "Most relevant"):

The full breakdown: what the new search reads about you, why a sentence isn't a filter, a copy-paste search template, and what anyone building search should learn from it. Two diagrams, all from LinkedIn's own paper.

https://shezz77.com/go/linkedin-ai-job-search-what-it-reads/

---

## Barclays is cutting developers for AI (DRAFT, not posted)

Image: `social/linkedin-more-code.png`. First comment: `shezz77.com/go/more-code-same-output/`

Blog: `/blog/more-code-same-output/` (not deployed yet). News-pegged: Barclays Q3 results, 22 Oct 2026. Study: Chen & Stratton (Harvard), "Artificial Intelligence in the Firm: Bottlenecks in Software Production", 718 firms, Jellyfish data. Weekday afternoon PKT, at least 48h clear of any other post; it overlaps the unposted "first rung" draft (both about dev jobs), so post one or the other this week.

Barclays is cutting 5,000 jobs, developers included, because "AI makes our people more productive."

Two Harvard economists measured what actually happens when a company gives its engineers AI coding agents. 718 companies. 725,000 workers. Five years of GitHub and Jira data.

After adopting agents, per engineer:
— Lines of code: +30%
— Pull requests: +23%
— Time from PR to merge: +49% (7 days → 10.5)
— PRs sent back for changes: nearly doubled
— Issues actually shipped to production: +3%. Not statistically significant.
— Headcount: no change.

30% more code. No more finished work. The productivity is real. It's stuck in review.

The arithmetic says it had to be. Engineers in the study spent 30–42% of their week writing code. Make that part 30% faster and the best case for the whole team is 7–11%. Before review gets any slower.

Here's what worries me about the Barclays plan. In most teams the people who write the code are the people who review it. After agents arrived, firms didn't free up engineers. They pulled 14% more of them into review.

Cut developers and you cut review capacity. The one thing that was already short.

To be fair: a bank isn't a software company, the cuts go wider than developers, and the CEO called AI the icing, not the cake. But if your plan says "AI makes engineers more productive" on one slide and "cut engineering" on the next, add one in between:

How long does a pull request wait for review, and who reviews it?

What happened to review time on your team after agents arrived?

**First comment** (keep the real text around the link, or LinkedIn hides it under "Most relevant"):

The full breakdown: every number from the Harvard paper, the Amdahl arithmetic, why the bottleneck moved to review, and a copy-paste GitHub command that measures your own review time and rework before and after your agent rollout. Two animated charts.

https://shezz77.com/go/more-code-same-output/
