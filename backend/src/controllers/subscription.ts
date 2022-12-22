import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getSubscriptions = async (req: Request, res: Response) => {
  const subscriptions = await prisma.subscription.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  res.send(subscriptions);
};
