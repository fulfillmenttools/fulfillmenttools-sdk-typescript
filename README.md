# fulfillmenttools TypeScript SDK

<p align="center">
  <a href="https://fulfillmenttools.com/">
    <img alt="fulfillmenttools logo" src="./.github/images/fft-mach-alliance.svg">
  </a><br />
</p>

[![npm version](https://img.shields.io/npm/v/@fulfillmenttools/fulfillmenttools-sdk-typescript.svg?style=flat)](https://www.npmjs.com/package/@fulfillmenttools/fulfillmenttools-sdk-typescript)
[![Release](https://img.shields.io/github/v/release/fulfillmenttools/fulfillmenttools-sdk-typescript)](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/releases)
[![CI](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/fulfillmenttools/fulfillmenttools-sdk-typescript)](./LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg?color=3178c6)](https://www.typescriptlang.org/)

# 🤖 Introduction

This is a JavaScript/TypeScript SDK for the [fulfillmenttools API](https://fulfillmenttools.github.io/api-reference-ui/).

## 👨‍💻 Development

### 👉 Requirements

- [Node.js](https://nodejs.org/en/) 18 with [NVM](https://github.com/nvm-sh/nvm) and npm

### 🛫 Setup

```bash
$ nvm use
```

### 🤸 Building

```bash
$ npm install
$ npm run build
```

### 🕵️ Running unit tests

When running unit tests the `.env.local` file will be used with dummy settings.

```bash
$ npm run test
```

### 🕵️‍♀️ Linting

```bash
$ npm run lint
```

## 👉 Usage

This software is published on [npmjs.com](https://www.npmjs.com/package/@fulfillmenttools/fulfillmenttools-sdk-typescript).
The package contains both an ESM and a CommonJS build.

Here's a little example how to create a client instance in TypeScript:

```typescript
import { FftApiClient, FftOrderService, OrderForCreation } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';

const fftApiClient = new FftApiClient(
  process.env.FFT_PROJECT_ID || '',
  process.env.FFT_API_USER || '',
  process.env.FFT_API_PASSWORD || '',
  process.env.FFT_API_KEY || ''
);

const fftOrderService = new FftOrderService(fftApiClient);

const fftOrder = {} as OrderForCreation;
await fftOrderService.create(fftOrder);
```

By default, logging is disabled. If you wish to have the HttpClient logging enabled, just add a boolean to your `FftApiClient`:
```typescript
import { FftApiClient, FftOrderService, OrderForCreation } from '@fulfillmenttools/fulfillmenttools-sdk-typescript';

const fftApiClient = new FftApiClient(
  process.env.FFT_PROJECT_ID || '',
  process.env.FFT_API_USER || '',
  process.env.FFT_API_PASSWORD || '',
  process.env.FFT_API_KEY || '',
  process.env.FFT_LOGGING_ENABLED || true
);

const fftOrderService = new FftOrderService(fftApiClient);

const fftOrder = {} as OrderForCreation;
await fftOrderService.create(fftOrder);
```

## 📖 Documentation

The official fulfillmenttools API documentation can be found [here](https://docs.fulfillmenttools.com/api-docs/), and we also publish our [OpenAPI specification](https://fulfillmenttools.github.io/api-reference-ui/).

## 📜 License

All code in this repository is licensed under the [MIT license](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/blob/master/LICENSE).

## 🙌 Contributing

We'd love to have your helping hand on this ecosystem! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on our guidelines.

## :blue_heart: Thanks

Thanks for all your contributions and efforts towards improving the fulfillmenttools TypeScript SDK. We thank you for being part of our :sparkles: community :sparkles:!
