/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/**",
      },
      {
        protocol: "http",
        hostname: "10.2.113.66",
        port: "3000",
        pathname: "/api/**",
      },
      {
        protocol: "http",
        hostname: "172.31.9.18",
        port: "3000",
        pathname: "/api/**",
      },
    ],
  },
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "http://localhost:3000/api/:path*",
      // },
      {
        source: "/api/:path*",
        destination: "http://172.31.9.18:3000/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
