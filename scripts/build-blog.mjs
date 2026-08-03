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
    description: post.excerpt,
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
    .map((b) => b.text || (b.items || []).join(' ') || (b.lines || []).map((l) => l.text).join(' '))
    .join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

/** Plain-HTML rendering of a note, for crawlers and no-JS readers. */
function noscriptArticle(post) {
  const body = post.blocks
    .map((b) => {
      if (b.t === 'h') return `<h2>${esc(b.text)}</h2>`
      if (b.t === 'p') return `<p>${esc(b.text)}</p>`
      if (b.t === 'quote') return `<blockquote><p>${esc(b.text)}</p></blockquote>`
      if (b.t === 'list') return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
      if (b.t === 'code') return `<pre><code>${b.lines.map((l) => esc(l.text)).join('\n')}</code></pre>`
      return ''
    })
    .join('\n')
  return `<noscript>
<article>
<h1>${esc(post.title)}</h1>
<p><strong>${esc(post.cat)}</strong> · ${esc(post.date)} · ${post.minutes} min read</p>
<p>${esc(post.excerpt)}</p>
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

function head({ title, description, url, extra = '' }) {
  return `    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(AUTHOR)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${esc(url)}" />
    <link rel="alternate" type="application/rss+xml" title="${esc(BLOG_TITLE)} — ${esc(AUTHOR)}" href="${SITE}/blog/rss.xml" />

    <meta property="og:site_name" content="${esc(AUTHOR)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(url)}" />
${extra}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />`
}

function articleHead(post) {
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
      description: post.excerpt,
      url: urlFor(post.slug),
      extra,
    }) +
    '\n    ' +
    articleLd(post) +
    '\n    ' +
    breadcrumbLd(post)
  )
}

function indexHead() {
  return (
    head({
      title: `${BLOG_TITLE} — ${AUTHOR}`,
      description: BLOG_DESC,
      url: urlFor(null),
      extra: `    <meta property="og:type" content="website" />`,
    }) +
    '\n    ' +
    blogLd()
  )
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

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPage(template, postsSource, {
      headHtml: indexHead(),
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
        headHtml: articleHead(post),
        bootSlug: post.slug,
        noscript: noscriptArticle(post),
      }),
    )
  }

  fs.writeFileSync(path.join(outDir, 'rss.xml'), rss())
  fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), sitemap())
  fs.writeFileSync(path.join(ROOT, 'public/robots.txt'), robots())

  console.log(`blog: ${POSTS.length} notes + index, rss.xml, sitemap.xml, robots.txt`)
}

main()
