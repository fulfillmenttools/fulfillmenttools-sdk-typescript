## Example 02 - Retrieve listings of a facility

This example shows how to retrieve all listings of a given facility.

## How to call the example from the runner

Include the following code snippet into the example runner:

```typescript
import { runExample } from './example02';
const facilityId = getFacilityId();
void runExample(fftApiClient, facilityId);
```

## How it works

This example shows how to paginate through a large number of entities using the `pageSize` and `startAfterId` parameters.

```typescript
try {
  // create instance of listing service
  const fftListingService = new FftListingService(fftApiClient);

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
}
```

The [example02.ts](./src/example02.ts) file shows how to fetch all listings of a facility.


## Reference

This example is using the `GET /api/facilities/{facilityId}/listings` endpoint. See the [OpenAPI specification](https://fulfillmenttools.github.io/fulfillmenttools-api-reference-ui/#get-/api/facilities/-facilityId-/listings) for details.
