import type { NextConfig } from "next";
import { networkInterfaces } from 'node:os';

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  allowedDevOrigins: Object.values(networkInterfaces()).flatMap(addresses =>
    (addresses ?? []).filter(address => address.family === 'IPv4').map(address => address.address)),
  poweredByHeader: false,
  compress: true,
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];

    if (isProduction) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
      });
    }

    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/admin/resumes/:id", headers: [
        {key:"X-Frame-Options",value:"SAMEORIGIN"},
        {key:"Content-Security-Policy",value:"default-src 'self'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'"},
      ]},
    ];
  },
};

export default nextConfig;
