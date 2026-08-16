import { createContext, useContext, useMemo } from 'react';

/**
 * Site-wide settings (phone, email, address, about copy, logo text).
 *
 * Seven components — Layout, Navbar, Footer and friends — used to `import`
 * Data/Details.json at module top level and took no props. That is exactly what
 * cannot be made dynamic, and Layout wraps every page, so prop-drilling would
 * have meant touching every page component.
 *
 * A context solves it instead: each page's getStaticProps includes the settings
 * (see lib/getSiteProps.js), _app.js feeds them in here, and the components read
 * them with useSiteSettings().
 */

// Shape-compatible defaults so a component never reads undefined mid-render —
// e.g. during a build against an API that has not been seeded yet.
const FALLBACK = {
  logoText: 'Discover Kashmir',
  phoneNumber: '',
  email: '',
  whatsappNumber: '',
  address: '',
  about1: '',
  about2: '',
  aboutImageBack: null,
  aboutImageFront: null,
  contactBgImage: null,
};

const SiteSettingsContext = createContext(FALLBACK);

export function SiteSettingsProvider({ value, children }) {
  // Merged so a partially-populated API response can't blank out a field the
  // UI expects to be a string.
  const settings = useMemo(() => ({ ...FALLBACK, ...(value ?? {}) }), [value]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export { FALLBACK as SITE_SETTINGS_FALLBACK };
