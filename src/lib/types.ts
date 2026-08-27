export const locales = ["en", "hi", "gu"] as const;
export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export const questionTypes = [
  "short_text",
  "long_text",
  "email",
  "phone",
  "number",
  "single_choice",
  "multi_choice",
  "dropdown",
  "yes_no",
  "date",
  "rating",
] as const;

export type QuestionType = (typeof questionTypes)[number];

export type QuestionOption = {
  id: string;
  label: LocalizedText;
  description?: LocalizedText;
};

export type QuestionConfig = {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  minSelections?: number;
  maxSelections?: number;
  allowOther?: boolean;
};

export type PublicQuestion = {
  id: string;
  key: string;
  type: QuestionType;
  label: LocalizedText;
  helpText: LocalizedText;
  placeholder: LocalizedText;
  required: boolean;
  position: number;
  options: QuestionOption[];
  config: QuestionConfig;
  isActive: boolean;
};

export type PublicQuestionnaire = {
  formId: string;
  versionId: string;
  slug: string;
  name: string;
  version: number;
  questions: PublicQuestion[];
  isFallback?: boolean;
};

export const leadStatuses = [
  "new",
  "contacted",
  "qualified",
  "won",
  "not_interested",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type LeadListItem = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  language: Locale;
  status: LeadStatus;
  source: string | null;
  createdAt: string;
};

export type LeadAnswer = {
  id: string;
  questionKey: string;
  answer: unknown;
  questionSnapshot: {
    type: QuestionType;
    label: LocalizedText;
    options: QuestionOption[];
  };
};

export type LeadNote = {
  id: string;
  note: string;
  createdAt: string;
  adminEmail: string;
};

export type LeadDetail = LeadListItem & {
  referrer: string | null;
  utm: Record<string, string>;
  consentAt: string;
  answers: LeadAnswer[];
  notes: LeadNote[];
};
