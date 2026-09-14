/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // react-konva exposes a Node entry that optionally imports the native canvas package.
    // The editor is browser-only, so prevent Next's server build from resolving it.
    config.resolve.alias.canvas = false;
    return config;
  }
};

export default nextConfig;
