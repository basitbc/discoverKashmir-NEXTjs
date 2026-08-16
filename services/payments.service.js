import { adminClient, getPublic, publicClient } from './http';

/**
 * Payments.
 *
 * The customer enters the amount they agreed with us; the agency verifies it
 * before confirming the trip. What the browser cannot set is anything that
 * steers the money — merchant id, gateway return URLs and the working key are
 * all server-side.
 */
export const paymentsService = {
  /**
   * Public: the customer raises their own payment for an agreed amount.
   * Returns only the reference; the pay page fetches the rest by it.
   */
  async create(payload) {
    const { data } = await publicClient.post('/payments', payload);
    return data;
  },

  /** Public: fetch a payment request by its shareable reference. */
  get(reference) {
    return getPublic(`/payments/${encodeURIComponent(reference)}`);
  },

  /**
   * The URL the customer's browser must POST to in order to reach the gateway.
   *
   * Returned as a URL rather than fetched with axios on purpose: the response
   * is a self-submitting HTML form, and it has to be a real top-level browser
   * navigation. Fetching it via XHR would just hand us HTML we cannot act on.
   */
  initiateUrl(reference) {
    const base = publicClient.defaults.baseURL;
    return `${base}/payments/${encodeURIComponent(reference)}/initiate`;
  },

  admin: {
    async list(params) {
      const { data } = await adminClient.get('/admin/payments', { params });
      return data;
    },
    async get(id) {
      const { data } = await adminClient.get(`/admin/payments/${id}`);
      return data;
    },
    async create(payload) {
      const { data } = await adminClient.post('/admin/payments', payload);
      return data;
    },
    /** Not a delete — a payment record is financial history. */
    async cancel(id) {
      const { data } = await adminClient.post(`/admin/payments/${id}/cancel`);
      return data;
    },
    async config() {
      const { data } = await adminClient.get('/admin/payments-config');
      return data;
    },
  },
};
