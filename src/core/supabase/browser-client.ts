import {
  CookieOptions,
  createBrowserClient,
  DEFAULT_COOKIE_OPTIONS,
  parse,
  serialize,
} from '@supabase/ssr';

import invariant from 'tiny-invariant';
import type { Database } from '~/database.types';
import getSupabaseCookieAdapter from './supabase-cookie-adapter';
import isBrowser from '~/core/generic/is-browser';

/**
 * @name getSupabaseBrowserClient
 * @description Get a Supabase client for use in the Browser
 */
function getSupabaseBrowserClient() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  invariant(SUPABASE_URL, `Supabase URL was not provided`);
  invariant(SUPABASE_ANON_KEY, `Supabase Anon key was not provided`);

  const cookies = getCookiesStrategy();

  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies,
    isSingleton: true,
  });
}

export default getSupabaseBrowserClient;

function getCookiesStrategy() {
  if (!isBrowser()) {
    return {};
  }

  const opts = { ...DEFAULT_COOKIE_OPTIONS };

  return getSupabaseCookieAdapter({
    set: (key: string, value: string, cookieOptions: CookieOptions) => {
      document.cookie = serialize(key, value, {
        ...opts,
        ...cookieOptions,
        maxAge: opts.maxAge,
      });
    },
    get: (key: string) => parse(document.cookie)[key],
    remove: (key: string, cookieOptions: CookieOptions) => {
      document.cookie = serialize(key, '', {
        ...opts,
        ...cookieOptions,
        maxAge: 0,
      });
    },
  });
}
