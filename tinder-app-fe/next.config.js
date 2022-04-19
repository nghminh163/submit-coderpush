/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // -> Temporary because typescript of tinder-card lib outdate
  },
};

module.exports = nextConfig;
