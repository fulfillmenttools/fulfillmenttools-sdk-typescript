import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
import { RejectedTestHttpRequest, ResolvedTestHttpRequest, TestHttpClientHandler } from './testHttpClientHandler';
export class HttpRequestNotMockedError extends Error {}

export class TestHttpClient implements BasicHttpClient {
  constructor(private readonly testController: TestHttpClientHandler) {}

  public async request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>> {
    const request = this.testController.lookupRequest(config);

    if (!request) {
      throw new HttpRequestNotMockedError(
        `Please mock "${config.method} - ${this.testController.generateCombinedUrl(config)}"`
      );
    }

    const resolvedHttpRequest = request as ResolvedTestHttpRequest<TDto>;

    const resolvedObj = resolvedHttpRequest.resolveTo;
    if (resolvedObj) {
      const httpResult: HttpResult<TDto> = {
        body: resolvedObj,
        statusCode: resolvedHttpRequest.resolveStatusCode ?? 200,
      };
      return Promise.resolve(httpResult);
    }
    return Promise.reject((request as RejectedTestHttpRequest).rejectsTo);
  }
}
