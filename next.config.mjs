/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.reactiveshots.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
