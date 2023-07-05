"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftOrderService = void 0;
const common_1 = require("../../common");
class FftOrderService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'orders';
        this.logger = new common_1.CustomLogger();
    }
    async create(orderForCreation) {
        try {
            const order = await this.apiClient.post('orders', { ...orderForCreation });
            this.logger.info(`Successfully posted order with tenantOrderId '${orderForCreation.tenantOrderId}' and order id '${order.id}'`);
            return order;
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`FFT Order POST with for tenantOrderId '${orderForCreation.tenantOrderId}' failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async cancel(orderId) {
        try {
            const order = await this.apiClient.post(`orders/${orderId}/cancel`);
            this.logger.info(`Successfully canceled order with order id '${orderId}'`);
            return order;
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`FFT cancel order for id '${orderId}' failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async findBy(orderRef) {
        return this.apiClient.get(`${this.path}/${orderRef}`);
    }
    async findByTenantOrderId(tenantOrderId) {
        const strippedOrders = await this.apiClient.get(this.path, {
            tenantOrderId,
        });
        const length = strippedOrders.orders?.length || 0;
        const firstOrder = strippedOrders.orders?.[0];
        if (!firstOrder) {
            this.logger.info(`Did not find order with tenantOrderId '${tenantOrderId}'`);
            return undefined;
        }
        if (length === 1) {
            return firstOrder;
        }
        this.logger.warn(`Did not find exactly 1 order with tenantOrderId '${tenantOrderId}' but ${length}, returning first one with id '${firstOrder.id}'`);
        return firstOrder;
    }
}
exports.FftOrderService = FftOrderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0T3JkZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZmdC1hcGkvb3JkZXIvZmZ0T3JkZXJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHlDQUE0QztBQUU1QyxNQUFhLGVBQWU7SUFHMUIsWUFBNkIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUZuQyxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFdBQU0sR0FBNEIsSUFBSSxxQkFBWSxFQUFtQixDQUFDO0lBQ2hDLENBQUM7SUFFakQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBa0M7UUFDcEQsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQVEsUUFBUSxFQUFFLEVBQUUsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsaURBQWlELGdCQUFnQixDQUFDLGFBQWEsbUJBQW1CLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FDOUcsQ0FBQztZQUVGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sU0FBUyxHQUFHLEdBQW9CLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2YsMENBQTBDLGdCQUFnQixDQUFDLGFBQWEsd0JBQ3RFLFNBQVMsQ0FBQyxNQUNaLFlBQVksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDaEYsQ0FBQztZQUVGLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFlO1FBQ2pDLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFRLFVBQVUsT0FBTyxTQUFTLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUUzRSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLFNBQVMsR0FBRyxHQUFvQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLDRCQUE0QixPQUFPLHdCQUF3QixTQUFTLENBQUMsTUFBTSxZQUN6RSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pFLEVBQUUsQ0FDSCxDQUFDO1lBRUYsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQWdCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxhQUFxQjtRQUNwRCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFpQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3pFLGFBQWE7U0FDZCxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUM3RSxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQixPQUFPLFVBQVUsQ0FBQztTQUNuQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLG9EQUFvRCxhQUFhLFNBQVMsTUFBTSxrQ0FBa0MsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUNuSSxDQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBbkVELDBDQW1FQyJ9