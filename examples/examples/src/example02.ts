import { FftApiClient, FftListingService } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import Table from 'cli-table3';
import { error, log } from 'node:console';

export async function runExample(fftApiClient: FftApiClient, ...args: string[]): Promise<void> {
  if (args.length < 1) {
    error('Missing required parameters');
    return;
  }
  const facilityId = args[0];
  log(`Getting all listings for facility ${facilityId}...`);
  try {
    const fftListingService = new FftListingService(fftApiClient);
    const table = new Table({
      head: ['TenantArticleId', 'Id', 'Version'],
    });
    const pageSize = 50;
    let repeat = false;
    let startAfterId: string | undefined;
    do {
      const listings = await fftListingService.getAll(facilityId, pageSize, startAfterId);
      repeat = false;
      if (listings.listings !== undefined && listings.listings.length > 0) {
        startAfterId = listings.listings?.[listings.listings.length - 1].id;
        for (const listing of listings.listings) {
          table.push([listing.tenantArticleId, listing.id, listing.version]);
        }
        repeat = true;
      }
    } while (repeat);
    log(table.toString());
  } catch (err) {
    error('Something bad happened', err);
  }
}
