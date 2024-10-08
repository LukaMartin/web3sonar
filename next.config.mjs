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
            },
            {
                protocol: 'https',
                hostname: 'crypto.snapi.dev'
            },
            {
                protocol: 'https',
                hostname: 'www.odos.xyz',
            }
        ]
    },
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
};

export default nextConfig;
