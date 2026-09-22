# shezz77.github.io

Personal portfolio site for **Shehzad Aslam — Software Architect & Engineering Manager**.
Built as a single-page [React](https://react.dev) app with [Vite](https://vite.dev) and deployed to GitHub Pages.

## Tech

- React 19 + Vite 7
- Vanilla CSS (no framework) — design tokens in `src/index.css`
- Custom hooks for the animated network canvas, scroll reveals, and nav state
- Zero runtime dependencies beyond React

## Local development

Requires Node 22 (see `.nvmrc`).

```bash
nvm use          # switch to Node 22
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
index.html            # HTML shell + fonts + meta tags
src/
  main.jsx            # React entry
  App.jsx             # section composition
  data.js             # all page content (services, work, skills, …)
  index.css           # design system + responsive styles
  components/         # Navbar, Hero, Services, Work, Skills, Contact, …
  hooks/              # useNetworkCanvas, useInView, useScrollNav
public/               # static assets served from the site root
  favicon.svg
  app-ads.txt         # Google AdSense verification
  Shehzad_Aslam_Software_Architect_Resume.docx
```

## Campaign links

Cloudflare Web Analytics never logs query strings, so a `?utm_source=` tag is
invisible in the dashboard — and the LinkedIn mobile app usually strips the
referrer too. Path *is* a reported dimension, so campaigns live in the path.

`npm run build:blog` generates a `/go/<name>/` page for every note, plus the
extras in `blog/campaigns.js`. Each one counts the click, then forwards to its
destination with `?ref=<name>`. `public/track.js` stashes that for the session
and tags the subject line of any mailto: the visitor clicks afterwards, so an
enquiry arrives as `Architecture call [the-monolith-you-should-keep]` — closing
the loop from a LinkedIn post to an actual conversation.

Share `/go/…` links, never the raw `/blog/…` URL. The generated list of every
campaign URL lands in `campaign-links.txt` (gitignored, like the rest of the
generated output). Drafts that use them: `linkedin-posts.md`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. Set the repository's **Settings → Pages → Source** to
**GitHub Actions** once (a one-time setup).

---

### About

- 👋 Hi, I'm [@shezz77](https://github.com/shezz77)
- 👀 Interested in web application development, system architecture, and engineering leadership
- 📫 Reach me at shezz77.se@gmail.com
