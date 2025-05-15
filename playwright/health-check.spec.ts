import { test, expect } from '@playwright/test';

test('Health Checker visual test', async ({ page }) => {
  // Ir a la app
  await page.goto('http://frontend-app:5556');

  // Hacer clic en el botón que dispara el health checker
  await page.getByRole('button', { name: 'Probar Health Checker' }).click();

  // Esperar a que aparezca el contenedor con los logs (asegurado con data-testid)
  const log = page.getByTestId('health-response');

  // Verificar que aparezca el texto esperado dentro de ese contenedor
  await expect(log).toContainText('"message": "Unauthorized"');

  // Tomar y comparar el snapshot visual
  const screenshot = await page.screenshot({ fullPage: true });
  expect(screenshot).toMatchSnapshot();
});