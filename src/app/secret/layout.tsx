import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Save file 04",
  description: "You found this.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function SecretLayout({ children }: { children: React.ReactNode }) {
  return children;
}
