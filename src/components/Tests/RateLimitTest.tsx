import { handleRateLimit } from "../../api/apiTest";
import { RateLimitTestProps } from "./types";

const RateLimitTest = (props: RateLimitTestProps) => {
  const { log } = props;
  return (
    <>
      <h3>Test de Rate-Limiting</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleRateLimit({ log })}>
          Probar Rate-Limiting
        </button>
      </div>
    </>
  );
};

export default RateLimitTest;
