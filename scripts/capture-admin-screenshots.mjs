import { mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

import { chromium } from '@playwright/test';

const baseUrl = (process.argv[2] ?? process.env.BASE_URL ?? 'https://fundon.vercel.app').replace(/\/$/, '');
const routesFile = new URL('./admin-routes.json', import.meta.url);
const outputDir = path.resolve(process.cwd(), 'artifacts', 'admin-screenshots');

const routes = JSON.parse(await readFile(routesFile, 'utf8'));

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

for (const route of routes) {
  const url = `${baseUrl}${route.path}`;
  const response = await page.goto(url, { waitUntil: 'networkidle' });

  if (!response?.ok()) {
    await browser.close();
    throw new Error(`Failed to open ${url}: status ${response?.status() ?? 'unknown'}`);
  }

  const bodyText = await page.locator('body').innerText();

  if (!bodyText.includes('Fansten') || !bodyText.includes('Admin Console')) {
    await browser.close();
    throw new Error(`Admin shell markers are missing on ${url}`);
  }

  if (bodyText.includes('FightPulse v2') || bodyText.includes('This page could not be found')) {
    await browser.close();
    throw new Error(`Unexpected fallback content detected on ${url}`);
  }

  const screenshotPath = path.join(outputDir, `${route.slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved ${screenshotPath}`);
}

await browser.close();

console.log(`Admin screenshots saved to ${outputDir}`);
