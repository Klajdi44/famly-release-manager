import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Prisma, ReleaseToggle } from "@prisma/client";
import cron from "node-schedule";

type Attribute = "COUNTRY" | "SUBSCRIPTION" | "SITE_ID";

type Operator = "IS_ONE_OF" | "IS_NOT_ONE_OF";

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
      if (currentRule.operator === "IS_ONE_OF") {
        if (currentRule.attribute === "COUNTRY") {
          const countryIds = currentRule.values.map(country => ({
            countryId: country.id,
          }));

          acc["OR"].push(...countryIds);
        }
        if (currentRule.attribute === "SUBSCRIPTION") {
          const subscriptionIds = currentRule.values.map(subscription => ({
            subscriptionId: subscription.id,
          }));
          acc["OR"].push(...subscriptionIds);
        }
      }

      if (currentRule.operator === "IS_NOT_ONE_OF") {
        if (currentRule.attribute === "COUNTRY") {
          const countryIds = currentRule.values.map(country => ({
            countryId: country.id,
          }));

          acc["NOT"].push(...countryIds);
        }
        if (currentRule.attribute === "SUBSCRIPTION") {
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
      attribute: "COUNTRY",
      operator: "IS_ONE_OF",
      id: "1",
      values: [
        { name: "Denmark", id: 1 },
        { name: "USA", id: 3 },
      ],
    };

    const rulesObject1 = {
      attribute: "SUBSCRIPTION",
      operator: "IS_NOT_ONE_OF",
      id: "2",
      values: [{ title: "Starter", id: 2 }],
    };

    const rulesFromFrontend = [
      {
        attribute: "COUNTRY",
        operator: "IS_ONE_OF",
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

    if (
      segmentFromDb?.rules &&
      typeof segmentFromDb?.rules === "object" &&
      Array.isArray(segmentFromDb?.rules)
    ) {
      const segmentRules = segmentFromDb?.rules as Prisma.JsonArray;

      const mergeFrontendSentRulesWithDbRules = [
        ...segmentRules,
        ...rulesFromFrontend,
      ];

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

export const scheduleReleaseToggle = async (req: Request, res: Response) => {
  try {
    const { id, date }: { id: number; date: string } = req.body;

    if (id === undefined || date === undefined) {
      return res
        .status(400)
        .send({ message: "Release toggle ID and Date are required" });
    }

    if (Number.isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Release toggle ID must be a number" });
    }

    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id,
      },
    });

    if (releaseToggle === null) {
      return res.status(404).send({ message: "Release toggle not found" });
    }

    const releaseToggleSchedule = releaseToggle.release as Prisma.JsonObject;

    if (releaseToggleSchedule?.scheduleRef) {
      cron.cancelJob(String(releaseToggleSchedule.scheduleRef));
    }

    const job = cron.scheduleJob(new Date(date), async function () {
      console.log("----- cron run", "ReleaseToggleId:", id);

      await prisma.releaseToggle.update({
        where: {
          id: id,
        },
        data: {
          isActive: true,
          release: {},
        },
      });
    });

    if (job === null) {
      return res.status(400).send({
        message:
          "Schedule failed! Make sure that the date is correct! No past dates can be scheduled!",
      });
    }

    const releaseToggleWithReleaseProperty = await prisma.releaseToggle.update({
      where: {
        id: id,
      },
      data: {
        release: { scheduleRef: job.name, date },
      },
    });

    res.send(releaseToggleWithReleaseProperty);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const deleteScheduleForReleaseToggle = async (
  req: Request,
  res: Response
) => {
  try {
    const { id }: { id: number } = req.body;

    if (Number.isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Release toggle ID must be a number" });
    }

    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id,
      },
    });

    if (releaseToggle === null) {
      return res.status(404).send({ message: "Release toggle not found" });
    }

    const release = releaseToggle.release as Prisma.JsonObject;

    if (!release?.scheduleRef) {
      return res.status(400).send({
        message:
          "This release toggle is not scheduled for release, Make sure it was not released already",
      });
    }

    if (!cron.cancelJob(String(release.scheduleRef))) {
      return res.status(500).send({
        message:
          "Could not cancel this schedule, Make sure it was not released already",
      });
    }

    const releaseToggleWithCronRef = await prisma.releaseToggle.update({
      where: {
        id: id,
      },
      data: {
        release: {},
      },
    });

    return res.send(releaseToggleWithCronRef);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
