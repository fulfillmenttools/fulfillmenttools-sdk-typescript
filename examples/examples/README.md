# Included Examples

Here are some examples that show how to use the `FftApiClient` in your TypeScript application to make REST calls to the fulfillmenttools API.

## Requirements

To follow this tutorial, you will need to:
* have [access](https://docs.fulfillmenttools.com/api-docs/getting-started/setup-your-access-to-fulfillmenttools) to a fulfillmenttools project
* have a basic understanding of [TypeScript](https://www.typescriptlang.org/)
* have [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and npm installed

## How to run

You can use [this little TypeScript app](./src/index.ts) to run the examples against your fulfillmenttools tenant.

The basic steps that you need to do are:

1. Clone this repository

2. Open a terminal session and navigate to the `examples/examples` folder

3. Install the required packages and build the app

```bash
npm install
npm run build
```

4. Create a `.env` file with the credentials of your fulfillmenttools tenant:

```properties
FFT_API_KEY=<your-api-key>
FFT_API_USER=<your-api-user>
FFT_API_PASSWORD=<your-api-password>
FFT_PROJECT_ID=<ocff-your-fft-tenant>
```

Use the [env.sample](./env.sample) file as a template for your own settings.
Do not check in actual credentials into this repository!

5. Run the example app

```bash
npm run example
```

6. The output of the example will be displayed on the console

```
Getting all facilities...
┌──────────────────┬───────────────────────────────────┬──────────────────────────────────────┬─────────┐
│ TenantFacilityId │ Name                              │ Id                                   │ Version │
├──────────────────┼───────────────────────────────────┼──────────────────────────────────────┼─────────┤
│ STORE-001        │ Store Cologne                     │ 990e84f3-fbcd-4f4e-b369-6351c35a751d │ 4       │
├──────────────────┼───────────────────────────────────┼──────────────────────────────────────┼─────────┤
│ STORE-002        │ Store Munich                      │ bdf50a15-c9a3-4b9d-b7ab-46c25ffbb68b │ 3       │
├──────────────────┼───────────────────────────────────┼──────────────────────────────────────┼─────────┤
...
````

5. If you need to pass command line arguments to the app you can do it like this

```bash
npm run example -- -f 977fac55-5bb7-42ac-87b7-68379943b8e7
```

## How it works

See the [index.ts](./src/index.ts) file for the complete example.

1. Create an instance of the `FftApiClient` like this:
```typescript
import { FftApiClient } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';

const fftApiClient = new FftApiClient(
  process.env.FFT_PROJECT_ID || '',
  process.env.FFT_API_USER || '',
  process.env.FFT_API_PASSWORD || '',
  process.env.FFT_API_KEY || ''
);
```

2. Import the example you want to use/run

```typescript
import { runExample } from './example01';
```

3. Use the provided utility functions like `getFacilityId()`, `getTenantArticleId()`, ... to obtain the
required parameters from the command line arguments.

```typescript
const facilityId = getFacilityId();
```

4. Run the example
```typescript
runExample(fftApiClient, facilityId);
```

## Included examples

Have a look at the included examples:

* [01 - Retrieve all facilities](./example01.md)
* [02 - Retrieve all listings of a facility](./example02.md)
* [03 - Create listings and stocks](./example03.md)
* [04 - Create and confirm an order promise](./example04.md)
* [05 - Retrieve process and related entities](./example05.md)
