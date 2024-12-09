export enum ErrorType {
  HTTP = 'http', // Generic HTTP error
  CLIENT = 'client', // Generic client error
  REQUEST = 'request', // Error preparing API request
  RESPONSE = 'response', // Error response from API
  PARSE = 'parse', // Error parsing API resource
}

export class FetchError extends Error {
  static NAME = 'FetchError';

  static isFetchError = (error: unknown): error is FetchError => {
    return error !== null && typeof error === 'object' && error instanceof FetchError;
  };

  type: ErrorType;
  status: number;
  statusText: string;

  constructor(status: number, statusText: string) {
    super(statusText);
    this.name = FetchError.NAME;
    this.type = ErrorType.HTTP;
    this.status = status;
    this.statusText = statusText;
  }
}

export class FftSdkError extends Error {
  static NAME = 'SdkError';

  static isSdkError(error: unknown): error is FftSdkError {
    return (
      error !== null &&
      typeof error === 'object' &&
      'name' in error &&
      'type' in error &&
      [(FftSdkError.NAME, FftApiError.NAME)].includes(error.name as string) &&
      Object.values(ErrorType).includes(error.type as ErrorType)
    );
  }

  type: ErrorType;
  source?: Error;

  constructor(error: { message: string; type?: ErrorType }) {
    super(error.message);
    this.name = FftSdkError.NAME;
    this.type = error.type || ErrorType.CLIENT;
  }
}

export class FftApiError extends FftSdkError {
  static override NAME = 'ApiError';

  static isApiError(error: unknown): error is FftApiError {
    return FftSdkError.isSdkError(error) && error.name === FftApiError.NAME && error.type === ErrorType.RESPONSE;
  }

  status?: number;
  statusText?: string;

  constructor(error: { message: string }) {
    super({ ...error, type: ErrorType.RESPONSE });
    this.name = FftApiError.NAME;
  }
}

const isRequestError = (error: unknown): error is TypeError => {
  return error !== null && typeof error === 'object' && error instanceof TypeError;
};

export const handleError = (error: unknown): never => {
  if (FftSdkError.isSdkError(error) || FftApiError.isApiError(error)) {
    throw error;
  }

  let sdkError;
  if (error instanceof Error) {
    sdkError = new FftSdkError({ message: error.message });
    sdkError.source = error;
  } else {
    sdkError = new FftSdkError({ message: 'An error occurred' });
  }

  if (FetchError.isFetchError(error)) {
    const apiError = new FftApiError(sdkError);
    apiError.type = ErrorType.RESPONSE;
    apiError.status = error.status;
    apiError.statusText = error.statusText;
    if (!apiError.message && apiError.statusText) {
      apiError.message = apiError.statusText;
    }
    sdkError = apiError;
  } else if (isRequestError(error)) {
    sdkError.type = ErrorType.REQUEST;
  } else {
    sdkError.type = ErrorType.CLIENT;
  }

  throw sdkError;
};
