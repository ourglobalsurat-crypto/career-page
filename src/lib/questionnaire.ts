import "server-only";

import { fallbackQuestionnaire } from "@/lib/default-questionnaire";
import { getSql, isDatabaseConfigured } from "@/lib/db";
import type {
  PublicQuestion,
  PublicQuestionnaire,
  QuestionConfig,
  QuestionOption,
  QuestionType,
} from "@/lib/types";

type FormRow = {
  form_id: string;
  version_id: string;
  slug: string;
  name: string;
  version_number: number;
};

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

function rowToQuestion(row: QuestionRow): PublicQuestion {
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

export async function getPublishedQuestionnaire(): Promise<PublicQuestionnaire> {
  if (!isDatabaseConfigured()) return fallbackQuestionnaire;

  try {
    const sql = getSql();
    const forms = (await sql.query(
      `SELECT f.id AS form_id, f.slug, f.name, fv.id AS version_id,
              fv.version_number
       FROM forms f
       JOIN form_versions fv ON fv.id = f.current_published_version_id
       WHERE f.slug = $1 AND fv.status = 'published'
       LIMIT 1`,
      ["growth-check"],
    )) as FormRow[];

    const form = forms[0];
    if (!form) return fallbackQuestionnaire;

    const questionRows = (await sql.query(
      `SELECT id, question_key, question_type, label, help_text, placeholder,
              required, position, options, config, is_active
       FROM questions
       WHERE version_id = $1 AND is_active = true
       ORDER BY position ASC, created_at ASC`,
      [form.version_id],
    )) as QuestionRow[];

    return {
      formId: form.form_id,
      versionId: form.version_id,
      slug: form.slug,
      name: form.name,
      version: Number(form.version_number),
      questions: questionRows.map(rowToQuestion),
    };
  } catch (error) {
    console.error("Unable to load the published questionnaire.", error);
    return fallbackQuestionnaire;
  }
}

export async function getDraftQuestionnaire(): Promise<PublicQuestionnaire | null> {
  const sql = getSql();
  const forms = (await sql.query(
    `SELECT f.id AS form_id, f.slug, f.name, fv.id AS version_id,
            fv.version_number
     FROM forms f
     JOIN form_versions fv ON fv.form_id = f.id
     WHERE f.slug = $1 AND fv.status = 'draft'
     ORDER BY fv.version_number DESC
     LIMIT 1`,
    ["growth-check"],
  )) as FormRow[];

  const form = forms[0];
  if (!form) return null;

  const rows = (await sql.query(
    `SELECT id, question_key, question_type, label, help_text, placeholder,
            required, position, options, config, is_active
     FROM questions
     WHERE version_id = $1
     ORDER BY position ASC, created_at ASC`,
    [form.version_id],
  )) as QuestionRow[];

  return {
    formId: form.form_id,
    versionId: form.version_id,
    slug: form.slug,
    name: form.name,
    version: Number(form.version_number),
    questions: rows.map(rowToQuestion),
  };
}
