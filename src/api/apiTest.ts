import {
  BaseLogsProps,
  RateLimitTestProps,
  RequestTransformerTestProps,
  TokenTestProps,
} from "../components/Tests/types";

const producerURL = import.meta.env.VITE_KAFKA_PRODUCER_URL;
const consumerURL = import.meta.env.VITE_KAFKA_CONSUMER_URL;

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
      "services/api/ResultadosMiddleware/api/Resultados/ListaResultados?" +
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

// RATE LIMIT TEST
export const handleRateLimit = async ({ log, token }: RateLimitTestProps) => {
  const hasToken = token !== "";
  log({ log: "Solicitando con rate limit...", state: "info" });
  if (hasToken) {
    log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  }
  try {
    const apiToken = import.meta.env.VITE_MARKEY_TOKEN;
    const apikey = import.meta.env.VITE_MARKEY_APIKEY;
    let attemps = 0;
    while (attemps < 15) {
      const res = await fetch(
        "services/markey/rate-limit-test/APIMarkeyV2/obtener",
        {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            token: apiToken,
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
        }
      );

      attemps += 1;
      const data = await res.json();
      const status = data.Estado as string;

      if (status && status === "ERROR") {
        throw new Error(data);
      } else {
        log({
          log: `Verificada respuesta N°${attemps}`,
          state: "success",
        });
        if (attemps === 1 || attemps >= 10)
          log({
            log: `Datos de la respuesta N°${attemps}: ${JSON.stringify(
              data,
              null,
              2
            )}}`,
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

// TRANSFORMER TEST
export const handleTrasformer = async ({
  token,
  log,
  type = "header",
}: RequestTransformerTestProps) => {
  const apikey = import.meta.env.VITE_MARKEY_APIKEY;
  const hasToken = token !== "";
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    ...(type === "header" && {
      aplicacion: "SelfServiceHUA",
      apiKey: apikey,
    }),
    operacion: "apiObtenerPaciente",
    filtro: {
      paciCodigoInterno: "73335104",
    },
  });
  log({ log: `Solicitando con ${type}-transformer...`, state: "info" });
  if (type === "header")
    log({
      log: `Header:\n ${JSON.stringify(headers, null, 2)}`,
      state: "info",
    });
  else log({ log: `Body:\n ${body}`, state: "info" });

  if (hasToken) log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  try {
    const res = await fetch(
      `services/markey/${type}-transformer-test/APIMarkeyV2/obtener`,
      {
        method: "POST",
        headers: headers,
        body: body,
      }
    );

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
      log:
        "Error con transformer: " +
        JSON.stringify((err as Error).message, null, 2),
      state: "error",
    });
  }
};
// HEALTH CHECKER TEST
export const handleCheker = async ({ log }: BaseLogsProps) => {
  log({ log: "Solicitando health checker...", state: "info" });
  try {
    const res = await fetch(
      "services/health/PlatformModuleSAP/Health/GetDatabasesStatus",
      {
        method: "GET",
      }
    );

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
//KAFKA TEST
export const handleSendKafka = async ({ log, token }: BaseLogsProps) => {
  const body: any = {
    name: "Medicamento",
    description: "Medicamento de prueba",
    price: 100,
  };
  log({ log: "Solicitando envio a kafka provider...", state: "info" });
  log({ log: `Body:\n ${JSON.stringify(body, null, 2)}`, state: "info" });
  try {
    const res = await fetch(`${producerURL}/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        description: body.description,
        price: body.price,
      }),
    });

    const data = await res.json();
    log({
      log: `Respueta Provider:\n ${JSON.stringify(data, null, 2)}`,
      state: "success",
    });
  } catch (error) {
    log({
      log: "Error con kafka provider: " + (error as Error).message,
      state: "error",
    });
  }
};
export const handleFetchKafka = async ({ log, token }: BaseLogsProps) => {
  log({ log: "Solicitando rescate a kafka consumer...", state: "info" });
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch(`${consumerURL}/allProducts`, {
      method: "GET",
    });

    const data = await res.json();
    log({
      log: `Respueta Consumer:\n ${JSON.stringify(data, null, 2)}`,
      state: "success",
    });
  } catch (error) {
    log({
      log: "Error con kafka consumer: " + (error as Error).message,
      state: "error",
    });
  }
};

// export const handleKafkaRequest = async (
//   type: "HIS" | "FDH",
//   log: BaseLogsProps["log"],
//   token: BaseLogsProps["token"]
// ) => {
//   const hasToken = token !== "";
//   log({ log: `Enviando body ${type}...`, state: "info" });
//   if (hasToken) {
//     log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
//   }
//   try {
//     const res = await fetch(
//       `services/api/InterfazPaciente${type}/api/Paciente/Procesar`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(pacienteData),
//       }
//     );

//     const data = await res.json();
//     const status = data.status;

//     if (status === "error") {
//       log({
//         log: `Error con ${type}:\n` + JSON.stringify(data, null, 2),
//         state: `error`,
//       });
//     } else {
//       log({
//         log: `Respuesta con ${type}:\n` + JSON.stringify(data, null, 2),
//         state: `success`,
//       });
//     }
//   } catch (err) {
//     log({
//       log: `Error con ${type}: ` + (err as Error).message,
//       state: `error`,
//     });
//   }
// };
