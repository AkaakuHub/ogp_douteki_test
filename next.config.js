/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push({
  //     test: /\.ttf$/,
  //     type: "asset/inline"
  //   });
  //   return config
  // }
}

module.exports = nextConfig
