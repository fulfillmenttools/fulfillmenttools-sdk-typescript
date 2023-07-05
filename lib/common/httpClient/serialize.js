"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeWithDatesAsIsoString = void 0;
const types_1 = require("util/types");
function serializeWithDatesAsIsoString(key, value) {
    return (0, types_1.isDate)(value) ? value.toISOString() : value;
}
exports.serializeWithDatesAsIsoString = serializeWithDatesAsIsoString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9odHRwQ2xpZW50L3NlcmlhbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0M7QUFFcEMsU0FBZ0IsNkJBQTZCLENBQUMsR0FBVyxFQUFFLEtBQWM7SUFDdkUsT0FBTyxJQUFBLGNBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDckQsQ0FBQztBQUZELHNFQUVDIn0=