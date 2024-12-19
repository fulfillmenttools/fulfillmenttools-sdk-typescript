import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/dist/',
      '**/lib/',
      '**/.nvmrc',
      '**/examples/',
      'src/fft-api/types/typescript-fetch-client/',
      'babel.config.js',
      'jest.config.cjs',
      'jest.setup.cjs',
      'eslint.config.mjs',
      'tsup.config.js',
    ],
  },
  prettierConfig,
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...jestPlugin.configs['flat/recommended'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'commonjs',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: globals.__dirname,
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'error',
      'no-undef': 'error',
      'no-const-assign': 'error',
    },
  }
);
