import { RefreshTokenResponse, TokenResponse } from './models';
import { FftApiConfig, getDefaultLogger, HttpClient, HttpMethod, Logger, MS_PER_SECOND } from '../../common';

export interface FftAuthConfig {
  authUrl: string;
  refreshUrl: string;
  apiKey: string;
  apiUser: string;
  apiPassword: string;
}

export class AuthService {
  private idToken: string | undefined;
  private refreshToken: string | undefined;
  private expiresAt: Date | undefined;

  private readonly apiKey: string;
  private readonly username: string;
  private readonly password: string;

  private readonly authLoginUrl: string;
  private readonly authRefreshUrl: string;

  private readonly log: Logger;

  private static readonly EXPIRY_TOLERANCE_MS = 5000;

  constructor(
    private readonly authConfig: FftAuthConfig,
    private readonly httpClient: HttpClient,
    private readonly config: FftApiConfig = {}
  ) {
    this.authLoginUrl = this.authConfig.authUrl;
    this.authRefreshUrl = this.authConfig.refreshUrl;
    this.apiKey = this.authConfig.apiKey;
    this.username = this.authConfig.apiUser;
    this.password = this.authConfig.apiPassword;
    this.log = this.config.getLogger?.() ?? getDefaultLogger();

    if (this.config.initializeWithToken) {
      this.getToken();
    }
  }

  public async getToken(): Promise<string> {
    if (!this.idToken || !this.refreshToken || !this.expiresAt) {
      try {
        const tokenResponse = await this.httpClient.request<TokenResponse>({
          method: HttpMethod.POST,
          url: this.authLoginUrl,
          params: { key: this.apiKey },
          body: {
            returnSecureToken: true,
            email: this.username,
            password: this.password,
          },
        });
        this.idToken = tokenResponse.body.idToken;
        this.refreshToken = tokenResponse.body.refreshToken;
        this.expiresAt = this.calcExpiresAt(tokenResponse.body.expiresIn);
      } catch (err) {
        this.log.error(`Could not obtain token for '${this.username}'.`, err);
        throw err;
      }
    } else if (new Date().getTime() > this.expiresAt.getTime() - AuthService.EXPIRY_TOLERANCE_MS) {
      try {
        const refreshTokenResponse = await this.httpClient.request<RefreshTokenResponse>({
          method: HttpMethod.POST,
          url: this.authRefreshUrl,
          params: { key: this.apiKey },
          body: {
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
          },
        });
        this.idToken = refreshTokenResponse.body.id_token;
        this.refreshToken = refreshTokenResponse.body.refresh_token;
        this.expiresAt = this.calcExpiresAt(refreshTokenResponse.body.expires_in);
      } catch (err) {
        this.log.error(`Could not refresh token for '${this.username}'.`, err);
        throw err;
      }
    }

    return this.idToken;
  }

  private calcExpiresAt(expiresIn: string): Date {
    return new Date(new Date().getTime() + parseInt(expiresIn, 10) * MS_PER_SECOND);
  }
}
