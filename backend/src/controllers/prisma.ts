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

// create a function that takes an array of rulesObject
// it needs to check the length, if > 0 then a rule is already there,
//  in order to use AND then we need to check attribute, if they are all the same, no need to use AND, if not then we need to use AND
//  if rule is already there then we need to check for the rule operator,
//  if operator is of type isOneOf then OR
//  if operator is of type isNotOneOf then NOT

const transformFrontendRulesToPrismaRules = (frontendRules: any[]) =>
  frontendRules.reduce(
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
      AND: [],
    }
  );

const transformDBRulesToPrismaRules = (
  DBRules: any[],
  frontendRules: any[]
) => {
  // if (DBRules.length === 0) {
  return transformFrontendRulesToPrismaRules(frontendRules);
  // }
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
      attribute: "Country",
      operator: "isNotOneOf",
      id: "1",
      values: [{ name: "Austria", id: 7 }],
    };

    const segmentFromDb = await prisma.segment.findUnique({
      where: {
        id: 1,
      },
    });

    const rulesFromDb = segmentFromDb?.rules ?? [];

    if (
      segmentFromDb?.rules &&
      typeof segmentFromDb?.rules === "object" &&
      Array.isArray(segmentFromDb?.rules)
    ) {
      const segmentRules = segmentFromDb?.rules as Prisma.JsonArray;
      // const prismaRules = transformDBRulesToPrismaRules(segmentRules);
      const prismaRules = transformDBRulesToPrismaRules(
        [],
        [rulesObject, rulesObject1]
      );

      const sites = await prisma.site.findMany({
        where: prismaRules,
        select: {
          id: true,
        },
      });

      // update segment sites
      const newSites = await prisma.segment.update({
        where: {
          id: 1,
        },
        data: {
          sites: {
            set: sites,
          },
          rules: [rulesObject, rulesObject1],
        },
      });
      console.log({ newSites });

      res.send(newSites);
    }

    res.send([]);
  } catch {}
};

// ****** STEP 1: Query the sites, that should be part of the segment.
//      - Use prisma.model.findMany()
//      - Rules are added in the where object:
//      - Accepts following operators: OR, AND, NOT
//      - Select only id.
//      - The return value from sites will be an array of objects with ids, like this:
//        [ { id: 23 }, { id: 37 }, { id: 43 }, { id: 57 }, { id: 93 } ]
// *

// ****** STEP 2: Update segment - with the sites returned from STEP 1.
//      - Use prisma.model.update()
//      - Select the segment to update in the where object, based on id
//      - Add data object to the update method.
//      - Specify sites as the property to update.
//      - Use set and add the sites from STEP 1.
//      - Prisma handles the many-to-many relation and updates the relation_table "_SegmentToSite"
