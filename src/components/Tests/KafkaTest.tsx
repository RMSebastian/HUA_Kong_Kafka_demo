import { handleKafkaRequest } from "../../api/apiTest";
import { KafkaTestProps } from "./types";

const KafkaTest = (props: KafkaTestProps) => {
  const { log } = props;

  return (
    <>
      <h3>Body a FDH</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleKafkaRequest("FDH", log)}>
          Enviar a FDH
        </button>
      </div>
      <h3>Body a HIS</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleKafkaRequest("HIS", log)}>
          Enviar a HIS
        </button>
      </div>
    </>
  );
};

export default KafkaTest;
