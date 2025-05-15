import { handleCheker } from "../../api/apiTest";
import { HealthCheckerTestProps } from "./types";

const HealthCheckerTest = ({ log, token }: HealthCheckerTestProps) => {
  const fetchVisualLogs = async () => {
    try {
      const res = await fetch("/test-results/visual-testing.log");
      if (!res.ok) throw new Error("No se pudo obtener los logs");

      const text = await res.text();
      const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      const filtered = lines.filter(line =>
        !/^[-=]{10,}/.test(line) && // separadores visuales
        !/^attachment #/.test(line) &&
        !/\.png$/.test(line) &&
        !/playwright\/.*-snapshots\//.test(line) &&
        !/test-results\//.test(line) &&
        !/^at /.test(line) &&
        !/^> /.test(line) &&
        !/^\s{2,}/.test(line) &&
        !/^\s*\d+ passing/.test(line) // líneas del tipo "3 passing"
      );

      for (const line of filtered) {
        const lower = line.toLowerCase();

        if (line.match(/\[\d{4}-\d{2}-\d{2}T/)) {
          // Timestamps
          log({ log: `🕒 ${line}`, state: "info" });
        } else if (line.includes("✓") || lower.includes("passed")) {
          log({ log: `✅ ${line}`, state: "success" });
        } else if (line.includes("✘") || lower.includes("failed") || lower.includes("error")) {
          log({ log: `❌ ${line}`, state: "error" });
        } else {
          // Mensajes relevantes que no encajan en las otras categorías
          log({ log: line, state: "info" });
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      log({ log: `❌ Error al obtener logs de visual testing: ${errorMsg}`, state: "error" });
    }
  };

  return (
    <>
      <h3>Health Checker</h3>
      <div className="flex flex-col gap-2">
        <button onClick={() => handleCheker({ log, token })}>
          Probar Health Checker
        </button>
        <button onClick={fetchVisualLogs}>
          Ver resultados de visual testing
        </button>
      </div>
    </>
  );
};

export default HealthCheckerTest;