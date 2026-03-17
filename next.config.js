/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/cloudstack' : '',
  assetPrefix: isProd ? '/cloudstack/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/cloudstack' : '',
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
