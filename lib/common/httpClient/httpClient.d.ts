import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
export declare class HttpClient implements BasicHttpClient {
    private readonly logger;
    private shouldLogHttpRequestAndResponse;
    request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>>;
    constructor(shouldLogHttpRequestAndResponse?: boolean);
}
