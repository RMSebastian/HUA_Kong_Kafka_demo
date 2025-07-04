

export type LoggerProps = {
  logs: LogProps[];
  onClear: () => void;
};

export type LogProps = {
  log: string;
  state: "success" | "error" | "warning" | "info" | "success_two" | "extra";
  expandable?: boolean;
};
