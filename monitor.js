import cron from 'node-cron';
import { exec } from 'child_process';
import fs from 'fs';

// Ejecutar cada minuto
cron.schedule('* * * * *', () => {
  const timestamp = new Date().toISOString();
  console.log(`⏰ ${timestamp} - Ejecutando health-check`);

  exec('npx playwright test playwright/health-check.spec.ts', (err, stdout, stderr) => {
    const output = `[${timestamp}]\n${stdout || stderr}\n\n`;

    // Guardar logs en archivo persistente
    fs.appendFileSync('test-results/healthcheck.log', output);

    if (err) {
      console.error('❌ Test falló (ver logs y screenshots en test-results)');
    } else {
      console.log('✅ Test pasó correctamente');
    }
  });
});
