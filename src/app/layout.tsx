import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nurvexthink.com"),
  title: { default: "NurvexThink", template: "%s — NurvexThink" },
  description: "Software, built and published. Custom software on demand.",
  openGraph: {
    title: "NurvexThink",
    description: "Software, built and published. Custom software on demand.",
    siteName: "NurvexThink",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "NurvexThink" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full font-sans antialiased", sans.variable, heading.variable)}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
