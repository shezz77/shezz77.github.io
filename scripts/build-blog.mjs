// Generates the blog from blog/template.html + blog/posts.js.
//
// Every note gets its own page on disk (/blog/<slug>/) rather than living only
// behind a client-side route. Social scrapers drop the fragment and do not run
// JS, so a shared link needs real per-page <title> and og: tags to preview as
// anything other than the blog index.
//
// Run via `npm run build` (prebuild hook) or directly: node scripts/build-blog.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { POSTS, CATS } from '../blog/posts.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://shezz77.com'
const AUTHOR = 'Shehzad Aslam'
const BLOG_TITLE = 'Field Notes'
const BLOG_DESC =
  'Short, practical write-ups on architecture, event-driven systems, cloud and DevOps modernization, and engineering leadership.'

const MONTHS = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** "Aug 2026" -> "2026-08-01" (day is not tracked; first of month is stable). */
function isoDate(label) {
  const [mon, year] = label.split(' ')
  const mm = MONTHS[mon]
  if (!mm) throw new Error(`unrecognised date on a post: ${label}`)
  return `${year}-${mm}-01`
}

const urlFor = (slug) => (slug ? `${SITE}/blog/${slug}/` : `${SITE}/blog/`)

function jsonLd(obj) {
  // </script> inside JSON-LD would close the block early.
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
}

function articleLd(post) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: plain(post.excerpt),
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    author: { '@type': 'Person', name: AUTHOR, url: SITE },
    publisher: { '@type': 'Person', name: AUTHOR, url: SITE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': urlFor(post.slug) },
    url: urlFor(post.slug),
    articleSection: post.cat,
    keywords: post.tags.join(', '),
    wordCount: wordCount(post),
    timeRequired: `PT${post.minutes}M`,
    inLanguage: 'en',
  })
}

function blogLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${BLOG_TITLE} — ${AUTHOR}`,
    description: BLOG_DESC,
    url: urlFor(null),
    inLanguage: 'en',
    author: { '@type': 'Person', name: AUTHOR, url: SITE },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: isoDate(p.date),
      url: urlFor(p.slug),
    })),
  })
}

function breadcrumbLd(post) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: AUTHOR, item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: BLOG_TITLE, item: urlFor(null) },
      { '@type': 'ListItem', position: 3, name: post.title, item: urlFor(post.slug) },
    ],
  })
}

function wordCount(post) {
  const text = post.blocks
    .map((b) => {
      if (b.text) return plain(b.text)
      if (b.items) return b.items.map((i) => (typeof i === 'string' ? i : i.label + ' ' + (i.note || ''))).join(' ')
      if (b.lines) return b.lines.map((l) => l.text).join(' ')
      if (b.rows) return b.rows.flat().map((c) => (typeof c === 'string' ? c : c.text)).join(' ')
      return b.caption || ''
    })
    .join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

// Keep in sync with inlineParts() in blog/template.html — the client renderer
// and this server-side one must agree on what counts as inline markup.
const INLINE_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|`([^`]+)`/g

/** Strip inline markup down to its text, for meta descriptions and titles. */
const plain = (s) => String(s).replace(INLINE_RE, (_m, label, _href, code) => label ?? code)

/** Markdown links -> anchors, `code` -> <code>, everything else escaped. */
function richText(text) {
  let out = '', last = 0, m
  INLINE_RE.lastIndex = 0
  while ((m = INLINE_RE.exec(text)) !== null) {
    out += esc(text.slice(last, m.index))
    if (m[3] !== undefined) {
      out += `<code>${esc(m[3])}</code>`
    } else {
      const ext = /^https?:/.test(m[2])
      out += `<a href="${esc(m[2])}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(m[1])}</a>`
    }
    last = m.index + m[0].length
  }
  return out + esc(text.slice(last))
}

/** Plain-HTML rendering of a note, for crawlers and no-JS readers. */
function noscriptArticle(post) {
  const body = post.blocks
    .map((b) => {
      if (b.t === 'h') return `<h2>${esc(b.text)}</h2>`
      if (b.t === 'p') return `<p>${richText(b.text)}</p>`
      if (b.t === 'quote') return `<blockquote><p>${esc(b.text)}</p></blockquote>`
      if (b.t === 'list') return `<ul>${b.items.map((i) => `<li>${richText(i)}</li>`).join('')}</ul>`
      if (b.t === 'code') return `<pre><code>${b.lines.map((l) => esc(l.text)).join('\n')}</code></pre>`
      if (b.t === 'note') return `<aside><p><strong>${esc(b.label || b.tone || 'Note')}:</strong> ${richText(b.text)}</p></aside>`
      if (b.t === 'img')
        return `<figure><img src="${esc(b.src)}" alt="${esc(b.alt)}" width="${esc(b.w)}" height="${esc(b.h)}"><figcaption>${esc(b.caption || '')}</figcaption></figure>`
      if (b.t === 'embed')
        return `<figure><p><a href="${esc(b.src)}" target="_blank" rel="noopener noreferrer">${esc(b.title || 'Watch the video')}</a></p><figcaption>${esc(b.caption || '')}</figcaption></figure>`
      if (b.t === 'links')
        return `<nav><h3>${esc(b.label || 'Further reading')}</h3><ul>${b.items
          .map((l) => `<li><a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>${l.note ? ' — ' + esc(l.note) : ''}</li>`)
          .join('')}</ul></nav>`
      if (b.t === 'table')
        return `<table><caption>${esc(b.label || '')}</caption><thead><tr>${b.head
          .map((h) => `<th>${esc(h)}</th>`)
          .join('')}</tr></thead><tbody>${b.rows
          .map((r) => `<tr>${r.map((c) => `<td>${esc(typeof c === 'string' ? c : c.text)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table>`
      return ''
    })
    .join('\n')
  return `<noscript>
<article>
<h1>${esc(post.title)}</h1>
<p><strong>${esc(post.cat)}</strong> · ${esc(post.date)} · ${post.minutes} min read</p>
<p>${esc(plain(post.excerpt))}</p>
${body}
<h2>Takeaways</h2>
<ul>${post.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<p><a href="/blog/">All notes</a> · <a href="/">${esc(AUTHOR)}</a></p>
</article>
</noscript>`
}

function noscriptIndex() {
  return `<noscript>
<h1>${esc(BLOG_TITLE)} — ${esc(AUTHOR)}</h1>
<p>${esc(BLOG_DESC)}</p>
<ul>
${POSTS.map(
  (p) =>
    `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a> — ${esc(p.cat)}, ${esc(p.date)}, ${p.minutes} min. ${esc(p.excerpt)}</li>`,
).join('\n')}
</ul>
</noscript>`
}

function head({ title, social, description, url, image, extra = '' }) {
  // LinkedIn renders og:title as the bold line under the card and truncates
  // it hard. The " — Field Notes | Shehzad Aslam" suffix belongs in <title>
  // for search, not in the social hook where it eats the headline.
  social = social ?? title
  const img = image
    ? `
    <meta property="og:image" content="${SITE}${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(social)}" />
    <meta name="twitter:image" content="${SITE}${image}" />`
    : ''
  return `    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(AUTHOR)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${esc(url)}" />
    <link rel="alternate" type="application/rss+xml" title="${esc(BLOG_TITLE)} — ${esc(AUTHOR)}" href="${SITE}/blog/rss.xml" />

    <meta property="og:site_name" content="${esc(AUTHOR)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${esc(social)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(url)}" />${img}
${extra}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(social)}" />
    <meta name="twitter:description" content="${esc(description)}" />`
}

function articleHead(post, image) {
  const extra = [
    `    <meta property="og:type" content="article" />`,
    `    <meta property="article:published_time" content="${isoDate(post.date)}" />`,
    `    <meta property="article:author" content="${esc(AUTHOR)}" />`,
    `    <meta property="article:section" content="${esc(post.cat)}" />`,
    ...post.tags.map((t) => `    <meta property="article:tag" content="${esc(t)}" />`),
  ].join('\n')

  return (
    head({
      title: `${post.title} — ${BLOG_TITLE} | ${AUTHOR}`,
      social: post.title,
      description: plain(post.excerpt),
      url: urlFor(post.slug),
      image,
      extra,
    }) +
    '\n    ' +
    articleLd(post) +
    '\n    ' +
    breadcrumbLd(post)
  )
}

function indexHead(image) {
  return (
    head({
      title: `${BLOG_TITLE} — ${AUTHOR}`,
      description: BLOG_DESC,
      url: urlFor(null),
      image,
      extra: `    <meta property="og:type" content="website" />`,
    }) +
    '\n    ' +
    blogLd()
  )
}


// ---------------------------------------------------------------------------
// Open Graph cards. Social scrapers will not render SVG, so each card is drawn
// as SVG and rasterised with rsvg-convert. If that binary is absent the build
// still succeeds; the pages simply ship without an og:image.
// ---------------------------------------------------------------------------

let rasteriserChecked = false
let rasteriser = null
function haveRasteriser() {
  if (rasteriserChecked) return rasteriser
  rasteriserChecked = true
  try {
    execFileSync('rsvg-convert', ['--version'], { stdio: 'ignore' })
    rasteriser = 'rsvg-convert'
  } catch {
    console.warn('  ! rsvg-convert not found — building without og:image')
  }
  return rasteriser
}

/** Greedy wrap at a given character budget. Returns null if it would truncate. */
function wrapAt(title, perLine, maxLines) {
  const words = title.split(/\s+/)
  const lines = ['']
  for (const w of words) {
    const line = lines[lines.length - 1]
    if (!line) lines[lines.length - 1] = w
    else if ((line + ' ' + w).length <= perLine) lines[lines.length - 1] = line + ' ' + w
    else lines.push(w)
  }
  return lines.length > maxLines ? null : lines
}

// Archivo 900 averages ~0.52em per character across mixed-case text. Close
// enough to size a headline without measuring glyphs.
const EM = 0.52
const OG_BOX = { w: 1040, top: 214, bottom: 496 }

/**
 * Pick the wrap that makes the headline as large as the frame allows.
 *
 * The old card used a fixed 26-character wrap and a fixed size, which left the
 * bottom 40% of every card empty. In a LinkedIn feed the card is downscaled to
 * roughly 0.46x, so that dead space was the difference between a headline that
 * reads at a glance and one that does not.
 */
function fitHeadline(title) {
  const boxH = OG_BOX.bottom - OG_BOX.top
  let best = null
  for (let perLine = 14; perLine <= 34; perLine += 1) {
    const lines = wrapAt(title, perLine, 4)
    if (!lines) continue
    const longest = Math.max(...lines.map((l) => l.length))
    const size = Math.min(
      104,                                   // never cartoonish on a short title
      OG_BOX.w / (longest * EM),              // fits the width
      boxH / (lines.length * 1.06),           // fits the height
    )
    if (!best || size > best.size) best = { lines, size }
  }
  // Every title in the set wraps inside four lines; keep a floor regardless.
  return best ?? { lines: wrapAt(title, 26, 99).slice(0, 4), size: 60 }
}

const OG_THEMES = {
  light: { bg: '#F5F1E8', rule: '#BF3B24', kicker: '#BF3B24', meta: '#8A8578',
           head: '#1B1712', hair: '#D6CBB6', name: '#1B1712', host: '#8A8578' },
  dark:  { bg: '#17130E', rule: '#BF3B24', kicker: '#E8663C', meta: '#9A8B70',
           head: '#F7F3EA', hair: '#3A332A', name: '#F7F3EA', host: '#9A8B70' },
}
// Dark by default: social feeds are a wall of white cards, so the near-black
// card is the one that stops a scroll. Override with OG_THEME=light.
const OG_THEME = OG_THEMES[process.env.OG_THEME ?? 'dark'] ?? OG_THEMES.dark

function ogSvg(post) {
  const t = OG_THEME
  const { lines, size } = fitHeadline(post.title)
  const lead = size * 1.06
  // Bottom-anchor the block so the headline always meets the footer rule,
  // whatever the line count.
  const startY = OG_BOX.bottom - (lines.length - 1) * lead
  const meta = `${post.cat.toUpperCase()}  ·  ${post.date.toUpperCase()}  ·  ${post.minutes} MIN READ`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${t.bg}"/>
  <rect x="0" y="0" width="1200" height="14" fill="${t.rule}"/>
  <g font-family="Archivo, Helvetica, Arial, sans-serif">
    <text x="80" y="112" font-size="26" font-weight="700" letter-spacing="6" fill="${t.kicker}">FIELD NOTES</text>
    <text x="80" y="160" font-family="IBM Plex Mono, Menlo, monospace" font-size="22" letter-spacing="3" fill="${t.meta}">${esc(meta)}</text>
${lines
  .map(
    (l, i) =>
      `    <text x="80" y="${Math.round(startY + i * lead)}" font-size="${Math.round(size)}" font-weight="900" letter-spacing="-0.02em" fill="${t.head}">${esc(l)}</text>`,
  )
  .join('\n')}
    <rect x="80" y="540" width="1040" height="2" fill="${t.hair}"/>
    <text x="80" y="588" font-size="27" font-weight="800" letter-spacing="1" fill="${t.name}">${esc(AUTHOR).toUpperCase()}</text>
    <text x="1120" y="588" font-family="IBM Plex Mono, Menlo, monospace" font-size="21" fill="${t.host}" text-anchor="end">shezz77.com</text>
  </g>
</svg>`
}

/** Returns the public path of the card, or null when it could not be made. */
function writeOgCard(post, outDir) {
  if (!haveRasteriser()) return null
  const svgPath = path.join(outDir, `${post.slug}.svg`)
  const pngPath = path.join(outDir, `${post.slug}.png`)
  fs.writeFileSync(svgPath, ogSvg(post))
  try {
    execFileSync('rsvg-convert', ['-w', '1200', '-h', '630', '-o', pngPath, svgPath])
  } catch (e) {
    console.warn(`  ! og card failed for ${post.slug}: ${e.message}`)
    return null
  } finally {
    fs.unlinkSync(svgPath)
  }
  return `/blog/og/${post.slug}.png`
}

function renderPage(template, postsSource, { headHtml, bootSlug, noscript }) {
  const boot = `<script>window.__BOOT_SLUG = ${bootSlug ? JSON.stringify(bootSlug) : 'null'};</script>`
  return template
    .replace('<!--DC_HEAD-->', `${headHtml}\n    ${boot}`)
    .replace('/*__POSTS__*/', postsSource)
    .replace('</body>', `${noscript}\n  </body>`)
}

function rss() {
  const items = POSTS.map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${urlFor(p.slug)}</link>
      <guid isPermaLink="true">${urlFor(p.slug)}</guid>
      <pubDate>${new Date(`${isoDate(p.date)}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(p.cat)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`,
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(BLOG_TITLE)} — ${esc(AUTHOR)}</title>
    <link>${urlFor(null)}</link>
    <description>${esc(BLOG_DESC)}</description>
    <language>en</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
}

function sitemap() {
  const urls = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: urlFor(null), priority: '0.9', changefreq: 'weekly' },
    ...POSTS.map((p) => ({
      loc: urlFor(p.slug),
      priority: '0.8',
      changefreq: 'yearly',
      lastmod: isoDate(p.date),
    })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
}

function main() {
  const template = fs.readFileSync(path.join(ROOT, 'blog/template.html'), 'utf8')
  for (const marker of ['<!--DC_HEAD-->', '/*__POSTS__*/', '</body>']) {
    if (!template.includes(marker)) throw new Error(`blog/template.html is missing ${marker}`)
  }

  // Inline the data module into the runtime's script block.
  const postsSource = fs.readFileSync(path.join(ROOT, 'blog/posts.js'), 'utf8').replace(/^export /gm, '')

  const slugs = new Set()
  for (const p of POSTS) {
    if (slugs.has(p.slug)) throw new Error(`duplicate slug: ${p.slug}`)
    slugs.add(p.slug)
    if (!CATS.includes(p.cat)) throw new Error(`post ${p.slug} has category "${p.cat}" not in CATS`)
    if (!p.takeaways?.length) throw new Error(`post ${p.slug} has no takeaways`)
    isoDate(p.date)
  }

  const outDir = path.join(ROOT, 'public/blog')
  fs.mkdirSync(outDir, { recursive: true })
  const ogDir = path.join(outDir, 'og')
  fs.mkdirSync(ogDir, { recursive: true })
  const cards = new Map(POSTS.map((p) => [p.slug, writeOgCard(p, ogDir)]))

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPage(template, postsSource, {
      headHtml: indexHead(cards.get(POSTS[0].slug)),
      bootSlug: null,
      noscript: noscriptIndex(),
    }),
  )

  for (const post of POSTS) {
    const dir = path.join(outDir, post.slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      renderPage(template, postsSource, {
        headHtml: articleHead(post, cards.get(post.slug)),
        bootSlug: post.slug,
        noscript: noscriptArticle(post),
      }),
    )
  }

  fs.writeFileSync(path.join(outDir, 'rss.xml'), rss())
  fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), sitemap())
  fs.writeFileSync(path.join(ROOT, 'public/robots.txt'), robots())

  const made = [...cards.values()].filter(Boolean).length
  console.log(`blog: ${POSTS.length} notes + index, ${made} og cards, rss.xml, sitemap.xml, robots.txt`)
}

main()
