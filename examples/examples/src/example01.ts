import { FftApiClient, FftFacilityService } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import Table from 'cli-table3';
import { error, log } from 'node:console';

export async function runExample(fftApiClient: FftApiClient, ..._args: string[]): Promise<void> {
  log(`Getting all facilities...`);
  try {
    const fftFacilityService = new FftFacilityService(fftApiClient);
    const table = new Table({
      head: ['TenantFacilityId', 'Name', 'Id', 'Version'],
    });
    const facilities = await fftFacilityService.get();
    if (facilities.facilities !== undefined && facilities.facilities.length > 0) {
      for (const facility of facilities.facilities) {
        table.push([facility.tenantFacilityId, facility.name, facility.id, facility.version]);
      }
    }
    log(table.toString());
  } catch (err) {
    error('Something bad happened', err);
  }
}
