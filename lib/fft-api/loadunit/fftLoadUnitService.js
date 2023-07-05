"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftLoadUnitService = void 0;
const common_1 = require("../../common");
class FftLoadUnitService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.path = 'loadunits';
        this.logger = new common_1.CustomLogger();
    }
    async findByPickJobRef(pickJobRef) {
        try {
            const loadunits = await this.apiClient.get(this.path, { pickJobRef });
            return loadunits.loadUnits || [];
        }
        catch (err) {
            const httpError = err;
            this.logger.error(`Could not get load units for pickjob id '${pickJobRef}'. Failed with status ${httpError.status}, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`);
            throw err;
        }
    }
}
exports.FftLoadUnitService = FftLoadUnitService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0TG9hZFVuaXRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZmdC1hcGkvbG9hZHVuaXQvZmZ0TG9hZFVuaXRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHlDQUE0QztBQUk1QyxNQUFhLGtCQUFrQjtJQUk3QixZQUE2QixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSG5DLFNBQUksR0FBRyxXQUFXLENBQUM7UUFDbkIsV0FBTSxHQUErQixJQUFJLHFCQUFZLEVBQXNCLENBQUM7SUFFdEMsQ0FBQztJQUVqRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBa0I7UUFDOUMsSUFBSTtZQUNGLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDakYsT0FBTyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztTQUNsQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxTQUFTLEdBQUcsR0FBb0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZiw0Q0FBNEMsVUFBVSx5QkFBeUIsU0FBUyxDQUFDLE1BQU0sWUFDN0YsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqRSxFQUFFLENBQ0gsQ0FBQztZQUVGLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDO0NBQ0Y7QUFyQkQsZ0RBcUJDIn0=