# LinkedIn queue, 17 Nov to 11 Dec 2026

Ten native posts, no link in the body, one square card each (`social/queue/NN-*.png`).
Slots are 14:00 PKT, at least 48 hours apart, weekdays only.
Every number was re-opened at the source listed under the post on 16 Nov 2026.

---

## 01 · Tue 17 Nov · `01-anthropic-payroll.png`

Anthropic's AI bill is now bigger than its payroll.

That's not a hot take. It's in the company's IPO filing.

In April 2026, the list-price value of the Claude usage inside Anthropic passed what the company spends on its own people each month (excluding stock compensation).

Three more lines from the same filing:

→ Claude wrote more than 90% of the contributions to Anthropic's codebase in September
→ Daily code contributions per engineer were more than 45x the 2024 average
→ The engineers are still there

Before you forward this to your CFO, read the small print:

1. It's list price, not cost. Anthropic values its own usage at what it charges customers. They own the factory. You don't.
2. "Contributions" is not "shipped value". 45x more code is 45x more to review, test and run.
3. Nobody outside the company has verified the 90%.

The part I'd underline: the company that sells the AI did not swap its engineers for tokens. The AI bill arrived on top of payroll, not instead of it.

Would your company sign off an AI bill bigger than its salary bill?

#AI #SoftwareEngineering #EngineeringLeadership

Alt text: Anthropic's AI bill now beats its payroll. It's in the IPO filing. Read the small print. AI usage passed payroll in April 2026; over 90% of code by Claude in September 2026; 45 times the 2024 daily output per engineer; list price, not cost; verified by nobody outside, yet.

Sources: Yahoo Finance, 9 Nov 2026, on Anthropic's IPO filing (https://finance.yahoo.com/technology/ai/articles/anthropic-ai-usage-surpassed-payroll-174152790.html)

---

## 02 · Thu 19 Nov · `02-aws-no-review.png`

AWS just shipped code that no human wrote. Or reviewed.

Their words, published 11 November: "Our team hasn't written or reviewed any of the code."

The project is AWS Emulator, a local copy of AWS's APIs. AWS says thousands of autonomous agents wrote every line.

Most people will stop reading there and start arguing. The interesting part is the next paragraph.

Nobody reviewed the code because the review was moved, not removed:

→ Tens of thousands of fidelity tests across AWS
→ Agents write each test from the published API models, then check it against real AWS before submitting
→ Every change passes a gate: it compiles, meets the coding standard, is secure, and doesn't reduce fidelity
→ Fail the gate and the change goes back to the agent

So the humans did not skip the hard part. They wrote the definition of "correct" and let the agents hit it.

That works when "correct" already exists. An emulator has a perfect answer key: the real AWS.

Your billing logic does not have an answer key. Your permissions model does not have one either.

"No human review" is not the lesson. "No merge without a gate" is.

What in your codebase has an answer key good enough to trust an agent with?

#AIAgents #SoftwareEngineering #AWS

Alt text: AWS shipped code no human reviewed. Agents wrote all of it. Tests did the review. Written by thousands of AI agents; human review: none, says AWS; 438 API models; tens of thousands of fidelity tests; each test checked against real AWS.

Sources: About Amazon, 11 Nov 2026 (https://www.aboutamazon.com/news/aws/how-autonomous-ai-agents-built-aws-emulator)

---

## 03 · Mon 23 Nov · `03-apple-ai-budget.png`

Apple just cut its engineers' AI budget.

Bloomberg reports the daily cap for some engineers dropped from $300 to $200.

Apple is not alone. 2026 is the year the AI coding bill arrived:

→ Uber's president said the company had "blown through" its 2026 AI budget by the middle of March
→ DoorDash developers who pass a monthly token limit have to justify it and plan to use less
→ Revolut moved about 2,000 engineers onto self-hosted open models and says inference got roughly 90% cheaper
→ In an EY survey of 534 US senior leaders, 82% said they were concerned about token costs

Revolut's infrastructure lead put it plainly: engineers were spending "$1,000 a month, $10,000 a month with not so much ROI".

And $200 a day is still around $50,000 a year per engineer if they use it all.

Flat-rate AI coding was a subsidy. Metered AI coding is a budget line, and budget lines get questions:

1. What did we ship for it?
2. Which work needs the expensive model, and which doesn't?
3. Who is looking at spend per accepted change, not spend per developer?

If your team has no answer to the third one, the cap is coming.

Does your team know what it spends on AI per engineer?

#AI #EngineeringLeadership #DeveloperProductivity

Alt text: Apple cut its engineers' AI budget. $300 a day became $200. The AI bill has arrived. Apple: $300 to $200 a day, reported; Uber: 2026 budget gone by March; Revolut: self-hosts, about 90% cheaper; DoorDash: token limit, then justify; EY survey: 82% of executives worried.

Sources: Bloomberg, 4 Nov 2026 (as reported; original paywalled); Pragmatic Engineer, 11 Jun 2026; The Register, 3 Nov 2026; EY, 28 Jul 2026.

---

## 04 · Wed 25 Nov · `04-dont-ask-again.png`

One click in Claude Code put passwords into 1,122 public GitHub files.

The click: "Yes, and don't ask again."

When you approve a command that way, the coding agent saves it to a settings file in your project, so it never has to ask twice. Handy.

It saves the whole command. Including the database password you typed into it.

Then the file gets committed with everything else.

Researchers at Apiiro went looking on public GitHub and found these files in the open. Of the ones they read:

→ 5% allow any shell command outright
→ Another 43% allow interpreters such as python or node to run freely

The lead of Claude Code replied in public: historically, the tool "has not done secret scrubbing", and the team is looking at what it can do.

This is the vibe coding security problem in one file. Nobody wrote insecure code. A convenience feature quietly turned a chat into a credential store.

Five minutes, today:

1. Search your repos for .claude/settings.local.json
2. Add it to .gitignore
3. Read what's in it. That list is what your agent can do without asking you
4. Rotate any key or password you find inside
5. Stop pasting secrets into commands. Use environment variables

Have you ever read your own agent's allow list? 👀

#VibeCoding #AppSecurity #AIAgents

Alt text: "Don't ask again" leaked passwords. 1,122 public files. One click each. File: .claude/settings.local.json; holds every command you approved; 5% allow any shell command; 43% allow python or node freely; fix: gitignore it, rotate keys.

Sources: Apiiro research via Hacker News thread 50407882 (title and quoted figures; Boris Cherny's replies), ~7 Nov 2026. Apiiro's own page blocked automated reading.

---

## 05 · Fri 27 Nov · `05-layoffs-ai.png`

"AI took the jobs."

Someone checked 392 tech layoffs from 2026 against what the companies actually said.

258 of them came with a stated reason. Here's the split:

→ 32 said AI reduces their need for staff. That's 12.4%
→ 50 said they were refocusing the company on AI
→ 159 gave a reason with no link to AI at all. That's 61.6%

And the trend is going the other way. In May, 27 of 49 layoffs were attributed to AI. In October, 3 of 31.

One more detail. Of the companies that said AI cut their staff needs, 10 of the 11 with a readable job board were hiring for marketing roles at the same time.

Fair caveats: this is one researcher, the labels were coded with AI help, and an announcement shows what a company chose to say, not what caused the cut.

But that's the point. "AI did it" is a story a company chooses to tell. It sounds like strategy. "We over-hired and growth slowed" sounds like a mistake.

Next time you see the headline, ask two questions:

1. Did the company say it, or did the press?
2. Is it still hiring for the role it says AI replaced?

Which do you think is more common: AI replacing a job, or AI replacing the explanation?

#Layoffs #AI #TechCareers

Alt text: 392 layoffs. Only 32 blamed AI. What 2026's tech cuts actually said. Events checked: 392, January to November 2026; gave a reason: 258; AI cuts staff: 32, 12.4%; no AI link: 159, 61.6%; October: 3 of 31.

Sources: Ryan Doser, "AI layoffs 2026", 5 Nov 2026 (https://ryandoser.com/research/ai-layoffs-2026/)

---

## 06 · Tue 1 Dec · `06-fake-claude-code.png`

A fake "Claude Code" sat in Cursor's extension store for 11 hours.

It was published under Anthropic's name. It ran the moment it loaded. No click needed.

What it did, according to BleepingComputer:

→ Live on 29 October, about 2:27am to 1:35pm Pacific
→ Version 2.1.313
→ Tried to plant a persistent SSH backdoor on the developer's machine
→ Up to 5,000 developers exposed

Cursor pulled it, then shut down its entire marketplace to audit every other extension and rotate its keys.

How the attacker published under Anthropic's name is still unexplained.

Here's what bothers me. We tell developers to check every package the AI suggests. Then we let our editor auto-update a dozen extensions in the background, each one with full access to our files, keys and terminal.

Your editor is now the most privileged thing on your laptop. Treat it that way:

1. Check ~/.ssh/authorized_keys for a key named "svc-telemetry"
2. Turn off auto-update for extensions
3. Install AI tools from the vendor's own site, not from a search result
4. Remove extensions you haven't used in a month

When did you last look at what's installed in your editor?

#AppSecurity #Cursor #SupplyChain

Alt text: A fake Claude Code sat in Cursor's store. Live for 11 hours. Up to 5,000 devs. When: 29 Oct 2026, 2:27am to 1:35pm PT; version 2.1.313; payload: SSH backdoor on load; check for SSH key "svc-telemetry"; how it got in: still unexplained.

Sources: BleepingComputer, 30 Oct 2026 (https://www.bleepingcomputer.com/news/security/malicious-claude-code-extension-on-cursor-planted-ssh-backdoors/)

---

## 07 · Thu 3 Dec · `07-nine-seconds.png`

An AI agent deleted a company's production database. And the backups. In 9 seconds.

The company is PocketOS, which makes software for car rental operators. The founder's account, from April:

The agent was doing a routine task in staging. It hit a credentials problem. It decided to fix it by deleting a storage volume.

One API call. Production gone. Volume-level backups gone with it, because they lived on the same volume.

Asked why, the agent wrote: "I guessed that deleting a staging volume via the API would be scoped to staging only."

The instructions it had been given included, in capitals, never to guess.

The hosting provider says it restored the data within 30 minutes of getting involved. The founder says gaps remain. Either way, read it again and notice what actually failed:

→ A token that could delete production was within the agent's reach
→ The backups sat inside the blast radius of that same token
→ The safety control was a sentence in a prompt

A prompt is a request. A permission is a fact.

Three checks for this week:

1. Can any credential your agent can read delete production? Scope it to one environment
2. Are your backups reachable with the same key as your data? Move them
3. Have you ever restored from a backup? An untested backup is a hope

What could your coding agent delete right now if it guessed wrong?

#AIAgents #DevOps #VibeCoding

Alt text: 9 seconds. Database and backups gone. One API call. One over-powered token. Agent: Cursor, on a staging task; action: deleted a Railway volume; took with it production and volume backups; its words: "I guessed"; fix: scope tokens, move backups.

Sources: Decrypt, 28 Apr 2026 (https://decrypt.co/365897/ai-agent-deletes-startup-database-9-seconds-founder-says)

---

## 08 · Mon 7 Dec · `08-juniors.png`

Nobody fired the junior developers. They just stopped hiring them.

Two datasets, same story.

SignalFire, tracking hiring against 2019:

→ Entry-level hiring at big tech: down about 65%
→ Entry-level hiring at early-stage startups: down about 76%
→ Engineering hiring overall at big tech: down only 11%

Stanford, using payroll data through June 2026:

→ Employment of 22 to 25 year olds in AI-exposed jobs is 19% below where it would be if it had kept pace with less-exposed peers
→ No comparable gap for experienced workers
→ It works "primarily through reduced hiring", not through people being let go

So the door did not close on engineers. It closed on the first rung.

Every company is making the same sensible decision: let the seniors do it with AI. Add those decisions together and you get an industry that will have no mid-level engineers in 2030.

Seniors are not found. They are made, by years of small tasks, code review and being wrong in safe places. Those are exactly the tasks we now hand to an agent.

If you lead a team, the question is not "do we need juniors?" It's "where will our seniors come from?"

What did your first year of work teach you that an AI would have done for you today?

#TechCareers #SoftwareEngineering #EngineeringLeadership

Alt text: Nobody fired the juniors. Nobody hired. Entry-level hiring, down 65% at big tech. Big tech: entry-level down 65% versus 2019; startups: entry-level down 76% versus 2019; all engineers: down 11% at big tech; age 22 to 25: 19% below peers, Stanford; how: fewer hires, not more exits.

Sources: SignalFire State of Talent 2026, 22 Jun 2026; Brynjolfsson, Chandar, Chen, "Canaries" update, Stanford Digital Economy Lab, Aug 2026.

---

## 09 · Wed 9 Dec · `09-review-5x.png`

AI made writing code cheap. Reviewing it now takes 5x longer.

That's from two years of data on 22,000 developers across 4,000 teams, comparing low and high AI adoption inside the same companies.

The good news first:

→ Tasks completed: up 33.7%

Now the bill:

→ Pull request size: up 51%
→ Median time in review: 5x
→ Incidents per pull request: 3x
→ Bugs per developer: up 54%

Caveats: the source, Faros, sells engineering analytics, and this is correlation, not proof.

But it matches what I see. We made one step of the pipeline ten times faster and left every other step the same size. The queue just moved to the reviewer's desk.

And a tired reviewer facing a 900-line AI pull request does what any human does. They skim it and approve.

What I'd change before buying more AI seats:

1. Cap pull request size. Small changes get real reviews
2. Make the author explain the change in their own words. If they can't, it's not ready
3. Count unreviewed merges. That number should scare you more than velocity excites you
4. Measure accepted changes, not generated ones

What's growing faster on your team: shipped features or the review queue?

#CodeReview #DeveloperProductivity #AI

Alt text: AI made code cheap. Review took 5x longer. 22,000 developers, two years of data. Tasks done: up 33.7%; PR size: up 51%; median review: 5x; incidents per PR: 3x, up 242.7%; bugs per developer: up 54%.

Sources: Faros, "The Acceleration Whiplash", 2026 (https://www.faros.ai/research/ai-acceleration-whiplash)

---

## 10 · Fri 11 Dec · `10-meta-muse.png`

Meta put the title of your private AI chat in the web address.

Then one database query found more than 6,800 of them.

Muse is Meta's personal AI agent. It books appointments, fills in forms and makes purchases, so people tell it a lot.

When you shared a Muse conversation, the share page got its own subdomain. Meta built that subdomain from the conversation's title plus a random ID.

The random ID was meant to be the lock. But a subdomain is not part of the secret path of a URL. Every lookup of it leaves a trace in DNS records that security companies collect and sell.

Researchers at Claroc ran a single passive-DNS query and got the list. Meta paused sharing on 20 October, the day the story ran.

Their summary is the best one-line security lesson of the year:

"An ID only works as a secret while it stays secret, and a hostname is not a secret."

If a company with Meta's security team shipped this, your vibe-coded app can too. Check three things:

1. Do your share links work in a private window, with no login? Then the link is the only lock
2. Is anything a user typed in the hostname? Titles, usernames, project names
3. Can you revoke a link after it's shared?

"Unguessable" is not the same as "private".

Have you ever shared an AI chat by link? Do you know who else can open it?

#AppSecurity #Privacy #AIAgents

Alt text: Meta put your chat title in the URL. 6,800 shares found with one DNS query. Product: Muse, Meta's AI agent; mistake: chat title in the hostname; found by one passive-DNS query; count: more than 6,800 shares; Meta paused sharing, 20 Oct.

Sources: PPC Land on Claroc's research and Ars Technica's report, Oct 2026 (https://ppc.land/meta-halts-muse-share-links-after-6-800-turn-up-in-public-dns-records/)

---

## Scheduling record

All ten were scheduled in LinkedIn on Mon 16 Nov 2026 (~08:15–09:00 PKT) from the composer's clock icon, each with its card and alt text, at 14:00 PKT on the dates above. LinkedIn's "Scheduled (10)" list showed all ten in order afterwards.

No first comments: these posts carry no article link, and LinkedIn cannot schedule a comment.

## Matching blog articles

Each post has a matching Field Notes article, deployed to shezz77.com on 16 Nov 2026 (live HTML matched the build byte for byte after the cache purge). Use these `/go/` links in a first comment once each post is live:

| # | Article | First-comment link |
|---|---|---|
| 01 | /blog/anthropic-ai-bill-beats-payroll/ | https://shezz77.com/go/anthropic-ai-bill-beats-payroll/ |
| 02 | /blog/aws-emulator-no-human-review/ | https://shezz77.com/go/aws-emulator-no-human-review/ |
| 03 | /blog/apple-cuts-engineers-ai-budget/ | https://shezz77.com/go/apple-cuts-engineers-ai-budget/ |
| 04 | /blog/claude-code-dont-ask-again-leak/ | https://shezz77.com/go/claude-code-dont-ask-again-leak/ |
| 05 | /blog/layoffs-that-blamed-ai/ | https://shezz77.com/go/layoffs-that-blamed-ai/ |
| 06 | /blog/fake-claude-code-cursor-store/ | https://shezz77.com/go/fake-claude-code-cursor-store/ |
| 07 | /blog/agent-deleted-database-nine-seconds/ | https://shezz77.com/go/agent-deleted-database-nine-seconds/ |
| 08 | /blog/juniors-not-fired-not-hired/ | https://shezz77.com/go/juniors-not-fired-not-hired/ |
| 09 | /blog/ai-code-review-takes-5x-longer/ | https://shezz77.com/go/ai-code-review-takes-5x-longer/ |
| 10 | /blog/meta-muse-chat-titles-in-dns/ | https://shezz77.com/go/meta-muse-chat-titles-in-dns/ |
