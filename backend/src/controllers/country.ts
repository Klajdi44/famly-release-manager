import { Request, Response } from "express";
import { prisma } from "../prisma";

const getCountries = async (req: Request, res: Response) => {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  res.send(countries);
};

export { getCountries };
