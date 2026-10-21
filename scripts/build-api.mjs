// Copies the PHP lead endpoint into dist/api/ after vite build.
//
// The scope builder runs entirely in the browser; only "Send it to me" posts
// to server/lead.php, which stores the scope and emails it. Hostinger runs PHP
// from public_html, so the endpoint ships inside the static build. GitHub
// Pages serves the .php file as text and never runs it, and the form falls
// back to a mailto: link there.

import { cpSync, mkdirSync } from 'node:fs'

const out = 'dist/api'

mkdirSync(out, { recursive: true })
cpSync('server/lead.php', `${out}/lead.php`)
cpSync('server/.htaccess', `${out}/.htaccess`)

console.log('build-api: copied lead.php to dist/api/')
