import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { Prisma } from "@prisma/client";
import * as SegmentTransformers from "./transformers";
import * as SegmentTypes from "./types";

export const getAllSegments = async (req: Request, res: Response) => {
  try {
    const segments = await prisma.segment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        sites: true,
      },
    });
    return res.send(segments);
  } catch (error) {
    return res.status(500).json({ error: "Server error - could not find segments..." });
  }
};

export const getOneSegment = async (req: Request, res: Response) => {
  console.log("** Running controller: getOneSegment");

  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.status(400).send({ error: "ID is not a number" });
  }

  try {
    const segment = await prisma.segment.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        sites: true,
      },
    });

    // Check if there is data with the provided ID
    if (segment === null) {
      return res.status(404).send({ message: "This segment does not exist..." });
    }

    return res.send(segment);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createSegment = async (req: Request, res: Response) => {
  console.log("** Running post method: prisma");
  // Validate data attrs from req body
  if (!req.body.title) {
    return res.status(400).send({ error: "Title must be defined.." });
  }
  if (!req.body.description) {
    return res.status(400).send({ error: "description must be defined.." });
  }
  if (!req.body.userId) {
    return res.status(400).send({ error: "userId must be defined.." });
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
    return res.status(201).send(segment);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
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
      return res.status(404).send({ failed: "No segment matching this ID" });
    }

    const segment = await prisma.segment.update({
      where: {
        id: Number(req.params.id),
      },
      data: payload,
    });
    return res.status(204).send(segment); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteOneSegment = async (req: Request, res: Response) => {
  // Validate req.params.id
  if (!Number(req.params.id)) {
    return res.status(400).send({ error: "ID is not a number" });
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
      return res.status(404).send({ failed: "No segment matching this ID" });
    }
    const segment = await prisma.segment.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).send(segment);
  } catch (error) {
    return res.status(500).send(error);
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

export const createSegmentRules = async (req: Request, res: Response) => {
  // Validate req.params.id - make sure it is a number
  if (!Number(req.params.id)) {
    return res.status(400).send({ message: "ID is not a number" });
  }

  // Rules from frontend
  const rulesFromFrontend = req.body.rules;

  if (rulesFromFrontend === undefined || rulesFromFrontend?.length === 0) {
    return res.status(400).send({
      message: "Rule was not sent with the request, rule is required",
    });
  }

  // console.log("** Validation", rulesFromFrontend);

  // Validate data:
  rulesFromFrontend.forEach((rule: SegmentTypes.Rule) => {
    if (!rule.id) {
      return res.status(400).send({ message: "Rule ID is missing" });
    }

    // Validate attribute
    if (!(rule.attribute === "COUNTRY" || rule.attribute === "SUBSCRIPTION" || rule.attribute === "SITE_ID")) {
      return res.status(400).send({ message: "wrong attribute" });
    }
    // Validate operator
    if (!(rule.operator === "IS_ONE_OF" || rule.operator === "IS_NOT_ONE_OF")) {
      return res.status(400).send({ status: "Operator is missing or wrong operator was sent" });
    }

    if (rule.values === undefined || rule.values?.length === 0) {
      return res.status(400).send({ message: "Values are missing" });
    }
  });

  // Get segment from DB based on id from url
  const segment = await prisma.segment.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!segment) {
    return res.status(400).send({ message: "Values are missing" });
  }

  // Step 2: Check existing rules for this segment
  const segmentRules = segment.rules as Prisma.JsonArray;

  // Merge rules posted from frontend with existing rules
  const mergeRulesFromFrontendWithExistingRulesFromDB = [...segmentRules, ...rulesFromFrontend];

  // Sort rules by operator and attributes:
  const sortedRules = SegmentTransformers.sortRulesArrayByOperatorAndAttributes(mergeRulesFromFrontendWithExistingRulesFromDB);

  // Initialize query object, like Prisma expects it:
  let query = {
    OR: [] as any[],
    NOT: [] as any[],
  };

  // Loop through rules object sorted by operator
  for (const operator in sortedRules) {
    // Get keys from object
    const attributes = Object.keys(sortedRules[operator]);

    // Case where IS_ONE_OF does not include both Country and Subscription
    if (!(operator === "IS_ONE_OF" && attributes.includes("COUNTRY") && attributes.includes("SUBSCRIPTION"))) {
      Object.keys(sortedRules[operator]).forEach(key => {
        const prismaQuery = SegmentTransformers.createPrismaQueryObjects(key, sortedRules[operator][key]);
        operator === "IS_NOT_ONE_OF" ? query["NOT"].push(...prismaQuery) : operator === "IS_ONE_OF" && query["OR"].push(...prismaQuery);
      });
    }

    // Case where IS_ONE_OF includes both Country and Subscription (we will need to combine the possible combinations for these attributes)
    if (attributes.includes("COUNTRY") && attributes.includes("SUBSCRIPTION") && operator === "IS_ONE_OF") {
      // Get all possible combinations of selected Countries and Subscriptions
      const combinations = SegmentTransformers.getCombinations(sortedRules[operator]["COUNTRY"], sortedRules[operator]["SUBSCRIPTION"]);
      // Add the combinations to OR array of query object
      query["OR"].push(...combinations);

      // Remove Country and Subscriptions from keys array
      const attributesWithoutCountryAndSubscription = attributes.filter(attr => attr !== "COUNTRY" && attr !== "SUBSCRIPTION");
      // Loop through the rest of the attributes and generate query objects
      attributesWithoutCountryAndSubscription.forEach(attribute => {
        const prismaQ = SegmentTransformers.createPrismaQueryObjects(attribute, sortedRules[operator][attribute]);
        return query["OR"].push(...prismaQ);
      });
    }
  }

  // Check if OR is empty
  if (query["OR"].length < 1) {
    // Remove OR if empty
    delete query["OR"];
  }

  // Get all sites that mathces the query generated by the rules
  const sites = await prisma.site.findMany({
    where: query,
    select: {
      id: true,
    },
  });

  // Update segment sites and rules
  const updatedSegment = await prisma.segment.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      rules: mergeRulesFromFrontendWithExistingRulesFromDB,
      sites: {
        set: sites,
      },
    },
    include: {
      sites: true,
    },
  });

  return res.send(updatedSegment);
};
