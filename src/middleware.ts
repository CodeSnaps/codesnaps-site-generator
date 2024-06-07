import { NextRequest, NextResponse } from 'next/server';
import csrf from 'edge-csrf';

import HttpStatusCode from '~/core/generic/http-status-code.enum';
import configuration from '~/configuration';
import createMiddlewareClient from '~/core/supabase/middleware-client';
import GlobalRole from '~/core/session/types/global-role';

const CSRF_SECRET_COOKIE = 'csrfSecret';
const NEXT_ACTION_HEADER = 'next-action';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)',
  ],
};

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next();
    response = await withCsrfMiddleware(request, response);
    response = await sessionMiddleware(request, response);
    response = await adminMiddleware(request, response);
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}

async function sessionMiddleware(req: NextRequest, res: NextResponse) {
  try {
    const supabase = createMiddlewareClient(req, res);
    await supabase.auth.getSession();
    return res;
  } catch (error) {
    console.error('Session middleware error:', error);
    return NextResponse.json(
      { message: 'Session Error' },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}

async function withCsrfMiddleware(
  request: NextRequest,
  response = new NextResponse(),
) {
  try {
    const csrfMiddleware = csrf({
      cookie: {
        secure: configuration.production,
        name: CSRF_SECRET_COOKIE,
      },
      ignoreMethods: isServerAction(request)
        ? ['POST']
        : ['GET', 'HEAD', 'OPTIONS'],
    });

    const csrfError = await csrfMiddleware(request, response);

    if (csrfError) {
      console.error('CSRF middleware error:', csrfError);
      return NextResponse.json('Invalid CSRF token', {
        status: HttpStatusCode.Forbidden,
      });
    }

    return response;
  } catch (error) {
    console.error('CSRF middleware error:', error);
    return NextResponse.json(
      { message: 'CSRF Error' },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}

function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);
  return headers.has(NEXT_ACTION_HEADER);
}

async function adminMiddleware(request: NextRequest, response: NextResponse) {
  try {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

    if (!isAdminPath) {
      return response;
    }

    const supabase = createMiddlewareClient(request, response);
    const { data, error } = await supabase.auth.getUser();
    const origin = request.nextUrl.origin;

    if (!data.user || error) {
      return NextResponse.redirect(`${origin}/auth/sign-in`);
    }

    const role = data.user?.app_metadata['role'];

    if (!role || role !== GlobalRole.SuperAdmin) {
      return NextResponse.redirect(`${origin}/404`);
    }

    return response;
  } catch (error) {
    console.error('Admin middleware error:', error);
    return NextResponse.json(
      { message: 'Admin Middleware Error' },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}
