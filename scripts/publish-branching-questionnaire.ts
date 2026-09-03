import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

import { defaultQuestions } from "../src/lib/default-questionnaire";
import { validateQuestionnaireFlow } from "../src/lib/questionnaire-flow";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(projectRoot, ".env.local"), quiet: true });

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL?.replace("-pooler.", ".");

if (!connectionString) {
  throw new Error("DATABASE_URL_UNPOOLED or DATABASE_URL is missing from .env.local");
}

const sql = neon(connectionString);

type FormRow = {
  id: string;
  current_published_version_id: string | null;
  max_version: number;
};

function questionInsert(versionId: string, question: (typeof defaultQuestions)[number]) {
  return sql.query(
    `INSERT INTO questions (
      id, version_id, question_key, question_type, label, help_text,
      placeholder, required, position, options, config, is_active
    ) VALUES (
      $1, $2, $3, $4, $5::jsonb, $6::jsonb,
      $7::jsonb, $8, $9, $10::jsonb, $11::jsonb, $12
    )`,
    [
      crypto.randomUUID(),
      versionId,
      question.key,
      question.type,
      JSON.stringify(question.label),
      JSON.stringify(question.helpText),
      JSON.stringify(question.placeholder),
      question.required,
      question.position,
      JSON.stringify(question.options),
      JSON.stringify(question.config),
      question.isActive,
    ],
  );
}

async function main() {
  const flowIssue = validateQuestionnaireFlow(defaultQuestions);
  if (flowIssue) throw new Error(`Default questionnaire is invalid: ${flowIssue}`);

  const rows = (await sql.query(
    `SELECT f.id, f.current_published_version_id,
            coalesce(max(fv.version_number), 0)::int AS max_version
     FROM forms f
     LEFT JOIN form_versions fv ON fv.form_id = f.id
     WHERE f.slug = 'growth-check'
     GROUP BY f.id, f.current_published_version_id
     LIMIT 1`,
  )) as FormRow[];
  const form = rows[0];
  if (!form) throw new Error("The growth-check form does not exist. Run npm run db:setup first.");

  if (form.current_published_version_id) {
    const alreadyPublished = (await sql.query(
      `SELECT 1
       FROM questions
       WHERE version_id = $1
         AND question_key = 'growth_path'
         AND is_active = true
       LIMIT 1`,
      [form.current_published_version_id],
    )) as Array<{ "?column?": number }>;

    if (alreadyPublished[0]) {
      console.log("The branching questionnaire is already published. No database changes were made.");
      return;
    }
  }

  const publishedVersionId = crypto.randomUUID();
  const draftVersionId = crypto.randomUUID();
  const publishedVersionNumber = Number(form.max_version) + 1;
  const draftVersionNumber = publishedVersionNumber + 1;

  const queries = [
    sql.query(
      `UPDATE form_versions
       SET status = 'archived', updated_at = now()
       WHERE form_id = $1 AND status IN ('published', 'draft')`,
      [form.id],
    ),
    sql.query(
      `INSERT INTO form_versions (
        id, form_id, version_number, status, published_at
      ) VALUES ($1, $2, $3, 'published', now())`,
      [publishedVersionId, form.id, publishedVersionNumber],
    ),
    ...defaultQuestions.map((question) => questionInsert(publishedVersionId, question)),
    sql.query(
      `INSERT INTO form_versions (id, form_id, version_number, status)
       VALUES ($1, $2, $3, 'draft')`,
      [draftVersionId, form.id, draftVersionNumber],
    ),
    ...defaultQuestions.map((question) => questionInsert(draftVersionId, question)),
    sql.query(
      `UPDATE forms
       SET current_published_version_id = $1, updated_at = now()
       WHERE id = $2`,
      [publishedVersionId, form.id],
    ),
    sql.query(
      `INSERT INTO audit_log (action, entity_type, entity_id, metadata)
       VALUES ('questionnaire.branching_published', 'form_version', $1, $2::jsonb)`,
      [
        publishedVersionId,
        JSON.stringify({
          publishedVersion: publishedVersionNumber,
          draftVersion: draftVersionNumber,
          questionCount: defaultQuestions.length,
        }),
      ],
    ),
  ];

  await sql.transaction(queries);

  console.log(`Published branching questionnaire version ${publishedVersionNumber}.`);
  console.log(`Created editable draft version ${draftVersionNumber}.`);
  console.log("Previous published and draft versions were archived without deleting their questions or leads.");
}

main().catch((error) => {
  console.error("Branching questionnaire publish failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
