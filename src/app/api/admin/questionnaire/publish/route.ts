import crypto from "node:crypto";

import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { getDraftQuestionnaire } from "@/lib/questionnaire";
import { validateQuestionnaireFlow } from "@/lib/questionnaire-flow";
import { isSameOrigin, jsonError } from "@/lib/security";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);
  const admin = await getAdminSession();
  if (!admin) return jsonError("Please sign in again.", 401);
  if (admin.role === "viewer") return jsonError("Your account is read-only.", 403);

  try {
    const draft = await getDraftQuestionnaire();
    if (!draft) return jsonError("No editable draft exists.", 409);
    if (draft.questions.length === 0) return jsonError("Add at least one question before publishing.", 400);
    const flowError = validateQuestionnaireFlow(draft.questions);
    if (flowError) return jsonError(flowError, 400);

    const sql = getSql();
    const nextVersionId = crypto.randomUUID();
    const nextVersionNumber = draft.version + 1;

    await sql.transaction([
      sql.query(
        `UPDATE form_versions
         SET status = 'archived', updated_at = now()
         WHERE form_id = $1 AND status = 'published'`,
        [draft.formId],
      ),
      sql.query(
        `UPDATE form_versions
         SET status = 'published', published_at = now(), updated_at = now()
         WHERE id = $1 AND status = 'draft'`,
        [draft.versionId],
      ),
      sql.query(
        `UPDATE forms
         SET current_published_version_id = $1, updated_at = now()
         WHERE id = $2`,
        [draft.versionId, draft.formId],
      ),
      sql.query(
        `INSERT INTO form_versions (id, form_id, version_number, status)
         VALUES ($1, $2, $3, 'draft')`,
        [nextVersionId, draft.formId, nextVersionNumber],
      ),
      sql.query(
        `INSERT INTO questions (
          id, version_id, question_key, question_type, label, help_text,
          placeholder, required, position, options, config, is_active
        )
        SELECT gen_random_uuid(), $1, question_key, question_type, label, help_text,
               placeholder, required, position, options, config, is_active
        FROM questions
        WHERE version_id = $2
        ORDER BY position`,
        [nextVersionId, draft.versionId],
      ),
      sql.query(
        `INSERT INTO audit_log (admin_id, action, entity_type, entity_id, metadata)
         VALUES ($1, 'questionnaire.published', 'form_version', $2, $3::jsonb)`,
        [admin.id, draft.versionId, JSON.stringify({ version: draft.version })],
      ),
    ]);

    return Response.json({ ok: true, publishedVersion: draft.version });
  } catch (error) {
    console.error("Questionnaire publish failed.", error);
    return jsonError("Could not publish the questionnaire.", 503);
  }
}
