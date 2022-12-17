import { Request, Response } from "express";
import { prisma } from "../prisma";
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
