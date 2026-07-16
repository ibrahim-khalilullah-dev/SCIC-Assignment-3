import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: `${process.env.BACKEND_INTERNAL_URL || "http://localhost:5000"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
