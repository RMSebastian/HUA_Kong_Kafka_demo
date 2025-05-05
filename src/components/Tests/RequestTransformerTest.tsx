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
      log({
        log: "Respuesta con token:\n" + JSON.stringify(data, null, 2),
        state: "success",
      });
    } catch (err) {
      log({
        log: "Error con token: " + (err as Error).message,
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
