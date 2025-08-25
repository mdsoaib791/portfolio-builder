import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { RoleDto } from './dtos/role-dto';
import { Roles } from './helpers/roles';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const pageUrl = req.nextUrl.pathname.toLowerCase();

    const rolesObject = (req.nextauth.token?.roles || []) as RoleDto[];
    const roles = rolesObject.map((el) => el.name);

    if (pageUrl !== '/admin/dashboard') {
      if (pageUrl.startsWith('/superadmin-test/') && roles.indexOf(Roles.Administrator) < 0) {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/superadmin/:path*', '/admin/:path*', '/callcenter/:path*'],
};
