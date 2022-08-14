/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL
  },
}

module.exports = nextConfig
