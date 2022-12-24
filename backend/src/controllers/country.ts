import { Request, Response } from "express";
import { prisma } from "../prisma";

const getCountries = async (req: Request, res: Response) => {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const responseCountries = countries.map(country => ({
    name: country.name,
    id: country.id,
  }));

  res.send(responseCountries);
};

export { getCountries };
