import { getDefaultLogger, Logger } from './logger';

export interface FftApiConfig {
  enableHttpLogging?: boolean;
  getLogger?: () => Logger;
  initializeWithToken?: boolean;
}

export const defaultConfig: FftApiConfig = {
  enableHttpLogging: false,
  getLogger: () => getDefaultLogger(),
  initializeWithToken: false,
}
