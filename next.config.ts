import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for deployment to static hosting platforms
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Optional: Configure base path if deploying to a subdirectory
  // basePath: '/your-subdirectory',
  
  // Optional: Configure trailing slashes
  trailingSlash: true,
};

export default nextConfig;
