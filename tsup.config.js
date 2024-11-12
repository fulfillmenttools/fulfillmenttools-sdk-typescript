import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig(() => ({
  sourcemap: env === 'development',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  bundle: true,
  // treeshake: true,
  // watch: env === 'development',
  target: 'es2020',
  entry: ['src/index.ts'],
  outDir: 'lib',
  splitting: false,
  shims: true,
  cjsInterop: true,
  env: {
    APP_NAME: process.env.npm_package_name,
    APP_VERSION: process.env.npm_package_version,
  },
}));
