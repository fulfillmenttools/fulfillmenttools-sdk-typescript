"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockFftAuthGetRefreshTokenCall = exports.mockFftAuthGetTokenCall = void 0;
const common_1 = require("../../../common");
function mockFftAuthGetTokenCall(testHttpClientController) {
    testHttpClientController.expectAlways({
        url: 'fft-auth-url',
        params: {
            key: 'fft-api-key',
        },
        method: common_1.HttpMethod.POST,
        resolveTo: {
            idToken: 'foo',
            refreshToken: 'bar',
            expiresIn: '55',
        },
    });
}
exports.mockFftAuthGetTokenCall = mockFftAuthGetTokenCall;
function mockFftAuthGetRefreshTokenCall(testHttpClientController) {
    testHttpClientController.expectAlways({
        url: 'fft-refresh-auth-url',
        params: {
            key: 'fft-api-key',
        },
        method: common_1.HttpMethod.POST,
        resolveTo: {
            idToken: 'foo',
            refreshToken: 'bar',
            expiresIn: '55',
        },
    });
}
exports.mockFftAuthGetRefreshTokenCall = mockFftAuthGetRefreshTokenCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aEZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mZnQtYXBpL2F1dGgvdGVzdC9hdXRoRnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUFvRTtBQUVwRSxTQUFnQix1QkFBdUIsQ0FBQyx3QkFBK0M7SUFDckYsd0JBQXdCLENBQUMsWUFBWSxDQUFDO1FBQ3BDLEdBQUcsRUFBRSxjQUFjO1FBQ25CLE1BQU0sRUFBRTtZQUNOLEdBQUcsRUFBRSxhQUFhO1NBQ25CO1FBQ0QsTUFBTSxFQUFFLG1CQUFVLENBQUMsSUFBSTtRQUN2QixTQUFTLEVBQUU7WUFDVCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWJELDBEQWFDO0FBRUQsU0FBZ0IsOEJBQThCLENBQUMsd0JBQStDO0lBQzVGLHdCQUF3QixDQUFDLFlBQVksQ0FBQztRQUNwQyxHQUFHLEVBQUUsc0JBQXNCO1FBQzNCLE1BQU0sRUFBRTtZQUNOLEdBQUcsRUFBRSxhQUFhO1NBQ25CO1FBQ0QsTUFBTSxFQUFFLG1CQUFVLENBQUMsSUFBSTtRQUN2QixTQUFTLEVBQUU7WUFDVCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWJELHdFQWFDIn0=