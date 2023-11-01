import { combineChunks, CookieOptions, createChunks } from '@supabase/ssr';

const CODE_VERIFIER_COOKIE_SUFFIX = '-code-verifier';

/**
 * Retrieves a Supabase cookie adapter with methods to set, get, and remove cookies.
 * This functions ensures that cookies are chunked if they exceed the maximum cookie size.
 *
 * @param {Object} params - The parameters object.
 * @param {function} params.set - The function to set a cookie.
 * @param {function} params.remove - The function to remove a cookie.
 * @param {function} params.get - The function to retrieve a cookie.
 */
export default function getSupabaseCookieAdapter(params: {
  set: (key: string, value: string, options?: CookieOptions) => void;
  remove: (key: string, options?: CookieOptions) => void;
  get: (key: string) => string | undefined;
}) {
  const set = (key: string, value: string, options: CookieOptions) => {
    if (key.endsWith(CODE_VERIFIER_COOKIE_SUFFIX)) {
      params.set(key, value, options);

      return;
    }

    const sessionChunks = createChunks(key, JSON.stringify(value), 2000);

    sessionChunks.forEach((chunk) => {
      params.set(chunk.name, chunk.value);
    });
  };

  const get = (key: string) => {
    const value = params.get(key);

    if (key.endsWith(CODE_VERIFIER_COOKIE_SUFFIX) && value) {
      return value;
    }

    if (value) {
      return JSON.parse(value);
    }

    const chunks = combineChunks(key, (chunkName) => {
      return params.get(chunkName);
    });

    return chunks !== null ? JSON.parse(chunks) : null;
  };

  function deleteChunkedCookies(key: string, from = 0, options: CookieOptions) {
    for (let i = from; ; i++) {
      const cookieName = `${key}.${i}`;
      const value = params.get(cookieName);

      if (value === undefined) {
        break;
      }

      params.remove(cookieName, options);
    }
  }

  function deleteSingleCookie(key: string, options: CookieOptions) {
    if (params.get(key)) {
      params.remove(key, options);
    }
  }

  const remove = (key: string, options: CookieOptions) => {
    deleteSingleCookie(key, options);
    deleteChunkedCookies(key, 0, options);
  };

  return {
    get,
    set,
    remove,
  };
}
