import cron from 'node-cron';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_LINES = 100;
const logDir = path.join(__dirname, 'public/test-results');
const logPath = path.join(logDir, 'visual-testing.log');

// 👇 Ruta corregida del snapshot generado por toMatchSnapshot()
const snapshotPath = path.join(__dirname, 'playwright', 'health-check.spec.ts-snapshots', 'health-check-darwin.png');
function saveVisualTestLog(newLog) {
  console.log('📁 __dirname:', __dirname);
console.log('📁 cwd:', process.cwd());
console.log('📁 Esperado snapshotPath:', snapshotPath);
  fs.mkdirSync(logDir, { recursive: true });

  let lines = [];
  if (fs.existsSync(logPath)) {
    const existing = fs.readFileSync(logPath, 'utf8');
    lines = existing.split('\n').filter(Boolean);
  }

  lines.push(newLog);
  if (lines.length > MAX_LINES) {
    lines = lines.slice(-MAX_LINES);
  }

  fs.writeFileSync(logPath, lines.join('\n') + '\n', 'utf8');
}

// ▶️ Ejecuta el test visual
function runPlaywrightTest(useUpdateSnapshots = false) {
  const timestamp = new Date().toISOString();
  console.log(`⏰ ${timestamp} - Ejecutando health-check`);

  const command = useUpdateSnapshots
    ? 'npx playwright test playwright/health-check.spec.ts --update-snapshots --reporter=list'
    : 'npx playwright test playwright/health-check.spec.ts --reporter=list';

  exec(command, (err, stdout, stderr) => {
    const output = `[${timestamp}]\n${stdout || stderr}\n`;
    saveVisualTestLog(output);

    if (err) {
      console.error('❌ Test falló');
    } else {
      console.log('✅ Test pasó correctamente');
    }
  });
}

// 🕓 Ejecutar cada 30 segundos
cron.schedule('*/30 * * * * *', () => {
  const snapshotExists = fs.existsSync(snapshotPath);

  if (!snapshotExists) {
    console.log(`📸 No se encontró snapshot en: ${snapshotPath}`);
  } else {
    console.log(`✅ Snapshot detectado, usando comparación visual`);
  }

  runPlaywrightTest(!snapshotExists);
});