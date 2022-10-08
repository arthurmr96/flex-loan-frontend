/** @type {import('next').NextConfig} */
const withLess = require('next-with-less')

const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  swcMinify: false,
  compiler: {
    styledComponents: true
  }
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },

      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = withLess(nextConfig)
