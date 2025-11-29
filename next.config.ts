import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    proxyClientMaxBodySize: '1024mb',
     cssChunking: true, // default
    
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
