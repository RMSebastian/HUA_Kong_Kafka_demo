import { LogProps } from "../Logger/types";
export type BaseLogsProps = {
  log: (message: LogProps) => void;
  token: string;
};

export type TokenTestProps = BaseLogsProps;
export type RequestTransformerTestProps = BaseLogsProps;
export type RateLimitTestProps = BaseLogsProps;
export type HealthCheckerTestProps = BaseLogsProps;
export type KafkaTestProps = BaseLogsProps;
