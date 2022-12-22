import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
// const { sequelize } = require("../sequelize/models");
// const { Site, Subscription, Country, Segment, SiteSegment, releaseToggle } = require("../sequelize/models");

export const getAllSegments = async (req: Request, res: Response) => {
  console.log("** Running controller: getAllSegments (prisma)");
  try {
    const segments = await prisma.segment.findMany();
    return res.status(200).json(segments);
  } catch (error) {
    return res.status(500).json({ error: "Server error - could not find segments..." });
  }
};

export const getOneSegment = async (req: Request, res: Response) => {
  console.log("** Running controller: getOneSegment");

  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }

  try {
    const segment = await prisma.segment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    // Check if there is data with the provided ID
    if (segment === null) {
      return res.status(404).json({ message: "This segment does not exist..." });
    }

    return res.status(200).json(segment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSegment = async (req: Request, res: Response) => {
  console.log("** Running post method: prisma");
  // Validate data attrs from req body
  if (!req.body.title) {
    return res.status(400).json({ error: "Title must be defined.." });
  }
  if (!req.body.description) {
    return res.status(400).json({ error: "description must be defined.." });
  }
  if (!req.body.userId) {
    return res.status(400).json({ error: "userId must be defined.." });
  }

  try {
    const segment = await prisma.segment.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: req.body.userId,
      },
    });
    return res.status(201).json(segment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateOneSegment = async (req: Request, res: Response) => {
  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }

  interface Payload {
    title?: string;
    description?: string;
    userId?: number;
  }
  let payload: Payload = {};
  if (req.body.title) {
    payload["title"] = req.body.title;
  }
  if (req.body.description) {
    payload["description"] = req.body.description;
  }
  // if (req.body.description === '') { payload['description'] = req.body.description }
  if (req.body.userId) {
    payload["userId"] = req.body.userId;
  }

  try {
    // Check if the segment exists in the db
    const getSegment = await prisma.segment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    // return res.status(201).json(getSegment);
    if (getSegment === null) {
      return res.status(404).json({ failed: "No segment matching this ID" });
    }

    const segment = await prisma.segment.update({
      where: {
        id: Number(req.params.id),
      },
      data: payload,
    });
    return res.status(204).json(segment); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneSegment = async (req: Request, res: Response) => {
  // Validate req.params.id
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }

  try {
    // Check if the segment exists in the db
    const getSegment = await prisma.segment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    // return res.status(201).json({ segment: "Trying to delete..", getSegment: getSegment });
    if (getSegment === null) {
      return res.status(404).json({ failed: "No segment matching this ID" });
    }
    const segment = await prisma.segment.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json(segment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getSegmentConstruction = async (req: Request, res: Response) => {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const packages = await prisma.subscription.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  res.send({
    countries,
    packages,
  });
};

const transformFrontendRulesToPrismaRules = (FrontendRules: any[]) => {
  type Attribute = "Country" | "Subscription" | "SiteId";

  type Operator = "isOneOf" | "isNotOneOf";

  type Rule = {
    attribute: Attribute;
    operator: Operator;
    id: string;
    values: { name: string; id: number }[];
  };

  return FrontendRules.reduce(
    (acc, currentRule) => {
      // Rewrite values from frontend to match how Prisma expects it
      currentRule["values"] = currentRule.values.map(function (rule: any) {
        if (currentRule["attribute"] === "Country") {
          return { countryId: rule.id };
        }
        if (currentRule["attribute"] === "Subscription") {
          return { subscriptionId: rule.id };
        }
        if (currentRule["attribute"] === "SiteId") {
          return { id: rule.id };
        }
      });

      const valuesToPrisma = currentRule["values"];
      if (currentRule.operator === "isOneOf") {
        acc["OR"].push(...valuesToPrisma);
      }

      // Case: Operator isNotOneOf (Goes to NOT array)
      if (currentRule.operator === "isNotOneOf") {
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

export const createSegmentRules = async (req: Request, res: Response) => {
  // Validate req.params.id - make sure it is a number
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }
  // Expected post body from frontend:
  //    * An array of rules
  //    * A rule is an object of type Rule (See below)
  //    * Post Body: [ {attribute: "Country", operator: "isOneOf", id: '1', values: {name: 'Denmark', id: 1}} ]

  // Rules from frontend
  const rulesFromFrontend = req.body.rules;

  // console.log("** Validation", rulesFromFrontend);

  type Attribute = "Country" | "Subscription" | "SiteId";

  type Operator = "isOneOf" | "isNotOneOf";

  type Rule = {
    attribute: Attribute;
    operator: Operator;
    id: string;
    values: { name: string; id: number }[];
  };

  // Validate data:
  rulesFromFrontend.forEach(function (rule: Rule) {
    // Validate attribute
    if (!(rule.attribute === "Country" || rule.attribute === "Subscription" || rule.attribute === "SiteId")) {
      return res.status(400).send({ status: "wrong attribute" });
    }
    // Validate operator
    if (!(rule.operator === "isOneOf" || rule.operator === "isNotOneOf")) {
      return res.status(400).send({ status: "wrong operator" });
    }
  });

  // Get segment from DB based on id based in url
  const segment = await prisma.segment.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  // Step 2: Check existing rules for this segment
  const segmentRules = segment.rules as Prisma.JsonArray;
  const numberOfRules = segmentRules.length;

  // Step 3: Merge rules posted from frontend with existing rules
  const mergeRulesFromFrontendWithExistingRulesFromDB = [...segmentRules, ...rulesFromFrontend];
  console.log(mergeRulesFromFrontendWithExistingRulesFromDB);

  // Step 4: Translate rules into Prisma query -----
  const convertFrontendRulesToPrismaRules = transformFrontendRulesToPrismaRules(mergeRulesFromFrontendWithExistingRulesFromDB);

  // console.log(mergeRulesFromFrontendWithExistingRulesFromDB);
  console.log(convertFrontendRulesToPrismaRules);

  // Step 5: Update segment with existing rules
  // segment.update({
  //   where:{
  //     id: 1
  //   },
  // })
  const sites = await prisma.site.findMany({
    where: {
      OR: [
        {
          countryId: 1,
          subscriptionId: 1,
        },
        {
          countryId: 1,
          subscriptionId: 2,
        },
        {
          countryId: 1,
          subscriptionId: 3,
        },
        {
          countryId: 2,
          subscriptionId: 1,
        },
        {
          subscriptionId: 2,
          countryId: 2,
        },
        {
          subscriptionId: 2,
          countryId: 3,
        },
        {
          subscriptionId: 3,
          countryId: 1,
        },
        {
          subscriptionId: 3,
          countryId: 2,
        },
        {
          subscriptionId: 3,
          countryId: 3,
        },
      ],
      // NOT: [{ name: "Site #1" }, { name: "Site #15" }, { name: "Site #23" }],
      NOT: [{ subscriptionId: 1 }],
      AND: [
        // {
        //   subscriptionId: 1,
        // },
      ],
    },
    // select: {
    //   id: true,
    // },
  });

  return res.json({
    mergeRulesFromFrontendWithExistingRulesFromDB: mergeRulesFromFrontendWithExistingRulesFromDB,
    number: sites.length,
    sites: sites,
    convertFrontendRulesToPrismaRules: convertFrontendRulesToPrismaRules,
  });
  // return res.json({
  //   mergeRulesFromFrontendWithExistingRulesFromDB: mergeRulesFromFrontendWithExistingRulesFromDB,
  //   convertFrontendRulesToPrismaRules: convertFrontendRulesToPrismaRules,
  // });
};
