import { LogProps } from "../Logger/types";
export type BaseLogsProps = {
  log: (message: LogProps) => void;
  token: string;
  users?: number;
};

export type TokenTestProps = BaseLogsProps;
export type RequestTransformerTestProps = BaseLogsProps & {
  type?: "header" | "body";
};
export type RateLimitTestProps = BaseLogsProps & {
  type?: "global" | "consumer";
  maxAttemps?: number;
};
export type HealthCheckerTestProps = BaseLogsProps;
export type KafkaTestProps = BaseLogsProps;
