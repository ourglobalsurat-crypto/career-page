"use client";

import { useEffect } from "react";

import type { GrowthPath } from "@/lib/types";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

const emittedInDocument = new Set<string>();

export function ThankYouConversion({
  eventId,
  growthPath,
}: {
  eventId: string;
  growthPath: GrowthPath | "general";
}) {
  useEffect(() => {
    const storageKey = `gs:generate-lead:${eventId}`;

    if (emittedInDocument.has(eventId)) return;

    try {
      if (window.sessionStorage.getItem(storageKey)) return;
      window.sessionStorage.setItem(storageKey, "1");
    } catch {
      // Storage can be unavailable in restrictive browser modes. The in-memory
      // guard still prevents React development replays from duplicating events.
    }

    emittedInDocument.add(eventId);

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: "generate_lead",
      event_id: eventId,
      growth_path: growthPath,
    });

    if (typeof window.fbq === "function") {
      window.fbq(
        "track",
        "Lead",
        { content_category: growthPath },
        { eventID: eventId },
      );
    }
  }, [eventId, growthPath]);

  return null;
}
