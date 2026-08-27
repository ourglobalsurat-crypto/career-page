"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { leadStatuses, type LeadStatus } from "@/lib/types";

const labels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  won: "Won",
  not_interested: "Not interested",
};

export function LeadStatusControl({ id, initialStatus }: { id: string; initialStatus: LeadStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isSaving, setIsSaving] = useState(false);

  async function update(nextStatus: LeadStatus) {
    const previous = status;
    setStatus(nextStatus);
    setIsSaving(true);
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "status", status: nextStatus }),
    });
    if (!response.ok) setStatus(previous);
    else router.refresh();
    setIsSaving(false);
  }

  return (
    <select className={`lead-status-select status-${status}`} value={status} onChange={(event) => update(event.target.value as LeadStatus)} disabled={isSaving} aria-label="Lead status">
      {leadStatuses.map((item) => <option key={item} value={item}>{labels[item]}</option>)}
    </select>
  );
}
