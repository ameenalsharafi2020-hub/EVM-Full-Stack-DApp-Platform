/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud', 'via.placeholder.com'],
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    // Fix for modules that try to use Node.js packages in browser
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      net: false,
      tls: false,
      encoding: false,
    };

    // Ignore pino-pretty and similar optional deps
    config.externals = [...(config.externals || []), 'pino-pretty', 'lokijs', 'encoding'];

    return config;
  },
};

module.exports = nextConfig;