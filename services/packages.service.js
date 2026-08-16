import { adminClient, getPublic } from './http';
import { createResourceService } from './resourceService';

const base = createResourceService('packages');

/**
 * Packages carry two things no other resource has: an ordered tour plan, and
 * inclusion/exclusion lists that fall back to global defaults.
 *
 * Both are REPLACE-the-whole-collection operations, matching how the admin
 * edits them — as one list, saved once — so the stored order can never
 * disagree with what the editor saw.
 */
export const packagesService = {
  ...base,

  /** Global lists applied to any package that does not define its own. */
  getDefaults() {
    return getPublic('/package-defaults');
  },

  admin: {
    ...base.admin,

    /** days: [{ day, title, description, note?, sortOrder? }] */
    async replaceTourPlan(packageId, days) {
      const { data } = await adminClient.put(
        `/admin/packages/${packageId}/tour-plan`,
        { items: days },
      );
      return data;
    },

    /**
     * kind: INCLUSION | EXCLUSION | THING_TO_CARRY | MAJOR_ACTIVITY | TERM
     * Passing an empty array makes the package fall back to the global default
     * for that kind.
     */
    async replaceListItems(packageId, kind, items) {
      const { data } = await adminClient.put(
        `/admin/packages/${packageId}/list-items`,
        { kind, items },
      );
      return data;
    },

    async replaceDefaults(kind, items) {
      const { data } = await adminClient.put('/admin/package-defaults', {
        kind,
        items,
      });
      return data;
    },
  },
};
