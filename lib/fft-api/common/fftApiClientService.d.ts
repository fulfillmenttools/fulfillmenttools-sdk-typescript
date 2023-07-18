import { QueryParams } from '../../common';
export declare class FftApiClient {
    private readonly baseUrl;
    private readonly authService;
    private readonly httpClient;
    constructor(projectId: string, username: string, password: string, apiKey: string, logging: boolean | undefined);
    post<T>(path: string, data?: Record<string, unknown>, params?: QueryParams): Promise<T>;
    get<T>(path: string, params?: QueryParams): Promise<T>;
    patch<T>(path: string, data: Record<string, unknown>, params?: QueryParams): Promise<T>;
    delete<T>(path: string, params?: QueryParams): Promise<T>;
    private doRequest;
}
