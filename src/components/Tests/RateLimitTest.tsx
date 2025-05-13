import { handleRateLimit } from "../../api/apiTest";
import { RateLimitTestProps } from "./types";

const RateLimitTest = (props: RateLimitTestProps) => {
  const { log, token } = props;
  return (
    <>
      <h3>Test de Rate-Limiting</h3>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleRateLimit({ log, token, users: 1 })}>
          Probar Rate-Limiting
        </button>
      </div>
      <div className="flex flex-col gap-2 ">
        <button onClick={() => handleRateLimit({ log, token, users: 2 })}>
          Probar Rate-Limiting 2 users
        </button>
      </div>
    </>
  );
};

export default RateLimitTest;
