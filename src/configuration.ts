import type { Provider } from '@supabase/gotrue-js';
import { StripeCheckoutDisplayMode } from '~/lib/stripe/types';

const production = process.env.NODE_ENV === 'production';

enum Themes {
  Light = 'light',
  Dark = 'dark',
}

const configuration = {
  site: {
    name: 'Build faster, design better in React and Tailwind CSS | CodeSnaps',
    description:
      'Access a library of React and Tailwind CSS components. Design and build better websites in minutes. No package installation required.',
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'CodeSnaps',
    twitterHandle: '',
    githubHandle: 'CodeSnaps',
    convertKitFormId: '',
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  },
  auth: {
    // ensure this is the same as your Supabase project. By default - it's true
    requireEmailConfirmation:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION === 'true',
    // NB: Enable the providers below in the Supabase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      emailOtp: false,
      oAuth: ['google'] as Provider[],
    },
  },
  production,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  theme: Themes.Light,
  features: {
    enableThemeSwitcher: true,
    enableAccountDeletion: getBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ACCOUNT_DELETION,
      false,
    ),
    enableOrganizationDeletion: getBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ORGANIZATION_DELETION,
      false,
    ),
  },
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    signInMfa: '/auth/verify',
    onboarding: `/onboarding`,
    appPrefix: '/dashboard',
    appHome: '/dashboard',
    authCallback: '/auth/callback',
    settings: {
      profile: 'settings/profile',
      authentication: 'settings/profile/authentication',
      email: 'settings/profile/email',
      password: 'settings/profile/password',
    },
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  stripe: {
    embedded: true,
    displayMode: StripeCheckoutDisplayMode.Popup,
    products: [
      {
        name: 'Free',
        description: 'To get started with CodeSnaps and dip your toes in.',
        badge: `30 Components`,
        features: [
          'Built in dark mode',
          'Copy and paste code snippets',
          'Filter and search',
          'Save favorite components',
          'Invite team members',
          'Access to 30 components',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$0',
            stripePriceId: '',
            mode: 'subscription',
          },
          {
            name: 'Yearly',
            price: '$0',
            stripePriceId: '',
            mode: 'subscription',
          },
        ],
      },
      {
        name: 'Lifetime',
        badge: `Limited Time`,
        recommended: true,
        description:
          'First 100 users: Get our lifetime plan at $29 instead of $99.',
        features: [
          'Built in dark mode',
          'Copy and paste code snippets',
          'Filter and search',
          'Save favorite components',
          'Invite team members',
          'Access to all components',
          'New components every week',
          'Lifetime access',
        ],
        plans: [
          {
            name: '',
            price: '$29',
            stripePriceId: 'price_1OH5YRCjllA7kCqFTNo9Ntk7',
            // stripePriceId: 'price_1OH8KICjllA7kCqFdfXSZ64J',
            mode: 'payment',
          },
        ],
      },
      {
        name: 'Pro',
        badge: `Full Access`,
        description: 'To access all components and new components every week.',
        features: [
          'Built in dark mode',
          'Copy and paste code snippets',
          'Filter and search',
          'Save favorite components',
          'Invite team members',
          'Access to all components',
          'New components every week',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$9.99',
            stripePriceId: 'price_1OAAlbCjllA7kCqFrT3uU0p5',
            mode: 'subscription',
          },
          {
            name: 'Yearly',
            price: '$99.99',
            stripePriceId: 'price_1OAAlbCjllA7kCqFXYX2pTOp',
            mode: 'subscription',
          },
        ],
      },
    ],
  },
};

export default configuration;

// Validate Stripe configuration
// as this is a new requirement, we throw an error if the key is not defined
// in the environment
if (
  configuration.stripe.embedded &&
  production &&
  !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
) {
  throw new Error(
    'The key NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Please add it to your environment variables.',
  );
}

function getBoolean(value: unknown, defaultValue: boolean) {
  if (typeof value === 'string') {
    return value === 'true';
  }

  return defaultValue;
}
