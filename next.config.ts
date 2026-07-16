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
        destination: "https://scic-assignment-3-server-3-0.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
