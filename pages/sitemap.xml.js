import { blogsService, destinationsService, packagesService } from '../services';

/**
 * XML sitemap, generated per request from the content API.
 *
 * The previous version was broken three ways and is worth recording so it does
 * not come back:
 *   1. generateSiteMap(a, b, c) was called with three positional arguments
 *      against a signature that destructured a single object, so every value
 *      was undefined — it only produced output by falling through to top-level
 *      JSON imports, which made the fsPromises block dead code.
 *   2. Its slugs used `.replace(/ /g, '-')` while the routes used slugify(), so
 *      any name containing & ' , or : produced a sitemap URL matching no page.
 *   3. The blog .map() had no .join(''), leaking commas into the XML.
 *
 * All three disappear by using the stored `slug` — the same value the routes
 * resolve against — and building one flat list of entries.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://thediscoverkashmir.in')
  .replace(/\/$/, '');

const STATIC_PATHS = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/packages', priority: '0.9', changefreq: 'weekly' },
  { path: '/destinations', priority: '0.9', changefreq: 'weekly' },
  { path: '/travelblogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/emi', priority: '0.4', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
  { path: '/cancellations-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
];

/** Slugs can contain & ' : — all of which must be escaped inside XML. */
function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toUrlEntry({ path, priority, changefreq, lastmod }) {
  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${
    lastmod ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''
  }
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSiteMap(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(toUrlEntry).join('\n')}
</urlset>`;
}

// The route only exists to emit XML from getServerSideProps.
export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const [packages, destinations, blogs] = await Promise.all([
    packagesService.listAll(),
    destinationsService.listAll(),
    blogsService.listAll(),
  ]);

  const entries = [
    ...STATIC_PATHS,
    ...packages.map((item) => ({
      path: `/packages/${item.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: item.updatedAt,
    })),
    ...destinations.map((item) => ({
      path: `/destinations/${item.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: item.updatedAt,
    })),
    ...blogs.map((item) => ({
      path: `/travelblogs/${item.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: item.updatedAt,
    })),
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
  res.write(generateSiteMap(entries));
  res.end();

  return { props: {} };
}
