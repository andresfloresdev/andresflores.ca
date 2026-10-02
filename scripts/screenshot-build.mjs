// Screenshot a built site at four viewports and report layout health.
//
// Usage (from a scratch dir with `npm i playwright`, never the project):
//   node screenshot-build.mjs http://localhost:4321 /tmp/<client>-shots [/ /other-page/ ...]
//
// Writes <out>/<viewport>-<page>-top.png and -full.png plus report.json, and prints
// the report. Serve the PRODUCTION build (astro preview) and pass the port it
// actually bound, not the one you asked for.
//
// Mobile captures are 3x (iPhone 13 DPR): resize to 390px wide before slicing.
import { chromium, devices } from 'playwright';
import fs from 'node:fs';

const [BASE = 'http://localhost:4321', OUT = '/tmp/build-shots', ...paths] = process.argv.slice(2);
const PATHS = paths.length ? paths : ['/'];
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  ['desktop', { viewport: { width: 1440, height: 900 } }],
  ['laptop', { viewport: { width: 1280, height: 800 } }],
  ['tablet', { viewport: { width: 834, height: 1112 } }],
  ['mobile', { ...devices['iPhone 13'] }],
];

const slug = (p) => p.replace(/^\/|\/$/g, '').replace(/\W+/g, '-') || 'home';

// Scroll through the page so lazy images load and reveals fire, then force any
// reveal still pending: a fullPage capture never scrolls, so off-screen reveals
// would otherwise render as blank sections.
async function settle(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  await page.evaluate(() =>
    document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-revealed')),
  );
  await page.waitForTimeout(900);
}

const browser = await chromium.launch();
const report = {};

for (const [name, opts] of VIEWPORTS) {
  const ctx = await browser.newContext(opts);
  for (const path of PATHS) {
    const page = await ctx.newPage();
    const errors = [];
    const failed = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('requestfailed', (r) => failed.push(r.url()));
    page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));

    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const key = `${name}-${slug(path)}`;
    await page.screenshot({ path: `${OUT}/${key}-top.png` });
    await settle(page);
    await page.screenshot({ path: `${OUT}/${key}-full.png`, fullPage: true });

    report[key] = await page.evaluate(() => {
      const root = document.documentElement;
      const imgs = [...document.images];
      return {
        viewportWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        horizontalOverflow: root.scrollWidth > root.clientWidth,
        height: root.scrollHeight,
        images: imgs.length,
        brokenImages: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
        fontsLoaded: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`),
        h1: document.querySelector('h1')?.textContent.trim(),
      };
    });
    report[key].errors = errors;
    report[key].failed = failed;
    await page.close();
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
