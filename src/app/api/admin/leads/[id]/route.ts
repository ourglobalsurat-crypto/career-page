import { z } from "zod";

import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { isSameOrigin, jsonError } from "@/lib/security";
import { leadStatuses } from "@/lib/types";

const payloadSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("status"), status: z.enum(leadStatuses) }),
  z.object({ action: z.literal("note"), note: z.string().trim().min(1).max(2000) }),
]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);
  const admin = await getAdminSession();
  if (!admin) return jsonError("Please sign in again.", 401);
  if (admin.role === "viewer") return jsonError("Your account is read-only.", 403);

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid update.", 400);
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) return jsonError("Check the update and try again.", 400);

  try {
    const sql = getSql();
    if (parsed.data.action === "status") {
      const rows = (await sql.query(
        `UPDATE leads SET status = $1, updated_at = now()
         WHERE id = $2 RETURNING id`,
        [parsed.data.status, id],
      )) as { id: string }[];
      if (!rows[0]) return jsonError("Lead not found.", 404);

      await sql.query(
        `INSERT INTO audit_log (admin_id, action, entity_type, entity_id, metadata)
         VALUES ($1, 'lead.status_changed', 'lead', $2, $3::jsonb)`,
        [admin.id, id, JSON.stringify({ status: parsed.data.status })],
      );
    } else {
      const rows = (await sql.query(`SELECT id FROM leads WHERE id = $1 LIMIT 1`, [id])) as { id: string }[];
      if (!rows[0]) return jsonError("Lead not found.", 404);
      await sql.query(
        `INSERT INTO lead_notes (lead_id, admin_id, note) VALUES ($1, $2, $3)`,
        [id, admin.id, parsed.data.note],
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead update failed.", error);
    return jsonError("Could not update the lead.", 503);
  }
}
