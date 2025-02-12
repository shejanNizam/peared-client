/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.stack.imgur.com",
      },
      {
        protocol: "https",
        hostname: "magy-abu-sayed.sarv.live",
      },
    ],
  },
};

export default nextConfig;
