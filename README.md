# fulfillmenttools TypeScript SDK

This is a JavaScript/TypeScript SDK (beta) for the [fulfillmenttools REST API](https://docs.fulfillmenttools.com/documentation/developer-docs).

<p align="center">
  <a href="https://fulfillmenttools.com/">
    <img alt="fulfillmenttools logo" src="./.github/images/Github-banner-1240x620.png">
  </a><br />
</p>

[![npm version](https://img.shields.io/npm/v/@fulfillmenttools/fulfillmenttools-sdk-typescript.svg?style=flat)](https://www.npmjs.com/package/@fulfillmenttools/fulfillmenttools-sdk-typescript)
[![Release](https://img.shields.io/github/v/release/fulfillmenttools/fulfillmenttools-sdk-typescript)](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/releases)
[![CI](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/fulfillmenttools/fulfillmenttools-sdk-typescript)](./LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg?color=3178c6)](https://www.typescriptlang.org/)
[![Examples](https://img.shields.io/badge/%F0%9F%92%A1-Examples-ff615b.svg?style=flat-square)](./examples/README.md)

## What is fulfillmenttools?

[fulfillmenttools](https://fulfillmenttools.com) is a next generation order management system that helps retailers and brands to serve their customers faster and more reliably. Its MACH based architecture enables an easy and quick integration.

## Table of contents

- [Get started](#-get-started)
- [Documentation](#-documentation)
- [Development](#-development)
- [License](#-license)
- [Contributing](#-contributing)

## 👉 Get started

The **TypeScript SDK** is fully open source and is available on [GitHub](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript).
The SDK is published as a [npmjs](https://www.npmjs.com/package/@fulfillmenttools/fulfillmenttools-sdk-typescript) and a [yarn](https://yarnpkg.com/package?name=@fulfillmenttools/fulfillmenttools-sdk-typescript) package.
It contains both an ESM and a CommonJS build, so you can use it in the browser and in the backend.
You can install it with the command below:

```bash
npm install @fulfillmenttools/fulfillmenttools-sdk-typescript

// or

yarn add @fulfillmenttools/fulfillmenttools-sdk-typescript
```

Learn how to set up and use the TypeScript SDK with our [tutorial](./TUTORIAL.md) and have a look at some [examples](./examples/README.md).

## 📖 Documentation

The official fulfillmenttools API documentation can be found [here](https://docs.fulfillmenttools.com/documentation/developer-docs), and we also publish our [OpenAPI specification](https://fulfillmenttools.github.io/fulfillmenttools-api-reference-ui/).

> [!NOTE]
> Currently, the SDK is still in _beta_ status. It does not provide access to all of the features of our API but we are continuously extending it and pushing out new versions.
> The releases of this SDK follow the Semantic Versioning convention. However, until we have shipped a first stable 1.0 release, breaking changes can and will occur!
> We hope you will find it easy to use and are looking forward to your feedback.

## 👨‍💻 Development

### 👉 Requirements

- [Node.js](https://nodejs.org/en/) 20 with [nvm](https://github.com/nvm-sh/nvm) and npm

### 🛫 Setup

```bash
nvm use // or use your favorite node version manager
```

### 🤸 Building

```bash
npm install
npm run build
```

### 🕵️ Running unit tests

When running unit tests the `.env.local` file will be used with dummy settings.

```bash
npm run test
```

### 🕵️‍♀️ Linting

```bash
npm run lint
```

## 📜 License

All code in this repository is licensed under the [MIT license](https://github.com/fulfillmenttools/fulfillmenttools-sdk-typescript/blob/master/LICENSE).

## 🙌 Contributing

We'd love to have your helping hand on this ecosystem! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on our guidelines.

## :blue_heart: Thanks

Thanks for all your contributions and efforts towards improving the fulfillmenttools TypeScript SDK. We thank you for being part of our :sparkles: community :sparkles:!
