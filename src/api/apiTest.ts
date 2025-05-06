import {
  BaseLogsProps,
  RateLimitTestProps,
  RequestTransformerTestProps,
  TokenTestProps,
} from "../components/Tests/types";
import { pacienteData } from "../constant/bodyRequests";

// TOKEN TEST
export const handleToken = async ({ token, log }: TokenTestProps) => {
  const hasToken = token !== "";

  log({
    log: `Solicitando ${hasToken ? "con" : "sin"} token...`,
    state: "info",
  });
  if (hasToken) log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  try {
    const url =
      "api/ResultadosMiddleware/api/Resultados/ListaResultados?" +
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
        Authorization: token !== "" ? `Bearer ${token}` : "",
      },
    });

    const data = await res.json();
    log({
      log:
        `Respuesta ${hasToken ? "con" : "sin"} token:\n` +
        JSON.stringify(data, null, 2),
      state: "success",
    });
  } catch (err) {
    log({
      log:
        `Respuesta ${hasToken ? "con" : "sin"} token:\n` +
        (err as Error).message,
      state: "error",
    });
  }
};

// TRANSFORMER TEST
export const handleTrasformer = async ({
  token,
  log,
}: RequestTransformerTestProps) => {
  const hasToken = token !== "";

  log({ log: "Solicitando con transformer...", state: "info" });
  if (hasToken) log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  try {
    const token = import.meta.env.VITE_MARKEY_TOKEN;
    const apikey = import.meta.env.VITE_MARKEY_APIKEY;

    const res = await fetch("api/markey/APIMarkeyV2/obtener", {
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
      throw new Error(data);
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

// RATE LIMIT TEST
export const handleRateLimit = async ({ log }: RateLimitTestProps) => {
  log({ log: "Solicitando con rate limit...", state: "info" });
  try {
    const token = import.meta.env.VITE_MARKEY_TOKEN;
    const apikey = import.meta.env.VITE_MARKEY_APIKEY;
    let attemps = 0;
    while (attemps <= 15) {
      const res = await fetch("api/markey/APIMarkeyV2/obtener", {
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
      attemps += 1;
      const data = await res.json();
      const status = data.Estado as string;

      if (status && status === "ERROR") {
        throw new Error(data);
      } else {
        if (attemps === 1)
          log({
            log: `Datos de la respuesta N°${attemps}: ${JSON.stringify(
              data,
              null,
              2
            )}}`,
            state: "success",
          });

        log({
          log: `Verificada respuesta N°${attemps}`,
          state: "success",
        });
      }
    }
    
    log({
      log: "Terminado rate limit",
      state: "info",
    });
  } catch (err) {
    log({
      log: "Error con rate limit: " + (err as Error).message,
      state: "error",
    });
  }
};

//KAFKA TEST
export const handleKafkaRequest = async (
  type: "HIS" | "FDH",
  log: BaseLogsProps["log"]
) => {
  log({ log: `Enviando body ${type}...`, state: "info" });
  try {
    const url =
      type === "HIS"
        ? "api/InterfazPacienteHIS/api/Paciente/Procesar"
        : "api/InterfazPacienteFDH/api/Paciente/Procesar";
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
        log: `Error con ${type}:\n` + JSON.stringify(data, null, 2),
        state: `error`,
      });
    } else {
      log({
        log: `Respuesta con ${type}:\n` + JSON.stringify(data, null, 2),
        state: `success`,
      });
    }
  } catch (err) {
    log({
      log: `Error con ${type}: ` + (err as Error).message,
      state: `error`,
    });
  }
};

// HEALTH CHECKER TEST
export const handleCheker = async ({ log }: BaseLogsProps) => {
  log({ log: "Solicitando health checker...", state: "info" });
  try {
    const res = await fetch("api/PlatformModuleSAP/Health/GetDatabasesStatus", {
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
        log: "Respuesta con health checker:\n" + JSON.stringify(data, null, 2),
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
