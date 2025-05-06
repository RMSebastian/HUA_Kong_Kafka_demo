import { handleCheker } from "../../api/apiTest";
import { HealthCheckerTestProps } from "./types";

const HealthCheckerTest = (props: HealthCheckerTestProps) => {
  const { log,token } = props;

  return (
    <>
      <h3>Health Checker</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleCheker({ log, token })}>
          Probar Health Checker
        </button>
      </div>
    </>
  );
};

export default HealthCheckerTest;
