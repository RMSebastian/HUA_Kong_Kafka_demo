import { handleFetchKafka, handleSendKafka } from "../../api/apiTest";
import { KafkaTestProps } from "./types";

const KafkaTest = (props: KafkaTestProps) => {
  const { log, token } = props;

  return (
    <>
      <h3>Producer</h3>
      <div className="flex flex-col gap-2 ">
        {/* <button onClick={() => handleKafkaRequest("FDH", log, token)}> */}
        <button onClick={() => handleSendKafka({ log, token })}>
          Enviar datos
        </button>
      </div>
      <h3>Consumer</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleFetchKafka({ log, token })}>
          {/* <button onClick={() => handleKafkaRequest("HIS", log, token)}> */}
          Rescatar datos
        </button>
      </div>
    </>
  );
};

export default KafkaTest;
