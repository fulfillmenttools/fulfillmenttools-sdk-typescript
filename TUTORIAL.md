# Get Started

This tutorial will guide you through the first steps to get started with the fulfillmenttools TypeScript SDK.

## Requirements

To follow this tutorial, you will need to:
* have a basic understanding of [TypeScript](https://www.typescriptlang.org/)
* have access to a fulfillmenttools project
* have [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) LTS or later installed
* have a JavaScript package manager such as npm or yarn installed

If you're new to Node.js development, start with one of the many tutorials on the web, e.g. [this one from MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment).

## Objectives

By the end of this guide you will have:
* [Installed the TypeScript SDK](#install-the-typescript-sdk)
* [Created a fulfillmenttools API client](#create-the-client)
* [Learned how to make API calls with the TypeScript SDK](#make-an-api-call)

## Placeholder values

Example code in this guide uses placeholders that should be replaced with the following values.

| Placeholder | Replace with |
| ----------- | ------------ |
| `{projectId}`   | your fulfillmenttools project ID, e.g. `ocff-mytenant-prd` |
| `{apiUser}`     | your API username |
| `{apiPassword}` | your API password |
| `{apiKey}`      | your API key |


## Tutorial

### Set up a Node.js project

First, we need to set up a new Node.js project. Create a new folder `hello-fft` for your project and navigate to it in your terminal:

```bash
mkdir hello-fft
cd hello-fft
```

Next, run the following commands to initialize the project:

```bash
git init
npm init -y
```

Install some development dependencies and initialize TypeScript:

```bash
npm install -D typescript ts-node @types/node
npx tsc --init
```

Finally, open `package.json` and make the following modifications:

```json
{
  "name": "hello-fft",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "dev": "node --env-file=.env --watch -r ts-node/register src/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Fulfillment Expert",
  "license": "ISL",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.5.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  },
  "engines": {
    "node": ">=20.6.0"
  }
}
```

### Install the TypeScript SDK

To install the fulfillmenttools TypeScript SDK, run the following command in your terminal:

```bash
npm install @fulfillmenttools/fulfillmenttools-sdk-typescript
```

This command adds the TypeScript SDK to your project and lists it as a necessary package in `package.json`.

### Add environment variables

You can store your credentials in an `.env` file, but make sure not to check it into your GitHub repository:

```INI
FFT_PROJECT_ID={projectId}
FFT_API_USER={apiUser}
FFT_API_PASSWORD={apiPassword}
FFT_API_KEY={apiKey}
```

### Create the main Node app file

Now that we have everything installed, let's create a simple application.
Create a new file `src/index.ts` and add the following code:

```typescript
function test(): void {
  console.log(process.env.FFT_PROJECT_ID);
}

test();
```

### Project layout

Your `hello-fft` directory should now look like this:

```
.env
.git
node_modules/
package-lock.json
package.json
src/
  index.ts
tsconfig.json
```

### Start the Node server and test live reload

Start the server with `npm run dev` and you’ll see the following output:

```
npm run dev

> hello-fft@1.0.0 dev
> node --env-file=.env --watch -r ts-node/register src/index.ts

ocff-mytenant-prd
```

Make a change to `src/index.ts` or `.env` and the server will automatically restart and show your changes in the console.

### Create the client

To create an fulfillmenttools API client, add the following code to the top of the `src/index.ts` file:

```typescript
import { FftApiClient, FftFacilityService } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';

const fftApiClient = new FftApiClient(
  process.env.FFT_PROJECT_ID || '',
  process.env.FFT_API_USER || '',
  process.env.FFT_API_PASSWORD || '',
  process.env.FFT_API_KEY || ''
);

const fftFacilityService = new FftFacilityService(fftApiClient);
```

### Make an API call

Now you are ready to actually make a call to the fulfillmenttools REST API using your client.
Remove the `test()` function and replace it with the following code:

```typescript
async function getAllFacilities(): Promise<void> {
  console.log(`Getting facilities in ${process.env.FFT_PROJECT_ID}...`);
  const facilitiesResult = await fftFacilityService.get();
  facilitiesResult.facilities?.forEach((facility) => { console.log(facility.name); });
}

void getAllFacilities();
```

The output of the application will now show a list of all facilities in your fulfillmenttools project:

```
Restarting 'src/index.ts'
Getting facilities in ocff-mytenant-prd...
Munich
Hamburg
Cologne
Berlin
```

(_The output will be different depending on your fulfillmenttools project data._)

End the application by pressing Ctrl-C.

## Conclusion

**Congratulations!** You have successfully finished the tutorial.
You are now ready to use the fulfillmenttools TypeScript SDK in your Node.js projects.

You can explore the other functions offered by the SDK, e.g. to create an order using `FftOrderService`, work with pick jobs using `FftPickJobService`, or try out the checkout options using `FftOrderPromisingService`, ...

If you find anything missing or spot anything unusual, please use the [GitHub issues](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/issues) to get in touch. Feel free to reach out to us at [opensource@fulfillmenttools.com](mailto:opensource@fulfillmenttools.com) if you have any questions about the TypeScript SDK or our other open source projects.

Happy coding!
