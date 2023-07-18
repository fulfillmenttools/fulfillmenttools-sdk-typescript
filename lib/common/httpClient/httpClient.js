"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const superagent_1 = __importDefault(require("superagent"));
const constants_1 = require("./constants");
const projectConstants_1 = require("../projectConstants");
const serialize_1 = require("./serialize");
const logging_1 = require("../logging");
class HttpClient {
    async request(config) {
        const request = (0, superagent_1.default)(config.method, config.url)
            .set('Content-Type', 'application/json')
            .set('User-Agent', projectConstants_1.USER_AGENT)
            .timeout(constants_1.HTTP_TIMEOUT_MS)
            .retry(config.retries);
        if (config.customHeaders) {
            request.set(config.customHeaders);
        }
        if (config.params) {
            request.query(config.params);
        }
        if (this.logging) {
            this.logger.debug(`Sending request. Url: ${request.url}, Method: ${request.method}`, [
                {
                    params: config.params,
                    body: config.body,
                },
            ]);
        }
        const response = await request
            .send(config.body)
            .serialize((body) => JSON.stringify(body, serialize_1.serializeWithDatesAsIsoString));
        if (this.logging) {
            this.logger.debug(`Received response. Url: ${request.url}, Method: ${request.method} - Response Status: ${response.statusCode}`, [
                {
                    body: response.body,
                },
            ]);
        }
        return {
            statusCode: response.statusCode,
            body: response.body,
        };
    }
    constructor(logging) {
        this.logger = new logging_1.CustomLogger();
        if (logging === null || logging === undefined) {
            this.logging = false;
        }
        else {
            this.logging = logging;
        }
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vaHR0cENsaWVudC9odHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUFvQztBQUNwQywyQ0FBOEM7QUFDOUMsMERBQWlEO0FBRWpELDJDQUE0RDtBQUU1RCx3Q0FBMEM7QUFFMUMsTUFBYSxVQUFVO0lBR2QsS0FBSyxDQUFDLE9BQU8sQ0FBTyxNQUFnQztRQUN6RCxNQUFNLE9BQU8sR0FBRyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ2xELEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7YUFDdkMsR0FBRyxDQUFDLFlBQVksRUFBRSw2QkFBVSxDQUFDO2FBQzdCLE9BQU8sQ0FBQywyQkFBZSxDQUFDO2FBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekIsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixPQUFPLENBQUMsR0FBRyxhQUFhLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbkY7b0JBQ0UsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7aUJBQ2xCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU87YUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDakIsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSx5Q0FBNkIsQ0FBQyxDQUFDLENBQUM7UUFFNUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLDJCQUEyQixPQUFPLENBQUMsR0FBRyxhQUFhLE9BQU8sQ0FBQyxNQUFNLHVCQUF1QixRQUFRLENBQUMsVUFBVSxFQUFFLEVBQzdHO2dCQUNFO29CQUNFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtpQkFDcEI7YUFDRixDQUNGLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7WUFDL0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFZO1NBQzVCLENBQUM7SUFDSixDQUFDO0lBRUQsWUFBWSxPQUFtQztRQS9DOUIsV0FBTSxHQUF1QixJQUFJLHNCQUFZLEVBQWMsQ0FBQztRQWdEM0UsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztDQUNGO0FBdkRELGdDQXVEQyJ9