/**
 * Allows next/image to load files the content API serves itself, which is what
 * happens when the API runs with STORAGE_DRIVER=local.
 *
 * Derived from NEXT_PUBLIC_API_URL rather than hardcoded, so pointing the site
 * at a deployed API does not also require editing this file.
 */
function apiImagePatterns() {
  const raw = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
  if (!raw) return [];

  try {
    const { protocol, hostname, port } = new URL(raw);
    return [
      {
        protocol: protocol.replace(':', ''),
        hostname,
        ...(port ? { port } : {}),
        pathname: '/uploads/**',
      },
    ];
  } catch {
    // A malformed URL must not take the whole build down.
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `next build` and `next dev` write incompatible output into the same
  // directory. Building while a dev server is running corrupts it, and the dev
  // server then dies with "Cannot find module './undefined'". Setting
  // NEXT_DIST_DIR lets a verification build go somewhere else entirely:
  //   NEXT_DIST_DIR=.next-verify npx next build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // `output: 'standalone'` was removed: it is container-oriented scaffolding
  // from the initial commit, is ignored on Vercel, and no Dockerfile has ever
  // existed in this repo.
  images: {
    // Admin uploads are served from whichever storage driver the API uses, so
    // next/image has to allow both. Without this it rejects the URL outright —
    // the config previously had no `images` key at all, which only worked
    // because every remote image used a plain <img>.
    remotePatterns: [
      // STORAGE_DRIVER=cloudinary. URLs already carry f_auto,q_auto, so the
      // bytes are optimised before next/image ever sees them.
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      // STORAGE_DRIVER=blob
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // STORAGE_DRIVER=local — derived from the API URL so this keeps working
      // when the API moves to a real host, without another config edit.
      ...apiImagePatterns(),
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Fewer native file watchers (helps macOS EMFILE: "too many open files")
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
