import * as SegmentTypes from "./types";

const transformFrontendRulesToPrismaRules = (FrontendRules: SegmentTypes.Rule[]) => {
  return FrontendRules.reduce(
    (acc, currentRule) => {
      // Rewrite values from frontend to match how Prisma expects it
      const currentRuleValue = currentRule.values.map((value: Record<string, string | number>) => {
        if (currentRule["attribute"] === "COUNTRY") {
          return { countryId: value.id };
        }
        if (currentRule["attribute"] === "SUBSCRIPTION") {
          return { subscriptionId: value.id };
        }
        if (currentRule["attribute"] === "SITE_ID") {
          return { id: value.id };
        }
      });

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

function getCombinations(countries: any = [], subscriptions: any = []) {
  // This function takes two arrays. An array of countryIds and an array of subscriptionIds
  // Its returns all possible combinations of the ids provided
  const combinations = [];
  for (const countryId of countries) {
    for (const subscriptionId of subscriptions) {
      combinations.push({ countryId, subscriptionId });
    }
  }
  return combinations;
}

function sortRulesArrayByOperatorAndAttributes(rulesArray: any) {
  console.log("** Running sortRules: ", rulesArray);
  // This function takes the rules array as it is stored in the database and sorts it based on the operators isOneOf
  // and isNotOneOf. The return value looks like this object
  // {
  //    isOneOf: { Country: [ 1, 2, 3, 7 ], Subscription: [ 1, 2, 3, 4 ], SiteId: [1,2,3,] },
  //    isNotOneOf: { SiteId: [ 5, 8, 17, 90, 87, 41 ] },
  // }
  const reducer = rulesArray.reduce(
    (acc: any, currentRule: any) => {
      if (acc[currentRule.operator][currentRule.attribute] === undefined) {
        acc[currentRule.operator][currentRule.attribute] = currentRule.values.map((value: any) => value.id);
      } else {
        const values = currentRule.values.map((value: any) => value.id);
        acc[currentRule.operator][currentRule.attribute].push(...values);
      }
      return acc;
    },
    { IS_ONE_OF: {}, IS_NOT_ONE_OF: {} }
  );
  return reducer;
}

function createPrismaQueryObjects(attribute: string, ids: []) {
  // This function takes an attribute and an array of ids
  // It returns an array of query objects in this format:
  // [ {attribute: id} ] --> [ {countryId: 1}, { countryId: 2} ]
  const key = attribute === "COUNTRY" ? "countryId" : attribute === "SUBSCRIPTION" ? "subscriptionId" : "id";
  const objects = [];
  for (const id of ids) {
    objects.push({ [key]: id });
  }
  return objects;
}

export { transformFrontendRulesToPrismaRules, getCombinations, sortRulesArrayByOperatorAndAttributes, createPrismaQueryObjects };
