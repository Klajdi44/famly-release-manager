import { Request, Response } from "express";
import { prisma } from "../prisma";

export const test = async (req: Request, res: Response) => {
  console.log("** running prisma test");
  try {
    // Adding the sites that belongs to a segment:

    // ****** STEP 1: Query the sites, that should be part of the segment.
    //      - Use prisma.model.findMany()
    //      - Rules are added in the where object:
    //      - Accepts following operators: OR, AND, NOT
    //      - Select only id.
    //      - The return value from sites will be an array of objects with ids, like this:
    //        [ { id: 23 }, { id: 37 }, { id: 43 }, { id: 57 }, { id: 93 } ]
    //
    const sites = await prisma.site.findMany({
      where: {
        OR: [{ countryId: 1 }, { countryId: 2 }],
        AND: [
          { subscriptionId: 3 },
          // {subscriptionId: 4},
        ],
        NOT: [{ name: "Site #1" }],
      },
      select: {
        id: true,
      },
    });

    console.log(sites);
    // ****** STEP 2: Update segment - with the sites returned from STEP 1.
    //      - Use prisma.model.update()
    //      - Select the segment to update in the where object, based on id
    //      - Add data object to the update method.
    //      - Specify sites as the property to update.
    //      - Use set and add the sites from STEP 1.
    //      - Prisma handles the many-to-many relation and updates the relation_table "_SegmentToSite"

    const segmentUpdate = await prisma.segment.update({
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

    console.log("** segment.update ", segmentUpdate);

    // Rules object for rules field
    const rulesObject = {
      OR: [{ countryId: 1 }, { countryId: 2 }],
      AND: [{ subscriptionId: 3 }],
      NOT: [{ name: "Site #1" }],
    };
    // const rule = [{ attribute: "country", operator: "in", value: "denmark" }];

    // Update rules field:
    const segmentUpdateRules = await prisma.segment.update({
      where: {
        id: 2,
      },
      data: {
        rules: rulesObject,
      },
      include: {
        sites: true,
      },
    });

    return res.json({ segment: segmentUpdateRules });
  } catch (error) {
    return res.status(500).json(error);
  }
};
