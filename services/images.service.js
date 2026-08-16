import { adminClient, sendUpdate } from './http';

/**
 * Media library.
 *
 * Admin-only — the public site never browses it, it only receives the URLs
 * already attached to content.
 */
export const imagesService = {
  admin: {
    async list(params) {
      const { data } = await adminClient.get('/admin/images', { params });
      return data;
    },

    async folders() {
      const { data } = await adminClient.get('/admin/images/folders');
      return data.folders;
    },

    async get(id) {
      const { data } = await adminClient.get(`/admin/images/${id}`);
      return data;
    },

    /** Alt text is the main thing edited here. */
    async update(id, payload) {
      const { data } = await sendUpdate(adminClient, `/admin/images/${id}`, payload);
      return data;
    },

    /** Refused by the API with a 409 while the image is still in use. */
    async remove(id) {
      const { data } = await adminClient.delete(`/admin/images/${id}`);
      return data;
    },
  },
};
