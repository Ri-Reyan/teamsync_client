import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // ফ্রন্টএন্ড থেকে যে রুটে রিকোয়েস্ট পাঠাবে
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`, // তোমার মূল ব্যাকএন্ডের প্রডাকশন URL (সামনের স্ল্যাশ বজায় রাখবে)
      },
    ];
  },
};

export default nextConfig;
