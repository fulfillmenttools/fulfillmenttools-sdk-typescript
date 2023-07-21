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
            .serialize((body) => JSON.stringify(body, serialize_1.serializeWithDatesAsIsoString));
        if (this.shouldLogHttpRequestAndResponse) {
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
    constructor(shouldLogHttpRequestAndResponse) {
        this.logger = new logging_1.CustomLogger();
        this.shouldLogHttpRequestAndResponse = shouldLogHttpRequestAndResponse ?? false;
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vaHR0cENsaWVudC9odHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUFvQztBQUNwQywyQ0FBOEM7QUFDOUMsMERBQWlEO0FBRWpELDJDQUE0RDtBQUU1RCx3Q0FBMEM7QUFFMUMsTUFBYSxVQUFVO0lBR2QsS0FBSyxDQUFDLE9BQU8sQ0FBTyxNQUFnQztRQUN6RCxNQUFNLE9BQU8sR0FBRyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ2xELEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7YUFDdkMsR0FBRyxDQUFDLFlBQVksRUFBRSw2QkFBVSxDQUFDO2FBQzdCLE9BQU8sQ0FBQywyQkFBZSxDQUFDO2FBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekIsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxJQUFJLENBQUMsK0JBQStCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLE9BQU8sQ0FBQyxHQUFHLGFBQWEsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNuRjtvQkFDRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07b0JBQ3JCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtpQkFDbEI7YUFDRixDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTzthQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNqQixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHlDQUE2QixDQUFDLENBQUMsQ0FBQztRQUU1RSxJQUFJLElBQUksQ0FBQywrQkFBK0IsRUFBRTtZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZiwyQkFBMkIsT0FBTyxDQUFDLEdBQUcsYUFBYSxPQUFPLENBQUMsTUFBTSx1QkFBdUIsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUM3RztnQkFDRTtvQkFDRSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7aUJBQ3BCO2FBQ0YsQ0FDRixDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1lBQy9CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBWTtTQUM1QixDQUFDO0lBQ0osQ0FBQztJQUVELFlBQVksK0JBQXlDO1FBL0NwQyxXQUFNLEdBQXVCLElBQUksc0JBQVksRUFBYyxDQUFDO1FBZ0QzRSxJQUFJLENBQUMsK0JBQStCLEdBQUcsK0JBQStCLElBQUksS0FBSyxDQUFDO0lBQ2xGLENBQUM7Q0FDRjtBQW5ERCxnQ0FtREMifQ==