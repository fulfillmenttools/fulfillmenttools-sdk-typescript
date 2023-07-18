import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
export declare class HttpClient implements BasicHttpClient {
    private readonly logger;
    private logging;
    request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>>;
    constructor(logging: boolean | null | undefined);
}
