/** @type {import('next').NextConfig} */
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: repoBasePath,
  assetPrefix: repoBasePath ? `${repoBasePath}/` : '',
  swcMinify: true,
  productionBrowserSourceMaps: false,
}

export default nextConfig
