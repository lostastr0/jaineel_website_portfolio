import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/secret"],
      },
    ],
    sitemap: "https://jaineel.dev/sitemap.xml",
  };
}
