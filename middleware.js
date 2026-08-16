import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Guards the admin area at the edge, before any page code runs.
 *
 * This is defence in depth, not the security boundary — the real check is the
 * API rejecting requests without a valid bearer token. What this buys is that a
 * signed-out visitor is redirected to the login page instead of briefly seeing
 * an admin shell that then fails every request.
 *
 * Written by hand rather than using `withAuth` for one reason: a session cookie
 * that cannot be decoded has to be DELETED. Otherwise the browser replays it on
 * every request, the guard rejects it every time, and the user is bounced to
 * the login page forever — a redirect loop with no way out except clearing
 * cookies by hand. A cookie becomes undecodable whenever NEXTAUTH_SECRET
 * changes, which is exactly what happens when secrets are rotated.
 */

const SESSION_COOKIES = [
  'next-auth.session-token',
  '__Secure-next-auth.session-token',
];

export default async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) return NextResponse.next();

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);

  const response = NextResponse.redirect(loginUrl);

  // A cookie was presented but could not be read — it is stale. Clearing it
  // here is what turns an endless loop into a single redirect to the login page.
  const hadCookie = SESSION_COOKIES.some((name) => request.cookies.has(name));
  if (hadCookie) {
    for (const name of SESSION_COOKIES) response.cookies.delete(name);
  }

  return response;
}

export const config = {
  // Everything under /admin except the login page itself, which has to stay
  // reachable while signed out.
  matcher: ['/admin/((?!login).*)', '/admin'],
};
