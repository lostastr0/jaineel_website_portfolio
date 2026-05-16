import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MotionProvider from "@/components/MotionProvider";
import Preloader from "@/components/Preloader";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  display: "swap",
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaineel.dev"),
  title: {
    default: "Jaineel Khatri — Portfolio",
    template: "%s · Jaineel Khatri",
  },
  description:
    "Cybersecurity student in Brisbane heading into computer science — shipping real projects across web, security, and systems.",
  authors: [{ name: "Jaineel Khatri" }],
  creator: "Jaineel Khatri",
  applicationName: "Jaineel Khatri — Portfolio",
  openGraph: {
    title: "Jaineel Khatri — Portfolio",
    description:
      "Cybersecurity student in Brisbane heading into computer science — shipping real projects across web, security, and systems.",
    url: "https://jaineel.dev",
    siteName: "Jaineel Khatri",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaineel Khatri — Portfolio",
    description:
      "Cybersecurity student in Brisbane heading into computer science — shipping real projects across web, security, and systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
    { media: "(prefers-color-scheme: light)", color: "#E8E8E4" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `
(function(){try{var p=localStorage.getItem('theme');var s=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var t=p||s;if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();
`.trim();

const preloaderSkipScript = `
(function(){try{var seen=sessionStorage.getItem('jk_preloader_seen')==='1';var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(seen||reduced)document.documentElement.classList.add('jk-skip-preload');}catch(e){}})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} ${funnelSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: preloaderSkipScript }} />
      </head>
      <body className="bg-bg text-fg antialiased font-sans">
        <MotionProvider>
          <Preloader />
          {children}
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
