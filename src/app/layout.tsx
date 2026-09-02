import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Manrope,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
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

const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-gujarati",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://globalsurat.com"),
  icons: {
    icon: "/assets/global-surat-logo.png",
    apple: "/assets/global-surat-logo.png",
  },
  title: {
    default: "Grow Your Business | Global Surat",
    template: "%s | Global Surat",
  },
  description:
    "Tell Global Surat what your business needs in two minutes. Get a simple growth plan for more enquiries, online sales, Google visibility, creative content, or a Shopify store.",
  keywords: [
    "digital marketing Surat",
    "Meta ads Gujarat",
    "Shopify development Surat",
    "SEO Surat",
    "lead generation Gujarat",
  ],
  openGraph: {
    title: "Want more customers for your business?",
    description: "Tell Global Surat in two minutes and get a clear next step.",
    type: "website",
    locale: "en_IN",
    siteName: "Global Surat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow your business with Global Surat",
    description: "A simple 2-minute business growth check.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="gu-IN"
      className={`${manrope.variable} ${display.variable} ${gujarati.variable} ${devanagari.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
