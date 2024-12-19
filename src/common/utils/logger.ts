/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
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
    // does nothing
  }
  error(_message?: any, ..._optionalParams: any[]): void {
    // does nothing
  }
  info(_message?: any, ..._optionalParams: any[]): void {
    // does nothing
  }
  log(_message?: any, ..._optionalParams: any[]): void {
    // does nothing
  }
  warn(_message?: any, ..._optionalParams: any[]): void {
    // does nothing
  }
}

const defaultLogger = new NullLogger();

export function getDefaultLogger(): Logger {
  return defaultLogger;
}
