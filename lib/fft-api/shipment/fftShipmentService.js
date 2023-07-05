"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftShipmentService = void 0;
const common_1 = require("../../common");
class FftShipmentService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'shipments';
        this.logger = new common_1.CustomLogger();
    }
    async findById(shipmentId) {
        try {
            return await this.apiClient.get(`${this.path}/${shipmentId}`);
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get shipment with id '${shipmentId}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
}
exports.FftShipmentService = FftShipmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0U2hpcG1lbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZmdC1hcGkvc2hpcG1lbnQvZmZ0U2hpcG1lbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHlDQUE0QztBQUU1QyxNQUFhLGtCQUFrQjtJQUc3QixZQUE2QixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBRm5DLFNBQUksR0FBRyxXQUFXLENBQUM7UUFDbkIsV0FBTSxHQUErQixJQUFJLHFCQUFZLEVBQXNCLENBQUM7SUFDdEMsQ0FBQztJQUVqRCxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQWtCO1FBQ3RDLElBQUk7WUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDekU7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sU0FBUyxHQUFHLEdBQW9CLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2YsbUNBQW1DLFVBQVUseUJBQXlCLFNBQVMsQ0FBQyxNQUFNLFlBQ3BGLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakUsRUFBRSxDQUNILENBQUM7WUFFRixNQUFNLEdBQUcsQ0FBQztTQUNYO0lBQ0gsQ0FBQztDQUNGO0FBbkJELGdEQW1CQyJ9