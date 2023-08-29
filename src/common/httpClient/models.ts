import HttpStatus from 'http-status-enum';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export type QueryParams = Record<string, string>;

export interface HttpRequestConfiguration {
  method: HttpMethod;
  url: string;
  customHeaders?: Record<string, unknown>;
  params?: QueryParams;
  body?: Record<string, unknown> | string;
  retries?: number;
  responseType?: ResponseType;
}

export interface HttpResult<TDto> {
  body: TDto;
  statusCode: HttpStatus;
}

export interface BasicHttpClient {
  request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>>;
}

// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
export enum ResponseType {
  TEXT = 'text',
  BLOB = 'blob',
  JSON = 'json',
  DOCUMENT = 'document',
  ARRAY_BUFFER = 'arraybuffer',
  DEFAULT = '',
}
