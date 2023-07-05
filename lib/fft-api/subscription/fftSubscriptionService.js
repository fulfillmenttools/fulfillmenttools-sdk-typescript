"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftSubscriptionService = void 0;
const common_1 = require("../../common");
class FftSubscriptionService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.PATH = 'subscriptions';
        this.logger = new common_1.CustomLogger();
    }
    async getSubscriptions(size = 25) {
        try {
            return await this.apiClient.get(this.PATH, { ...(size && { size: size.toString() }) });
        }
        catch (err) {
            this.logger.error(`Getting FFT Subscriptions failed: ${err}`);
            throw err;
        }
    }
    async createSubscription(subscriptionForCreation) {
        try {
            return await this.apiClient.post(this.PATH, { ...subscriptionForCreation });
        }
        catch (err) {
            this.logger.error(`Creating FFT Subscription '${subscriptionForCreation.name}' failed: ${err}`);
            throw err;
        }
    }
    async deleteSubscription(subscriptionId) {
        try {
            await this.apiClient.delete(`${this.PATH}/${subscriptionId}`);
        }
        catch (err) {
            this.logger.error(`Deleting FFT Subscription '${subscriptionId}' failed: ${err}`);
            throw err;
        }
    }
}
exports.FftSubscriptionService = FftSubscriptionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0U3Vic2NyaXB0aW9uU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZnQtYXBpL3N1YnNjcmlwdGlvbi9mZnRTdWJzY3JpcHRpb25TZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlDQUE0QztBQUc1QyxNQUFhLHNCQUFzQjtJQUtqQyxZQUE2QixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSm5DLFNBQUksR0FBRyxlQUFlLENBQUM7UUFFdkIsV0FBTSxHQUFtQyxJQUFJLHFCQUFZLEVBQTBCLENBQUM7SUFFOUMsQ0FBQztJQUVqRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDckMsSUFBSTtZQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBZ0IsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkc7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzlELE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLHVCQUFnRDtRQUM5RSxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFlLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLHVCQUF1QixFQUFFLENBQUMsQ0FBQztTQUMzRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQThCLHVCQUF1QixDQUFDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2hHLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLGNBQXNCO1FBQ3BELElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsY0FBYyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDbEYsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUM7Q0FDRjtBQWpDRCx3REFpQ0MifQ==