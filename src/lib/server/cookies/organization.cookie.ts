import readServerCookie, {
  AnyCookies,
} from '~/core/generic/read-server-cookie';

const ORGANIZATION_ID_COOKIE_NAME = 'organizationId';

export function createOrganizationIdCookie(organizationId: string) {
  const secure = process.env.ENVIRONMENT === 'production';

  return {
    name: ORGANIZATION_ID_COOKIE_NAME,
    value: organizationId,
    httpOnly: false,
    secure,
    path: '/',
    sameSite: 'lax' as const,
  };
}

/**
 * @name parseOrganizationIdCookie
 * @description Parse the organization UUID cookie from the request
 * @param cookies
 */
export async function parseOrganizationIdCookie(cookies: AnyCookies) {
  return await readServerCookie(cookies, ORGANIZATION_ID_COOKIE_NAME);
}
