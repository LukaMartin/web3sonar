/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'market-data-images.s3.us-east-1.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'tm-prtnr-plan.s3.amazonaws.com'
            }
        ]
    },
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
};

export default nextConfig;
