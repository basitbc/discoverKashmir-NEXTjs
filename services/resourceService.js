import { adminClient } from './http';
import { getPublic, getPublicOrNull } from './http';

/**
 * Builds the client-side counterpart of the backend's CRUD factory.
 *
 * The API exposes the same seven operations for every content type, so the
 * frontend describes each resource once instead of hand-writing six nearly
 * identical modules. Public reads go through the retrying server-side client;
 * admin writes go through the authenticated browser client.
 *
 *   createResourceService('packages') -> { list, getBySlug, admin: { ... } }
 */
export function createResourceService(resource) {
  const base = `/${resource}`;
  const adminBase = `/admin/${resource}`;

  return {
    resource,

    // ---------------------------------------------------------- public reads
    /** Published rows only. Returns { items, total, page, perPage, totalPages }. */
    list(params) {
      return getPublic(base, params);
    },

    /** Every published row, following pagination. For getStaticPaths. */
    async listAll(params = {}) {
      const perPage = 100;
      let page = 1;
      const items = [];

      for (;;) {
        const result = await getPublic(base, { ...params, page, perPage });
        items.push(...(result.items ?? []));
        if (page >= (result.totalPages ?? 1)) break;
        page += 1;
      }

      return items;
    },

    /** Resolves to null when nothing matches, so pages can return notFound. */
    getBySlug(slug) {
      return getPublicOrNull(`${base}/${encodeURIComponent(slug)}`);
    },

    // --------------------------------------------------------- admin writes
    admin: {
      async list(params) {
        const { data } = await adminClient.get(adminBase, { params });
        return data;
      },

      async get(id) {
        const { data } = await adminClient.get(`${adminBase}/${id}`);
        return data;
      },

      async create(payload) {
        const { data } = await adminClient.post(adminBase, payload);
        return data;
      },

      async update(id, payload) {
        const { data } = await adminClient.patch(`${adminBase}/${id}`, payload);
        return data;
      },

      async remove(id) {
        const { data } = await adminClient.delete(`${adminBase}/${id}`);
        return data;
      },

      /** items: [{ id, sortOrder }] — sent as one request, applied atomically. */
      async reorder(items) {
        const { data } = await adminClient.post(`${adminBase}/reorder`, { items });
        return data;
      },
    },
  };
}
