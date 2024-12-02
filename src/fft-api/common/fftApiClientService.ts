import { handleError, HttpClient, HttpMethod, MAX_RETRIES, QueryParams } from '../../common';
import { ResponseType } from '../../common/httpClient/models';
import { defaultConfig, FftApiConfig } from '../../common/utils/config';
import { getDefaultLogger, Logger } from '../../common/utils/logger';
import { AuthService } from '../auth';

export class FftApiClient {
  private readonly baseUrl: string;
  private readonly authService: AuthService;
  private readonly httpClient: HttpClient;
  private readonly config: FftApiConfig;

  constructor(projectId: string, username: string, password: string, apiKey: string, config: FftApiConfig = {}) {
    this.config = { ...defaultConfig, ...config };
    this.baseUrl = `https://${projectId}.api.fulfillmenttools.com/api`;
    this.httpClient = new HttpClient(this.config);
    this.authService = new AuthService(
      {
        apiKey,
        apiPassword: password,
        apiUser: username,
        authUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        refreshUrl: 'https://securetoken.googleapis.com/v1/token',
      },
      this.httpClient
    );
  }

  public getLogger(): Logger {
    return this.config.getLogger?.() ?? getDefaultLogger();
  }

  public async post<T>(
    path: string,
    data?: Record<string, unknown>,
    params?: QueryParams,
    responseType?: ResponseType
  ): Promise<T> {
    return this.doRequest(HttpMethod.POST, path, data, params, responseType);
  }

  public async get<T>(path: string, params?: QueryParams, responseType?: ResponseType): Promise<T> {
    return this.doRequest(HttpMethod.GET, path, undefined, params, responseType);
  }

  public async patch<T>(
    path: string,
    data: Record<string, unknown>,
    params?: QueryParams,
    responseType?: ResponseType
  ): Promise<T> {
    return this.doRequest(HttpMethod.PATCH, path, data, params, responseType);
  }

  public async put<T>(
    path: string,
    data: Record<string, unknown>,
    params?: QueryParams,
    responseType?: ResponseType
  ): Promise<T> {
    return this.doRequest(HttpMethod.PUT, path, data, params, responseType);
  }

  public async delete<T>(path: string, params?: QueryParams, responseType?: ResponseType): Promise<T> {
    return this.doRequest(HttpMethod.DELETE, path, undefined, params, responseType);
  }

  private async doRequest<T>(
    method: HttpMethod,
    path: string,
    data?: Record<string, unknown>,
    params?: QueryParams,
    responseType?: ResponseType
  ): Promise<T> {
    try {
      const token = await this.authService.getToken();
      const customHeaders = { Authorization: `Bearer ${token}` };
      const result = await this.httpClient.request<T>({
        method,
        url: `${this.baseUrl}/${path}`,
        body: data,
        params,
        customHeaders,
        retries: method === HttpMethod.GET ? MAX_RETRIES : 0,
        responseType,
      });
      return result.body as T;
    } catch (error) {
      handleError(error);
    }
    return undefined as T;
  }
}
