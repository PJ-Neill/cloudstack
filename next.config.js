/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cloudstack',
  assetPrefix: '/cloudstack/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
