import { RequestTransformerTestProps } from "./types";

const RequestTransformerTest = (props: RequestTransformerTestProps) => {
  const { log, token } = props;

  const handleRequestTransformer = async () => {
    log({ log: "Solicitando con token...", state: "info" });
    log({ log: "Token: " + token, state: "info" });
    try {
      const url = "/obtener";
      // log("URL: " + url);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <h3>Test de Plugin Request Transformer</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={handleRequestTransformer}>
          Probar Plugin Request Transformer
        </button>
      </div>
    </>
  );
};

export default RequestTransformerTest;
