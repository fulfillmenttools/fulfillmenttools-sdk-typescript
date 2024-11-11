/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Logger {
  debug(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}

export class ConsoleLogger implements Logger {
  debug = console.debug;
  error = console.error;
  log = console.log;
  info = console.info;
  warn = console.warn;
}

export class NullLogger implements Logger {
  debug(_message?: any, ..._optionalParams: any[]): void {
  }
  error(_message?: any, ..._optionalParams: any[]): void {
  }
  info(_message?: any, ..._optionalParams: any[]): void {
  }
  log(_message?: any, ..._optionalParams: any[]): void {
  }
  warn(_message?: any, ..._optionalParams: any[]): void {
  }
}

const defaultLogger = new NullLogger();

export function getDefaultLogger(): Logger {
  return defaultLogger;
}
