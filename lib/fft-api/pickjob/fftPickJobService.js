"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftPickJobService = void 0;
const date_fns_1 = require("date-fns");
const common_1 = require("../../common");
class FftPickJobService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'pickjobs';
        this.logger = new common_1.CustomLogger();
    }
    async getByTenantOrderId(tenantOrderId) {
        try {
            return await this.apiClient.get(this.path, { tenantOrderId });
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get pick jobs with tenant order id '${tenantOrderId}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async abort(pickJobId, version) {
        try {
            return await this.apiClient.patch(`${this.path}/${pickJobId}`, {
                version,
                actions: [
                    {
                        action: 'AbortPickJob',
                    },
                ],
            });
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not abort pick job with id '${pickJobId}' and version ${version}. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async getById(pickJobId) {
        try {
            return await this.apiClient.get(`${this.path}/${pickJobId}`);
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get pick job with id '${pickJobId}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async getOpenPickJobsByFacilityRef(id, startTargetTime, endTargetTime, size) {
        const params = {
            facilityRef: id,
            status: ['OPEN', 'IN_PROGRESS', 'PICKED', 'PACKABLE'].join(','),
            orderBy: 'TARGET_TIME_DESC',
            ...(size && { size: size.toString() }),
            ...(startTargetTime && (0, date_fns_1.isDate)(startTargetTime) && { startTargetTime: startTargetTime.toISOString() }),
            ...(endTargetTime && (0, date_fns_1.isDate)(endTargetTime) && { endTargetTime: endTargetTime.toISOString() }),
        };
        try {
            return await this.apiClient.get(this.path, params);
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get pick jobs for facility '${id}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
}
exports.FftPickJobService = FftPickJobService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0UGlja0pvYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmZ0LWFwaS9waWNram9iL2ZmdFBpY2tKb2JTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFrQztBQUlsQyx5Q0FBeUQ7QUFHekQsTUFBYSxpQkFBaUI7SUFHNUIsWUFBNkIsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUZuQyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ2xCLFdBQU0sR0FBOEIsSUFBSSxxQkFBWSxFQUFxQixDQUFDO0lBQ3BDLENBQUM7SUFFakQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGFBQXFCO1FBQ25ELElBQUk7WUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQW1CLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQ2pGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLFNBQVMsR0FBRyxHQUFvQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLGlEQUFpRCxhQUFhLHlCQUM1RCxTQUFTLENBQUMsTUFDWixZQUFZLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2hGLENBQUM7WUFFRixNQUFNLEdBQUcsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBaUIsRUFBRSxPQUFlO1FBQ25ELElBQUk7WUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUN0RSxPQUFPO2dCQUNQLE9BQU8sRUFBRTtvQkFD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