import { HTTP_TIMEOUT_MS } from './constants';
import { USER_AGENT } from '../projectConstants';
import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
import { serializeWithDatesAsIsoString } from './serialize';
import { ErrorType, FetchError, FftSdkError } from './error';

export class HttpClient implements BasicHttpClient {
  private shouldLogHttpRequestAndResponse: boolean;

  constructor(shouldLogHttpRequestAndResponse?: boolean) {
    this.shouldLogHttpRequestAndResponse = shouldLogHttpRequestAndResponse ?? false;
  }

  public async request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>> {
    const url = new URL(config.url);
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('User-Agent', USER_AGENT);

    if (config.customHeaders) {
      Object.entries(config?.customHeaders).forEach(([key, value]) => {
        requestHeaders.set(key, String(value));
      });
    }

    if (config.params) {
      Object.entries(config?.params).forEach(([name, value]) => {
        url.searchParams.append(name, String(value));
      });
    }

    // eslint-disable-next-line no-undef
    const requestOptions: RequestInit = {
      headers: requestHeaders,
      method: config.method,
      body: config.body ? JSON.stringify(config.body, serializeWithDatesAsIsoString) : undefined,
    };

    if (AbortSignal?.timeout) {
      requestOptions.signal = AbortSignal.timeout(HTTP_TIMEOUT_MS);
    }

    if (this.shouldLogHttpRequestAndResponse) {
      console.debug(`Sending request. Url: ${config.url}, Method: ${config.method}`, [
        {
          params: url.searchParams,
          body: requestOptions.body,
          headers: requestOptions.headers,
        },
      ]);
    }

    const fetchClient = config?.fetch || fetch;

    const response = await fetchClient(url, requestOptions);

    const responseBody =
      response.body && response.status !== 204
        ? await response.json().catch(() => {
            if (response.ok) {
              throw new FftSdkError({ message: 'Error parsing API response body', type: ErrorType.PARSE });
            }
          })
        : undefined;

    if (this.shouldLogHttpRequestAndResponse) {
      console.debug(`Received response. Url: ${url}, Method: ${config.method} - Response Status: ${response.status}`, [
        {
          body: responseBody,
        },
      ]);
    }

    if (!response.ok) {
      throw new FetchError(response.status, response.statusText);
    }

    return {
      statusCode: response.status,
      body: responseBody as TDto,
    };
  }
}
