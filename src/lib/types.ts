export const locales = ["en", "hi", "gu"] as const;
export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export const growthPaths = ["lead_generation", "d2c_growth"] as const;
export type GrowthPath = string;

export const systemQuestionRoles = [
  "flow_selector",
  "contact_name",
  "contact_phone",
] as const;
export type SystemQuestionRole = (typeof systemQuestionRoles)[number];

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
  "url",
  "file",
  "image",
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
  /** Questions without a flow are shared by every questionnaire path. */
  flow?: GrowthPath;
  /** Stable internal meaning for questions whose copy remains admin-editable. */
  systemRole?: SystemQuestionRole;
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
export const leadStatusLabels: Record<LeadStatus,string> = {new:'New',contacted:'Interview',qualified:'Shortlisted',won:'Hired',not_interested:'Archived'};

export type LeadListItem = {
  positionKey: string | null;
  positionTitle: string | null;
  screening: import("./screening").Screening | null;
  reviewScore: number | null;
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
