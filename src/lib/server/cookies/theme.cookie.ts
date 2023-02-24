import { cookies } from 'next/headers';
import { serialize } from 'cookie';

const THEME_COOKIE_NAME = 'theme';

export function parseThemeCookie() {
  return cookies().get(THEME_COOKIE_NAME)?.value;
}

export function serializeThemeCookie(value: string) {
  return serialize(THEME_COOKIE_NAME, value, {
    path: '/',
    httpOnly: false,
    secure: process.env.EMULATOR !== `true`,
    sameSite: 'lax' as const,
  });
}
