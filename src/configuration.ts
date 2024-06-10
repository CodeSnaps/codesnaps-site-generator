import type { Provider } from '@supabase/supabase-js';
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
      'Access a library of React and Tailwind CSS components and an AI site generator. Design and build better websites in minutes. No package installation.',
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
    sites: {
      dashboard: 'sites',
    },
    components: {
      all: 'browse-components',
      saved: 'ui-kit/saved',
    },
    settings: {
      profile: 'settings/profile',
      organization: 'settings/organization',
      subscription: 'settings/subscription',
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
        badge: 'Free Forever',
        features: [
          'Unlimited Sites',
          '50,000 tokens per month',
          'Built in dark mode',
          'Copy and paste code snippets',
          'Save favorite components',
          'Limited selection of components',
          'Invite team members',
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
        name: 'Pro',
        badge: 'Most Popular',
        recommended: true,
        description: 'For individuals and small teams getting started.',
        features: [
          'Unlimited Sites',
          '1,000,000 tokens per month',
          'Built in dark mode',
          'Copy and paste code snippets',
          'Save favorite components',
          'Access to all components',
          'Invite team members',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$15',
            stripePriceId: 'price_1POykYCjllA7kCqFdnimew7k',
            mode: 'subscription',
          },
          {
            name: 'Yearly',
            price: '$139',
            stripePriceId: 'price_1POyl8CjllA7kCqFxXkQjwL1',
            mode: 'subscription',
          },
        ],
      },
      {
        name: 'Business',
        badge: 'Unlimited',
        description: 'For teams and businesses looking to scale.',
        features: [
          'Unlimited Sites',
          'Unlimited tokens',
          'Built in dark mode',
          'Copy and paste code snippets',
          'Save favorite components',
          'Access to all components',
          'Invite team members',
          'Priority support',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$29',
            stripePriceId: 'price_1POym9CjllA7kCqFEoGt7P2t',
            mode: 'subscription',
          },
          {
            name: 'Yearly',
            price: '$249',
            stripePriceId: 'price_1POymUCjllA7kCqFl37o891a',
            mode: 'subscription',
          },
        ],
      },
    ],
  },
  colorPalette: [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ],
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
