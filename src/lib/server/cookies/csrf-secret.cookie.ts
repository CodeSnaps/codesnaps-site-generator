import { serialize } from 'cookie';
import { decrypt, encrypt } from '~/core/generic/crypto';
import getLogger from '~/core/logger';

import readServerCookie, {
  AnyCookies,
} from '~/core/generic/read-server-cookie';

const CSRF_SECRET_COOKIE_NAME = 'csrfSecret';

export function serializeCsrfSecretCookie(csrfSecret: string) {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    getLogger().warn(
      `Please set your "SECRET_KEY" environment variable to sign your cookies`
    );
  }

  const value = secret ? encrypt(csrfSecret, secret) : csrfSecret;

  return serialize(CSRF_SECRET_COOKIE_NAME, value, {
    path: '/',
    httpOnly: true,
    secure: process.env.EMULATOR !== `true`,
    sameSite: 'strict' as const,
  });
}

export async function parseCsrfSecretCookie(cookies: AnyCookies) {
  const secret = process.env.SECRET_KEY;
  const csrfSecret = await readServerCookie(cookies, CSRF_SECRET_COOKIE_NAME);

  if (!csrfSecret) {
    return;
  }

  return secret ? decrypt(csrfSecret, secret) : csrfSecret;
}

export async function deleteCsrfSecretCookie() {}
