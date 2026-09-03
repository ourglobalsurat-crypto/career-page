import crypto from "node:crypto";

import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { getDraftQuestionnaire } from "@/lib/questionnaire";
import { isSameOrigin, jsonError } from "@/lib/security";
import { questionPayloadSchema } from "@/lib/validation";

const choiceTypes = new Set(["single_choice", "multi_choice", "dropdown"]);

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);
  const admin = await getAdminSession();
  if (!admin) return jsonError("Please sign in again.", 401);
  if (admin.role === "viewer") return jsonError("Your account is read-only.", 403);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid question data.", 400);
  }

  const parsed = questionPayloadSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Check the question fields.", 400);

  const question = parsed.data;
  if (question.config.systemRole) {
    return jsonError("Core form roles cannot be assigned to new questions.", 400);
  }
  if (choiceTypes.has(question.type) && question.options.length < 2) {
    return jsonError("Choice questions need at least two options.", 400);
  }

  try {
    const draft = await getDraftQuestionnaire();
    if (!draft) return jsonError("No editable draft exists.", 409);

    const sql = getSql();
    const id = crypto.randomUUID();
    const position = draft.questions.length
      ? Math.max(...draft.questions.map((item) => item.position)) + 1
      : 1;

    await sql.transaction([
      sql.query(
        `INSERT INTO questions (
          id, version_id, question_key, question_type, label, help_text,
          placeholder, required, position, options, config, is_active
        ) VALUES (
          $1, $2, $3, $4, $5::jsonb, $6::jsonb, $7::jsonb,
          $8, $9, $10::jsonb, $11::jsonb, $12
        )`,
        [
          id,
          draft.versionId,
          question.key,
          question.type,
          JSON.stringify(question.label),
          JSON.stringify(question.helpText),
          JSON.stringify(question.placeholder),
          question.required,
          position,
          JSON.stringify(question.options),
          JSON.stringify(question.config),
          question.isActive,
        ],
      ),
      sql.query(
        `INSERT INTO audit_log (admin_id, action, entity_type, entity_id, metadata)
         VALUES ($1, 'question.created', 'question', $2, $3::jsonb)`,
        [admin.id, id, JSON.stringify({ key: question.key })],
      ),
    ]);

    return Response.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "23505") return jsonError("That question key is already in use.", 409);
    console.error("Question creation failed.", error);
    return jsonError("Could not add the question.", 503);
  }
}
