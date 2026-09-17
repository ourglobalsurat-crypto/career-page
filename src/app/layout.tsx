import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Manrope,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://globalsurat.com"),
  icons: {
    icon: "/assets/global-surat-logo.png",
    apple: "/assets/global-surat-logo.png",
  },
  title: {
    default: "Careers | Global Surat",
    template: "%s | Global Surat",
  },
  description:
    "Explore careers at Global Surat in marketing, creative, development and sales. Apply with your experience and résumé.",
  keywords: [
    "digital marketing jobs Surat",
    "performance marketing careers",
    "Shopify developer jobs Surat",
    "SEO careers Surat",
    "sales executive jobs Surat",
  ],
  openGraph: {
    title: "Build your career at Global Surat",
    description: "Explore open positions and join our team in Surat.",
    type: "website",
    locale: "en_IN",
    siteName: "Global Surat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow your career with Global Surat",
    description: "Apply for marketing, creative, development and sales roles.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${display.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
