import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken');

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup'];
  const isPublicPath = publicPaths.includes(pathname);

  // Protected paths that require authentication
  const isProtectedPath = pathname.startsWith('/dashboard');

  // If user has refresh token and tries to access public pages, redirect to dashboard
  if (refreshToken && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user doesn't have refresh token and tries to access protected pages, redirect to login
  if (!refreshToken && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
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
