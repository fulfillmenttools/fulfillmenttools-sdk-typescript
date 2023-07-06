export const SHORT_SHA = process.env.SHORT_SHA || 'undefined';
export const APP_NAME = process.env.npm_package_name || 'fulfillmenttools-sdk-typescript';
export const APP_VERSION = process.env.npm_package_version || '0.0.1';
export const USER_AGENT = `${APP_NAME}/${APP_VERSION} (${SHORT_SHA})`;
export const MAX_RETRIES = 3;
