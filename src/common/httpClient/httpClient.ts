import superagent from 'superagent';
import { HTTP_TIMEOUT_MS } from './constants';
import { USER_AGENT } from '../projectConstants';
import { BasicHttpClient, HttpRequestConfiguration, HttpResult } from './models';
import { serializeWithDatesAsIsoString } from './serialize';
import { Logger } from 'tslog';
import { CustomLogger } from '../logging';

export class HttpClient implements BasicHttpClient {
  private readonly logger: Logger<HttpClient> = new CustomLogger<HttpClient>();
  private shouldLogHttpRequestAndResponse: boolean;
  public async request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>> {
    const request = superagent(config.method, config.url)
      .set('Content-Type', 'application/json')
      .set('User-Agent', USER_AGENT)
      .timeout(HTTP_TIMEOUT_MS)
      .retry(config.retries);

    if (config.customHeaders) {
      request.set(config.customHeaders);
    }

    if (config.params) {
      request.query(config.params);
    }

    if (this.shouldLogHttpRequestAndResponse) {
      this.logger.debug(`Sending request. Url: ${request.url}, Method: ${request.method}`, [
        {
          params: config.params,
          body: config.body,
        },
      ]);
    }

    const response = await request
      .send(config.body)
      .serialize((body) => JSON.stringify(body, serializeWithDatesAsIsoString));

    if (this.shouldLogHttpRequestAndResponse) {
      this.logger.debug(
        `Received response. Url: ${request.url}, Method: ${request.method} - Response Status: ${response.statusCode}`,
        [
          {
            body: response.body,
          },
        ]
      );
    }

    return {
      statusCode: response.statusCode,
      body: response.body as TDto,
    };
  }

  constructor(shouldLogHttpRequestAndResponse?: boolean) {
    this.shouldLogHttpRequestAndResponse = shouldLogHttpRequestAndResponse ?? false;
  }
}
