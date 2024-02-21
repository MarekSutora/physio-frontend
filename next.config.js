/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  //   swcMinify: true,
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/api",
  //         destination: "https://localhost:7049",
  //       },
  //     ];
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
