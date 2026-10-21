// Copies the PHP scoping endpoint into dist/api/ after vite build.
//
// The endpoint and its Composer dependencies live in server/ (vendor/ is not
// committed). Hostinger runs PHP from public_html, so the endpoint ships inside
// the static build and the vendor directory is fenced off with its own
// .htaccess. Run `composer install --no-dev` in server/ first.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'

const out = 'dist/api'

if (!existsSync('server/vendor/autoload.php')) {
  // GitHub Pages can't run PHP anyway, so a build without vendor/ (as in CI)
  // just ships no endpoint, and the scoping form falls back to email.
  console.warn('build-api: server/vendor is missing, skipping dist/api/. Run `composer install --no-dev` in server/ for a Hostinger build.')
  process.exit(0)
}

mkdirSync(out, { recursive: true })
cpSync('server/scope.php', `${out}/scope.php`)
cpSync('server/.htaccess', `${out}/.htaccess`)
cpSync('server/vendor', `${out}/vendor`, { recursive: true })
writeFileSync(`${out}/vendor/.htaccess`, 'Require all denied\n')

console.log('build-api: copied scope.php and vendor/ to dist/api/')
