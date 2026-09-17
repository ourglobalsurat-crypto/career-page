import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowUpRight, CircleCheckBig, MessageCircle, ShieldCheck } from "lucide-react";

import { ThankYouConversion } from "@/components/thank-you-conversion";
import { verifyLeadReceipt } from "@/lib/lead-receipt";
import type { Locale, LocalizedText } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Application Received",
  description: "Your application has been received by the Global Surat hiring team.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const copy = {"eyebrow": {"en": "APPLICATION RECEIVED", "hi": "", "gu": ""}, "heading": {"en": "Thank you for applying!", "hi": "", "gu": ""}, "body": {"en": "Our hiring team will review your experience, answers and résumé. If your profile matches the role, we will contact you about the next step.", "hi": "", "gu": ""}, "button": {"en": "Contact our team on WhatsApp", "hi": "", "gu": ""}, "privacy": {"en": "Your application is private with our hiring team.", "hi": "", "gu": ""}, "website": {"en": "Visit Global Surat", "hi": "", "gu": ""}, "whatsappMessage": {"en": "Hi Global Surat, I have submitted my career application and have a question about the hiring process.", "hi": "", "gu": ""}} satisfies Record<string, LocalizedText>;

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
