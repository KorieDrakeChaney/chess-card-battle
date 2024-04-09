import authConfig from "@/server/auth.config";
import NextAuth from "next-auth";

import {
  AUTH_ROUTES,
  DEFAULT_REDIRECT,
  PUBLIC_ROUTES,
  SIGN_IN,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const { nextUrl } = req;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  if (!isApiRoute) {
    if (isAuthRoute) {
      if (isAuthenticated) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
      }
      return;
    }

    if (!isAuthenticated && !isPublicRoute)
      return Response.redirect(new URL(SIGN_IN, nextUrl));
  } else {
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
