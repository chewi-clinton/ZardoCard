import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(import.meta.dirname),
  },
};

export default nextConfig;
