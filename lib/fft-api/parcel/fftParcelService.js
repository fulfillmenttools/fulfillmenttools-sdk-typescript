"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftParcelService = void 0;
const common_1 = require("../../common");
class FftParcelService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'parcels';
        this.logger = new common_1.CustomLogger();
    }
    async findById(parcelId) {
        try {
            return await this.apiClient.get(`${this.path}/${parcelId}`);
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get parcel with id '${parcelId}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
    async findMultiple(ids) {
        return await Promise.all(ids.map(async (i) => await this.findById(i)));
    }
}
exports.FftParcelService = FftParcelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0UGFyY2VsU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZnQtYXBpL3BhcmNlbC9mZnRQYXJjZWxTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHlDQUE0QztBQUU1QyxNQUFhLGdCQUFnQjtJQUczQixZQUE2QixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBRm5DLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDakIsV0FBTSxHQUE2QixJQUFJLHFCQUFZLEVBQW9CLENBQUM7SUFDbEMsQ0FBQztJQUVqRCxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQWdCO1FBQ3BDLElBQUk7WUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDckU7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sU0FBUyxHQUFHLEdBQW9CLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2YsaUNBQWlDLFFBQVEseUJBQXlCLFNBQVMsQ0FBQyxNQUFNLFlBQ2hGLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakUsRUFBRSxDQUNILENBQUM7WUFFRixNQUFNLEdBQUcsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBYTtRQUNyQyxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztDQUNGO0FBdkJELDRDQXVCQyJ9