import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedPath = path.startsWith('/admin');
  
  // Check for admin session cookie
  const isAdmin = request.cookies.get('admin_session')?.value === 'true';

  if (isProtectedPath && !isAdmin) {
    // If trying to access admin without session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
};
