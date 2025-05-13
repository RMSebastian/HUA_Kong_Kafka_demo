import { loggerColorList } from "../../constant/loggerColorList";
import { LoggerProps } from "./types";

const Logger = ({ logs, onClear }: LoggerProps) => {
  let globalIndex = 0;

  const Logs = () => {
    return (
      <>
        {logs.length !== 0 &&
          logs.map((log) => {
            const logLines = log.log.split("\n");

            return logLines.map((line, lineIndex) => {
              globalIndex++;

              const testId =
              line.includes('"apiHealth"') && lineIndex === 0
                ? { 'data-testid': 'health-response' }
                : {};

              return (
                <div key={`${globalIndex}`} className="flex flex-row gap-2">
                  <div
                    className={
                      "flex min-w-[30px] whitespace-pre-wrap justify-around " +
                      `${loggerColorList[log.state]}`
                    }
                  >
                    {globalIndex}
                  </div>
                  <div
                    key={lineIndex}
                    className={
                      "whitespace-pre-wrap " + `${loggerColorList[log.state]}`
                    }
                    {...testId}
                  >
                    {lineIndex > 0 ? `|   ${line}` : `>   ${line}`}
                  </div>
                </div>
              );
            });
          })}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full h-full bg-black font-mono">
      <div className="flex flex-col w-full h-full overflow-auto p-4">
        {Logs()}
      </div>
      <div className="flex w-full p-4 justify-end bg-[#1a1a1a]">
        <button onClick={onClear}>Limpiar consola</button>
      </div>
    </div>
  );
};

export default Logger;
