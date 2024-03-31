const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/apinet/:path*",
        destination: `${process.env.BACKEND_API_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns:
      process.env.NODE_ENV !== "production"
        ? [
            {
              protocol: "http",
              hostname: "**",
            },
            {
              protocol: "https",
              hostname: "i.postimg.cc",
            },
          ]
        : [
            {
              protocol: "https",
              hostname: "i.postimg.cc",
            },
          ],
  },
};

module.exports = nextConfig;
