import { cookies } from 'next/headers';
import { serialize } from 'cookie';

const SIDEBAR_STATE_COOKIE_NAME = 'sidebarState';

export function parseSidebarStateCookie() {
  return cookies().get(SIDEBAR_STATE_COOKIE_NAME)?.value;
}

export async function serializeSidebarCookie(value: string) {
  return serialize(SIDEBAR_STATE_COOKIE_NAME, value, {
    path: '/',
    httpOnly: false,
    secure: process.env.EMULATOR !== `true`,
    sameSite: 'strict' as const,
  });
}
