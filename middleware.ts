import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from './src/lib/jwt';

export function middleware(req: NextRequest) {
  console.log({ 1: 1 });
  const { pathname } = req.nextUrl;
  const isAdminPath = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const token = req.cookies.get('admin_auth')?.value;
  const decoded = token ? verifyJwt(token) : null;
  console.log({ decoded });
  if (isAdminPath && !isLoginPage && !decoded) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}