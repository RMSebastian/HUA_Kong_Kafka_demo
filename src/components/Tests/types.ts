import { LogProps } from "../Logger/types";
export type TokenTestProps = {
  token: string;
  log: (message: LogProps) => void;
};
export type RateLimitTestProps = {
  log: (message: LogProps) => void;
};
export type RequestTransformerTestProps = {
  token: string;
  log: (message: LogProps) => void;
};
export type HealthCheckerTestProps = {
  log: (message: LogProps) => void;
};
