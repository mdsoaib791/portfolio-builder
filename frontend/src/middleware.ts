import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Nothing needed here since role checks are removed
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If user has a token, allow access; otherwise redirect to /login
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Redirect to login if not authenticated
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",   // Protect all dashboard routes
    "/superadmin/:path*",  // Still protected, only by login
    "/admin/:path*",
    "/callcenter/:path*",
  ],
};
