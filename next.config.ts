import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Hooks Cloudflare bindings into `next dev` so the Workers runtime can be
// exercised locally. No-op outside of dev — safe to leave in place when
// building for Vercel.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
