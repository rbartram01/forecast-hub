/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.weatherapi.com",
      port: "",
      pathname: "/**"
    }]
  }
};

export default nextConfig;
