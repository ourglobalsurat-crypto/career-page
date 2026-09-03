import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowUpRight, CircleCheckBig, MessageCircle, ShieldCheck } from "lucide-react";

import { ThankYouConversion } from "@/components/thank-you-conversion";
import { verifyLeadReceipt } from "@/lib/lead-receipt";
import type { Locale, LocalizedText } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Details Received",
  description: "Your business details have been received by the Global Surat growth team.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const copy = {
  eyebrow: {
    en: "DETAILS RECEIVED",
    hi: "जानकारी मिल गई",
    gu: "માહિતી મળી ગઈ",
  },
  heading: {
    en: "Your Details Have Been Received!",
    hi: "आपकी जानकारी मिल गई है!",
    gu: "તમારી માહિતી અમને મળી ગઈ છે!",
  },
  body: {
    en: "Our growth team will review your business details. For a faster discussion, connect with us directly on WhatsApp.",
    hi: "हमारी growth team आपके बिज़नेस की जानकारी देखेगी। जल्दी बात करने के लिए हमसे सीधे WhatsApp पर जुड़ें।",
    gu: "અમારી growth team તમારા બિઝનેસની માહિતી જોશે. ઝડપથી ચર્ચા કરવા માટે અમારી સાથે સીધા WhatsApp પર જોડાઓ.",
  },
  button: {
    en: "Discuss My Growth Plan on WhatsApp",
    hi: "WhatsApp पर मेरे Growth Plan पर बात करें",
    gu: "WhatsApp પર મારા Growth Plan વિશે વાત કરો",
  },
  privacy: {
    en: "Your details remain private with our team.",
    hi: "आपकी जानकारी हमारी team के पास सुरक्षित रहेगी।",
    gu: "તમારી માહિતી અમારી team પાસે સુરક્ષિત રહેશે.",
  },
  website: {
    en: "Visit Global Surat",
    hi: "Global Surat website देखें",
    gu: "Global Surat website જુઓ",
  },
  whatsappMessage: {
    en: "Hi Global Surat, I have submitted my details and would like to discuss my growth plan.",
    hi: "नमस्ते Global Surat, मैंने अपनी जानकारी भेज दी है और अपने growth plan के बारे में बात करना चाहता/चाहती हूँ।",
    gu: "નમસ્તે Global Surat, મેં મારી માહિતી મોકલી છે અને મારા growth plan વિશે વાત કરવા માંગું છું.",
  },
} satisfies Record<string, LocalizedText>;

function localized(value: LocalizedText, locale: Locale) {
  return value[locale] || value.en;
}

function localeTag(locale: Locale) {
  if (locale === "hi") return "hi-IN";
  if (locale === "gu") return "gu-IN";
  return "en-IN";
}

export default async function ThankYouPage() {
  const receipt = await verifyLeadReceipt();
  if (!receipt) redirect("/contact#growth-check");

  const rawWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappNumber = rawWhatsappNumber.replace(/\D/g, "");
  const hasWhatsappNumber = /^\d{8,15}$/.test(whatsappNumber);
  const whatsappHref = hasWhatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        localized(copy.whatsappMessage, receipt.locale),
      )}`
    : "/contact#growth-check";

  return (
    <main className="thank-you-page" lang={localeTag(receipt.locale)}>
      <ThankYouConversion
        eventId={receipt.eventId}
        growthPath={receipt.growthPath}
      />

      <header className="thank-you-header">
        <a className="thank-you-brand" href="https://globalsurat.com/" aria-label="Global Surat website">
          <Image
            src="/assets/global-surat-logo.png"
            alt="Global Surat"
            width={212}
            height={113}
            priority
          />
        </a>
      </header>

      <section className="thank-you-card" aria-labelledby="thank-you-heading">
        <span className="thank-you-icon" aria-hidden="true">
          <CircleCheckBig size={48} strokeWidth={1.8} />
        </span>
        <p className="thank-you-eyebrow">{localized(copy.eyebrow, receipt.locale)}</p>
        <h1 id="thank-you-heading">{localized(copy.heading, receipt.locale)}</h1>
        <p className="thank-you-body">{localized(copy.body, receipt.locale)}</p>

        <a
          className="button button-primary thank-you-whatsapp"
          href={whatsappHref}
          target={hasWhatsappNumber ? "_blank" : undefined}
          rel={hasWhatsappNumber ? "noopener noreferrer" : undefined}
          data-cta-location="thank-you"
        >
          <MessageCircle size={20} aria-hidden="true" />
          {localized(copy.button, receipt.locale)}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>

        <p className="thank-you-privacy">
          <ShieldCheck size={17} aria-hidden="true" />
          {localized(copy.privacy, receipt.locale)}
        </p>
      </section>

      <footer className="thank-you-footer">
        <a href="https://globalsurat.com/" target="_blank" rel="noopener noreferrer">
          {localized(copy.website, receipt.locale)} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}
