import { adminClient, getPublic } from './http';

/**
 * Site-wide settings — a singleton, so it has no list or id-based routes.
 * Read on every page (header, footer, about section), written from one admin
 * form.
 */
export const settingsService = {
  /** Never 404s: a fresh database returns defaults so the site still renders. */
  get() {
    return getPublic('/settings');
  },

  admin: {
    async update(payload) {
      const { data } = await adminClient.put('/admin/settings', payload);
      return data;
    },
  },
};
