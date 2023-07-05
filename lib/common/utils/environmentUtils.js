"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracingEnabled = exports.runsInProduction = void 0;
function runsInProduction() {
    return process.env.NODE_ENV === 'production';
}
exports.runsInProduction = runsInProduction;
function tracingEnabled() {
    return runsInProduction() && process.env.ENABLE_TRACING === 'true';
}
exports.tracingEnabled = tracingEnabled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnRVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvZW52aXJvbm1lbnRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixnQkFBZ0I7SUFDOUIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUM7QUFDL0MsQ0FBQztBQUZELDRDQUVDO0FBRUQsU0FBZ0IsY0FBYztJQUM1QixPQUFPLGdCQUFnQixFQUFFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEtBQUssTUFBTSxDQUFDO0FBQ3JFLENBQUM7QUFGRCx3Q0FFQyJ9