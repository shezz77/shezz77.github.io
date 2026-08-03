export const POSTS = [
  {
    slug: "context-is-the-job", cat: "AI", date: "Aug 2026", minutes: 7,
    tags: ["AI-assisted", "Context", "Workflow"],
    title: "Context is the job now",
    excerpt: "The useful work happens before the question. Three minutes of assembling context is the difference between a suggestion I merge and a suggestion I argue with.",
    blocks: [
      { t: "p", text: "The most valuable thing I do with an AI assistant happens before I ask it anything. I spend two or three minutes assembling context, and that is reliably the difference between an answer I merge and an answer I spend twenty minutes arguing with." },
      { t: "p", text: "This is not a prompting trick. It is the same discipline that makes a design document useful, applied under time pressure to a smaller decision. The tool just made the cost of skipping it immediate and visible." },
      { t: "h", text: "The four things I supply before the question" },
      { t: "list", items: [
        "The constraint I am actually under: the deadline, the team size, the thing I am not permitted to change.",
        "The shape of the code around it — one representative file, not the whole module.",
        "What I have already ruled out, and why. This alone kills most of the generic answers.",
        "The failure I am trying to prevent, stated as a scenario rather than as a quality."
      ] },
      { t: "p", text: "That last one does more work than the other three combined. Asking for code that is resilient produces a lecture about resilience. Telling it that this consumer will see the same message twice when the broker redelivers after a partition produces an idempotency key and a unique constraint." },
      { t: "quote", text: "A vague question gets a confident, average answer. The averageness is the tell." },
      { t: "h", text: "Context belongs in the repo, not in your chat history" },
      { t: "p", text: "For a while I was retyping the same six facts into every session. Now they live in a file next to the code, and every session — mine or anyone else's — starts from the same footing. It reads like the onboarding note we should have written for humans years ago, which is not a coincidence." },
      { t: "code", label: "context/engineering.md", lines: [
        { text: "# what this codebase assumes", color: "#5E5344" },
        { text: "stack:      Laravel 11, MySQL 8, RabbitMQ", color: "#B9A98C" },
        { text: "we do:      repositories, form requests, feature tests over unit", color: "#9A8B70" },
        { text: "we do not:  facades in domain code, raw SQL outside repositories", color: "#9A8B70" },
        { text: "deploys:    immutable SHA tags, migrations gated before rollout", color: "#9A8B70" },
        { text: "", color: "#5E5344" },
        { text: "open risk:  legacy billing module has no test coverage", color: "#E0A458" },
        { text: "            treat every change there as unverified", color: "#BF6B4E" }
      ] },
      { t: "p", text: "The file has a second effect I did not plan for. Writing down what we do not do forced three conventions out of tribal memory and into an argument, and two of them did not survive the argument. That was worth the afternoon on its own." },
      { t: "h", text: "What actually changed in my day" },
      { t: "p", text: "The headline number is unglamorous: on non-trivial changes, roughly one in four first attempts used to be usable without rework. With the context assembled up front it is comfortably better than one in two. The rest of the gain is that the failures fail obviously instead of plausibly." },
      { t: "p", text: "The skill this rewards is not prompt engineering. It is the ability to state a problem precisely, including the parts you were hoping to leave implicit — which is the same skill that separates an architecture document people can act on from one they nod at. The tool did not create that skill. It just started paying it out weekly instead of quarterly." }
    ],
    takeaways: [
      "State the failure you are preventing as a scenario, not as an adjective.",
      "Put your conventions in a file beside the code so every session starts from the same footing.",
      "The scarce skill is precise problem statement — the same one good design docs have always required."
    ]
  },
  {
    slug: "argue-back-rubber-duck", cat: "AI", date: "Aug 2026", minutes: 6,
    tags: ["AI-assisted", "System design", "Review"],
    title: "Rubber-ducking with something that argues back",
    excerpt: "I run design decisions past a model before I run them past a person. Not because it is smart — because it is available at 11pm and has no stake in the outcome.",
    blocks: [
      { t: "p", text: "I have started putting design decisions through a model before they reach a colleague, for reasons that have very little to do with the model being clever. It is available at 11pm, it has no stake in the outcome, and it will not soften its third objection because I looked irritated by the second." },
      { t: "h", text: "The framing is the whole thing" },
      { t: "p", text: "Asking what it thinks of a design gets agreement, because agreement is the safe answer to a vague question. The version that works is adversarial: state the design as a decision already made, then ask for the strongest available case that it is wrong." },
      { t: "code", label: "the framing that works", lines: [
        { text: "// gets you a mirror", color: "#5E5344" },
        { text: "\"what do you think of splitting billing into its own service?\"", color: "#9A8B70" },
        { text: "", color: "#5E5344" },
        { text: "// gets you a review", color: "#5E5344" },
        { text: "\"we are splitting billing into its own service. give me the", color: "#E0A458" },
        { text: "  three strongest arguments that this is a mistake, ranked by", color: "#E0A458" },
        { text: "  how likely they are to bite us in the first six months.\"", color: "#E0A458" },
        { text: "", color: "#5E5344" },
        { text: "-> \"invoice creation and ledger write become a distributed", color: "#BF6B4E" },
        { text: "    transaction. you have not said how you settle a partial.\"", color: "#BF6B4E" }
      ] },
      { t: "quote", text: "Ask for an opinion and you get a mirror. Ask for a rebuttal and you get a review." },
      { t: "p", text: "That specific objection cost me a fortnight of pleasant assumption. I knew both writes existed. I had not put them in the same sentence, and putting them in the same sentence is the entire job." },
      { t: "h", text: "Where it helps, and where it cannot" },
      { t: "list", items: [
        "Good: enumerating failure modes you have not thought of, and naming the pattern you are quietly reinventing.",
        "Good: surfacing the assumption you left unstated, because it has to be stated before it can be attacked.",
        "Not good: judging whether the trade-off is right for your team. It does not know your on-call rotation is one person.",
        "Not good: knowing which objection matters. It ranks by plausibility; you rank by what you can survive."
      ] },
      { t: "p", text: "So the output is not the value. The value is that writing a design down in enough detail to be attacked is most of the thinking, and having something that will reliably attack it removes the excuse not to. This is the same mechanism that made architecture decision records work, with the latency dropped from a week to a minute." },
      { t: "p", text: "One caution learned the slow way: it will argue against a good decision just as fluently as a bad one. The rebuttal is an input, not a verdict. If you cannot articulate why an objection does not apply to you, that is a signal — but it is a signal to go and find out, not to reverse course." }
    ],
    takeaways: [
      "Ask for the strongest case against your decision, ranked by likelihood — never for an opinion.",
      "The forcing function is writing the design down precisely enough to be attacked.",
      "It ranks objections by plausibility; only you can rank them by what your team can survive."
    ]
  },
  {
    slug: "strange-codebase-in-a-day", cat: "AI", date: "Aug 2026", minutes: 7,
    tags: ["AI-assisted", "Onboarding", "Legacy"],
    title: "Reading a strange codebase in a day",
    excerpt: "Inheriting 200k lines used to be a week of grep and optimism. The goal was never to have the code explained — it was to get a map you can be wrong about quickly.",
    blocks: [
      { t: "p", text: "Most of my consulting work starts the same way: a codebase I have never seen, a team that is tired of explaining it, and a question I am expected to answer by Friday. The first day used to be grep and optimism. It is now a fairly mechanical hour, and the change is larger than any productivity claim I would normally believe." },
      { t: "h", text: "The order the questions go in" },
      { t: "p", text: "The mistake is asking what the code does. That gets you a summary, and a summary is exactly the thing you cannot verify. Ask for structure instead, in an order that builds a map rather than a narrative." },
      { t: "code", label: "the first four questions", lines: [
        { text: "1. list every entry point: http routes, consumers, cron, cli", color: "#B9A98C" },
        { text: "2. the data model as tables and relations, nothing else", color: "#B9A98C" },
        { text: "3. trace the one flow that makes the money, end to end", color: "#E0A458" },
        { text: "4. where does this codebase disagree with its own conventions?", color: "#E0A458" },
        { text: "", color: "#5E5344" },
        { text: "# 4 is the one that pays. the disagreements are where the", color: "#5E5344" },
        { text: "# history is, and the history is what nobody will tell you.", color: "#5E5344" }
      ] },
      { t: "p", text: "Question four consistently returns the most valuable thing in the room. Every codebase has three or four places where it stops following its own rules, and each one is a decision somebody made under pressure that is still load-bearing. Those are the places that will bite a newcomer, and they are precisely what an experienced engineer would have taken a month to notice." },
      { t: "quote", text: "The goal is not to have the code explained. It is to get a map you can be wrong about quickly." },
      { t: "h", text: "Verify against the thing, never the summary" },
      { t: "p", text: "A confidently wrong call graph is worse than no call graph, because you will build on it. So every structural claim gets checked against the code itself before it enters my model: run the test, follow the import, add a log line. I treat the output as a set of leads, and leads are cheap to disprove — which is the entire reason this works." },
      { t: "p", text: "The two failures I now expect: a caller that no longer exists because a refactor left the function orphaned, and a relationship inferred from naming rather than from a foreign key. Both look completely reasonable. Both take about ninety seconds to check." },
      { t: "list", items: [
        "First useful question to the team went from day three to hour two — and it was a better question.",
        "The map is wrong in two or three places, which I now expect and go looking for.",
        "What I stopped spending: the two days of reading required before I could ask anything without embarrassing myself."
      ] },
      { t: "p", text: "The part I did not anticipate is what this does to the incumbent team. Turning up on the second morning with a diagram they have never had and asking whether the odd bit in the billing module was deliberate is a very different conversation from asking them to walk you through the app. They correct the diagram, and the corrections are the good stuff." }
    ],
    takeaways: [
      "Ask for structure — entry points, data model, the flow that earns — not for an explanation.",
      "Ask where the codebase disagrees with itself; that is where the undocumented history lives.",
      "Treat every structural claim as a lead to disprove against the code, not as a fact."
    ]
  },
  {
    slug: "the-review-bottleneck", cat: "Leadership", date: "Aug 2026", minutes: 6,
    tags: ["AI-assisted", "Code review", "Team"],
    title: "The bottleneck moved to review and nobody staffed for it",
    excerpt: "My team writes considerably more code than it did a year ago and ships about the same amount. The constraint moved, and our process did not move with it.",
    blocks: [
      { t: "p", text: "Here is the uncomfortable measurement from last quarter. My team produced substantially more code than in the same quarter a year earlier, and shipped roughly the same amount of working software. Nothing was being wasted on the wrong things. The constraint had simply moved from writing to reading, and our process was still optimised for the old one." },
      { t: "h", text: "Attention is now the scarce resource" },
      { t: "p", text: "Generating a 600-line change is close to free. Holding 600 lines in your head well enough to say whether they are correct costs exactly what it always did. When production goes up and comprehension does not, the queue forms at the reviewer, and the failure mode is not a slow queue — it is an approving one." },
      { t: "quote", text: "A pull request nobody has the energy to read is a liability with a green checkmark on it." },
      { t: "h", text: "The three changes that helped" },
      { t: "list", items: [
        "A hard size cap. Over ~400 lines a change gets split, no discussion. Beyond that our review quality falls off a cliff we can see in the defect data.",
        "The description explains intent and rejected alternatives. The diff already says what changed; only the author knows what was considered and dropped.",
        "Authors mark which parts they have verified themselves and how. Generated code that has not been executed is called out as such."
      ] },
      { t: "code", label: "pull request template", lines: [
        { text: "## what this is for", color: "#B9A98C" },
        { text: "## what I considered and rejected", color: "#B9A98C" },
        { text: "## how I verified it", color: "#E0A458" },
        { text: "   [ ] ran it against real data", color: "#9A8B70" },
        { text: "   [ ] test added that fails without this change", color: "#9A8B70" },
        { text: "   [ ] read every line I am asking you to read", color: "#BF6B4E" }
      ] },
      { t: "p", text: "That last checkbox started as a joke in a retro and turned out to be the most effective line in the file. Nobody wants to tick it dishonestly, and a few people stopped opening pull requests they had not fully read, which was the entire point." },
      { t: "h", text: "The part I am still working on" },
      { t: "p", text: "Juniors used to build their mental model by writing the boring 70%. That work is largely gone, and the model it produced was not decorative — it is what lets someone look at a diff and feel that something is off. I have not solved this. What we do now is have them review more than they write, and defend the review out loud, which is slower and demonstrably better than the alternative." },
      { t: "p", text: "The wider lesson is one every team hits eventually. Removing a constraint does not make the system faster; it relocates the constraint somewhere you were not measuring. If you have adopted these tools and your throughput has not moved, the queue has formed somewhere. It is almost always in front of a person who is reading." }
    ],
    takeaways: [
      "When generation gets cheap, review becomes the constraint — measure it before you celebrate velocity.",
      "Cap change size and require intent plus rejected alternatives in the description.",
      "Make authors state how they verified the code, including whether they actually read it."
    ]
  },
  {
    slug: "event-bus-over-cron", cat: "Architecture", date: "Jul 2026", minutes: 8,
    tags: ["RabbitMQ", "Laravel", "Event-driven"],
    title: "Why we replaced 14 cron jobs with a single event bus",
    excerpt: "Scheduled jobs are the cheapest way to build a distributed system and the most expensive way to run one. Here is the migration that closed our nightly failure window.",
    blocks: [
      { t: "p", text: "Every cron job is an implicit contract: this thing will have finished by the time that thing starts. We had fourteen of those contracts spread across three services, and none of them were written down anywhere except in the crontab's whitespace." },
      { t: "p", text: "It worked for two years. Then a client tripled their catalogue, the nightly import went from nine minutes to fifty, and the index rebuild started reading a half-written table. We found out from the support queue at 9am, which is the worst monitoring system money can buy." },
      { t: "h", text: "What the schedule was actually encoding" },
      { t: "p", text: "The first useful exercise was writing down what each job assumed. Not what it did — what it needed to already be true. Of the fourteen jobs, four had a real ordering dependency. The other ten were scheduled at staggered times purely so they would not collide on CPU." },
      { t: "quote", text: "Ten of the fourteen jobs did not need a schedule at all. They needed to know when something had happened." },
      { t: "h", text: "One rule: publish facts, not commands" },
      { t: "p", text: "We moved to RabbitMQ with a single design rule that settled most arguments before they started. A producer publishes a fact about something that already happened, in the past tense, and it does not know or care who consumes it. No job ever tells another job to run." },
      { t: "code", label: "before / after", lines: [
        { text: "# 14 crons across 3 services", color: "#5E5344" },
        { text: "0 2 * * *  php artisan import:feed", color: "#9A8B70" },
        { text: "0 3 * * *  php artisan index:rebuild   # hopes import is done", color: "#9A8B70" },
        { text: "0 4 * * *  php artisan notify:digest   # hopes index is done", color: "#9A8B70" },
        { text: "", color: "#5E5344" },
        { text: "# one bus", color: "#5E5344" },
        { text: "publish  catalogue.import.completed", color: "#E0A458" },
        { text: "  |- search-indexer     (retry x3, backoff)", color: "#B9A98C" },
        { text: "  |- digest-builder     (retry x3, backoff)", color: "#B9A98C" },
        { text: "  '- audit-log          (dlq on failure)", color: "#BF6B4E" }
      ] },
      { t: "p", text: "The four real orderings stayed explicit: the indexer publishes its own completion event, and the digest builder waits for that rather than for a clock. Everything else became parallel by default, which turned out to be the throughput win we were not looking for." },
      { t: "h", text: "The part that actually mattered" },
      { t: "p", text: "The payoff was not speed. It was that failure became a thing you can see. A stuck consumer is a queue with depth on a dashboard, and the message is still sitting there, replayable once you ship the fix. A failed cron job is silence until someone complains." },
      { t: "list", items: [
        "Median end-to-end catalogue freshness went from 4h 20m to 11m.",
        "Nightly incidents attributable to job ordering: 6 in the prior quarter, 0 in the two since.",
        "Time to recover a failed import step: from a full re-run to a single message replay."
      ] },
      { t: "p", text: "The migration took three weeks, most of it spent making consumers idempotent. That work would have been necessary eventually anyway — the bus just made it non-optional, which is the useful kind of forcing function." }
    ],
    takeaways: [
      "Write down what each scheduled job assumes is already true. Most of those assumptions are not real dependencies.",
      "Publish facts in the past tense; let consumers decide what to do about them.",
      "Dead-letter queues convert overnight silence into a replayable Monday morning."
    ]
  },
  {
    slug: "the-monolith-you-should-keep", cat: "Architecture", date: "Jun 2026", minutes: 6,
    tags: ["System design", "Modular monolith"],
    title: "The monolith you should keep",
    excerpt: "Splitting a service is a bet on your ability to run more infrastructure. Often the right architecture decision is a well-bounded module and a boring deploy.",
    blocks: [
      { t: "p", text: "Almost every team that asks me for microservices wants two specific things: independent deploys and clear ownership. Both are organisational problems, and you can solve both inside one codebase without taking on a distributed system." },
      { t: "h", text: "The three seams worth splitting on" },
      { t: "p", text: "I look for a genuine seam before agreeing to a split, and there are only three I trust: a different scaling curve, a different failure tolerance, or a different team with its own release cadence. Absent one of those, a split distributes your existing bugs across a network." },
      { t: "list", items: [
        "Different scaling curve: video transcoding next to a CRUD admin panel.",
        "Different failure tolerance: payment capture that must not go down when search does.",
        "Different team: a genuinely separate group with its own on-call rotation."
      ] },
      { t: "quote", text: "A distributed transaction is a bug you chose to build. Make sure you chose it for a reason you can name." },
      { t: "h", text: "Enforce the boundary before you enforce it with HTTP" },
      { t: "p", text: "The good news is you can get most of the discipline for free. Declare your modules, then fail the build when one reaches into another's internals. If a boundary survives six months of that pressure without anyone needing to cheat, it is real and you can extract it in an afternoon. If people cheat constantly, the boundary was wrong and you just saved yourself a rewrite." },
      { t: "code", label: "ci boundary check", lines: [
        { text: "modules:", color: "#B9A98C" },
        { text: "  billing:   depends_on: [shared]", color: "#9A8B70" },
        { text: "  catalogue: depends_on: [shared]", color: "#9A8B70" },
        { text: "  # billing must never import catalogue internals", color: "#5E5344" },
        { text: "", color: "#5E5344" },
        { text: "$ composer analyse:boundaries", color: "#E0A458" },
        { text: "  FAIL  Billing\\Invoice imports Catalogue\\Models\\Product", color: "#BF6B4E" }
      ] },
      { t: "p", text: "Keeping the monolith buys you one migration story, real transactions, one trace per request, and a local environment that a new hire can run before lunch. Those are not consolation prizes. They are the things teams miss most about six months after the split." }
    ],
    takeaways: [
      "Split on scaling curves, failure tolerance, or team lines — not on architecture diagrams.",
      "Enforce module boundaries in CI first; extract to a service only once the boundary has held.",
      "One migration story and one trace per request are worth more than they look on a slide."
    ]
  },
  {
    slug: "boring-ecs-pipeline", cat: "Cloud & DevOps", date: "May 2026", minutes: 7,
    tags: ["AWS ECS", "Docker", "CI/CD"],
    title: "ECS without tears: a deploy pipeline that is genuinely boring",
    excerpt: "Docker build, ECR push, rolling update, health check, done. The interesting part is everything I deliberately left out.",
    blocks: [
      { t: "p", text: "The pipeline I use on every ECS project is four stages and about ninety lines of YAML. It has not changed materially in three years, and that is the whole point. A deploy pipeline is infrastructure you should stop thinking about." },
      { t: "h", text: "The four stages" },
      { t: "list", items: [
        "Build: multi-stage Dockerfile, so the runtime image carries no compilers or dev dependencies.",
        "Push: immutable tag from the commit SHA. Never latest, in any environment.",
        "Migrate: a one-off ECS task that must exit zero before the service update starts.",
        "Update: rolling deployment behind a health check, with circuit breaker rollback enabled."
      ] },
      { t: "p", text: "Tagging by commit SHA is the single highest-leverage line in the file. It makes a rollback a redeploy of an artifact that has already been built and already been running, rather than a rebuild from a git tag under pressure at 6pm." },
      { t: "code", label: "the only interesting part", lines: [
        { text: "IMAGE=$REGISTRY/app:$GITHUB_SHA", color: "#E0A458" },
        { text: "docker build --target runtime -t $IMAGE .", color: "#B9A98C" },
        { text: "docker push $IMAGE", color: "#B9A98C" },
        { text: "aws ecs run-task --overrides migrate.json   # must exit 0", color: "#9A8B70" },
        { text: "aws ecs update-service --force-new-deployment", color: "#9A8B70" },
        { text: "# rollback == update-service with the previous SHA", color: "#5E5344" }
      ] },
      { t: "h", text: "What is deliberately missing" },
      { t: "p", text: "No bespoke deploy script living on one engineer's laptop. No manual migration step in a runbook. No staging environment that was hand-built in the console two years ago and now differs from production in ways nobody can enumerate. Every environment comes from the same template with different parameters." },
      { t: "quote", text: "If a deploy needs a human in a terminal, it is not finished — it is a rehearsal." },
      { t: "p", text: "Health checks deserve more care than they usually get. Point them at an endpoint that touches the database and the queue connection, not one that returns a static string. A container that is listening but cannot reach its dependencies should fail the check and be replaced, not quietly serve errors while the dashboard stays green." }
    ],
    takeaways: [
      "Tag images by commit SHA so rollback is a redeploy, never a rebuild.",
      "Gate the service update on a migration task that must exit zero.",
      "Health-check the dependencies, not just the process."
    ]
  },
  {
    slug: "rabbitmq-retries", cat: "Architecture", date: "Apr 2026", minutes: 9,
    tags: ["RabbitMQ", "Reliability"],
    title: "RabbitMQ retries: the three patterns that actually work",
    excerpt: "Naive requeue is an infinite loop with extra steps. Delay exchanges, capped backoff, and a poison lane cover nearly everything you will hit in production.",
    blocks: [
      { t: "p", text: "The first retry strategy everyone writes is nack with requeue set to true. It looks correct and it is a denial of service against your own broker: a permanently broken payload will spin as fast as the consumer can pick it up, burning CPU and pushing every other message behind it." },
      { t: "h", text: "Pattern one: TTL delay exchanges" },
      { t: "p", text: "Make the wait explicit. On failure, publish the message to a delay queue with a per-message TTL and a dead-letter route back to the work queue. The broker holds it for you; no consumer sleeps, no thread is blocked, and the delay is visible in the topology rather than buried in application code." },
      { t: "code", label: "topology", lines: [
        { text: "work.queue        <-- consumers", color: "#B9A98C" },
        { text: "  on failure: publish to retry.5s / retry.30s / retry.5m", color: "#9A8B70" },
        { text: "retry.30s   ttl=30000  dlx=work.exchange", color: "#E0A458" },
        { text: "  after ttl expires -> back to work.queue", color: "#5E5344" },
        { text: "", color: "#5E5344" },
        { text: "x-attempt: 3   # header, incremented by the consumer", color: "#B9A98C" },
        { text: "attempt > 5 -> publish to poison.queue, ack original", color: "#BF6B4E" }
      ] },
      { t: "h", text: "Pattern two: cap the backoff, then park" },
      { t: "p", text: "Count attempts in a message header and cap them. Unbounded exponential backoff sounds prudent but eventually means a message retrying once a day forever, which nobody is watching. After the cap, move the message to a poison queue and acknowledge the original. Parking is not dropping." },
      { t: "quote", text: "A poison queue with a small dashboard beats a work queue you eventually purge in frustration. The parked message body is the best bug report you will get." },
      { t: "h", text: "Pattern three: idempotent consumers" },
      { t: "p", text: "None of the above is safe unless a message can be processed twice without harm. At-least-once delivery means duplicates are a certainty, not an edge case: a consumer can finish its work and die before the ack lands. Key every side effect on something derived from the message, and make the second attempt a no-op." },
      { t: "list", items: [
        "Upserts keyed on a stable business identifier, not an auto-increment id.",
        "An idempotency table for anything that leaves your system — emails, webhooks, payments.",
        "Ack after the side effect, never before."
      ] },
      { t: "p", text: "Three patterns, roughly two hundred lines of shared infrastructure code, and the retry conversation stops recurring in every code review." }
    ],
    takeaways: [
      "Never requeue blindly; a TTL delay exchange gives you real backoff for free.",
      "Count attempts in a header, cap them, then park in a poison queue you actually monitor.",
      "Idempotency is the precondition that makes every other retry pattern safe."
    ]
  },
  {
    slug: "reading-code-as-a-manager", cat: "Leadership", date: "Mar 2026", minutes: 5,
    tags: ["Engineering management", "Code review"],
    title: "Reading code as a manager without taking the keyboard",
    excerpt: "Staying technical as an engineering manager is not about writing the tricky patch. It is about reading enough to ask the question that saves a sprint.",
    blocks: [
      { t: "p", text: "The failure mode I see most in new engineering managers is not losing technical depth. It is spending that depth in the wrong place — reviewing style on CRUD endpoints while an architectural decision goes through unexamined in a different pull request." },
      { t: "h", text: "Read the decisions, delegate the diffs" },
      { t: "p", text: "I read every pull request that changes a boundary, a schema, or a dependency, and almost none of the ones that add a field to a form. Formatting belongs to the linter. Naming belongs to the two engineers who will maintain it. Failure modes belong to me." },
      { t: "list", items: [
        "What happens when this call times out?",
        "What is the rollback, and has anyone run it?",
        "Who gets paged when this breaks, and will the page tell them anything useful?"
      ] },
      { t: "p", text: "Those three questions have caught more production incidents for me than any amount of line-by-line reading. They are also teachable: after a few months, engineers start answering them in the description before I ask." },
      { t: "quote", text: "Every patch you write for someone is a lesson they did not get, and a piece of the system only you understand." },
      { t: "h", text: "The trap" },
      { t: "p", text: "The temptation is to fix it yourself. You can see the problem, you know the fix, it is twenty minutes. It is faster once and slower forever: the engineer learns nothing, and you have quietly made yourself the bottleneck on the one part of the system nobody else has had to reason about." },
      { t: "p", text: "The exception I allow myself is pairing. Not taking the keyboard, but sitting alongside while they type — same information transfer, and the code ends up in the head of the person who will be on call for it." }
    ],
    takeaways: [
      "Review boundaries, schemas, and dependencies; let the linter own style.",
      "Ask about timeouts, rollback, and paging on every non-trivial change.",
      "Pair instead of patching — the fix should land in the head of whoever will be on call."
    ]
  },
  {
    slug: "android-with-an-llm", cat: "AI", date: "Feb 2026", minutes: 6,
    tags: ["AI-assisted", "Android", "Shipping"],
    title: "Shipping an Android app with an LLM in the loop",
    excerpt: "Concept to Play Store with AI doing the scaffolding. What it genuinely accelerated, and the two places it quietly cost me a day.",
    blocks: [
      { t: "p", text: "I shipped a small Android app last quarter, mostly to find out where AI assistance actually helps on a codebase I did not already know by heart. The honest answer: it compressed the boring 70% and left the hard 30% exactly as hard." },
      { t: "h", text: "Where it paid off immediately" },
      { t: "p", text: "Anything I could specify precisely came back correct on the first or second attempt. Room entities and DAOs from a schema description. RecyclerView adapters. Repository interfaces with the error cases enumerated. Unit tests for behaviour I could describe in a sentence. A working skeleton existed in an afternoon instead of a week." },
      { t: "h", text: "Where it cost me a day, twice" },
      { t: "p", text: "First, a permissions flow that looked entirely plausible and did not match current platform behaviour on recent Android versions. It compiled, it ran, and it silently did the wrong thing on a real device. Second, a data layer that was correct until two writes overlapped, at which point it was quietly lossy." },
      { t: "quote", text: "Both of those were review failures, not model failures. I merged something I had read but not thought about." },
      { t: "h", text: "The rule I settled on" },
      { t: "p", text: "I now treat generated code as a competent new hire's first draft: often good, sometimes confidently wrong, and never merged unread. The review bar is exactly the one I would apply to a person, with extra suspicion in two areas — anything platform-version-specific, and anything touching concurrency." },
      { t: "list", items: [
        "Specify tightly and it is fast. Specify loosely and it invents something plausible.",
        "Platform quirks and concurrency still need a human who has been burned before.",
        "The time saved is real, and it moves entirely into review. Budget for that."
      ] }
    ],
    takeaways: [
      "AI accelerates the parts you can specify precisely; it invents plausibly for the parts you cannot.",
      "Review generated code exactly as you would a new hire's first pull request.",
      "Be most suspicious around platform-version behaviour and concurrent writes."
    ]
  },
  {
    slug: "high-volume-hiring-data", cat: "Cloud & DevOps", date: "Jan 2026", minutes: 8,
    tags: ["MySQL", "Data modeling", "Performance"],
    title: "Data modeling for high-volume hiring workloads",
    excerpt: "Recruitment traffic is spiky, write-heavy, and read through dashboards. Three modeling choices kept assessment platforms responsive on campaign day.",
    blocks: [
      { t: "p", text: "Hiring platforms have an unusual traffic shape. Applications arrive in bursts tied to a campaign going live — tens of thousands in an hour, then near silence — and the same rows are then read repeatedly by recruiters filtering dashboards for weeks afterwards." },
      { t: "h", text: "Separate the write path from the reporting path" },
      { t: "p", text: "That asymmetry is the entire design. The write path should be narrow and close to append-only: validate, insert, publish an event, return. Anything a dashboard needs that is not a raw field gets derived asynchronously by a consumer, not computed at request time." },
      { t: "quote", text: "The fastest query is the one you never run during a request." },
      { t: "h", text: "Precompute the counters" },
      { t: "p", text: "Every recruitment dashboard wants counts by stage, by role, by source. Running those as aggregate queries on campaign day is how you take the platform down. We maintain counter rows updated by the same event consumers that process applications, and reconcile nightly against the source of truth." },
      { t: "code", label: "the query that used to time out", lines: [
        { text: "-- before: 2.8s on campaign day, table-scanning", color: "#5E5344" },
        { text: "SELECT stage, COUNT(*) FROM applications", color: "#9A8B70" },
        { text: "  WHERE campaign_id = ? GROUP BY stage;", color: "#9A8B70" },
        { text: "", color: "#5E5344" },
        { text: "-- after: 3ms, one row per campaign+stage", color: "#5E5344" },
        { text: "SELECT stage, n FROM campaign_stage_counts", color: "#E0A458" },
        { text: "  WHERE campaign_id = ?;", color: "#E0A458" }
      ] },
      { t: "h", text: "Cursor pagination, not OFFSET" },
      { t: "p", text: "Recruiters page deep into filtered lists. OFFSET 40000 asks the database to find and discard forty thousand rows before returning twenty, and it gets linearly worse the further they scroll. A keyset cursor over a sorted composite index stays flat regardless of depth, and it does not skip or duplicate rows when new applications arrive mid-session." },
      { t: "list", items: [
        "Composite index matching the exact sort order the UI offers — and only the orders it offers.",
        "Encode the cursor as an opaque token so the client cannot invent positions.",
        "Cap page size server-side; a well-meaning integration will ask for ten thousand."
      ] },
      { t: "p", text: "None of this is clever. It is the same three moves on every high-write, dashboard-read system I have worked on, and they consistently do more for perceived speed than any instance-size change." }
    ],
    takeaways: [
      "Keep the write path narrow and derive reporting data asynchronously.",
      "Precompute counters; never COUNT(*) a campaign-day dashboard.",
      "Keyset cursors over composite indexes stay flat where OFFSET degrades."
    ]
  }
];

export const CATS = ["All", "Architecture", "Cloud & DevOps", "Leadership", "AI"];
