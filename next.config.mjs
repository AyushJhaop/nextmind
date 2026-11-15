
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["@prisma/client"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
