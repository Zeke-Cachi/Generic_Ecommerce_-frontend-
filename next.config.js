/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
      },
    ],
  },
  env: {
    ...dotenv.config().parsed,
  },
};

module.exports = nextConfig;
