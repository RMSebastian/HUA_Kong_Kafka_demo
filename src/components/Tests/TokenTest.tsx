import { handleConToken, handleSinToken } from "../../api/apiTest";
import { TokenTestProps } from "./types";

const TokenTest = (props: TokenTestProps) => {
  const { log, token } = props;

  const handleSend = () => {
    if (token === "") {
      handleSinToken({ log });
    } else {
      handleConToken({ log, token });
    }
  };

  return (
    <>
      <h3>Test del segurizado con Token</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={handleSend} className="bg-gray-200 px-4 py-2 rounded">
          {`Probar ${token === "" ? "sin" : "con"} token`}
        </button>
      </div>
    </>
  );
};

export default TokenTest;
