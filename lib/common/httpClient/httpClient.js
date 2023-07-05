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
    constructor() {
        this.logger = new logging_1.CustomLogger();
    }
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
        this.logger.debug(`Sending request. Url: ${request.url}, Method: ${request.method}`, [
            {
                params: config.params,
                body: config.body,
            },
        ]);
        const response = await request
            .send(config.body)
            .serialize((body) => JSON.stringify(body, serialize_1.serializeWithDatesAsIsoString));
        this.logger.debug(`Received response. Url: ${request.url}, Method: ${request.method} - Response Status: ${response.statusCode}`, [
            {
                body: response.body,
            },
        ]);
        return {
            statusCode: response.statusCode,
            body: response.body,
        };
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vaHR0cENsaWVudC9odHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUFvQztBQUNwQywyQ0FBOEM7QUFDOUMsMERBQWlEO0FBRWpELDJDQUE0RDtBQUU1RCx3Q0FBMEM7QUFFMUMsTUFBYSxVQUFVO0lBQXZCO1FBQ21CLFdBQU0sR0FBdUIsSUFBSSxzQkFBWSxFQUFjLENBQUM7SUF5Qy9FLENBQUM7SUF4Q1EsS0FBSyxDQUFDLE9BQU8sQ0FBTyxNQUFnQztRQUN6RCxNQUFNLE9BQU8sR0FBRyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ2xELEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7YUFDdkMsR0FBRyxDQUFDLFlBQVksRUFBRSw2QkFBVSxDQUFDO2FBQzdCLE9BQU8sQ0FBQywyQkFBZSxDQUFDO2FBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekIsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLE9BQU8sQ0FBQyxHQUFHLGFBQWEsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25GO2dCQUNFLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtnQkFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPO2FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUseUNBQTZCLENBQUMsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLDJCQUEyQixPQUFPLENBQUMsR0FBRyxhQUFhLE9BQU8sQ0FBQyxNQUFNLHVCQUF1QixRQUFRLENBQUMsVUFBVSxFQUFFLEVBQzdHO1lBQ0U7Z0JBQ0UsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2FBQ3BCO1NBQ0YsQ0FDRixDQUFDO1FBRUYsT0FBTztZQUNMLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtZQUMvQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQVk7U0FDNUIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTFDRCxnQ0EwQ0MifQ==