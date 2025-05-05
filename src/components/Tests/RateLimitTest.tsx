import { RateLimitTestProps } from "./types";

const RateLimitTest = (props: RateLimitTestProps) => {
  const { log } = props;

  const handleRateLimit = async () => {
    log({ log: "Solicitando con rate limit...", state: "info" });
    try {
      const url = "/obtener";
      // log("URL: " + url);
      const res = await fetch(url, {
        method: "GET",
      });
      const data = await res.json();
      const status = data.Estado as string;
      if (status && status === "ERROR") {
        log({
          log: "Error con rate limit: " + JSON.stringify(data, null, 2),
          state: "error",
        });
      } else {
        log({
          log: "Respuesta con rate limit:\n" + JSON.stringify(data, null, 2),
          state: "success",
        });
      }
    } catch (err) {
      log({
        log: "Error con rate limit: " + (err as Error).message,
        state: "error",
      });
    }
  };
  return (
    <>
      <h3>Test de Rate-Limiting</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={handleRateLimit}>Probar Rate-Limiting</button>
      </div>
    </>
  );
};

export default RateLimitTest;
