import { Octokit } from "@octokit/core";
import Bottleneck from "bottleneck";

declare module "@octokit/core/dist-types/types.d" {
  interface OctokitOptions {
    throttle?: ThrottlingOptions;
  }
}

type LimitHandler = (
  retryAfter?: number,
  options?: object,
  octokit?: Octokit
) => void;

export type AbuseLimitHandler = {
  /**
   * @deprecated "[@octokit/plugin-throttling] `onAbuseLimit()` is deprecated and will be removed in a future release of `@octokit/plugin-throttling`, please use the `onSecondaryRateLimit` handler instead"
   */
  onAbuseLimit: LimitHandler;
};

export type SecondaryLimitHandler = {
  onSecondaryRateLimit: LimitHandler;
};

export type ThrottlingOptionsBase = {
  enabled?: boolean;
  Bottleneck?: any;
  id?: string;
  timeout?: number;
  connection?: any;
  minimumSecondaryRateRetryAfter?: number;
  retryAfterBaseValue?: number;
  write?: Bottleneck.Group;
  search?: Bottleneck.Group;
  notifications?: Bottleneck.Group;
  onRateLimit: LimitHandler;
};

export type ThrottlingOptions = ThrottlingOptionsBase &
  (AbuseLimitHandler | SecondaryLimitHandler);

export type Groups = {
  global?: Bottleneck.Group;
  write?: Bottleneck.Group;
  search?: Bottleneck.Group;
  notifications?: Bottleneck.Group;
};