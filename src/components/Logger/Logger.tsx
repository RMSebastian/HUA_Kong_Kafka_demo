import { useState } from "react";
import { loggerColorList } from "../../constant/loggerColorList";
import { LoggerProps, LogProps } from "./types";

const GroupLog = ({
  log,
  globalIndex,
}: {
  log: LogProps;
  globalIndex: number;
}) => {
  const logLines = log.log.split("\n");
  const [expand, setExpand] = useState(logLines.length < 3 || log.expandable);

  const collapsedHeight = 24;
  const expandedHeight = logLines.length * 24;

  return (
    <div
      className="flex flex-col w-full transition-all duration-300 cursor-pointer flex-shrink-0"
      style={{
        minHeight: `${collapsedHeight}px`,
        maxHeight: expand ? `${expandedHeight}px` : `${collapsedHeight}px`,
        overflow: "hidden",
      }}
      onClick={() => {
        if (logLines.length > 1) {
        }
        setExpand(!expand);
      }}
    >
      {logLines.map((line, lineIndex) => {
        const index = globalIndex + lineIndex;
        return (
          <NormalLog
            globalIndex={index}
            line={line}
            lineIndex={lineIndex}
            state={log.state}
            key={lineIndex}
            expandable={logLines.length > 1}
            expanded={expand}
          />
        );
      })}
    </div>
  );
};

const NormalLog = ({
  state,
  line,
  globalIndex,
  lineIndex,
  expandable = false,
  expanded = false,
}: {
  state: LogProps["state"];
  expandable?: LogProps["expandable"];
  expanded?: boolean;
  line: string;
  globalIndex: number;
  lineIndex: number;
}) => {
  return (
    <div className="flex flex-row w-max gap-2" key={globalIndex}>
      <div
        className={
          `${
            expandable && lineIndex === 0
              ? "hover:bg-gray-700 bg-gray-800 rounded-lg"
              : ""
          }` +
          " flex min-w-[30px] whitespace-pre-wrap justify-around " +
          `${loggerColorList[state]}`
        }
      >
        {` ${globalIndex}  ${
          lineIndex > 0
            ? `|`
            : expandable && lineIndex === 0 && expanded
            ? `v `
            : `> `
        }`}
      </div>

      <div className={" whitespace-pre-wrap " + `${loggerColorList[state]}`}>
        {`${line}`}
      </div>
    </div>
  );
};

const Logger = ({ logs, onClear }: LoggerProps) => {
  let globalIndex = 0;
  return (
    <div className="flex flex-col w-full h-full bg-black font-mono">
      <div className="flex flex-col w-full flex-grow overflow-x-auto overflow-y-auto p-4">
        {logs.map((log, index) => {
          const currentIndex = globalIndex;
          globalIndex += log.log.split("\n").length;
          return <GroupLog log={log} key={index} globalIndex={currentIndex} />;
        })}
      </div>
      <div className="flex w-full p-4 justify-end bg-[#1a1a1a]">
        <button onClick={onClear}>Limpiar consola</button>
      </div>
    </div>
  );
};

export default Logger;
