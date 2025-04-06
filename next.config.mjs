/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: '.next',
    images: {
        domains: ['test-api.poputi.tj', 'poputi.tj', 'api.poputi.tj'],
    }
};

export default nextConfig;
