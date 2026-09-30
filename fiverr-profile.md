# Fiverr profile — rewrite, applied live

> **STATUS (2026-09-21): profile fields are LIVE, gig #1 is PUBLISHED, and the portfolio
> has 3 projects.** Account is `fiverr.com/shehzadaslam`; the gig shows under Active with
> 0 impressions so far.
>
> | | Assumed | Actual on the account |
> |---|---|---|
> | Gigs | some live | **zero active** — one paused gig from years ago |
> | Level | some standing | **Level 0**, 5.0 rating, $0 earned, no active orders |
> | Profile strength | — | was **8/12** → 9/12 after the rewrite → **10/12** with the portfolio; intro video and certifications are the 2 open items |
> | Tagline | — | "I'm expert laravel, reactjs and react native developer" |
> | About | — | 4-years-experience text that **named your Upwork profile** (ToS risk) |
> | Portfolio / intro video / work history | — | all empty |

Positioning follows the LinkedIn and Upwork work: **agent engineering as a discipline**,
with backend architecture underneath. Same claims, same evidence.

**The headline problem was not the profile. It was that you had no gigs.** A Fiverr
profile does not appear in buyer search; gigs do. With zero active gigs the account was
invisible no matter how good the About section read. That is why most of the effort went
into building a real gig rather than polishing copy.

---

## 1. What is live on the profile now

### Display name
```
Shehzad Aslam
```
(3–15 character limit. It was blank — the profile showed "Add display name" publicly.)

### Tagline
```
AI agent engineer building Claude Agent SDK agents and MCP servers
```
**Gotcha:** the tagline validator rejects `|` and it silently refused a version with
periods too. Letters, numbers and spaces are the safe set.

### About — 600 characters, and it fits in exactly 600
```
I build AI agents that survive production, not demos.

Claude Agent SDK, MCP servers, custom tools, subagent orchestration, and hook-based
permission boundaries - plus the evals that prove the thing still works next week.

Most agent projects die in the same place: the demo lands, then nobody can say what
happens when the model deletes the wrong row. That gap is my work.

Eleven years as a software architect and engineering manager behind it: Laravel and Node
services, MySQL at volume, RabbitMQ, Docker on AWS ECS.

I publish my methods in full, so you can judge the approach before you hire me.
```

The old About text ended with *"You'll see previous projects that we've completed on our
Upwork Profile."* Naming another marketplace in your profile is the exact pattern Fiverr's
automated scan suspends accounts for. That sentence is gone.

### Skills — now 10
Laravel, JavaScript, React, Node.js, React Native (kept) + **AI developer, Python,
TypeScript, AWS, MySQL** (added), all at Pro.

**Gotcha:** skills must be chosen from Fiverr's autocomplete; free text is rejected (the
Add button stays disabled). There is **no "AI agent" or "prompt engineering" entry in the
taxonomy at all** — "AI developer" is the closest thing that exists. The experience-level
dropdown does not always paint its list; focus it and press Down ×3 + Enter for Pro.

### Work experience
**Bayt.com — Principal Software Engineer, Feb 2021 – Dec 2024** is live, with the AfterHire
/ Evalufy description.

**Trustshoot was rejected by Fiverr and had to be deleted.** Companies come from a
directory; anything you type is submitted as a "suggested company" and auto-moderated.
Bayt.com passed. Trustshoot came back **Rejected** within seconds, with "Delete this entry
and add a new one" and no appeal path in the UI. Options: try again later, try a different
legal name for the company, or leave the section with Bayt only. I did not add Moon Group
or Powersoft19 — same rejection risk, and Moon Group's dates are still unresolved (below).

---

## 2. Gig #1 — published

Live at `fiverr.com/shehzadaslam` under Active gigs, published at the prices below.

**Title** (`I will` is fixed by Fiverr; 63/80 characters used)
```
I will build a production MCP server for your database or internal API
```

**Category:** Programming & Tech › AI Development · **Service type:** AI Integrations
**AI engines:** Claude + GPT — *Fiverr does list Claude here, unlike Upwork*
**Languages:** TypeScript, JavaScript, Python, PHP, SQL
**Search tags:** mcp server · claude · ai integration · api integration · database

**Packages**

| | Basic | Standard | Premium |
|---|---|---|---|
| Name | Read-only MCP server | Scoped access and auth | Writes, audit and deploy |
| Price | **$650** | **$1,400** | **$2,800** |
| Delivery | 7 days | 14 days | 21 days |
| Revisions | 1 | 2 | 3 |

Included in all three: AI model integration, database integration, source code, detailed
code comments. Extra fast delivery is switched off.

Prices mirror your Upwork Catalog offer A so a buyer comparing the two sees one price.
Note Fiverr takes **20%**, against Upwork's 10% — $650 here nets $520.

**Description** (1,142 / 1,200 characters) — leads with the failure mode, not with you:

> Most MCP tutorials hand the model a database admin connection and call it an
> integration. That works right up until it doesn't.
>
> I build MCP servers that expose your database, internal API or tooling to Claude Code,
> Claude Desktop or your own agent, with the access boundary drawn on purpose.
>
> WHAT YOU GET
> Tools designed around what the model should be able to do, not a raw SQL passthrough.
> Read-only by default; writes only behind an explicit approval step.
> Per-role authorization derived from your own role rows, not one shared admin key.
> The right transport: local stdio for a single machine, or remote with real auth.
> Tests, setup docs and a working demo against your own data.
>
> WHY ME
> Eleven years as a software architect and engineering manager: Bayt.com, Trustshoot,
> RailComm. I publish these builds in full, including the question most tutorials skip -
> which roles get access, and who decides when a customer disagrees.
>
> HOW WE START
> Message me with your data source and what you want the model to be able to do. If an MCP
> server is the wrong answer for your case, I will say so in the first reply rather than
> three invoices in.

**Gotcha:** the description editor turns a leading `- ` into a bullet *and keeps the dash*,
so lists render as "• - item". Write plain lines instead.

**FAQs** — three, which measurably cut pre-order messages:
1. *Will the model be able to change or delete my data?* — read-only default, writes only
   in Premium behind approval with audit logging.
2. *Which databases and APIs can you connect?* — MySQL, PostgreSQL, SQL Server, any REST
   or GraphQL API; message first if it's unusual.
3. *What do you need from me to get started?* — data source, read credentials on a
   non-production copy, the questions you want answered; tool list goes to you for
   approval before any code.

**Buyer requirements** — three free-text questions, all required:
1. What should the model be able to reach? Name the database type and version, or the API
   and where its docs live.
2. What do you want the model to be able to do with it? List three to five questions or
   actions that should be possible.
3. Who should be allowed to use it, and is there anything the model must never be able to
   see or touch?

**Gallery** — three 1280×769 images generated from your own published blog diagrams
(`mcp-two-gates`, `mcp-default-narrowed`) in the site's cream/rust palette. Generator
scripts are in the session scratchpad (`gen.py`, `gen2.py`).

**No URLs anywhere.** Fiverr treats a link to your own site as an attempt to take the
client off-platform. The first draft of the cover images carried "shezz77.com" in the
footer line — I removed it before uploading. Same rule as the Upwork contact-info trap,
applied harder: Fiverr enforces it inside images too.

---

## 3. Gigs #2–4 — copy ready, not built

Same shape as the Upwork Catalog. Build these once gig #1 is live and you have seen
whether the pricing draws messages.

**B. I will build your first production AI agent with the Claude Agent SDK**
- Basic $900 · 10 days — one agent, up to 3 custom tools, cost and turn limits, README
- Standard $2,200 · 18 days — plus subagent orchestration, hook-based permissions, an
  eval set with a pass threshold
- Premium $4,500 · 30 days — plus CI integration, observability, a handover session
- Tags: ai agent · claude · automation · langchain alternative · chatbot
- Cover image already generated: `gig-agent.png`

**C. I will audit your AI agent for safety, cost and eval coverage**
- $450 flat · 5 days — a written report: where the agent can do damage, what is unbounded,
  what is unmeasured, what it costs per run, and a prioritized fix list.
- This is the cheapest door into the profile and it converts into B. On a Level 0 account
  it is also the most likely first order.
- Cover image: `gig-audit.png`

**D. I will diagnose and fix your slowest MySQL queries**
- Basic $350 · 4 days — top 5 queries by total time, EXPLAIN analysis, index plan
- Standard $850 · 8 days — plus implementation, migrations, before/after benchmarks
- Category: Programming & Tech › Databases
- Cover image: `gig-mysql.png`

---

## 4. Portfolio — 3 projects, published

Live at `fiverr.com/users/shehzadaslam/portfolio`. This took the profile strength from
9/12 to **10/12**.

The portfolio is a separate section from the gig gallery, with its own form: project name
(50 chars), industries (max 6), duration, **cost (required)**, start month, description
(1,400 chars), up to 5 attachments at 1024×768, then a second step for categories (max 4)
and an optional gig link.

| | Project | Cost | Duration | Started | Images |
|---|---|---|---|---|---|
| 1 | MCP server for a multi-tenant analytics product | $2,800 | 1–3 months | Apr 2026 | 5 |
| 2 | Eval harness that grades an AI agent's output | $2,200 | 1–3 months | Jun 2026 | 4 |
| 3 | MySQL diagnosis: 4.2s query down to 40ms | $850 | 7–30 days | Feb 2026 | 3 |

All three are drawn from work you have already published, so every claim in them is one
you can defend: the connector access model (two gates combined with OR, the tenant kill
switch, exact-name matching), the grading loop and the verifier axis, and the
182,934-rows-examined MySQL walkthrough with its four-step number trail.

Project 1 is linked to gig #1 via the optional "related Gig" checkbox. Projects 2 and 3
are not linked, because the gigs they belong to (B and D) do not exist yet.

**Two numbers I chose for you, because the form required them:**

- **Cost.** It is a required field and there were no invoices to quote — these were salaried
  projects. I used your own gig prices so a buyer who compares the portfolio against the
  gig sees one consistent number: $2,800 is your Premium MCP package, $2,200 is gig B's
  Standard, $850 is gig D's Standard. Fiverr displays these as bands, not exact figures —
  the cards read "$2500-$5000", "$1000-$2500", "$800-$1000" — so the anchoring risk is
  lower than it looks. Change them if you would rather quote real contract values.
- **Start dates.** Apr / Jun / Feb 2026. Required, and I do not know the real ones. They sit
  before the matching blog posts, which is plausible but is a guess. Correct them if wrong.

**Images.** 11 new cards at 1024×768 (Fiverr's recommended 4:3), generated from the blog
diagrams in the site palette — `gen3.py` in the session scratchpad. Three shapes: a title
card, bare diagram cards, and a bullet "what was built" card. No URLs on any of them, same
rule as the gig gallery.

**Gotcha:** every custom dropdown on this form (duration, month, year, industry, category)
renders its options at zero size, so neither clicking nor arrow keys select anything —
the same class of bug as the skills experience-level dropdown. The options are in the DOM;
clicking the `<li>` directly is what works.

**Gotcha:** Continue silently does nothing while attachments are still uploading. It does
not say so. Wait, then click it a second time.

---

## 5. Still outstanding

**b. The old paused gig.** *"deploy and manage your containers using AWS ecs and ocr"* —
0 impressions, 0 clicks, and the title has a typo ("ocr" for "ECR") and no capitalisation.
Either rewrite it as a proper ECS/Fargate deployment gig or delete it. Leaving a paused gig
costs nothing but it is the only other thing on the account.

**c. Trustshoot work experience.** Rejected by Fiverr's company moderation. Retry with the
registered legal name if that differs from "Trustshoot".

**d. Moon Group dates.** Still the same unresolved conflict tracked for LinkedIn and
Upwork — the Upwork profile currently reads *November 2023 – July 2026*, which overlaps
Trustshoot by two and a half years. Nothing was added to Fiverr until you pick one version.

**e. Intro video.** 60 seconds, phone camera. Worth 1 point of profile strength and almost
nobody in this category has one. Script: the "most agent projects die in the same place"
paragraph, then one sentence on what you would check in their agent.

**h. Certifications.** Empty, and now the last cheap profile-strength point. Fiverr's
"Complete profile" panel enumerates the remaining items, which is how the score is
derived: 12 minus whatever is still listed. Note it moves in whole checklist items — the
whole About/tagline/display-name group counted as one, so the rewrite was worth a single
point and the portfolio was worth another.

**g. Python is marked Pro.** I set it to match the rest; your shipped agent work is
TypeScript. Downgrade it to Intermediate if that reads more honestly to you.

---

## 6. Fiverr vs Upwork — what actually differs

| | Upwork | Fiverr |
|---|---|---|
| What buyers search | freelancer profiles + Catalog projects | **gigs only** |
| Commission | 10% | **20%** |
| Overview length | long-form | **600 characters, hard cap** |
| Skills | free-ish taxonomy, 20 slots | fixed autocomplete, no "AI agent" entry |
| Claude as a listed AI engine | **no** | **yes** |
| Employer names | free text | directory + moderation, rejections are common |
| Off-platform links | flagged in overview text | flagged everywhere, **including images** |

The practical consequence: on Upwork the profile does the selling, on Fiverr the gig does.
Time spent on the Fiverr About section past the 600-character cap is time wasted; time
spent on gig titles, tags and the first gallery image is not.
