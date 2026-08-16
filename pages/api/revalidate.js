/**
 * On-demand ISR. The content API calls this after any write so an edit shows up
 * on the live site within seconds instead of waiting for the next deploy.
 *
 * Authenticated by a shared secret rather than a user session, because the
 * caller is a server, not a person. The secret must match REVALIDATE_SECRET in
 * backend/.env.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.REVALIDATE_SECRET;

  // Refuse rather than run unauthenticated: without this guard anyone could
  // force endless rebuilds.
  if (!secret) {
    console.error('REVALIDATE_SECRET is not configured');
    return res.status(503).json({ error: 'Revalidation is not configured' });
  }

  if (req.headers['x-revalidate-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { paths } = req.body ?? {};
  if (!Array.isArray(paths) || paths.length === 0) {
    return res.status(400).json({ error: 'Body must be { paths: string[] }' });
  }

  // Only same-site absolute paths — never let a caller steer this elsewhere.
  const safePaths = [...new Set(paths)].filter(
    (p) => typeof p === 'string' && p.startsWith('/') && !p.startsWith('//'),
  );

  const revalidated = [];
  const failed = [];

  // One bad path must not prevent the rest from rebuilding.
  await Promise.all(
    safePaths.map(async (path) => {
      try {
        await res.revalidate(path);
        revalidated.push(path);
      } catch (error) {
        console.error(`Failed to revalidate ${path}:`, error.message);
        failed.push(path);
      }
    }),
  );

  return res.status(200).json({ revalidated, failed });
}
