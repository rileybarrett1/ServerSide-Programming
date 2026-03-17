import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
}; 

export default nextConfig;


