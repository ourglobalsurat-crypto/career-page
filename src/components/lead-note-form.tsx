"use client";

import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LeadNoteForm({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) return;
    setError("");
    setIsSaving(true);
    const response = await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "note", note }),
    });
    if (!response.ok) {
      const result = (await response.json()) as { message?: string };
      setError(result.message || "Could not save note.");
    } else {
      setNote("");
      router.refresh();
    }
    setIsSaving(false);
  }

  return (
    <form className="lead-note-form" onSubmit={submit}>
      <label htmlFor="lead-note">Add an internal note</label>
      <textarea id="lead-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Call outcome, next follow-up, important details..." maxLength={2000} rows={4} />
      {error && <p className="admin-form-error">{error}</p>}
      <button type="submit" disabled={isSaving || !note.trim()}>{isSaving ? "Saving..." : "Save note"} <Send size={16} /></button>
    </form>
  );
}
