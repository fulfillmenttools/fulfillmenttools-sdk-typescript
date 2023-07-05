import { AddressParsingError, StreetAndHouseNumber } from './models';

export function parseStreetAndHouseNumber(address: string): StreetAndHouseNumber {
  const regexp = '^([a-zA-ZÄäÖöÜüß\\s\\d.,-]+?)\\s*([\\d\\s]+(?:\\s?[-|+\\/]\\s?\\d+)?\\s*[a-zA-Z]?)?$';
  const addressData = address.match(regexp);
  if (!addressData) {
    throw new Error(`Could not parse address '${address}'`);
  }

  if (addressData.length !== 3 || !addressData[1] || !addressData[2]) {
    throw new AddressParsingError(address);
  }

  return {
    street: addressData[1].toString(),
    houseNumber: addressData[2].toString(),
  };
}
