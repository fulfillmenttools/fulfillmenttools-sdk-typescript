import { FftApiClient } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import 'dotenv/config';
import { error } from 'node:console';
import { parseArgs, ParseArgsConfig } from 'node:util';

// create a new instance of the API client
const fftApiClient = new FftApiClient(
  process.env.FFT_PROJECT_ID || '',
  process.env.FFT_API_USER || '',
  process.env.FFT_API_PASSWORD || '',
  process.env.FFT_API_KEY || ''
);

// supported command line args
const options: ParseArgsConfig = {
  options: {
    facilityId: {
      type: 'string',
      short: 'f',
    },
    tenantArticleId: {
      type: 'string',
      short: 't',
    },
    count: {
      type: 'string',
      short: 'c',
    },
  },
};

// print an error message and exit
function die(message: string): void {
  error(`ERROR: ${message}`);
  process.exit(1);
}

// get facility id from cmd line args
function getFacilityId(): string {
  const { values } = parseArgs(options);
  if (!values.facilityId) {
    die('Missing required parameter facilityId: --facilityId|-f');
  }
  return values.facilityId as string;
}

// get tenant article id from cmd line args
function getTenantArticleId(): string {
  const { values } = parseArgs(options);
  if (!values.tenantArticleId) {
    die('Missing required parameter tenantArticleId: --tenantArticleId|-t');
  }
  return values.tenantArticleId as string;
}

function getCount(): string {
  const { values } = parseArgs(options);
  if (!values.count) {
    die('Missing required parameter count: --count|-c');
  }
  return values.count as string;
}

// Ex 1: Retrieve all facilities
// import { runExample } from './example01';
// runExample(fftApiClient);

// Ex 2: Retrieve all listings of a facility
// import { runExample } from './example02';
// get required arguments and run example
// const facilityId = getFacilityId();
// runExample(fftApiClient, facilityId);

// Ex 3: Create listings and stocks
// import { runExample } from './example03';
// get required arguments and run example
// const facilityId = getFacilityId();
// const count = getCount();
// runExample(fftApiClient, facilityId, count);

// Ex 4: Create and confirm order promise
// import { runExample } from './example04';
// get required arguments and run example
// const tenantArticleId = getTenantArticleId();
// runExample(fftApiClient, tenantArticleId);
