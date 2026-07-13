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
    return [
      { source: '/faq', destination: '/', permanent: true },
      { source: '/resources', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
