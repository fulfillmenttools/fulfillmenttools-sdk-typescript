import { AuthService } from '../auth';
import { HttpClient, HttpMethod, MAX_RETRIES, QueryParams } from '../../common';

export class FftApiClient {
  private readonly baseUrl: string;
  private readonly authService: AuthService;
  private readonly httpClient: HttpClient;
  constructor(projectId: string, username: string, password: string, apiKey: string, shouldEnableHttpLogging = false) {
    this.baseUrl = `https://${projectId}.api.fulfillmenttools.com/api`;
    this.httpClient = new HttpClient(shouldEnableHttpLogging);
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

  public async post<T>(path: string, data?: Record<string, unknown>, params?: QueryParams): Promise<T> {
    return this.doRequest(HttpMethod.POST, path, data, params);
  }

  public async get<T>(path: string, params?: QueryParams): Promise<T> {
    return this.doRequest(HttpMethod.GET, path, undefined, params);
  }

  public async patch<T>(path: string, data: Record<string, unknown>, params?: QueryParams): Promise<T> {
    return this.doRequest(HttpMethod.PATCH, path, data, params);
  }

  public async delete<T>(path: string, params?: QueryParams): Promise<T> {
    return this.doRequest(HttpMethod.DELETE, path, undefined, params);
  }

  private async doRequest<T>(
    method: HttpMethod,
    path: string,
    data?: Record<string, unknown>,
    params?: QueryParams
  ): Promise<T> {
    const token = await this.authService.getToken();
    const customHeaders = { Authorization: `Bearer ${token}` };
    const result = await this.httpClient.request<T>({
      method,
      url: `${this.baseUrl}/${path}`,
      body: data,
      params,
      customHeaders,
      retries: method === HttpMethod.GET ? MAX_RETRIES : 0,
    });
    return result.body as T;
  }
}
