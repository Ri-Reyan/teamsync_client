import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/google/:path*",
        destination:
          "https://teamsync-server-lovat.vercel.app/api/v1/auth/google/:path*",
      },
      {
        source: "/api/auth/google",
        destination:
          "https://teamsync-server-lovat.vercel.app/api/v1/auth/google",
      },
    ];
  },
};

export default nextConfig;
