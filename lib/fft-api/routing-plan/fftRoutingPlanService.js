"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftRoutingPlanService = void 0;
const common_1 = require("../../common");
class FftRoutingPlanService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'routingplans';
        this.logger = new common_1.CustomLogger();
    }
    async getByOrderRef(orderRef) {
        try {
            return await this.apiClient.get(this.path, { orderRef });
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get routing plans for order ref '${orderRef}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
}
exports.FftRoutingPlanService = FftRoutingPlanService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Um91dGluZ1BsYW5TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZmdC1hcGkvcm91dGluZy1wbGFuL2ZmdFJvdXRpbmdQbGFuU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSx5Q0FBNEM7QUFFNUMsTUFBYSxxQkFBcUI7SUFJaEMsWUFBNkIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUhuQyxTQUFJLEdBQUcsY0FBYyxDQUFDO1FBQ3RCLFdBQU0sR0FBa0MsSUFBSSxxQkFBWSxFQUF5QixDQUFDO0lBRTVDLENBQUM7SUFFakQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFnQjtRQUN6QyxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFlLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLFNBQVMsR0FBRyxHQUFvQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLDhDQUE4QyxRQUFRLHlCQUF5QixTQUFTLENBQUMsTUFBTSxZQUM3RixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pFLEVBQUUsQ0FDSCxDQUFDO1lBRUYsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUM7Q0FDRjtBQXBCRCxzREFvQkMifQ==