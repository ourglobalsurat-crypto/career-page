import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/contact"],
      disallow: ["/gsm-admin", "/api", "/thank-you"],
    },
  };
}
