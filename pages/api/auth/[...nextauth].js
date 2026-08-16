import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '../../../services';

/**
 * Admin authentication.
 *
 * The content API is the source of truth for credentials — this only wraps it.
 * `authorize` runs on the server, posts to /auth/login, and stashes the bearer
 * token the API returned. The session then carries that token so the admin
 * client's request interceptor can attach it to every admin call.
 *
 * Session lifetime is pinned to the API token's lifetime (12h, JWT_EXPIRES_IN
 * on the backend). If the session outlived the token the UI would look signed
 * in while every request 401'd.
 */
const TWELVE_HOURS = 12 * 60 * 60;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await authService.login(
          credentials.email.trim(),
          credentials.password,
        );

        // null means the API rejected the credentials; NextAuth turns that into
        // a clean "invalid credentials" rather than an error page.
        if (!result?.token) return null;

        return {
          id: String(result.user.id),
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          accessToken: result.token,
        };
      },
    }),
  ],

  session: { strategy: 'jwt', maxAge: TWELVE_HOURS },
  jwt: { maxAge: TWELVE_HOURS },

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },

  callbacks: {
    // `user` is only present on the sign-in call; afterwards the token is
    // simply passed through.
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        id: token.userId,
        role: token.role,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
