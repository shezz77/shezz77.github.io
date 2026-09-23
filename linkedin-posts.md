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
