import { FftApiClient, FftFacilityService } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import Table from 'cli-table3';
import { error, log } from 'node:console';

// Ex 1: Retrieve all facilities
export async function runExample(fftApiClient: FftApiClient, ..._args: string[]): Promise<void> {
  log(`Getting all facilities...`);
  try {
    // create instance of facility service
    const fftFacilityService = new FftFacilityService(fftApiClient);
    const table = new Table({
      head: ['TenantFacilityId', 'Name', 'Id', 'Version'],
    });
    // make API request to fetch all (25) facilities
    const facilities = await fftFacilityService.get();
    // loop over the result
    if (facilities.facilities !== undefined && facilities.facilities.length > 0) {
      for (const facility of facilities.facilities) {
        // do something the facility object
        table.push([facility.tenantFacilityId, facility.name, facility.id, facility.version]);
      }
    }
    log(table.toString());
  } catch (err) {
    error('Something bad happened', err);
  }
}
