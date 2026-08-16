import { settingsService } from '../services';
import { SITE_SETTINGS_FALLBACK } from '../context/SiteSettingsContext';

/**
 * Props every page needs, regardless of what else it renders.
 *
 * _app.js cannot run getStaticProps, so the settings that the header and footer
 * depend on have to come in through each page. Spread this into every page's
 * getStaticProps:
 *
 *   export async function getStaticProps() {
 *     return {
 *       props: { ...(await getSiteProps()), packages },
 *       revalidate: 300,
 *     };
 *   }
 */
export async function getSiteProps() {
  try {
    const siteSettings = await settingsService.get();
    return { siteSettings };
  } catch (error) {
    // A build must not fail because the settings call blipped — the header and
    // footer degrade to defaults, and the next revalidation picks up the real
    // values.
    console.error('Failed to load site settings:', error.message);
    return { siteSettings: SITE_SETTINGS_FALLBACK };
  }
}

/** Seconds between background regenerations. Writes also trigger an immediate
 *  rebuild via /api/revalidate, so this is only a safety net. */
export const REVALIDATE_SECONDS = 300;
