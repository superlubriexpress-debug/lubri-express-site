/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  eslint: {
    // ESLint is executed separately; this avoids the legacy Next 15 pnpm adapter during builds.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/site",
        destination: "/",
        permanent: true,
      },
      {
        source: "/site/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  }
};

export default nextConfig;
