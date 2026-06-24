/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudflare.com', 'images.unsplash.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Tell Next.js to use src directory
  distDir: '.next',
  // Enable App Router
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
