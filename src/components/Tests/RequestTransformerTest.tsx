import { RequestTransformerTestProps } from "./types";

const RequestTransformerTest = (props: RequestTransformerTestProps) => {
  const { log, token } = props;

  const handleTrasformer = async () => {
    log({ log: "Solicitando con transformer...", state: "info" });
    if (token) log({ log: "Token: " + token, state: "info" });
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
          log: "Error con transformer: " + JSON.stringify(data, null, 2),
          state: "error",
        });
      } else {
        log({
          log: "Respuesta con transformer:\n" + JSON.stringify(data, null, 2),
          state: "success",
        });
      }
    } catch (err) {
      log({
        log: "Error con transformer: " + (err as Error).message,
        state: "error",
      });
    }
  };
  return (
    <>
      <>
        <h3>Test de Plugin Transformer</h3>
        <div className="flex flex-col gap-2 ">
          <button onClick={handleTrasformer}>
            Probar Plu-Transformer (Cabeceras)
          </button>
          <button onClick={handleTrasformer}>
            Probar Plu-Transformer (Payload)
          </button>
        </div>
      </>
    </>
  );
};

export default RequestTransformerTest;
