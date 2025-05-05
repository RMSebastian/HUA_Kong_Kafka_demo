import { HealthCheckerTestProps } from "./types";

const HealthCheckerTest = (props: HealthCheckerTestProps) => {
  const { log } = props;

  const handleCheker = async () => {
    log({ log: "Solicitando health checker...", state: "info" });
    try {
      const res = await fetch("/PlatformModuleSAP/Health/GetDatabasesStatus", {
        method: "GET",
      });

      const data = await res.json();
      const status = data.status;

      if (status === "error") {
        log({
          log: "Error con health checker:\n" + JSON.stringify(data, null, 2),
          state: "error",
        });
      } else {
        log({
          log:
            "Respuesta con health checker:\n" + JSON.stringify(data, null, 2),
          state: "success",
        });
      }
    } catch (err) {
      log({
        log: "Error con health checker: " + (err as Error).message,
        state: "error",
      });
    }
  };

  return (
    <>
      <h3>Health Checker</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={handleCheker}>Probar Health Checker</button>
      </div>
    </>
  );
};

export default HealthCheckerTest;
