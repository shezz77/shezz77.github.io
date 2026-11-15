# Vibe coding ships open doors

## Post

35,578 apps. Open to anyone. No sign-in.

That's what researchers found last week on one AI app builder. Hospital staff lists. Plaintext passwords. Confidential sales plans, some built by the platform's own employees.

Nobody hacked anything. The doors were just open.

I went through every major vibe coding security incident of the last 18 months. Same five doors, every time:

🚪 The database key is public (by design) and the lock was never installed
🚪 "Share" quietly means "public"
🚪 The AI agent holds production keys (one deleted a live database during a code freeze)
🚪 The package the AI suggested doesn't exist, until an attacker registers it
🚪 The API key you pasted into the chat at 2am

The scariest detail: asked to build a team-only app, the AI added a "Sign in with Google" button on its own. Then it let any Google account in.

There was a login screen. There was no lock.

The fix isn't "stop vibe coding." It's 30 minutes of trying to break your own app before users arrive:

1. Two-account test: can user B, or a logged-out request, read user A's data?
2. Open every share link in a private window
3. Keep production credentials out of the agent's reach
4. Verify every new package actually exists
5. Rotate every key that ever touched a chat

Full breakdown, sources, diagrams and copy-paste checks in the first comment.

Have you ever opened your own app's share link in a private window? 👀

#VibeCoding #AppSecurity #AIAgents

## First comment

The full write-up covers each of the five doors with the incident behind it (Grok Build, Moltbook, Lovable, Replit, slopsquatting), every source linked, and the 30-minute launch gate with copy-paste test commands and agent rules you can drop into your project.

Read it here: https://shezz77.com/go/vibe-coding-open-doors/

## Image

`linkedin-vibe-coding-open-doors.png` (1200×1200, rendered from the `.svg` with headless Chrome and real Archivo / IBM Plex Mono).

Alt text: 35,578 apps. Open to anyone. No sign-in. Nobody hacked them. The doors were open. Five doors, all open: database with public key and RLS off; share link with "anyone" preselected; AI agent holding production keys; packages, 19.7% of which did not exist; secrets pasted into the chat.

## Publication

Article deployed to Hostinger and CDN purged on 15 November 2026; live HTML and SVGs matched the build byte-for-byte. Published on LinkedIn on Sun 15 November 2026, ~09:45 PKT, with the card and alt text.

Post: https://www.linkedin.com/feed/update/urn:li:share:7527600700692774912/

First comment (two paragraphs, text + `/go/` link) rendered in the default view after a reload.
