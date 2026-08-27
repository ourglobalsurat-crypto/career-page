import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import { getPublishedQuestionnaire } from "@/lib/questionnaire";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free Business Growth Check",
  description:
    "Answer a few easy questions and get a clear growth recommendation from Global Surat.",
};

export default async function ContactLandingPage() {
  const questionnaire = await getPublishedQuestionnaire();
  return <LandingPage questionnaire={questionnaire} />;
}
