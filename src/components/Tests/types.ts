import { LogProps } from "../Logger/types";
export type BaseLogsProps = {
  log: (message: LogProps) => void;
};

export type TokenTestProps = BaseLogsProps & {
  token: string;
};
export type RequestTransformerTestProps = BaseLogsProps & {
  token: string;
};
export type RateLimitTestProps = BaseLogsProps;
export type HealthCheckerTestProps = BaseLogsProps;
export type KafkaTestProps = BaseLogsProps;
