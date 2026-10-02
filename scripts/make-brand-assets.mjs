/*
  Favicons and Open Graph images.

  Usage (run from a scratch dir that has playwright, never the project):
    cp scripts/make-brand-assets.mjs /tmp/pw/ && cd /tmp/pw && \
      NODE_PATH=/tmp/pw/node_modules node make-brand-assets.mjs ~/Projects/andresflores.ca

  - favicon.svg, favicon-32.png, apple-touch-icon.png: the flame dot from the
    header, on ink. sharp, from the project's node_modules.
  - og-fr.png, og-en.png (1200x630): rendered by Chromium from HTML so they use
    the site's real fonts (librsvg cannot load them). The headshot, the name
    and the one line in each language.

  Re-run after the headshot or the one line changes (src/config/site.ts).
*/
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const project = resolve(process.argv[2] ?? '.');
const requireFromProject = createRequire(join(project, 'package.json'));
const sharp = requireFromProject('sharp');
const pub = (name) => join(project, 'public', name);
const mod = (p) => `data:font/woff2;base64,${readFileSync(join(project, 'node_modules', p)).toString('base64')}`;

const INK = '#15120f';
const FLAME = '#ff4f1f';
const PAPER = '#f2efe9';

/* Favicons. */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${INK}"/>
<circle cx="32" cy="32" r="13" fill="${FLAME}"/>
</svg>
`;
writeFileSync(pub('favicon.svg'), faviconSvg);
await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(pub('favicon-32.png'));
const touch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" fill="${INK}"/><circle cx="90" cy="90" r="34" fill="${FLAME}"/></svg>`;
await sharp(Buffer.from(touch)).png().toFile(pub('apple-touch-icon.png'));

/* Open Graph. Pull the one line from the source so it never drifts. */
const site = readFileSync(join(project, 'src/config/site.ts'), 'utf8');
const oneLine = (lang) => {
	const block = /oneLine:\s*\{([\s\S]*?)\}/.exec(site)[1];
	const m = new RegExp(`${lang}:\\s*(['"])([\\s\\S]*?)\\1,`).exec(block);
	return m[2].replace(/\\'/g, "'");
};
const photo = `data:image/jpeg;base64,${readFileSync(join(project, 'src/assets/andres-flores.jpg')).toString('base64')}`;

const html = (lang) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:B;src:url(${mod('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2')}) format('woff2');font-weight:200 800}
@font-face{font-family:M;src:url(${mod('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}) format('woff2');font-weight:100 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:${PAPER};color:${INK};font-family:B;display:grid;grid-template-columns:1fr 400px;overflow:hidden}
.l{padding:64px 0 60px 72px;display:flex;flex-direction:column;justify-content:space-between}
.k{font-family:M;font-size:19px;letter-spacing:.04em;text-transform:uppercase;display:flex;align-items:center;gap:12px}
.d{width:14px;height:14px;border-radius:99px;background:${FLAME}}
h1{font-size:128px;font-weight:650;letter-spacing:-.055em;line-height:.84;font-optical-sizing:auto}
p{font-size:28px;line-height:1.3;letter-spacing:-.012em;max-width:640px;color:#3b3631}
.r{position:relative;margin:40px 40px 40px 0;border-radius:28px;overflow:hidden;background:#aebbc6}
.r img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.u{position:absolute;left:0;right:0;bottom:0;padding:18px 22px;font-family:M;font-size:17px;color:${PAPER};background:linear-gradient(transparent,rgba(0,0,0,.45))}
</style></head><body>
<div class="l"><div class="k"><span class="d"></span>andresflores.ca</div>
<div><h1>Andrés<br>Flores</h1><p style="margin-top:34px">${oneLine(lang)}</p></div></div>
<div class="r"><img src="${photo}"><div class="u">${lang === 'fr' ? 'MONTRÉAL · DEPUIS 2015' : 'MONTREAL · SINCE 2015'}</div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const lang of ['fr', 'en']) {
	await page.setContent(html(lang), { waitUntil: 'load' });
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: pub(`og-${lang}.png`) });
}
await browser.close();
console.log('brand assets written to public/');
