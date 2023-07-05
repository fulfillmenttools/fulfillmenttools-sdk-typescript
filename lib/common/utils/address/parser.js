"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStreetAndHouseNumber = void 0;
const models_1 = require("./models");
function parseStreetAndHouseNumber(address) {
    const regexp = '^([a-zA-ZÄäÖöÜüß\\s\\d.,-]+?)\\s*([\\d\\s]+(?:\\s?[-|+\\/]\\s?\\d+)?\\s*[a-zA-Z]?)?$';
    const addressData = address.match(regexp);
    if (!addressData) {
        throw new Error(`Could not parse address '${address}'`);
    }
    if (addressData.length !== 3 || !addressData[1] || !addressData[2]) {
        throw new models_1.AddressParsingError(address);
    }
    return {
        street: addressData[1].toString(),
        houseNumber: addressData[2].toString(),
    };
}
exports.parseStreetAndHouseNumber = parseStreetAndHouseNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbW1vbi91dGlscy9hZGRyZXNzL3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUU7QUFFckUsU0FBZ0IseUJBQXlCLENBQUMsT0FBZTtJQUN2RCxNQUFNLE1BQU0sR0FBRyxzRkFBc0YsQ0FBQztJQUN0RyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsT0FBTyxHQUFHLENBQUMsQ0FBQztLQUN6RDtJQUVELElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEUsTUFBTSxJQUFJLDRCQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsT0FBTztRQUNMLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQ2pDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0tBQ3ZDLENBQUM7QUFDSixDQUFDO0FBZkQsOERBZUMifQ==