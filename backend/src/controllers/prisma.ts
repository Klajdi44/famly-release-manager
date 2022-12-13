import { Request, Response } from "express";
import { prisma } from "../prisma";

export const xxx = async (req: Request, res: Response) => {
  console.log('** running prisma xxx');
  try {
    const user = await prisma.user.findMany()
    return res.json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}