/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    // Site retired: permanently redirect all traffic to Carolyn's new site.
    const NEW_SITE = 'https://www.trilliumtherapeuticarts.com';
    return [
      { source: '/about', destination: `${NEW_SITE}/about`, permanent: true },
      { source: '/:path*', destination: `${NEW_SITE}/`, permanent: true },
    ];
  },
};

export default nextConfig;
