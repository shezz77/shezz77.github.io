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

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. Set the repository's **Settings → Pages → Source** to
**GitHub Actions** once (a one-time setup).

---

### About

- 👋 Hi, I'm [@shezz77](https://github.com/shezz77)
- 👀 Interested in web application development, system architecture, and engineering leadership
- 📫 Reach me at shezz77.se@gmail.com
