import { FftApiClient, FftListingService } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import Table from 'cli-table3';
import { error, log } from 'node:console';

// Ex 2: Retrieve all listings of a facility
export async function runExample(fftApiClient: FftApiClient, ...args: string[]): Promise<void> {
  if (args.length < 1) {
    error('Missing required parameters');
    return;
  }
  const facilityId = args[0];
  log(`Getting all listings for facility ${facilityId}...`);
  try {
    // create instance of listing service
    const fftListingService = new FftListingService(fftApiClient);
    const table = new Table({
      head: ['TenantArticleId', 'Id', 'Version'],
    });
    const pageSize = 50;
    let repeat = false;
    let startAfterId: string | undefined;
    do {
      // make API request to fetch listings for given facility
      const listings = await fftListingService.getAll(facilityId, pageSize, startAfterId);
      repeat = listings.listings !== undefined && listings.listings.length > 0;
      if (repeat) {
        startAfterId = listings.listings?.[listings.listings.length - 1].id;
        listings.listings?.map((listing) => {
          // do something the listing object
          table.push([listing.tenantArticleId, listing.id, listing.version]);
        });
      }
    } while (repeat);
    log(table.toString());
  } catch (err) {
    error('Something bad happened', err);
  }
}
