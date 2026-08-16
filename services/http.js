import axios from 'axios';
import { ApiError } from './apiError';

/**
 * HTTP layer for the content API.
 *
 * Two clients, because the two use cases have genuinely different needs:
 *
 *   publicClient — runs on the SERVER during getStaticProps/ISR. No auth, and
 *                  it RETRIES, because a transient blip during `next build`
 *                  would otherwise fail the whole build.
 *   adminClient  — runs in the BROWSER in the admin area. Attaches the bearer
 *                  token, and never retries: replaying a POST could duplicate
 *                  a record.
 *
 * Everything goes through interceptors so no caller ever writes an
 * Authorization header, unwraps `response.data`, or interprets a raw axios
 * error by hand.
 */

const SERVER_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const BROWSER_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const isBrowser = typeof window !== 'undefined';

if (!isBrowser && !SERVER_BASE_URL) {
  // Failing loudly at import time beats every page mysteriously 404ing later.
  throw new Error(
    'API_URL (or NEXT_PUBLIC_API_URL) is not set. Add it to .env.local — see .env.example.',
  );
}

// ---------------------------------------------------------------- utilities

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retry only on failures that a later attempt could plausibly survive. */
function isRetryable(error) {
  if (!error?.response) return true; // network error or timeout
  const { status } = error.response;
  return status === 429 || (status >= 500 && status <= 599);
}

function requestId() {
  return Math.random().toString(36).slice(2, 10);
}

// ------------------------------------------------------------ public client

export const publicClient = axios.create({
  baseURL: isBrowser ? BROWSER_BASE_URL : SERVER_BASE_URL,
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

publicClient.interceptors.request.use((config) => {
  config.headers['x-request-id'] = requestId();
  config.metadata = { startedAt: Date.now() };
  return config;
});

publicClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config ?? {};
    config.__retryCount = config.__retryCount ?? 0;

    const maxRetries = config.__maxRetries ?? 2;

    if (isRetryable(error) && config.__retryCount < maxRetries) {
      config.__retryCount += 1;
      // Exponential backoff: 300ms, 900ms.
      await sleep(300 * 3 ** (config.__retryCount - 1));
      return publicClient(config);
    }

    return Promise.reject(ApiError.from(error));
  },
);

// ------------------------------------------------------------- admin client

export const adminClient = axios.create({
  baseURL: BROWSER_BASE_URL,
  timeout: 30000, // uploads are slower than JSON
  headers: { Accept: 'application/json' },
});

/**
 * Sends an update, falling back from PATCH to PUT.
 *
 * Some networks — corporate proxies, security appliances, a few browser
 * extensions — drop PATCH before it leaves the machine. The request never
 * reaches the API, so the browser has no response to read and reports it as
 * "Method PATCH is not allowed by Access-Control-Allow-Methods", which sends
 * you looking at a CORS allowlist that was correct all along.
 *
 * The API registers PUT as an alias on every update route, so retrying with it
 * is not a workaround with different semantics — it is the same handler.
 *
 * Only network-level failures retry. An error carrying a response (400, 404,
 * 409) is a real answer from the API and must surface unchanged; retrying
 * those would just send the same rejected payload twice.
 */
export async function sendUpdate(client, url, payload) {
  try {
    return await client.patch(url, payload);
  } catch (error) {
    if (error?.response) throw error;
    return client.put(url, payload);
  }
}

/**
 * getSession() is an HTTP call to /api/auth/session, so caching it keeps every
 * admin request from making two round trips. The window is deliberately short —
 * a signed-out user stops working almost immediately rather than at token
 * expiry.
 */
let tokenCache = { token: null, expiresAt: 0 };
const TOKEN_CACHE_MS = 30_000;

export function clearTokenCache() {
  tokenCache = { token: null, expiresAt: 0 };
}

async function getAccessToken() {
  if (!isBrowser) return null;

  if (tokenCache.token && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  // Imported lazily so next-auth never lands in a public page's bundle.
  const { getSession } = await import('next-auth/react');
  const session = await getSession();
  const token = session?.accessToken ?? null;

  tokenCache = { token, expiresAt: Date.now() + TOKEN_CACHE_MS };
  return token;
}

adminClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers['x-request-id'] = requestId();
  return config;
});

adminClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const apiError = ApiError.from(error);

    if (apiError.isUnauthorized) {
      // The token was rejected — most likely expired. Drop the cache so the
      // next call re-reads the session rather than replaying a dead token.
      clearTokenCache();

      if (isBrowser && !window.location.pathname.startsWith('/admin/login')) {
        const { signOut } = await import('next-auth/react');
        await signOut({ redirect: false });
        window.location.href = `/admin/login?expired=1&from=${encodeURIComponent(
          window.location.pathname,
        )}`;
      }
    }

    return Promise.reject(apiError);
  },
);

// ------------------------------------------------------------------ helpers

/** GET returning the response body, for use inside getStaticProps. */
export async function getPublic(path, params) {
  const { data } = await publicClient.get(path, { params });
  return data;
}

/**
 * Same, but returns `null` on 404 instead of throwing — the shape a detail
 * page wants so it can hand Next a `notFound: true`.
 */
export async function getPublicOrNull(path, params) {
  try {
    return await getPublic(path, params);
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) return null;
    throw error;
  }
}
