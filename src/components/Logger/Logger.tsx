import { loggerColorList } from "../../constant/loggerColorList";
import { LoggerProps } from "./types";

const Logger = ({ logs, onClear }: LoggerProps) => {
  let globalIndex = 0;

  return (
    <div className="flex flex-col w-full h-full bg-black font-mono overflow-hidden text-sm relative">
      <div className="flex flex-col w-full h-full overflow-auto p-4">
        {logs.length === 0 ? (
          <div
            className={"whitespace-pre-wrap " + `${loggerColorList["info"]}`}
          >
            {">"}
          </div>
        ) : (
          logs.map((log, index) => {
            const logLines = log.log.split("\n");

            return logLines.map((line, lineIndex) => {
              globalIndex++;

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
                  >
                    {lineIndex > 0 ? `|   ${line}` : `>   ${line}`}
                  </div>
                </div>
              );
            });
          })
        )}
      </div>
      <div className="flex w-full p-4 justify-end bg-[#1a1a1a]">
        <button onClick={onClear}>Limpiar consola</button>
      </div>
    </div>
  );
};

export default Logger;
