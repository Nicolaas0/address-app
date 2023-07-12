/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'apis',
      'app',
      'components',
      'contexts',
      'features',
      'hooks',
      'pages',
      'types',
    ],
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  env:{
    APIKEY: process.env.NEXT_PUBLIC_API_KEY,
    AUTHDOMAIN: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    PROJECTID: process.env.NEXT_PUBLIC_PROJECTID,
    STORAGEBUCKET: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    APPID: process.env.NEXT_PUBLIC_APPID,
    MEASURMENTID: process.env.NEXT_PUBLIC_MEASURMENTID
  }
}

module.exports = nextConfig
