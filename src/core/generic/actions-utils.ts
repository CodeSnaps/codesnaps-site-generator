import verifyCsrfToken from '~/core/verify-csrf-token';
import requireSession from '~/lib/user/require-session';
import getSupabaseServerActionClient from '~/core/supabase/action-client';

/**
 * @name withCsrfCheck
 * @description Verifies the CSRF token
 * Usage:
 * export const action = withCsrfCheck(async (params) => {
 *   //
 * })
 */
export function withCsrfCheck<
  Params extends {
    csrfToken: string;
  },
  Return extends unknown
>(fn: (params: Params) => Return) {
  return async (params: Params) => {
    await verifyCsrfToken(params.csrfToken);

    return fn(params);
  };
}

/**
 * @name withSession
 * @param fn
 * export const action = withSession(async (params) => {
 *   //
 * })
 */
export function withSession<Args extends any[]>(
  fn: (...params: Args) => unknown
) {
  return async (...params: Args) => {
    const client = getSupabaseServerActionClient();

    await requireSession(client);

    return fn(...params);
  };
}
