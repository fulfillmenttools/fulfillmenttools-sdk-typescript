"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftHandoverService = void 0;
const types_1 = require("../types");
var ActionEnum = types_1.ModifyHandoverjobAction.ActionEnum;
const common_1 = require("../../common");
class FftHandoverService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'handoverjobs';
        this.logger = new common_1.CustomLogger();
    }
    async findByPickJobRef(pickJobId) {
        try {
            return await this.apiClient.get(this.path, {
                pickJobRef: pickJobId,
            });
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get handover jobs for pickjob id '${pickJobId}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async findById(handoverJobId) {
        try {
            return await this.apiClient.get(`${this.path}/${handoverJobId}`);
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get handover job with id '${handoverJobId}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async markAsHandedOver(handoverJobId, handoverJobVersion) {
        const patchObject = {
            version: handoverJobVersion,
            actions: [
                {
                    action: ActionEnum.ModifyHandoverjob,
                    status: types_1.HandoverjobStatus.HANDEDOVER,
                },
            ],
        };
        try {
            return await this.apiClient.patch(`${this.path}/${handoverJobId}`, { ...patchObject });
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not mark handover job with id '${handoverJobId}' as delivered. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
}
exports.FftHandoverService = FftHandoverService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0SGFuZG92ZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZmdC1hcGkvaGFuZG92ZXIvZmZ0SGFuZG92ZXJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9DQU1rQjtBQUVsQixJQUFPLFVBQVUsR0FBRywrQkFBdUIsQ0FBQyxVQUFVLENBQUM7QUFFdkQseUNBQTRDO0FBRTVDLE1BQWEsa0JBQWtCO0lBRzdCLFlBQTZCLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFGbkMsU0FBSSxHQUFHLGNBQWMsQ0FBQztRQUN0QixXQUFNLEdBQStCLElBQUkscUJBQVksRUFBc0IsQ0FBQztJQUN0QyxDQUFDO0lBRWpELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUM3QyxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUF1QixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUMvRCxVQUFVLEVBQUUsU0FBUzthQUN0QixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxTQUFTLEdBQUcsR0FBb0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZiwrQ0FBK0MsU0FBUyx5QkFBeUIsU0FBUyxDQUFDLE1BQU0sWUFDL0YsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqRSxFQUFFLENBQ0gsQ0FBQztZQUVGLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFxQjtRQUN6QyxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQy9FO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLFNBQVMsR0FBRyxHQUFvQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLHVDQUF1QyxhQUFhLHlCQUF5QixTQUFTLENBQUMsTUFBTSxZQUMzRixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pFLEVBQUUsQ0FDSCxDQUFDO1lBRUYsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsYUFBcUIsRUFBRSxrQkFBMEI7UUFDN0UsTUFBTSxXQUFXLEdBQTRCO1lBQzNDLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsT0FBTyxFQUFFO2dCQUNQO29CQUNFLE1BQU0sRUFBRSxVQUFVLENBQUMsaUJBQWlCO29CQUNwQyxNQUFNLEVBQUUseUJBQWlCLENBQUMsVUFBVTtpQkFDckM7YUFDRjtTQUNGLENBQUM7UUFFRixJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxhQUFhLEVBQUUsRUFBRSxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNyRztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxTQUFTLEdBQUcsR0FBb0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZix3Q0FBd0MsYUFBYSxzQ0FDbkQsU0FBUyxDQUFDLE1BQ1osWUFBWSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNoRixDQUFDO1lBRUYsTUFBTSxHQUFHLENBQUM7U0FDWDtJQUNILENBQUM7Q0FDRjtBQTdERCxnREE2REMifQ==