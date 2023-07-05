export function runsInProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function tracingEnabled(): boolean {
  return runsInProduction() && process.env.ENABLE_TRACING === 'true';
}
