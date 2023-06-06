/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  env: {
    apiBaseUrl: isDev ? 'http://localhost:8080' : 'https://nest-ted-downloader.vercel.app',
  },
};

module.exports = nextConfig;
