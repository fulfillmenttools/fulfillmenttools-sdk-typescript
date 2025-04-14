import { getDefaultLogger, Logger } from './logger';

export interface FftApiConfig {
  enableHttpLogging?: boolean;
  getLogger?: () => Logger;
}

export const defaultConfig: FftApiConfig = {
  enableHttpLogging: false,
  getLogger: () => getDefaultLogger(),
};
