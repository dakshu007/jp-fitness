import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Inline CSS into the HTML: removes the render-blocking stylesheet
    // request, which is the main FCP/LCP cost on slow mobile connections.
    inlineCss: true,
  },
};

export default nextConfig;
