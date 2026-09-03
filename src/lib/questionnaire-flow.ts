import {
  growthPaths,
  type GrowthPath,
  type PublicQuestion,
  type SystemQuestionRole,
} from "@/lib/types";

type AnswerMap = Record<string, unknown>;

const systemRoleLabels: Record<SystemQuestionRole, string> = {
  flow_selector: "service-path selector",
  contact_name: "contact-name question",
  contact_phone: "contact-phone question",
};

export function isGrowthPath(value: unknown): value is GrowthPath {
  return typeof value === "string" && growthPaths.some((path) => path === value);
}

function findActiveFlowSelector(questions: readonly PublicQuestion[]) {
  return questions.find(
    (question) => question.isActive && question.config.systemRole === "flow_selector",
  );
}

export function getSelectedGrowthPath(
  questions: readonly PublicQuestion[],
  answers: AnswerMap,
): GrowthPath | null {
  const selector = findActiveFlowSelector(questions);
  if (!selector) return null;

  const answer = answers[selector.key];
  return isGrowthPath(answer) ? answer : null;
}

export function getVisibleQuestions(
  questions: readonly PublicQuestion[],
  answers: AnswerMap,
): PublicQuestion[] {
  const selector = findActiveFlowSelector(questions);

  // Recently archived questionnaires can still be submitted for 24 hours. Those
  // legacy versions have no selector and must keep their original linear flow.
  if (!selector) return [...questions];

  const selectedPath = getSelectedGrowthPath(questions, answers);
  return questions.filter((question) => {
    if (question.id === selector.id) return true;
    if (question.config.flow === undefined) return true;
    return selectedPath !== null && question.config.flow === selectedPath;
  });
}

export function pruneHiddenAnswers(
  questions: readonly PublicQuestion[],
  answers: AnswerMap,
): AnswerMap {
  const visibleKeys = new Set(
    getVisibleQuestions(questions, answers).map((question) => question.key),
  );

  return Object.fromEntries(
    Object.entries(answers).filter(([questionKey]) => visibleKeys.has(questionKey)),
  );
}

export function validateQuestionnaireFlow(
  questions: readonly PublicQuestion[],
): string | null {
  const selectors = questions.filter(
    (question) => question.config.systemRole === "flow_selector",
  );
  if (selectors.length !== 1) {
    return "The questionnaire must contain exactly one service-path selector.";
  }

  const selector = selectors[0];
  if (!selector.isActive) return "The service-path selector must be visible.";
  if (!selector.required) return "The service-path selector must be required.";
  if (selector.type !== "single_choice") {
    return "The service-path selector must use the Single choice answer type.";
  }
  if (selector.config.flow !== undefined) {
    return "The service-path selector must be shared by both form paths.";
  }

  const selectorOptionIds = selector.options.map((option) => option.id);
  const uniqueSelectorOptionIds = new Set(selectorOptionIds);
  if (
    selectorOptionIds.length !== growthPaths.length ||
    uniqueSelectorOptionIds.size !== growthPaths.length ||
    growthPaths.some((path) => !uniqueSelectorOptionIds.has(path))
  ) {
    return "The service-path selector must keep exactly the Lead Generation and D2C Growth options.";
  }

  const activeQuestions = questions
    .filter((question) => question.isActive)
    .sort((left, right) => left.position - right.position);
  if (activeQuestions[0]?.id !== selector.id) {
    return "The service-path selector must be the first visible question.";
  }

  for (const question of questions) {
    if (question.config.flow !== undefined && !isGrowthPath(question.config.flow)) {
      return `Question "${question.label.en || question.key}" has an invalid form path.`;
    }
  }

  for (const path of growthPaths) {
    if (
      !activeQuestions.some(
        (question) => question.config.flow === path && !question.config.systemRole,
      )
    ) {
      const label = path === "lead_generation" ? "Lead Generation" : "D2C Growth";
      return `Add at least one visible question to the ${label} path.`;
    }
  }

  const requiredSystemQuestions: Array<{
    role: Exclude<SystemQuestionRole, "flow_selector">;
    type: PublicQuestion["type"];
  }> = [
    { role: "contact_name", type: "short_text" },
    { role: "contact_phone", type: "phone" },
  ];

  for (const { role, type } of requiredSystemQuestions) {
    const matches = questions.filter((question) => question.config.systemRole === role);
    if (matches.length !== 1) {
      return `The questionnaire must contain exactly one ${systemRoleLabels[role]}.`;
    }

    const question = matches[0];
    if (!question.isActive || !question.required) {
      return `The ${systemRoleLabels[role]} must be visible and required.`;
    }
    if (question.type !== type) {
      const expected = type === "phone" ? "Phone" : "Short text";
      return `The ${systemRoleLabels[role]} must use the ${expected} answer type.`;
    }
    if (question.config.flow !== undefined) {
      return `The ${systemRoleLabels[role]} must be shared by both form paths.`;
    }
  }

  return null;
}
