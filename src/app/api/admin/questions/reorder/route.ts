import { z } from "zod";

import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { getDraftQuestionnaire } from "@/lib/questionnaire";
import { isSameOrigin, jsonError } from "@/lib/security";

const schema = z.object({ ids: z.array(z.string().uuid()).min(1).max(100) });

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);
  const admin = await getAdminSession();
  if (!admin) return jsonError("Please sign in again.", 401);
  if (admin.role === "viewer") return jsonError("Your account is read-only.", 403);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid order data.", 400);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success || new Set(parsed.data.ids).size !== parsed.data.ids.length) {
    return jsonError("Invalid question order.", 400);
  }

  try {
    const draft = await getDraftQuestionnaire();
    if (!draft) return jsonError("No editable draft exists.", 409);
    const draftIds = new Set(draft.questions.map((question) => question.id));
    if (parsed.data.ids.length !== draftIds.size || parsed.data.ids.some((id) => !draftIds.has(id))) {
      return jsonError("Question list changed. Refresh and try again.", 409);
    }

    const sql = getSql();
    const queries = parsed.data.ids.map((id, index) =>
      sql.query(
        `UPDATE questions SET position = $1, updated_at = now()
         WHERE id = $2 AND version_id = $3`,
        [index + 1, id, draft.versionId],
      ),
    );
    await sql.transaction(queries);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Question reorder failed.", error);
    return jsonError("Could not save the new order.", 503);
  }
}
