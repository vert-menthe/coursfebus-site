/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'coursfebus.fr.vano3695.odns.fr',
      },
    ],
  },
};

module.exports = nextConfig;
