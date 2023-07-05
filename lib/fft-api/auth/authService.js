"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("../../common");
class AuthService {
    constructor(authConfig, httpClient) {
        this.authConfig = authConfig;
        this.httpClient = httpClient;
        this.logger = new common_1.CustomLogger();
        this.authLoginUrl = this.authConfig.authUrl;
        this.authRefreshUrl = this.authConfig.refreshUrl;
        this.apiKey = this.authConfig.apiKey;
        this.username = this.authConfig.apiUser;
        this.password = this.authConfig.apiPassword;
    }
    async getToken() {
        // this.log.debug(`Getting token for '${this.username}'`);
        if (!this.idToken || !this.refreshToken || !this.expiresAt) {
            try {
                const tokenResponse = await this.httpClient.request({
                    method: common_1.HttpMethod.POST,
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
            }
            catch (err) {
                this.logger.error(`Could not obtain token for '${this.username}': ${err}`);
                throw err;
            }
        }
        else if (new Date().getTime() > this.expiresAt.getTime() - AuthService.EXPIRY_TOLERANCE_MS) {
            try {
                const refreshTokenResponse = await this.httpClient.request({
                    method: common_1.HttpMethod.POST,
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
            }
            catch (err) {
                this.logger.error(`Could not refresh token for '${this.username}': ${err}`);
                throw err;
            }
        }
        return this.idToken;
    }
    calcExpiresAt(expiresIn) {
        return new Date(new Date().getTime() + parseInt(expiresIn, 10) * common_1.MS_PER_SECOND);
    }
}
exports.AuthService = AuthService;
AuthService.EXPIRY_TOLERANCE_MS = 5000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmZ0LWFwaS9hdXRoL2F1dGhTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUFtRjtBQVduRixNQUFhLFdBQVc7SUFjdEIsWUFBNkIsVUFBeUIsRUFBbUIsVUFBc0I7UUFBbEUsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUFtQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRDlFLFdBQU0sR0FBd0IsSUFBSSxxQkFBWSxFQUFlLENBQUM7UUFFN0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQzlDLENBQUM7SUFFTSxLQUFLLENBQUMsUUFBUTtRQUNuQiwwREFBMEQ7UUFFMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMxRCxJQUFJO2dCQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQWdCO29CQUNqRSxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxJQUFJO29CQUN2QixHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVk7b0JBQ3RCLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM1QixJQUFJLEVBQUU7d0JBQ0osaUJBQWlCLEVBQUUsSUFBSTt3QkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7cUJBQ3hCO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNuRTtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixJQUFJLENBQUMsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLE1BQU0sR0FBRyxDQUFDO2FBQ1g7U0FDRjthQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRTtZQUM1RixJQUFJO2dCQUNGLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBdUI7b0JBQy9FLE1BQU0sRUFBRSxtQkFBVSxDQUFDLElBQUk7b0JBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYztvQkFDeEIsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQzVCLElBQUksRUFBRTt3QkFDSixVQUFVLEVBQUUsZUFBZTt3QkFDM0IsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZO3FCQUNqQztpQkFDRixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0U7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLFFBQVEsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNLEdBQUcsQ0FBQzthQUNYO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVPLGFBQWEsQ0FBQyxTQUFpQjtRQUNyQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxzQkFBYSxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7QUFyRUgsa0NBc0VDO0FBMUR5QiwrQkFBbUIsR0FBRyxJQUFJLENBQUMifQ==