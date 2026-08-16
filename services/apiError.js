/**
 * One error type for every failure the API layer can produce, so callers never
 * have to know whether something failed at the network, the HTTP layer, or in
 * the backend's own validation.
 *
 * The backend always answers errors with:
 *   { error: { code, message, details } }
 * and this class flattens that into properties the UI can read directly.
 */
export class ApiError extends Error {
  constructor({ status, code, message, details, cause }) {
    super(message);
    this.name = 'ApiError';
    this.status = status ?? 0;
    this.code = code ?? 'UNKNOWN';
    this.details = details ?? null;
    this.cause = cause;
  }

  /** No response at all — server down, DNS failure, timeout, offline. */
  get isNetwork() {
    return this.status === 0;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isValidation() {
    return this.status === 400 || this.status === 422;
  }

  /** 409 from a unique constraint, e.g. two records claiming one slug. */
  get isConflict() {
    return this.status === 409;
  }

  /**
   * Field-level messages for form display, keyed by field name.
   * Returns {} when the failure was not a validation error.
   */
  get fieldErrors() {
    if (!Array.isArray(this.details)) return {};
    return this.details.reduce((acc, item) => {
      if (item?.field) acc[item.field] = item.message;
      return acc;
    }, {});
  }

  /** Builds an ApiError from whatever axios threw. */
  static from(error) {
    if (error instanceof ApiError) return error;

    // The request was made but no response came back.
    if (!error?.response) {
      const timedOut = error?.code === 'ECONNABORTED';
      return new ApiError({
        status: 0,
        code: timedOut ? 'TIMEOUT' : 'NETWORK_ERROR',
        message: timedOut
          ? 'The server took too long to respond.'
          : 'Could not reach the server. Check your connection and try again.',
        cause: error,
      });
    }

    const { status, data } = error.response;
    const payload = data?.error ?? {};

    return new ApiError({
      status,
      code: payload.code ?? `HTTP_${status}`,
      message: payload.message ?? error.message ?? 'Request failed.',
      details: payload.details,
      cause: error,
    });
  }
}
