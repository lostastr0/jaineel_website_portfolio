// OpenNext configuration for Cloudflare Workers deployment.
// Cloudflare Pages projects now run on the unified Workers platform; this is
// the config the @opennextjs/cloudflare adapter reads at build time.
//
// Kept minimal on purpose — no incremental cache, no custom queues. Add an
// override here (e.g. r2IncrementalCache) only when the site actually needs
// the Cache API surface, since each override pulls in a Cloudflare binding.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
