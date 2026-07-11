import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(import.meta.dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "62.171.174.37",
        port: "13002",
        pathname: "/zardocards/**",
      },
    ],
  },
};

export default nextConfig;
