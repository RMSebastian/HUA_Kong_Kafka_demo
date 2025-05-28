import {
  handleFetchKafka,
  handleFetchKafkaDLQ,
  handleSendKafka,
  handleSendKafkaDLQ,
} from "../../api/apiTest";
import { KafkaTestProps } from "./types";

const KafkaTest = (props: KafkaTestProps) => {
  const { log, token } = props;

  return (
    <>
      <h3>Producer (Quien envia informaciòn)</h3>
      <div className="flex flex-col gap-2 ">
        {/* <button onClick={() => handleKafkaRequest("FDH", log, token)}> */}
        <button onClick={() => handleSendKafka({ log, token })}>
          Producir un evento
        </button>
      </div>
      <h3>Consumer (Quien recibira informaciòn)</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleSendKafkaDLQ({ log, token })}>
          Producir un error simulado
        </button>
        <button onClick={() => handleFetchKafka({ log, token })}>
          {/* <button onClick={() => handleKafkaRequest("HIS", log, token)}> */}
          Rescatar lista de datos
        </button>
        <button onClick={() => handleFetchKafkaDLQ({ log, token })}>
          {/* <button onClick={() => handleKafkaRequest("HIS", log, token)}> */}
          Rescatar ultimo dato DLQ registrado
        </button>
      </div>
    </>
  );
};

export default KafkaTest;
