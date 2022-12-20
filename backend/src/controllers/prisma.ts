import { Request, Response } from "express";
import { prisma } from "../prisma";

type Attribute = "Country" | "Subscription" | "SiteId";

type Operator = "isOneOf" | "isNotOneOf";

type Rule = {
  attribute: Attribute;
  operator: Operator;
  id: string;
  values: { name: string; id: number }[];
};

// const rulesFromDb = [rule, rule, rule];

// const transformer(rulesFromDb){
//   returns {
//     OR: [{ countryId: 1 }, { countryId: 3 }],
//     AND:[],
//     NOT:[]
//   }
// }

export const test = async (req: Request, res: Response) => {
  try {
    // const sitess = await prisma.site.findMany({
    //   where: {
    //     OR: [{ countryId: 1 }, { countryId: 3 }],
    //   },
    // });

    const rulesObject = {
      attribute: "Country",
      operator: "isOneOf",
      id: "1",
      values: [
        { name: "Denmark", id: 1 },
        { name: "USA", id: 3 },
      ],
    };

    const rulesFromDb = await prisma.segment.update({
      where: {
        id: 1,
      },
      data: {},
    });
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
