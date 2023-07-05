import HttpStatus from 'http-status-enum';
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS"
}
export type QueryParams = Record<string, string>;
export interface HttpRequestConfiguration {
    method: HttpMethod;
    url: string;
    customHeaders?: Record<string, unknown>;
    params?: QueryParams;
    body?: Record<string, unknown> | string;
    retries?: number;
}
export interface HttpResult<TDto> {
    body: TDto;
    statusCode: HttpStatus;
}
export interface BasicHttpClient {
    request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>>;
}
