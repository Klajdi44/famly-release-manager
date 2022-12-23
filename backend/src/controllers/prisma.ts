import { Request, Response } from "express";
import { where } from "sequelize";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

type Attribute = "Country" | "Subscription" | "SiteId";

type Operator = "isOneOf" | "isNotOneOf";

type Rule = {
  attribute: Attribute;
  operator: Operator;
  id: string;
  values: { name: string; id: number }[];
};

/**
 * It takes an array of rules and returns an object with two keys: OR, NOT. Each key has an
 * array of objects as its value
 * @param {any[]} DBRules - The rules that are coming from the database.
 */
const transformDBRulesToPrismaRules = (DBRules: any[]) => {
  return DBRules.reduce(
    (acc, currentRule: Rule) => {
      if (currentRule.operator === "isOneOf") {
        if (currentRule.attribute === "Country") {
          const countryIds = currentRule.values.map(country => ({
            countryId: country.id,
          }));

          acc["OR"].push(...countryIds);
        }
        if (currentRule.attribute === "Subscription") {
          const subscriptionIds = currentRule.values.map(subscription => ({
            subscriptionId: subscription.id,
          }));
          acc["OR"].push(...subscriptionIds);
        }
      }

      if (currentRule.operator === "isNotOneOf") {
        if (currentRule.attribute === "Country") {
          const countryIds = currentRule.values.map(country => ({
            countryId: country.id,
          }));

          acc["NOT"].push(...countryIds);
        }
        if (currentRule.attribute === "Subscription") {
          const subscriptionIds = currentRule.values.map(subscription => ({
            subscriptionId: subscription.id,
          }));
          acc["NOT"].push(...subscriptionIds);
        }
      }

      return acc;
    },
    {
      OR: [],
      NOT: [],
    }
  );
};

export const test = async (req: Request, res: Response) => {
  try {
    const rulesObject = {
      attribute: "Country",
      operator: "isOneOf",
      id: "1",
      values: [
        { name: "Denmark", id: 1 },
        { name: "USA", id: 3 },
      ],
    };

    const rulesObject1 = {
      attribute: "Subscription",
      operator: "isNotOneOf",
      id: "2",
      values: [{ title: "Starter", id: 2 }],
    };

    const rulesFromFrontend = [
      {
        attribute: "Country",
        operator: "isOneOf",
        id: "1",
        values: [{ name: "Austria", id: 7 }],
      },
    ];

    const segmentFromDb = await prisma.segment.findUnique({
      where: {
        id: 1,
      },
    });

    // const rulesFromDb = segmentFromDb?.rules ?? [];

    if (segmentFromDb?.rules && typeof segmentFromDb?.rules === "object" && Array.isArray(segmentFromDb?.rules)) {
      const segmentRules = segmentFromDb?.rules as Prisma.JsonArray;

      const mergeFrontendSentRulesWithDbRules = [...segmentRules, ...rulesFromFrontend];

      const segmentWithUpdatedRules = await prisma.segment.update({
        where: {
          id: 2,
        },
        data: {
          rules: mergeFrontendSentRulesWithDbRules,
        },
      });

      // console.log({ segmentWithUpdatedRules });

      const prismaRules = transformDBRulesToPrismaRules([]);

      const sites = await prisma.site.findMany({
        where: prismaRules,
        select: {
          id: true,
        },
      });

      // update segment sites

      const newSites = await prisma.segment.update({
        where: {
          id: 2,
        },
        data: {
          sites: {
            set: sites,
          },
        },
        include: {
          sites: true,
        },
      });
      console.log({ newSites });

      res.send(segmentWithUpdatedRules);
    }

    res.send([]);
  } catch {}
};
