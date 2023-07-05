"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestHttpClient = exports.HttpRequestNotMockedError = void 0;
class HttpRequestNotMockedError extends Error {
}
exports.HttpRequestNotMockedError = HttpRequestNotMockedError;
class TestHttpClient {
    constructor(testController) {
        this.testController = testController;
    }
    async request(config) {
        const request = this.testController.lookupRequest(config);
        if (!request) {
            throw new HttpRequestNotMockedError(`Please mock "${config.method} - ${this.testController.generateCombinedUrl(config)}"`);
        }
        const resolvedHttpRequest = request;
        const resolvedObj = resolvedHttpRequest.resolveTo;
        if (resolvedObj) {
            const httpResult = {
                body: resolvedObj,
                statusCode: resolvedHttpRequest.resolveStatusCode ?? 200 /* HttpStatus.OK */,
            };
            return Promise.resolve(httpResult);
        }
        return Promise.reject(request.rejectsTo);
    }
}
exports.TestHttpClient = TestHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEh0dHBDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2h0dHBDbGllbnQvdGVzdEh0dHBDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBYSx5QkFBMEIsU0FBUSxLQUFLO0NBQUc7QUFBdkQsOERBQXVEO0FBRXZELE1BQWEsY0FBYztJQUN6QixZQUE2QixjQUFxQztRQUFyQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7SUFBRyxDQUFDO0lBRS9ELEtBQUssQ0FBQyxPQUFPLENBQU8sTUFBZ0M7UUFDekQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSx5QkFBeUIsQ0FDakMsZ0JBQWdCLE1BQU0sQ0FBQyxNQUFNLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUN0RixDQUFDO1NBQ0g7UUFFRCxNQUFNLG1CQUFtQixHQUFHLE9BQXdDLENBQUM7UUFFckUsTUFBTSxXQUFXLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQ2xELElBQUksV0FBVyxFQUFFO1lBQ2YsTUFBTSxVQUFVLEdBQXFCO2dCQUNuQyxJQUFJLEVBQUUsV0FBbUI7Z0JBQ3pCLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsMkJBQWlCO2FBQ25FLENBQUM7WUFDRixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUUsT0FBbUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0Y7QUF4QkQsd0NBd0JDIn0=