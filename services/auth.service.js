import { adminClient, publicClient, clearTokenCache } from './http';
import { ApiError } from './apiError';

/**
 * Authentication against the content API.
 *
 * `login` is called from NextAuth's `authorize` callback, which runs on the
 * SERVER — so it deliberately uses publicClient (which works in both
 * environments) rather than adminClient (browser-only).
 */
export const authService = {
  /**
   * Exchanges credentials for a bearer token.
   * Returns null on bad credentials, because NextAuth expects a null rather
   * than a throw to mean "rejected".
   */
  async login(email, password) {
    try {
      const { data } = await publicClient.post('/auth/login', { email, password });
      return data; // { token, user }
    } catch (error) {
      const apiError = ApiError.from(error);
      if (apiError.isUnauthorized) return null;
      throw apiError;
    }
  },

  /** The signed-in user, straight from the API rather than the cached session. */
  async me() {
    const { data } = await adminClient.get('/auth/me');
    return data.user;
  },

  async changePassword(currentPassword, newPassword) {
    const { data } = await adminClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    // Force the next request to re-read the session rather than reuse a token
    // minted before the change.
    clearTokenCache();
    return data;
  },
};
