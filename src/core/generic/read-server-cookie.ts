import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

export type AnyCookies =
  | RequestCookies
  | Partial<{
      key: string;
    }>
  | ReadonlyRequestCookies;

async function readServerCookie(cookies: AnyCookies, key: string) {
  if ('get' in cookies && typeof cookies.get === 'function') {
    return cookies.get(key)?.value;
  }

  return (cookies as StringObject)[key];
}

export default readServerCookie;
