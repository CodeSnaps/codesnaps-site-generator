import { defineConfig } from 'cypress';
import { execSync } from 'child_process';
import { loadEnvConfig } from '@next/env';
import configuration from '~/configuration';

// load environment variables from .env
loadEnvConfig(process.cwd());

export default defineConfig({
  fileServerFolder: '.',
  fixturesFolder: './cypress/fixtures',
  video: false,
  chromeWebSecurity: false,
  port: 4600,
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 60000,
  experimentalInteractiveRunEvents: true,
  retries: {
    runMode: 2,
    openMode: 1,
  },
  env: getEnv(),
  e2e: {
    setupNodeEvents(on, config) {
      const port = 3000;

      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: false,
        screenshotOnRunFailure: !process.env.CI,
      };

      on('task', {
        resetDatabase() {
          return resetDb();
        },
      });

      const env = getEnv();

      return {
        ...config,
        ...configOverrides,
        env,
      };
    },
    defaultCommandTimeout: 10000,
    slowTestThreshold: 5000,
    specPattern: './cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: getExcludeSpecPattern(),
  },
});

function getExcludeSpecPattern() {
  const enableStripeTests = process.env.ENABLE_STRIPE_TESTING === 'true';
  const enableThemeTests = configuration.enableThemeSwitcher;

  const excludePatterns = [];

  if (!enableStripeTests) {
    excludePatterns.push('**/stripe/*');
  }

  if (!enableThemeTests) {
    excludePatterns.push('**/theme.cy.ts');
  }

  return excludePatterns;
}

function resetDb() {
  console.log(`Resetting database...`);

  try {
    execSync('npm run supabase:db:reset');

    console.log(`DB reset successful`);

    return true;
  } catch (error) {
    console.error(`DB reset failed`, error);
  }

  return false;
}

function getEnv() {
  const env = process.env;

  const STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const USER_EMAIL = env.USER_EMAIL;
  const USER_PASSWORD = env.USER_PASSWORD;

  return {
    STRIPE_WEBHOOK_SECRET,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    USER_EMAIL,
    USER_PASSWORD,
  };
}
