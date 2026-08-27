import { LandingPage } from "@/components/landing-page";
import { getPublishedQuestionnaire } from "@/lib/questionnaire";

export const dynamic = "force-dynamic";

export default async function Home() {
  const questionnaire = await getPublishedQuestionnaire();
  return <LandingPage questionnaire={questionnaire} />;
}
