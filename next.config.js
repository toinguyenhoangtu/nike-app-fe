/** @type {import('next').NextConfig} */
const path = require("path")
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['res.cloudinary.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  async rewrites () {
    return [{
      source: '/:slug',
      destination: '/category/:slug'
    }]
  }
}

module.exports = nextConfig
