import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

import { defaultQuestions } from "../src/lib/default-questionnaire";
import type { LocalizedText, QuestionOption } from "../src/lib/types";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(projectRoot, ".env.local"), quiet: true });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing from .env.local");

const sql = neon(connectionString);

type VersionRow = {
  form_id: string;
  version_id: string;
  version_number: number;
};

type QuestionRow = {
  id: string;
  question_key: string;
  label: LocalizedText;
  help_text: LocalizedText;
  placeholder: LocalizedText;
  options: QuestionOption[];
};

const sourceByKey = new Map(defaultQuestions.map((question) => [question.key, question]));

function mergeLocalized(current: LocalizedText, source: LocalizedText): LocalizedText {
  return { ...current, hi: source.hi, gu: source.gu };
}

function mergeOptions(current: QuestionOption[], source: QuestionOption[]) {
  const sourceById = new Map(source.map((option) => [option.id, option]));
  return current.map((option) => {
    const replacement = sourceById.get(option.id);
    if (!replacement) return option;
    return {
      ...option,
      label: mergeLocalized(option.label, replacement.label),
      description: replacement.description
        ? mergeLocalized(
            option.description ?? { en: "", hi: "", gu: "" },
            replacement.description,
          )
        : option.description,
    };
  });
}

function translatedQuestion(row: QuestionRow) {
  const source = sourceByKey.get(row.question_key);
  if (!source) return null;
  return {
    label: mergeLocalized(row.label, source.label),
    helpText: mergeLocalized(row.help_text, source.helpText),
    placeholder: mergeLocalized(row.placeholder, source.placeholder),
    options: mergeOptions(row.options ?? [], source.options),
  };
}

function translationMatches(row: QuestionRow) {
  const translated = translatedQuestion(row);
  if (!translated) return true;
  return (
    row.label.hi === translated.label.hi &&
    row.label.gu === translated.label.gu &&
    row.help_text.hi === translated.helpText.hi &&
    row.help_text.gu === translated.helpText.gu &&
    row.placeholder.hi === translated.placeholder.hi &&
    row.placeholder.gu === translated.placeholder.gu &&
    JSON.stringify(row.options) === JSON.stringify(translated.options)
  );
}

async function questionsForVersion(versionId: string) {
  return (await sql.query(
    `SELECT id, question_key, label, help_text, placeholder, options
     FROM questions
     WHERE version_id = $1
     ORDER BY position ASC`,
    [versionId],
  )) as QuestionRow[];
}

async function main() {
  const versions = (await sql.query(
    `SELECT f.id AS form_id, fv.id AS version_id, fv.version_number
     FROM forms f
     JOIN form_versions fv ON fv.form_id = f.id
     WHERE f.slug = 'growth-check' AND fv.status = 'published'
     LIMIT 1`,
  )) as VersionRow[];
  const published = versions[0];
  if (!published) throw new Error("Published growth-check form was not found.");

  const publishedQuestions = await questionsForVersion(published.version_id);
  if (publishedQuestions.every(translationMatches)) {
    console.log("Gujarati and Hindi script copy is already published.");
    return;
  }

  const drafts = (await sql.query(
    `SELECT f.id AS form_id, fv.id AS version_id, fv.version_number
     FROM forms f
     JOIN form_versions fv ON fv.form_id = f.id
     WHERE f.slug = 'growth-check' AND fv.status = 'draft'
     ORDER BY fv.version_number DESC
     LIMIT 1`,
  )) as VersionRow[];
  const draft = drafts[0];
  if (!draft) throw new Error("Editable growth-check draft was not found.");

  const draftQuestions = await questionsForVersion(draft.version_id);
  const nextDraftId = crypto.randomUUID();
  const queries = draftQuestions.flatMap((row) => {
    const translated = translatedQuestion(row);
    if (!translated) return [];
    return [
      sql.query(
        `UPDATE questions
         SET label = $1::jsonb,
             help_text = $2::jsonb,
             placeholder = $3::jsonb,
             options = $4::jsonb,
             updated_at = now()
         WHERE id = $5 AND version_id = $6`,
        [
          JSON.stringify(translated.label),
          JSON.stringify(translated.helpText),
          JSON.stringify(translated.placeholder),
          JSON.stringify(translated.options),
          row.id,
          draft.version_id,
        ],
      ),
    ];
  });

  queries.push(
    sql.query(
      `UPDATE form_versions
       SET status = 'archived', updated_at = now()
       WHERE form_id = $1 AND status = 'published'`,
      [draft.form_id],
    ),
    sql.query(
      `UPDATE form_versions
       SET status = 'published', published_at = now(), updated_at = now()
       WHERE id = $1 AND status = 'draft'`,
      [draft.version_id],
    ),
    sql.query(
      `UPDATE forms
       SET current_published_version_id = $1, updated_at = now()
       WHERE id = $2`,
      [draft.version_id, draft.form_id],
    ),
    sql.query(
      `INSERT INTO form_versions (id, form_id, version_number, status)
       VALUES ($1, $2, $3, 'draft')`,
      [nextDraftId, draft.form_id, draft.version_number + 1],
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
      [nextDraftId, draft.version_id],
    ),
    sql.query(
      `INSERT INTO audit_log (action, entity_type, entity_id, metadata)
       VALUES ('questionnaire.language_copy_published', 'form_version', $1, $2::jsonb)`,
      [draft.version_id, JSON.stringify({ version: draft.version_number, locales: ["gu", "hi"] })],
    ),
  );

  await sql.transaction(queries);
  console.log(`Published questionnaire version ${draft.version_number} with Gujarati and Hindi script copy.`);
  console.log(`Created editable draft version ${draft.version_number + 1}.`);
}

main().catch((error) => {
  console.error("Language copy update failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
