import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import { getPublishedQuestionnaire } from "@/lib/questionnaire";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Apply for your next role at Global Surat.",
};

export default async function ContactLandingPage() {
  const questionnaire = await getPublishedQuestionnaire();
  return <LandingPage questionnaire={questionnaire} />;
}
