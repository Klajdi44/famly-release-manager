import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    const responseSubscriptions = subscriptions.map(subscription => ({
      name: subscription.title,
      id: subscription.id,
    }));

    return res.send(responseSubscriptions);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong while getting subscriptions" });
  }
};
