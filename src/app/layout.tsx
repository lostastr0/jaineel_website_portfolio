import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jaineel — Student & Builder",
  description:
    "Student based in Brisbane, building toward a career in CS and software engineering. Learning by doing.",
  openGraph: {
    title: "Jaineel — Student & Builder",
    description:
      "Student based in Brisbane, building toward a career in CS and software engineering. Learning by doing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} font-sans antialiased bg-bg text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}