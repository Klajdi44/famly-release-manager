import * as SegmentTypes from "./types";

const transformFrontendRulesToPrismaRules = (
  FrontendRules: SegmentTypes.Rule[]
) => {
  return FrontendRules.reduce(
    (acc, currentRule) => {
      // Rewrite values from frontend to match how Prisma expects it
      const currentRuleValue = currentRule.values.map(
        (rule: Record<string, string | number>) => {
          if (currentRule["attribute"] === "COUNTRY") {
            return { countryId: rule.id };
          }
          if (currentRule["attribute"] === "SUBSCRIPTION") {
            return { subscriptionId: rule.id };
          }
          if (currentRule["attribute"] === "SITE_ID") {
            return { id: rule.id };
          }
        }
      );

      const valuesToPrisma = currentRuleValue;
      if (currentRule.operator === "IS_ONE_OF") {
        acc["OR"].push(...valuesToPrisma);
      }

      // Case: Operator isNotOneOf (Goes to NOT array)
      if (currentRule.operator === "IS_NOT_ONE_OF") {
        acc["NOT"].push(...valuesToPrisma);
      }
      return acc;
    },
    {
      OR: [],
      NOT: [],
    }
  );
};

export { transformFrontendRulesToPrismaRules };
