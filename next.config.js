/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: "serverless",
      images: {
        unoptimized: true
    }
}

module.exports = nextConfig
