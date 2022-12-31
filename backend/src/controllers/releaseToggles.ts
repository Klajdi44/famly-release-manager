import { Request, Response } from "express";

import { prisma } from "../prisma";

export const getAllReleaseToggles = async (req: Request, res: Response) => {
  try {
    const releaseToggles = await prisma.releaseToggle.findMany({
      include: {
        segments: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });

    return res.send(releaseToggles);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error - could not find release toggles..." });
  }
};

export const getOneReleaseToggle = async (req: Request, res: Response) => {
  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.status(400).send({ message: "ID is not a number" });
  }

  try {
    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        segments: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            sites: true,
          },
        },
      },
    });

    if (releaseToggle === null) {
      return res
        .status(404)
        .send({ message: "This release toggle does not exist..." });
    }

    return res.send(releaseToggle);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const createReleaseToggle = async (req: Request, res: Response) => {
  // Validate Data
  if (!req.body.name) {
    return res.status(400).send({ message: "Name must be defined.." });
  }
  if (!req.body.description) {
    return res.status(400).send({ message: "Description must be defined.." });
  }
  if (!req.body.userId) {
    return res.status(400).send({ message: "User ID must be defined.." });
  }

  try {
    const releaseToggle = await prisma.releaseToggle.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: Number(req.body.userId),
      },
    });

    return res.status(201).send(releaseToggle);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const updateOneReleaseToggle = async (req: Request, res: Response) => {
  // Check if req.params.id is a number
  if (!Number(req.params.id)) {
    return res.status(400).send({ message: "ID is not a number" });
  }
  console.log(req.params, req.body);

  // Data payload for update
  interface Payload {
    name?: string;
    description?: string;
    userId?: number;
  }

  let payload: Payload = {};

  if (req.body.name) {
    payload["name"] = req.body.name;
  }

  if (req.body.description) {
    payload["description"] = req.body.description;
  }

  if (req.body.userId) {
    payload["userId"] = Number(req.body.userId);
  }

  try {
    const releaseToggle = await prisma.releaseToggle.update({
      where: {
        id: Number(req.params.id),
      },
      data: payload,
    });

    return res.send(releaseToggle); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const deleteOneReleaseToggle = async (req: Request, res: Response) => {
  // Validate req.params.id
  if (Number.isNaN(req.params.id)) {
    return res.status(400).send({ message: "ID is not a number" });
  }

  try {
    const releaseToggle = await prisma.releaseToggle.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json(releaseToggle);
  } catch (error) {
    return res.status(500).send({ mesage: error });
  }
};

export const addSegmentToReleaseToggle = async (
  req: Request,
  res: Response
) => {
  if (Number.isNaN(req.params.id)) {
    return res.status(400).send({ message: "ID is not a number" });
  }

  const requestSegmentIds: { id: number }[] = req.body.segments;

  if (!requestSegmentIds || !requestSegmentIds.length) {
    return res.status(400).send({ message: "Segment Ids are required" });
  }

  try {
    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        segments: true,
      },
    });

    if (releaseToggle === null) {
      return res.status(400).send({
        message: `No release toggle was found with ID:${req.params.id}`,
      });
    }

    const segmentIds = releaseToggle.segments.map(segment => ({
      id: segment.id,
    }));

    const updatedReleaseToggle = await prisma.releaseToggle.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        segments: {
          set: [...segmentIds, ...requestSegmentIds],
        },
      },
      include: {
        segments: true,
      },
    });

    return res.send(updatedReleaseToggle);
  } catch (error) {
    res
      .status(500)
      .send({ mesage: "Something went terribly wrong! please try again" });
  }
};

export const deleteSegmentFromReleaseToggle = async (
  req: Request,
  res: Response
) => {
  if (Number.isNaN(req.params.id)) {
    return res.status(400).send({ message: "ID is not a number" });
  }

  const segmentId: { id: number } = req.body.segment;

  if (!segmentId) {
    return res.status(400).send({ message: "Segment ID is required" });
  }

  try {
    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        segments: true,
      },
    });

    if (releaseToggle === null) {
      return res.status(400).send({
        message: `No release toggle was found with ID:${req.params.id}`,
      });
    }

    const updatedReleaseToggle = await prisma.releaseToggle.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        segments: {
          disconnect: segmentId,
        },
      },
      include: {
        segments: true,
      },
    });

    return res.send(updatedReleaseToggle);
  } catch (error) {
    return res
      .status(500)
      .send({ mesage: "Something went terribly wrong! please try again" });
  }
};

export const toggleReleaseToggle = async (req: Request, res: Response) => {
  try {
    const { id, isActive } = req.body;

    if (id === undefined || isActive === undefined) {
      return res.status(400).send({
        message: "Release toggle ID or isActiver property are required!",
      });
    }

    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!releaseToggle) {
      return res.status(400).send({
        message: `Release toggle with ID or ${id} was not found`,
      });
    }

    const updatedReleaseToggle = await prisma.releaseToggle.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive,
      },
    });

    return res.send(updatedReleaseToggle);
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};
