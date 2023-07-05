import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
export declare class HttpClient implements BasicHttpClient {
    private readonly logger;
    request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>>;
}
