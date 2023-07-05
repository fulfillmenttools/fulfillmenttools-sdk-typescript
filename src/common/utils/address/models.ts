export interface StreetAndHouseNumber {
  street: string;
  houseNumber: string;
}

export class AddressParsingError extends Error {}
