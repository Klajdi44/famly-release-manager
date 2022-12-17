import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllSites = async (req: Request, res: Response) => {
  console.log("** Running controller: getAllSites (prisma)");
  try {
    const sites = await prisma.site.findMany();
    return res.status(200).json(sites);
  } catch (error) {
    return res.status(500).json({ error: "Server error - could not find release toggles..." });
  }
};

export const getOneSite = async (req: Request, res: Response) => {
  console.log("** Running controller: getOneReleaseToggle (prisma)");

  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }

  try {
    const site = await prisma.site.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    // Check if there is data with the provided ID
    if (site === null) {
      return res.status(404).json({ message: "This site does not exist..." });
    }
    return res.status(200).json(site);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSite = async (req: Request, res: Response) => {
  // Validate Data
  if (!req.body.name) {
    return res.status(400).json({ error: "Name must be defined.." });
  }
  if (!req.body.countryId) {
    return res.status(400).json({ error: "countryId must be defined.." });
  }
  if (!req.body.subscriptionId) {
    return res.status(400).json({ error: "subscriptionId must be defined.." });
  }

  try {
    const site = await prisma.site.create({
      data: {
        name: req.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: req.body.countryId,
        subscriptionId: req.body.subscriptionId,
      },
    });
    return res.status(201).json(site);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateOneSite = async (req: Request, res: Response) => {
  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }

  interface Payload {
    name?: string;
    countryId?: number;
    subscriptionId?: number;
  }
  let payload: Payload = {};
  if (req.body.name) {
    payload["name"] = req.body.name;
  }
  if (req.body.countryId) {
    payload["countryId"] = Number(req.body.countryId);
  }
  if (req.body.subscriptionId) {
    payload["subscriptionId"] = Number(req.body.subscriptionId);
  }

  try {
    // Check if the site exists in the db
    const getSite = await prisma.site.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (getSite === null) {
      return res.status(404).json({ failed: "No site matching this ID" });
    }

    const site = await prisma.site.update({
      where: {
        id: Number(req.params.id),
      },
      data: payload,
    });

    return res.status(204).json(site); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneSite = async (req: Request, res: Response) => {
  // Validate req.params.id
  if (!Number(req.params.id)) {
    return res.json({ error: "ID is not a number" });
  }

  try {
    // Check if the site exists in the db
    const getSite = await prisma.site.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (getSite === null) {
      return res.status(404).json({ failed: "No site matching this ID" });
    }
    // Delete site
    const site = await prisma.site.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json(site);
  } catch (error) {
    return res.status(500).json(error);
  }
};
