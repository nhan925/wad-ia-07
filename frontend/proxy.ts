import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken');

  // Check if this is a client-side navigation (has referer from same origin)
  const referer = request.headers.get('referer');
  const isClientNavigation = referer && new URL(referer).origin === request.nextUrl.origin;

  // Protected paths that require authentication
  const isProtectedPath = pathname.startsWith('/dashboard');

  // Public paths where authenticated users should be redirected
  const publicPaths = ['/', '/login', '/signup'];
  const isPublicPath = publicPaths.includes(pathname);

  // If user doesn't have refresh token and tries to access protected pages, redirect to login
  if (!refreshToken && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Only redirect to dashboard if:
  // 1. User has refresh token
  // 2. User is on public path (login/signup/home)
  // 3. NOT a client-side navigation (to avoid conflict with router.push)
  if (refreshToken && isPublicPath && !isClientNavigation) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
