import { TokenTestProps } from "./types";

const TokenTest = (props: TokenTestProps) => {
  const { log, token } = props;

  const handleSend = () => {
    if (token === "") {
      handleSinToken();
    } else {
      handleConToken(token);
    }
  };

  const handleSinToken = async () => {
    log({ log: "Solicitando sin token...", state: "info" });
    try {
      const url =
        "/api/Resultados/ListaResultados?" +
        new URLSearchParams({
          Usuario: "PRUEBA",
          Origen: "1",
          Protocolo: "4",
          CheckConfidencialidad: "false",
          CheckPEP: "false",
          FechaDesde: "2021-10-25",
          FechaHasta: "2021-10-28",
          IdPaciente: "73499846",
        });
      // log("URL: " + url);
      const res = await fetch(url);
      const data = await res.json();
      log({
        log: "Respuesta sin token:\n" + JSON.stringify(data, null, 2),
        state: "success",
      });
    } catch (err) {
      log({
        log: "Error sin token: " + (err as Error).message,
        state: "error",
      });
    }
  };

  const handleConToken = async (token: string) => {
    log({ log: "Solicitando con token...", state: "info" });
    log({ log: "Token: " + token, state: "info" });
    try {
      const url =
        "/api/Resultados/ListaResultados?" +
        new URLSearchParams({
          Usuario: "PRUEBA",
          Origen: "1",
          Protocolo: "4",
          CheckConfidencialidad: "false",
          CheckPEP: "false",
          FechaDesde: "2021-10-25",
          FechaHasta: "2021-10-28",
          IdPaciente: "73499846",
        });
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
      <h3>Test del segurizado con Token</h3>
      <div className="flex flex-row gap-2 ">
        <button onClick={handleSend} className="bg-gray-200 px-4 py-2 rounded">
          {`Probar ${token === "" ? "sin" : "con"} token`}
        </button>
      </div>
    </>
  );
};

export default TokenTest;
