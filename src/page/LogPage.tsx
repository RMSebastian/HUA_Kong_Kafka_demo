import { useState } from "react";
import Logger from "../components/Logger/Logger";
import TokenTest from "../components/Tests/TokenTest";
import RateLimitTest from "../components/Tests/RateLimitTest";
import RequestTransformerTest from "../components/Tests/RequestTransformerTest";
import { LogProps } from "../components/Logger/types";
import HealthCheckerTest from "../components/Tests/HealthCheckerTest";
import KafkaTest from "../components/Tests/KafkaTest";

const LogPage = () => {
  const [logs, setLogs] = useState<LogProps[]>([]);
  const [token, setToken] = useState<string>("");
  const log = (message: LogProps) => {
    setLogs((prev) => [...prev, message]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="flex h-screen w-screen ">
      <div className="flex w-[400px] flex-col bg-gray-800 text-white text-center p-4 gap-4 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-row gap-2">
          <p className="text-lg self-center">Token</p>
          <input
            className="bg-[#1a1a1a] rounded-lg font-mono px-4 py-2 w-full"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          ></input>
        </div>
        {/* KONG TESTS*/}
        <h2>Kong</h2>
        <div className="flex flex-col gap-4 border-2 border-[#242424] bg-[#242424] p-2 rounded-lg">
          <TokenTest log={log} token={token} />
          <RateLimitTest log={log} />
          <RequestTransformerTest log={log} token={token} />
        </div>
        {/* KAFKA TESTS*/}
        <h2>Kafka</h2>
        <div className="flex flex-col gap-4 border-2 border-[#242424] bg-[#242424] p-2 rounded-lg">
          <KafkaTest log={log} />
        </div>
        {/* HEALTH CHECKER */}
        <h2>Health</h2>
        <div className="flex flex-col gap-4 border-2 border-[#242424] bg-[#242424] p-2 rounded-lg">
          <HealthCheckerTest log={log} />
        </div>
      </div>
      <div className="flex h-full w-full p-4">
        <div className="flex flex-col w-full gap-4 items-start">
          <Logger logs={logs} onClear={clearLogs} />
        </div>
      </div>
    </div>
  );
};

export default LogPage;
