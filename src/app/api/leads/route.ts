import crypto from "node:crypto";

import { getSql } from "@/lib/db";
import { rateLimit, requestFingerprint } from "@/lib/rate-limit";
import { jsonError } from "@/lib/security";
import type { PublicQuestion, QuestionConfig, QuestionOption, QuestionType } from "@/lib/types";
import { leadSubmissionSchema, validateQuestionAnswer } from "@/lib/validation";

export const runtime = "nodejs";

type QuestionRow = {
  id: string;
  question_key: string;
  question_type: QuestionType;
  label: PublicQuestion["label"];
  help_text: PublicQuestion["helpText"];
  placeholder: PublicQuestion["placeholder"];
  required: boolean;
  position: number;
  options: QuestionOption[];
  config: QuestionConfig;
  is_active: boolean;
};

function toPublicQuestion(row: QuestionRow): PublicQuestion {
  return {
    id: row.id,
    key: row.question_key,
    type: row.question_type,
    label: row.label,
    helpText: row.help_text,
    placeholder: row.placeholder,
    required: row.required,
    position: row.position,
    options: row.options ?? [],
    config: row.config ?? {},
    isActive: row.is_active,
  };
}

export async function POST(request: Request) {
  const fingerprint = requestFingerprint(request);
  if (!rateLimit(`lead:${fingerprint}`, 12, 10 * 60 * 1000).allowed) {
    return jsonError("Too many attempts. Please wait a few minutes and try again.", 429);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonError("Please send a valid form submission.", 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("We could not read your answers. Please try again.", 400);
  }

  const parsed = leadSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Please check the form and try again.", 400);
  }

  const payload = parsed.data;
  const completionMs = Date.now() - payload.startedAt;
  if (completionMs < 1500 || completionMs > 6 * 60 * 60 * 1000) {
    return jsonError("This form session has expired. Please refresh and try again.", 400);
  }

  try {
    const sql = getSql();
    const formRows = (await sql.query(
      `SELECT fv.id
       FROM form_versions fv
       JOIN forms f ON f.id = fv.form_id
       WHERE fv.id = $1
         AND f.id = $2
         AND (
           fv.status = 'published'
           OR (fv.status = 'archived' AND fv.updated_at > now() - interval '24 hours')
         )
       LIMIT 1`,
      [payload.versionId, payload.formId],
    )) as { id: string }[];

    if (!formRows[0]) {
      return jsonError("The questions were updated. Please refresh and try once more.", 409);
    }

    const questionRows = (await sql.query(
      `SELECT id, question_key, question_type, label, help_text, placeholder,
              required, position, options, config, is_active
       FROM questions
       WHERE version_id = $1 AND is_active = true
       ORDER BY position ASC`,
      [payload.versionId],
    )) as QuestionRow[];

    const questions = questionRows.map(toPublicQuestion);
    const allowedKeys = new Set(questions.map((question) => question.key));
    if (Object.keys(payload.answers).some((key) => !allowedKeys.has(key))) {
      return jsonError("The form contains an answer we do not recognize.", 400);
    }

    const validatedAnswers: Array<{
      question: PublicQuestion;
      value: unknown;
    }> = [];

    for (const question of questions) {
      const result = validateQuestionAnswer(question, payload.answers[question.key]);
      if (!result.ok) {
        return Response.json(
          { ok: false, message: result.message, questionKey: question.key },
          { status: 400 },
        );
      }
      if (result.value !== null) validatedAnswers.push({ question, value: result.value });
    }

    const existing = (await sql.query(
      `SELECT id FROM leads WHERE submission_token = $1 LIMIT 1`,
      [payload.submissionToken],
    )) as { id: string }[];
    if (existing[0]) return Response.json({ ok: true, leadId: existing[0].id });

    const byKey = new Map(validatedAnswers.map((item) => [item.question.key, item.value]));
    const name = typeof byKey.get("full_name") === "string" ? byKey.get("full_name") : null;
    const phone = typeof byKey.get("phone") === "string" ? byKey.get("phone") : null;
    const email = typeof byKey.get("email") === "string" ? byKey.get("email") : null;
    const city = typeof byKey.get("city") === "string" ? byKey.get("city") : null;
    const leadId = crypto.randomUUID();
    const attribution = payload.attribution ?? {};
    const utm = {
      source: attribution.utmSource ?? "",
      medium: attribution.utmMedium ?? "",
      campaign: attribution.utmCampaign ?? "",
      content: attribution.utmContent ?? "",
      term: attribution.utmTerm ?? "",
    };

    const queries = [
      sql.query(
        `INSERT INTO leads (
          id, form_id, form_version_id, language, name, phone, email, city,
          status, source, referrer, utm, consent_at, submission_token
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          'new', $9, $10, $11::jsonb, now(), $12
        )`,
        [
          leadId,
          payload.formId,
          payload.versionId,
          payload.language,
          name,
          phone,
          email,
          city,
          attribution.utmSource || attribution.source || "direct",
          attribution.referrer || null,
          JSON.stringify(utm),
          payload.submissionToken,
        ],
      ),
      ...validatedAnswers.map(({ question, value }) =>
        sql.query(
          `INSERT INTO lead_answers (
            id, lead_id, question_id, question_key, answer, question_snapshot
          ) VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)`,
          [
            crypto.randomUUID(),
            leadId,
            question.id,
            question.key,
            JSON.stringify(value),
            JSON.stringify({
              type: question.type,
              label: question.label,
              options: question.options,
            }),
          ],
        ),
      ),
    ];

    await sql.transaction(queries);
    return Response.json({ ok: true, leadId }, { status: 201 });
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    if (code === "23505") return Response.json({ ok: true });

    console.error("Lead submission failed.", error);
    return jsonError("Something went wrong while saving your details. Please try again.", 503);
  }
}
