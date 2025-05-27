## Example 01 - Retrieve all facilities

This example shows how to retrieve all facilities.

## How to call the example from the runner

Include the following code snippet into the example runner:

```typescript
import { runExample } from './example01';
void runExample(fftApiClient);
```

## How it works

```typescript
try {
  // create instance of facility service
  const fftFacilityService = new FftFacilityService(fftApiClient);
  // make API request to fetch all (25) facilities
  const facilities = await fftFacilityService.get();

  // loop over the result
  if (facilities.facilities !== undefined && facilities.facilities.length > 0) {
    for (const facility of facilities.facilities) {
      // do something the facility object
    }
  }
} catch (err) {
  // error handling
}
```

See the [example01.ts](./src/example01.ts) file for the full example that shows how to fetch all facilities.

## Reference

This example is using the `GET /api/facilities` endpoint. See the [OpenAPI specification](https://fulfillmenttools.github.io/fulfillmenttools-api-reference-ui/#get-/api/facilities) for details.
