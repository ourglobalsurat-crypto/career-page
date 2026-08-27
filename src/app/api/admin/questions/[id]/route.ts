import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { isSameOrigin, jsonError } from "@/lib/security";
import { questionPayloadSchema } from "@/lib/validation";

const choiceTypes = new Set(["single_choice", "multi_choice", "dropdown"]);

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
    return jsonError("Invalid question data.", 400);
  }

  const parsed = questionPayloadSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Check the question fields.", 400);
  const question = parsed.data;
  if (choiceTypes.has(question.type) && question.options.length < 2) {
    return jsonError("Choice questions need at least two options.", 400);
  }

  try {
    const sql = getSql();
    const rows = (await sql.query(
      `UPDATE questions q
       SET question_key = $1,
           question_type = $2,
           label = $3::jsonb,
           help_text = $4::jsonb,
           placeholder = $5::jsonb,
           required = $6,
           options = $7::jsonb,
           config = $8::jsonb,
           is_active = $9,
           updated_at = now()
       FROM form_versions fv
       WHERE q.id = $10
         AND q.version_id = fv.id
         AND fv.status = 'draft'
       RETURNING q.id`,
      [
        question.key,
        question.type,
        JSON.stringify(question.label),
        JSON.stringify(question.helpText),
        JSON.stringify(question.placeholder),
        question.required,
        JSON.stringify(question.options),
        JSON.stringify(question.config),
        question.isActive,
        id,
      ],
    )) as { id: string }[];

    if (!rows[0]) return jsonError("Question was not found in the current draft.", 404);

    await sql.query(
      `INSERT INTO audit_log (admin_id, action, entity_type, entity_id, metadata)
       VALUES ($1, 'question.updated', 'question', $2, $3::jsonb)`,
      [admin.id, id, JSON.stringify({ key: question.key })],
    );

    return Response.json({ ok: true });
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "23505") return jsonError("That question key is already in use.", 409);
    console.error("Question update failed.", error);
    return jsonError("Could not update the question.", 503);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);
  const admin = await getAdminSession();
  if (!admin) return jsonError("Please sign in again.", 401);
  if (admin.role === "viewer") return jsonError("Your account is read-only.", 403);

  const { id } = await context.params;

  try {
    const sql = getSql();
    const rows = (await sql.query(
      `DELETE FROM questions q
       USING form_versions fv
       WHERE q.id = $1
         AND q.version_id = fv.id
         AND fv.status = 'draft'
       RETURNING q.id, q.question_key`,
      [id],
    )) as { id: string; question_key: string }[];
    const removed = rows[0];
    if (!removed) return jsonError("Question was not found in the current draft.", 404);

    await sql.query(
      `INSERT INTO audit_log (admin_id, action, entity_type, entity_id, metadata)
       VALUES ($1, 'question.deleted', 'question', $2, $3::jsonb)`,
      [admin.id, id, JSON.stringify({ key: removed.question_key })],
    );
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Question deletion failed.", error);
    return jsonError("Could not delete the question.", 503);
  }
}
