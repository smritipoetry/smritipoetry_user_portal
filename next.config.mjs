/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn-icons-png.flaticon.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },

        ],
    },
};

export default nextConfig;
