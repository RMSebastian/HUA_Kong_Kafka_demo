import { test, expect } from '@playwright/test';

test('Health Checker visual test', async ({ page }) => {
  await page.goto('http://frontend-app:5556');
  await page.getByRole('button', { name: 'Probar Health Checker' }).click();
  await page.getByTestId('health-response'); // Espera a que aparezca el log

  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('health-check.png');
});