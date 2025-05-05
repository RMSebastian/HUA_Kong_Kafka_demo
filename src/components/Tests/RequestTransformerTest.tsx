import { handleTrasformer } from "../../api/apiTest";
import { RequestTransformerTestProps } from "./types";

const RequestTransformerTest = (props: RequestTransformerTestProps) => {
  const { log, token } = props;

  return (
    <>
      <>
        <h3>Test de Plugin Transformer</h3>
        <div className="flex flex-col gap-2 ">
          <button onClick={() => handleTrasformer({ log, token })}>
            Probar Plu-Transformer (Cabeceras)
          </button>
          <button onClick={() => handleTrasformer({ log, token })}>
            Probar Plu-Transformer (Payload)
          </button>
        </div>
      </>
    </>
  );
};

export default RequestTransformerTest;
