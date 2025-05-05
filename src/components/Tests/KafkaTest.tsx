import { pacienteData } from "../../constant/bodyRequests";
import { KafkaTestProps } from "./types";

const KafkaTest = (props: KafkaTestProps) => {
  const { log } = props;

  const handleRequest = async (type: "HIS" | "FDH") => {
    log({ log: `Enviando body ${type}...`, state: "info" });
    try {
      const url =
        type === "HIS"
          ? "/InterfazPacienteHIS/api/Paciente/Procesar"
          : "/InterfazPacienteFDH/api/Paciente/Procesar";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteData),
      });

      const data = await res.json();
      const status = data.status;

      if (status === "error") {
        log({
          log: "Error con rate limit:\n" + JSON.stringify(data, null, 2),
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
      <h3>Body a FDH</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleRequest("FDH")}>Enviar a FDH</button>
      </div>
      <h3>Body a HIS</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleRequest("HIS")}>Enviar a HIS</button>
      </div>
    </>
  );
};

export default KafkaTest;
