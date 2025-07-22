import { USER_AGENT } from '../projectConstants';
import { FftApiConfig, getDefaultLogger, Logger } from '../utils';
import { HTTP_TIMEOUT_MS } from './constants';
import { ErrorType, FetchError, FftSdkError } from './error';
import { BasicHttpClient, HttpRequestConfiguration, HttpResult, ResponseType } from './models';
import { serializeWithDatesAsIsoString } from './serialize';

export class HttpClient implements BasicHttpClient {
  private readonly log: Logger;
  private readonly shouldLogHttpRequestAndResponse: boolean;

  constructor(config: FftApiConfig = {}) {
    this.shouldLogHttpRequestAndResponse = config.enableHttpLogging ?? false;
    this.log = config.getLogger?.() ?? getDefaultLogger();
  }

  public async request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>> {
    const url = new URL(config.url);
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('User-Agent', USER_AGENT);

    if (config.customHeaders) {
      Object.entries(config?.customHeaders).forEach(([key, value]) => {
        // TODO 'value' will use Object's default stringification format when stringified
        requestHeaders.set(key, String(value));
      });
    }

    if (config.params) {
      Object.entries(config?.params).forEach(([name, value]) => {
        if ( Array.isArray(value)) {
          value.forEach((item) => {
            url.searchParams.append(name, decodeURIComponent(String(item)));
          });
        } else {
          url.searchParams.append(name, decodeURIComponent(String(value)));
        }
      });
      url.search = decodeURIComponent(url.search);
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
      this.log.debug(`Sending API request.`, [
        {
          method: config.method,
          url: config.url,
          params: url.searchParams,
          body: requestOptions.body,
          headers: requestOptions.headers,
        },
      ]);
    }

    const fetchClient = config?.fetch || fetch;

    const response = await fetchClient(url, requestOptions);

    // handle empty response body for DELETE requests
    let shouldParseBody = response.body && response.status !== 204;
    if (requestOptions.method === 'DELETE' && response.headers.has('content-length')) {
      const length = parseInt(response.headers.get('content-length') ?? '');
      shouldParseBody &&= !Number.isNaN(length) && length > 0;
    }

    const responseBody = await this.handleResponse(response, config, shouldParseBody);

    if (this.shouldLogHttpRequestAndResponse) {
      this.log.debug(`Received API response.`, [
        {
          method: config.method,
          url: url.toString(),
          status: response.status,
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

  private async handleResponse(response: Response, config: HttpRequestConfiguration, shouldParseBody: boolean | null) {
    if (!shouldParseBody) {
      return undefined;
    }

    switch (config.responseType) {
      case ResponseType.BLOB: {
        return await response.blob().catch(() => {
          if (response.ok) {
            throw new FftSdkError({ message: 'Error parsing API response body', type: ErrorType.PARSE });
          }
        });
      }
      case ResponseType.ARRAY_BUFFER: {
        return await response.arrayBuffer().catch(() => {
          if (response.ok) {
            throw new FftSdkError({ message: 'Error parsing API response body', type: ErrorType.PARSE });
          }
        });
      }
      default: {
        return await response.json().catch(() => {
          if (response.ok) {
            throw new FftSdkError({ message: 'Error parsing API response body', type: ErrorType.PARSE });
          }
        });
      }
    }
  }
}
