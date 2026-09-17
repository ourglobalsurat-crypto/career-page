import { z } from "zod";

import {
  locales,
  questionTypes,
  systemQuestionRoles,
  type PublicQuestion,
  type QuestionOption,
} from "@/lib/types";

export const localizedTextSchema = z.object({
  en: z.string().trim().max(500),
  hi: z.string().trim().max(500),
  gu: z.string().trim().max(500),
});

export const questionOptionSchema = z.object({
  id: z.string().trim().min(1).max(80),
  label: localizedTextSchema,
  description: localizedTextSchema.optional(),
});

export const questionPayloadSchema = z.object({
  key: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9_]+$/),
  type: z.enum(questionTypes),
  label: localizedTextSchema.refine((value) => value.en.length > 0, {
    message: "English question text is required.",
  }),
  helpText: localizedTextSchema,
  placeholder: localizedTextSchema,
  required: z.boolean(),
  options: z.array(questionOptionSchema).max(50),
  config: z.object({
    minLength: z.number().int().min(0).max(5000).optional(),
    maxLength: z.number().int().min(1).max(5000).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    minSelections: z.number().int().min(0).max(50).optional(),
    maxSelections: z.number().int().min(1).max(50).optional(),
    allowOther: z.boolean().optional(),
    flow: z.string().regex(/^[a-z0-9_]+$/).max(80).optional(),
    systemRole: z.enum(systemQuestionRoles).optional(),
  }),
  isActive: z.boolean().default(true),
});

export const leadSubmissionSchema = z.object({
  formId: z.string().uuid(),
  versionId: z.string().uuid(),
  language: z.enum(locales),
  answers: z.record(z.string().min(1).max(100), z.unknown()),
  submissionToken: z.string().uuid(),
  consent: z.literal(true),
  startedAt: z.number().int().positive(),
  honeypot: z.string().max(0),
  attribution: z
    .object({
      source: z.string().trim().max(100).optional(),
      referrer: z.string().trim().max(500).optional(),
      utmSource: z.string().trim().max(100).optional(),
      utmMedium: z.string().trim().max(100).optional(),
      utmCampaign: z.string().trim().max(200).optional(),
      utmContent: z.string().trim().max(200).optional(),
      utmTerm: z.string().trim().max(200).optional(),
      fbclid: z.string().trim().max(250).optional(),
      gclid: z.string().trim().max(250).optional(),
    })
    .optional(),
});

export function normalizeIndianPhone(input: string) {
  if (!/^\+?[\d\s()-]+$/.test(input.trim())) return null;
  const cleaned = input.trim().replace(/[\s()-]/g, "");
  const digits = cleaned.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;

  if (/^[6-9]\d{9}$/.test(local)) return `+91${local}`;
  if (cleaned.startsWith("+91")) return null;
  if (/^\+[1-9]\d{7,14}$/.test(cleaned)) return cleaned;
  return null;
}

function isEmpty(value: unknown) {
  return (
    value == null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
}

type AnswerResult =
  | { ok: true; value: unknown }
  | { ok: false; message: string };

export function validateQuestionAnswer(
  question: PublicQuestion,
  answer: unknown,
): AnswerResult {
  if (isEmpty(answer)) {
    return question.required
      ? { ok: false, message: "This answer is required." }
      : { ok: true, value: null };
  }

  const { type, config } = question;
  if (type === "file" || type === "image") {
    return typeof answer === "string" && z.string().uuid().safeParse(answer).success
      ? { ok: true, value: answer } : { ok: false, message: type === 'image' ? 'Please upload an image.' : 'Please upload your résumé.' };
  }
  if (type === "url") {
    if (typeof answer !== "string") return { ok: false, message: "Enter a valid link." };
    try { const url = new URL(answer.trim());
      if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password || answer.length > 2000) throw new Error();
      return { ok: true, value: url.href };
    } catch { return { ok: false, message: "Enter a complete https:// or http:// link." }; }
  }

  if (["short_text", "long_text", "email", "phone"].includes(type)) {
    if (typeof answer !== "string") return { ok: false, message: "Invalid text answer." };
    const value = answer.trim();
    const maxLength = config.maxLength ?? (type === "long_text" ? 2000 : 250);
    const minLength = config.minLength ?? (question.required ? type === 'long_text' ? Math.min(20,maxLength) : 1 : 0);

    if (value.length < minLength) return { ok: false, message: `Please enter at least ${minLength} characters.` };
    if (value.length > maxLength) return { ok: false, message: `Please keep your answer within ${maxLength} characters.` };

    if ((config.systemRole === 'contact_name' || question.key === 'full_name') && (!/^[\p{L}\p{M} .'’\-]+$/u.test(value) || (value.match(/\p{L}/gu)?.length ?? 0) < 2)) {
      return {ok:false,message:'Enter your name using letters, spaces, apostrophes or hyphens.'};
    }
    if (question.key === 'city' && (value.match(/\p{L}/gu)?.length ?? 0) < 2) return {ok:false,message:'Enter a valid city name.'};

    if (type === "email" && !z.string().email().safeParse(value).success) {
      return { ok: false, message: "Enter a valid email address." };
    }

    if (type === "phone") {
      const phone = normalizeIndianPhone(value);
      if (!phone) return { ok: false, message: "Enter a 10-digit Indian mobile number starting with 6–9, or an international number with its country code." };
      return { ok: true, value: phone };
    }

    return { ok: true, value };
  }

  if (type === "number" || type === "rating") {
    if ((typeof answer !== 'string' && typeof answer !== 'number') || (typeof answer === 'string' && !/^-?\d+(?:\.\d+)?$/.test(answer.trim()))) return {ok:false,message:'Enter a valid number.'};
    const value = typeof answer === "number" ? answer : Number(answer);
    if (!Number.isFinite(value)) return { ok: false, message: "Enter a valid number." };
    if (type === 'rating' && !Number.isInteger(value)) return {ok:false,message:'Choose a whole-number rating.'};
    if (['current_salary','expected_salary'].includes(question.key) && (value < 0 || (question.key === 'expected_salary' && value === 0) || Math.abs(value*100-Math.round(value*100)) > 0.00001)) return {ok:false,message:question.key === 'expected_salary' ? 'Enter an expected monthly salary greater than zero, with up to two decimal places.' : 'Enter a salary of zero or more, with up to two decimal places.'};
    const min = config.min ?? (type === "rating" ? 1 : Number.NEGATIVE_INFINITY);
    const max = config.max ?? (type === "rating" ? 5 : Number.POSITIVE_INFINITY);
    if (value < min || value > max) return { ok: false, message: "Number is outside the allowed range." };
    return { ok: true, value };
  }

  if (["single_choice", "dropdown", "yes_no"].includes(type)) {
    if (typeof answer !== "string") return { ok: false, message: "Choose one option." };
    const allowed = question.options.map((option) => option.id);
    const yesNoAllowed = type === "yes_no" ? ["yes", "no"] : [];
    if (![...allowed, ...yesNoAllowed].includes(answer)) {
      return { ok: false, message: "Selected option is not available." };
    }
    return { ok: true, value: answer };
  }

  if (type === "multi_choice") {
    if (!Array.isArray(answer) || answer.some((item) => typeof item !== "string")) {
      return { ok: false, message: "Choose one or more available options." };
    }
    const allowed = new Set(question.options.map((option: QuestionOption) => option.id));
    if(new Set(answer).size !== answer.length) return {ok:false,message:'Choose each option only once.'};
    if (answer.some((item) => !allowed.has(item as string))) {
      return { ok: false, message: "One or more selected options are not available." };
    }
    const min = config.minSelections ?? (question.required ? 1 : 0);
    const max = config.maxSelections ?? question.options.length;
    if (answer.length < min || answer.length > max) {
      return { ok: false, message: "Choose the allowed number of options." };
    }
    return { ok: true, value: answer };
  }

  if (type === "date") {
    if (typeof answer !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(answer) || !Number.isFinite(Date.parse(answer)) || new Date(answer).toISOString().slice(0,10) !== answer) {
      return { ok: false, message: "Choose a valid date." };
    }
    return { ok: true, value: answer };
  }

  return { ok: false, message: "Unsupported answer type." };
}
