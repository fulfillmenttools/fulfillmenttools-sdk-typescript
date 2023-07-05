import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
import { TestHttpClientHandler } from './testHttpClientHandler';
export declare class HttpRequestNotMockedError extends Error {
}
export declare class TestHttpClient implements BasicHttpClient {
    private readonly testController;
    constructor(testController: TestHttpClientHandler);
    request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>>;
}
