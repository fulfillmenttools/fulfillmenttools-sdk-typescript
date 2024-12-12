## Example 05 - Retrieve process and related entities

This example shows how to lookup the process which acts as the link between entities in the fulfillmenttools platform.
Every order, pick job, handover job etc. references to one process and every process keeps the ids of his entities.
Furthermore, the process houses the different status of the different domains, modules and entities.

## How to call the example from the runner

```typescript
import { runExample } from './example05';
const tenantOrderId = getTenantOrderId();
runExample(fftApiClient, tenantOrderId);
```

## How it works

```typescript
try {
  // create instance of services
  const fftProcessService = new FftProcessService(fftApiClient);
  const fftPickJobService = new FftPickJobService(fftApiClient);

  // look up the process
  const process = await fftProcessService.getById(tenantOrderId);

  log(
    `Process ${process.id} status=${process.status}, operativeStatus=${process.operativeStatus}, domsStatus=${process.domsStatus}`
  );

  // look up referenced pick jobs
  if (process.pickJobRefs && process.pickJobRefs.length > 0) {
    const pickJobs = await Promise.all(process.pickJobRefs.map(async (id) => await fftPickJobService.getById(id)));
    for (const pickJob of pickJobs) {
      log(`PickJob ${pickJob.id} status=${pickJob.status}`);
      // do something with the pick job
    }
  }
}
```

See the [example05.ts](./src/example05.ts) file ...

## Reference

This example is using the `GET /api/processes` and `GET /api/processes/{processId}` endpoints. 
See the OpenAPI specification for [processes](https://fulfillmenttools.github.io/fulfillmenttools-api-reference-ui/#get-/api/processes) for details.
