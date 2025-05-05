import { RateLimitTestProps } from "./types";

const RateLimitTest = (props: RateLimitTestProps) => {
  const { log } = props;

  const handleRateLimit = async () => {
    log({ log: "Solicitando con rate limit...", state: "info" });
    try {
      const token = import.meta.env.VITE_MARKEY_TOKEN;
      const apikey = import.meta.env.VITE_MARKEY_APIKEY;

      const res = await fetch("/obtener", {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aplicacion: "SelfServiceHUA",
          operacion: "apiObtenerPaciente",
          apiKey: apikey,
          filtro: {
            paciCodigoInterno: "73335104",
          },
        }),
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
