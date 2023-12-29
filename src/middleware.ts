import { NextRequest, NextResponse } from 'next/server';
import csrf from 'edge-csrf';

import HttpStatusCode from '~/core/generic/http-status-code.enum';
import configuration from '~/configuration';
import createMiddlewareClient from '~/core/supabase/middleware-client';
import GlobalRole from '~/core/session/types/global-role';

const CSRF_TOKEN_HEADER = 'X-CSRF-Token';
const CSRF_SECRET_COOKIE = 'csrfSecret';
const NEXT_ACTION_HEADER = 'next-action';
const NEXT_ACTION_REDIRECT_HEADER = 'x-action-redirect';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)',
  ],
};

const csrfMiddleware = csrf({
  cookie: {
    secure: configuration.production,
    name: CSRF_SECRET_COOKIE,
  },
});

export async function middleware(request: NextRequest) {
  const csrfResponse = await withCsrfMiddleware(request);
  const sessionResponse = await sessionMiddleware(request, csrfResponse);

  return await adminMiddleware(request, sessionResponse);
}

async function sessionMiddleware(req: NextRequest, res: NextResponse) {
  const supabase = createMiddlewareClient(req, res);

  await supabase.auth.getSession();

  return res;
}

async function withCsrfMiddleware(request: NextRequest) {
  const csrfResponse = NextResponse.next();

  // CSRF checks for Server Actions is built-in
  if (isServerAction(request)) {
    return csrfResponse;
  }

  const csrfError = await csrfMiddleware(request, csrfResponse);

  if (csrfError) {
    return NextResponse.json('Invalid CSRF token', {
      status: HttpStatusCode.Forbidden,
    });
  }

  const token = csrfResponse.headers.get(CSRF_TOKEN_HEADER);

  if (token) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(CSRF_TOKEN_HEADER, token);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    const nextCsrfSecret =
      csrfResponse.cookies.get(CSRF_SECRET_COOKIE)?.value ?? '';

    if (nextCsrfSecret) {
      response.cookies.set(CSRF_SECRET_COOKIE, nextCsrfSecret, {
        secure: configuration.production,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
      });
    }

    return response;
  }

  return csrfResponse;
}

/**
 * Check if the request is a Server Action
 * Also check if the request is not a redirect from a Server Action
 * @param request
 */
function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);

  return (
    headers.has(NEXT_ACTION_HEADER) && !headers.has(NEXT_ACTION_REDIRECT_HEADER)
  );
}

async function adminMiddleware(request: NextRequest, response: NextResponse) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (!isAdminPath) {
    return response;
  }

  const supabase = createMiddlewareClient(request, response);
  const user = await supabase.auth.getUser();

  // If user is not logged in, redirect to sign in page.
  // This should never happen, but just in case.
  if (!user) {
    return NextResponse.redirect(configuration.paths.signIn);
  }

  const role = user.data.user?.app_metadata['role'];

  // If user is not an admin, redirect to 404 page.
  if (!role || role !== GlobalRole.SuperAdmin) {
    return NextResponse.redirect(`${configuration.site.siteUrl}/404`);
  }

  // in all other cases, return the response
  return response;
}
