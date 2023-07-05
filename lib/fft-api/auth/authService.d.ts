import { HttpClient } from '../../common';
export interface FftAuthConfig {
    authUrl: string;
    refreshUrl: string;
    apiKey: string;
    apiUser: string;
    apiPassword: string;
}
export declare class AuthService {
    private readonly authConfig;
    private readonly httpClient;
    private idToken;
    private refreshToken;
    private expiresAt;
    private readonly apiKey;
    private readonly username;
    private readonly password;
    private readonly authLoginUrl;
    private readonly authRefreshUrl;
    private static readonly EXPIRY_TOLERANCE_MS;
    private readonly logger;
    constructor(authConfig: FftAuthConfig, httpClient: HttpClient);
    getToken(): Promise<string>;
    private calcExpiresAt;
}
