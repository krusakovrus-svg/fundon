import { expect, test } from '@playwright/test';

import routes from '../scripts/admin-routes.json';

for (const route of routes) {
  test(`admin route ${route.path} renders correctly`, async ({ page }) => {
    const response = await page.goto(route.path, { waitUntil: 'networkidle' });

    expect(response, `No response for ${route.path}`).not.toBeNull();
    expect(response?.ok(), `Unexpected status for ${route.path}: ${response?.status()}`).toBeTruthy();

    await expect(page.locator('body')).toContainText('Fansten');
    await expect(page.locator('body')).toContainText('Admin Console');
    await expect(page.locator('header')).toContainText(route.label);
    await expect(page.locator('body')).not.toContainText('FightPulse v2');
    await expect(page.locator('body')).not.toContainText('This page could not be found');
  });
}
