import superagent from 'superagent';
import { HTTP_TIMEOUT_MS } from './constants';
import { USER_AGENT } from '../projectConstants';
import { BasicHttpClient, HttpRequestConfiguration, HttpResult, ResponseType } from './models';
import { serializeWithDatesAsIsoString } from './serialize';

export class HttpClient implements BasicHttpClient {
  private shouldLogHttpRequestAndResponse: boolean;
  public async request<TDto>(config: HttpRequestConfiguration): Promise<HttpResult<TDto>> {
    const request = superagent(config.method, config.url)
      .set('Content-Type', 'application/json')
      .set('User-Agent', USER_AGENT)
      .timeout(HTTP_TIMEOUT_MS)
      .responseType(config.responseType ?? ResponseType.DEFAULT)
      .retry(config.retries);

    if (config.customHeaders) {
      request.set(config.customHeaders);
    }

    if (config.params) {
      request.query(config.params);
    }

    if (this.shouldLogHttpRequestAndResponse) {
      console.debug(
        `Sending request. Url: ${request.url}, Method: ${request.method}. Params: ${JSON.stringify(
          config.params
        )}, Body: ${JSON.stringify(config.body)}`
      );
    }

    const response = await request
      .send(config.body)
      .serialize((body) => JSON.stringify(body, serializeWithDatesAsIsoString));

    if (this.shouldLogHttpRequestAndResponse) {
      console.debug(
        `Received response. Url: ${request.url}, Method: ${request.method} - Response Status: ${
          response.statusCode
        }. Body: ${JSON.stringify(response.body)}`
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
