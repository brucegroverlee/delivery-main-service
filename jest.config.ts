import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/infrastructure/jest/globalSetup.ts',
  globalTeardown: './src/infrastructure/jest/globalTeardown.ts',
  setupFiles: ['./src/infrastructure/jest/setupFiles.ts'],
  setupFilesAfterEnv: ['./src/infrastructure/jest/setupFilesAfterEnv.ts'],
};

export default config;
