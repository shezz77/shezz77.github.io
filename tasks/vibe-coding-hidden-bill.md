# Vibe coding: company pain points and a practical response

Requested: research company challenges caused or exposed by vibe coding; publish a compelling article with animation, graphs and illustrations to Hostinger at shezz77.com, then a LinkedIn post.

## Editorial and visual contract

- Audience: founders, CTOs and engineering managers moving prototypes into production.
- Thesis: faster generation can move work into validation, security, maintenance and coordination. Count the full delivery cost.
- Separate unreviewed vibe coding from reviewed AI-assisted engineering. Do not claim research on the latter directly measures the former.
- Use current primary sources, visible dates, study limitations and inline links. No invented company incidents or personal consulting claims.
- Preserve Field Notes' cream, ink and rust visual language. Original SVG illustrations, two empirical bar charts and an explicitly hypothetical cost chart; finite animations under five seconds and reduced-motion support.
- Acceptance: article and campaign pages, references, accessible descriptions, no horizontal overflow, working assets, social preview, successful build, live Hostinger verification before LinkedIn publication.
- Rollback: retain the pre-change production build outside the publishing directory; redeploy it if the new article or existing pages fail checks. Persistent lead configuration and lead data live outside public_html.

## Research ledger — checked 4 November 2026

1. Atlassian, State of Developer Experience 2026: survey of 1,500+ practitioners. Developer responses: 87% report faster work; 28% less friction, hence 72% same or more. Self-report, not a causal experiment. https://www.atlassian.com/teams/software-development/state-of-developer-experience-2026 and https://www.atlassian.com/blog/development/developer-experience-report-2026
2. CodeRabbit, 17 December 2025: 470 open-source PRs (320 AI-co-authored, 150 comparison), 10.83 versus 6.45 findings per PR. Vendor analysis with inferred authorship, possible confounding, and findings including style. Not deployed defects. https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report
3. DORA, 10 March 2026, interpreting its 2025 report: higher adoption associated with both throughput and instability. Correlation; no universal slowdown claim. https://dora.dev/insights/balancing-ai-tensions/
4. Veracode, Fall 2026: reports aggregate security pass rate rising from 56% to 62%; best reported rate 73%, across a snapshot described as 18 models, four languages, four weakness classes. Constrained vendor benchmark, not breach incidence or deployed application safety. Its later category/model-size tables do not reconcile transparently to the headline aggregate; use only the explicitly attributed headline, not an invented pooled estimate or trend graph. https://www.veracode.com/blog/fall-2026-genai-code-security
5. METR 2025 controlled trial: 16 experienced developers, 246 tasks in familiar mature repositories, 19% longer completion time. Early-2025 tooling and narrow population. https://arxiv.org/abs/2507.09089
6. METR, 24 February 2026: follow-up moved toward speedups, but task/developer selection prevents a clean updated effect. Do not present the old slowdown as a current model benchmark. https://metr.org/blog/2026-02-24-uplift-update/
7. Anthropic, 29 January 2026: randomized study, 52 mostly junior developers learning Trio. Quiz means 50% with AI and 67% without, a 17 percentage-point gap. Short learning task; not proof of permanent deskilling. https://www.anthropic.com/research/AI-assistance-coding-skills
8. Stack Overflow 2026 AI survey: trust depends on easy validation and understanding. Self-selected survey; do not compare differently worded questions across years. https://survey.stackoverflow.co/2026/ai
9. Supabase production security checklist: RLS, exposed publishable keys and production security responsibilities. Implementation guidance, no causal claim about AI. https://supabase.com/docs/guides/security/production-checklist
10. Simon Willison, 7 October 2025: distinguishes unreviewed prompt-driven work from responsible AI engineering. Definition/commentary, not empirical business evidence. https://simonwillison.net/2025/Oct/7/vibe-engineering/

## R&D conclusions

Pain points: review capacity, application authorization, missing business context, maintenance ownership, loss of learning opportunities, and misleading ROI measurement. Proposed response: risk-based access, small bounded changes, acceptance and abuse tests, a named owner, release evidence, rollback, and measurement of accepted outcomes.

Commercial hypothesis (unvalidated): founders with successful demos and engineering leaders with rising review queues may buy a fixed-scope production readiness assessment. Validate willingness to pay before building a SaaS scanner. Deliver a risk register, targeted test pack, repair plan and owner handover; no claim that another model alone solves verification.

The cost illustration uses invented inputs: 100 saved hours × $80/hour = $8,000 capacity; 60 hours of extra review/repair = $4,800; tools = $1,000; net = $2,200. It is a worked example, not research or realized cash savings.

## Delivery and verification

- Published 4 November 2026: https://shezz77.com/blog/vibe-coding-hidden-bill/
- Hostinger static deployment returned deployed; server/CDN cache cleared.
- Production build passed under Node 22.18.0. All five SVGs parse as XML, have accessible descriptions, reduced-motion support and finite animations.
- Browser checks: article rendered, all five assets loaded, no reported browser errors; page width matched viewport at 320, 768, 1024 and 1440 pixels. TOC navigation reached the solution section. Social card visually inspected.
- Live HTTP checks: 200 and byte matches against the build for the new article, campaign redirect, five SVGs, index, RSS, sitemap, homepage and an existing article. Hostinger optimized the PNG; it still decodes correctly at 1200 × 630.
- LinkedIn post and first comment visibly confirmed: https://www.linkedin.com/feed/update/urn:li:activity:7523682322513260544/
- Pre-change complete build retained at `/private/tmp/shezz77-before-vibe-hidden-bill-20261104` for rollback during this session.
