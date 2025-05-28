import {
  BaseLogsProps,
  RateLimitTestProps,
  RequestTransformerTestProps,
  TokenTestProps,
} from "../components/Tests/types";
import { getDifferencesOfTime } from "./utils/formatters";

const producerURL = import.meta.env.VITE_KAFKA_PRODUCER_URL;
const consumerURL = import.meta.env.VITE_KAFKA_CONSUMER_URL;
export const BASE_URL = import.meta.env.VITE_API_URL;
// TOKEN TEST
export const handleToken = async ({ token, log }: TokenTestProps) => {
  const apikey = import.meta.env.VITE_MARKEY_APIKEY;
  const hasToken = token !== "";
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    "Content-Type": "application/json",
    token: "UZN9291llgxWJ93uzilrmantG6t20r0v8kwrihYXmZl1EO8irdhT0gFK0tFAlv3m",
  };

  const bodyObject = {
    aplicacion: "SelfServiceHUA",
    apiKey: apikey,
    operacion: "apiObtenerPaciente",
    filtro: {
      paciCodigoInterno: "73335104",
    },
  };
  const body = JSON.stringify(bodyObject);
  log({
    log: `Solicitando ${hasToken ? "con" : "sin"} token...`,
    state: "info",
  });
  if (hasToken) log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  try {
    const res = await fetch(BASE_URL + `/services/markey/APIMarkeyV2/obtener`, {
      method: "POST",
      headers: headers,
      body: body,
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
export const handleRateLimit = async ({
  log,
  token,
  type = "consumer",
  users,
}: RateLimitTestProps) => {
  const hasToken = token !== "";
  log({ log: "Solicitando con rate limit...", state: "info" });
  if (hasToken) {
    log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  }

  try {
    const apiToken = import.meta.env.VITE_MARKEY_TOKEN;
    const apikey = import.meta.env.VITE_MARKEY_APIKEY;
    const secondToken = import.meta.env.VITE_SECOND_TOKEN;

    switch (users) {
      case 1:
        await rateLimitWhile(
          "user1",
          token,
          log,
          type,
          apikey,
          apiToken,
          undefined,
          10
        );
        break;
      case 2:
        await rateLimitWhile(
          "user1",
          token,
          log,
          type,
          apikey,
          apiToken,
          undefined,
          5
        );
        await rateLimitWhile(
          "user2",
          secondToken,
          log,
          apikey,
          type,
          apiToken,
          false,
          5
        );
        break;
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

  const bodyObject = {
    ...(type === "header" && {
      aplicacion: "SelfServiceHUA",
      apiKey: apikey,
    }),
    operacion: "apiObtenerPaciente",
    filtro: {
      paciCodigoInterno: "73335104",
    },
  };

  const bodyObjectWithAplication = JSON.stringify(
    {
      aplicacion: "SelfServiceHUA",
      ...bodyObject,
    },
    null,
    2
  );

  const body = JSON.stringify(bodyObject);

  log({ log: `Solicitando con ${type}-transformer...`, state: "info" });

  if (type === "header")
    log({
      log: `HEADERS INICIALES:\n ${JSON.stringify(headers, null, 2)}`,
      state: "info",
    });
  else {
    log({
      log: `BODY INICIAL:\n ${bodyObjectWithAplication}`,
      state: "info",
    });
  }

  if (hasToken) log({ log: `Token: ${token.slice(0, 10)}...`, state: "info" });
  try {
    const res = await fetch(
      BASE_URL +
        `/services/markey/${type}-transformer-test/APIMarkeyV2/obtener`,
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
      if (type === "header") {
        log({
          log: `HEADERS TRANSFORMADOS: \n ${JSON.stringify(
            {
              token:
                "UZN9291llgxWJ93uzilrmantG6t20r0v8kwrihYXmZl1EO8irdhT0gFK0tFAlv3m",
              ...headers,
            },
            null,
            2
          )}`,
          state: "extra",
        });
      } else {
        log({
          log: `BODY TRANSFORMADO: \n ${JSON.stringify(
            {
              apikey:
                "UZN9291llgxWJ93uzilrmantG6t20r0v8kwrihYXmZl1EO8irdhT0gFK0tFAlv3m",
              aplicacion: "SelfServiceHUA",
              // operacion: "apiObtenerPaciente",
              ...bodyObject,
            },
            null,
            2
          )}`,
          state: "extra",
        });
      }
      log({
        log:
          "RESPUESTA RECIBIDA CON TRANSFORMER:\n" +
          JSON.stringify(data, null, 2),
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
export const handleCheker = async ({ log, token }: BaseLogsProps) => {
  log({ log: "Solicitando health checker...", state: "info" });
  try {
    const startTime = new Date();
    const res = await fetch(
      BASE_URL + "/services/health/PlatformModuleSAP/Health/GetDatabasesStatus",
      {
        method: "GET",
        headers: {
          Authorization: token !== "" ? `Bearer ${token}` : "",
        },
      }
    );

    const data = await res.json();
    const status = data.status;

    const endTime = new Date();

    const time = getDifferencesOfTime(startTime, endTime);
    log({ log: `Tiempo de request: ${time}ms`, state: "info" });

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
export const handleSendKafka = async ({ log }: BaseLogsProps) => {
  const body: any = {
    name: `Medicamento Nº ${Math.floor(Math.random() * 9999)}`,
    description: "Medicamento de prueba",
    price: Math.floor(Math.random() * 9999),
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
      log: `Respuesta Provider:\n ${JSON.stringify(data, null, 2)}`,
      state: "success",
    });
  } catch (error) {
    log({
      log: "Error con kafka provider: " + (error as Error).message,
      state: "error",
    });
  }
};
export const handleSendKafkaDLQ = async ({ log }: BaseLogsProps) => {
  const body: any = {
    name: "fail",
    description: "Falla de simulacro",
    price: 999,
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
      log: `Respuesta Provider:\n ${JSON.stringify(data, null, 2)}`,
      state: "success",
    });
  } catch (error) {
    log({
      log: "Error con kafka provider: " + (error as Error).message,
      state: "error",
    });
  }
};
export const handleFetchKafka = async ({ log }: BaseLogsProps) => {
  log({ log: "Solicitando rescate a kafka consumer...", state: "info" });

  try {
    const res = await fetch(`${consumerURL}/allProducts`, {
      method: "GET",
    });

    const data = await res.json();
    log({
      log: `Respuesta Consumer:\n ${JSON.stringify(data, null, 2)}`,
      state: "success",
    });
  } catch (error) {
    log({
      log: "Error con kafka consumer: " + (error as Error).message,
      state: "error",
    });
  }
};
export const handleFetchKafkaDLQ = async ({ log }: BaseLogsProps) => {
  log({ log: "Solicitando rescate a kafka Consumer DLQ...", state: "info" });

  try {
    const res = await fetch(`${consumerURL}/Dlq`, {
      method: "GET",
    });

    const data = await res.json();
    log({
      log: `Ultimos datos generados por el simulacro DLQ:\n ${JSON.stringify(
        data,
        null,
        2
      )}`,
      state: "error",
    });
  } catch (error) {
    log({
      log: "Error con kafka consumer DLQ: " + (error as Error).message,
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

const sendLimit = async (
  token: string,
  apikey: string,
  apiToken: string,
  type: "global" | "consumer"
) => {
  const url =
    BASE_URL +
    `/services/markey/rate-limit-${
      type === "global" ? "global-" : ""
    }test/APIMarkeyV2/obtener`;

  return await fetch(url, {
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
  });
};

const rateLimitWhile = async (
  user: string,
  token: string,
  log: any,
  type: "global" | "consumer",
  apikey: string,
  apiToken: string,
  color: boolean = true,
  maxAttemps: number
) => {
  let flag = true;
  let attemps = 0;
  while (flag) {
    const res = await sendLimit(token, apikey, apiToken, type);

    attemps += 1;
    const data = await res.json();
    const status = data.Estado as string;

    if (status && status === "ERROR") {
      throw new Error(data);
    } else {
      log({
        log: `Verificada respuesta N°${attemps}, usuario ${user}`,
        state: color ? "success" : "success_two",
      });
      if (
        JSON.stringify(data, null, 2).includes("API rate limit exceeded") ||
        JSON.stringify(data, null, 2).includes("Unauthorized")
      ) {
        flag = false;
      }
      if (attemps === 1 || attemps >= maxAttemps)
        log({
          log: `Datos de la respuesta N°${attemps}: ${JSON.stringify(
            data,
            null,
            2
          )}}`,
          state: color ? "success" : "success_two",
        });
    }
  }
};
