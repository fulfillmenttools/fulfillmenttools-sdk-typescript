import { ErrorType, FftSdkError } from '../../httpClient';
import { StreetAndHouseNumber } from './models';

export function parseStreetAndHouseNumber(address: string): StreetAndHouseNumber {
  const regexp = '^([a-zA-ZÄäÖöÜüß\\s\\d.,-]+?)\\s*([\\d\\s]+(?:\\s?[-|+\\/]\\s?\\d+)?\\s*[a-zA-Z]?)?$';
  const addressData = address.match(regexp);
  if (!addressData) {
    throw new FftSdkError({ message: `Could not parse address '${address}'`, type: ErrorType.REQUEST });
  }

  if (addressData.length !== 3 || !addressData[1] || !addressData[2]) {
    throw new FftSdkError({ message: `Invalid address '${address}'`, type: ErrorType.REQUEST });
  }

  return {
    street: addressData[1].toString(),
    houseNumber: addressData[2].toString(),
  };
}
