/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false,
      },
      {
        source: '/home/piconica-privacy-policy',
        destination: '/products/android/piconica/privacy-policy',
        permanent: false,
      },
      {
        source: '/home/piconica-privacy-policy-jp',
        destination: 'ja/products/android/piconica/privacy-policy-jp',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
