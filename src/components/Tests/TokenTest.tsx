import { handleToken } from "../../api/apiTest";
import { TokenTestProps } from "./types";

const TokenTest = (props: TokenTestProps) => {
  const { log, token } = props;

  return (
    <>
      <h3>Test del segurizado con Token</h3>
      <div className="flex flex-col gap-2 ">
        <button
          onClick={() => handleToken({ log, token: "" })}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          {`Probar sin token`}
        </button>
      </div>
      <div className="flex flex-col gap-2 ">
        <button
          onClick={() => handleToken({ log, token })}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          {`Probar con token`}
        </button>
      </div>
    </>
  );
};

export default TokenTest;
