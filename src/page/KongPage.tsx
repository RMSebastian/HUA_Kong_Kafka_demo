import { useState } from "react";
import Logger from "../components/Logger/Logger";
import TokenTest from "../components/Tests/TokenTest";
import RateLimitTest from "../components/Tests/RateLimitTest";
import RequestTransformerTest from "../components/Tests/RequestTransformerTest";
import { LogProps } from "../components/Logger/types";

const KongPage = () => {
  const [logs, setLogs] = useState<LogProps[]>([]);
  const [token, setToken] = useState<string>("");
  const log = (message: LogProps) => {
    setLogs((prev) => [...prev, message]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="flex flex-col w-full gap-4 items-start">
      <div className="flex flex-row gap-2 ">
        <p className="text-lg self-center">Token</p>
        <input
          className="bg-[#1a1a1a] rounded-lg font-mono px-4 py-2"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        ></input>
      </div>

      <TokenTest log={log} token={token} />
      <RateLimitTest log={log} />
      <RequestTransformerTest log={log} token={token} />
      <Logger logs={logs} onClear={clearLogs} />
    </div>
  );
};

export default KongPage;
