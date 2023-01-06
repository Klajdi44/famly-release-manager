import { Request, Response } from "express";
import { prisma } from "../prisma";

const isActiveForSite = async (req: Request, res: Response) => {
  const {
    releaseToggleId,
    siteId,
  }: { releaseToggleId: number; siteId: number } = req.body;

  if (releaseToggleId === undefined || siteId === undefined) {
    return res
      .status(400)
      .send({ message: "Release toggle ID,Date and User are required" });
  }

  if (Number.isNaN(releaseToggleId) || Number.isNaN(siteId)) {
    return res
      .status(400)
      .send({ message: "Release toggle ID must be a number" });
  }

  const releaseToggle = await prisma.releaseToggle.findUnique({
    where: {
      id: releaseToggleId,
    },
    include: {
      segments: {
        select: {
          sites: true,
        },
      },
    },
  });

  if (releaseToggle === null) {
    return res.status(404).send({ message: "Release toggle not found" });
  }

  const isActiveForSite = releaseToggle.segments.some(segment =>
    segment.sites.some(site => site.id === siteId)
  );

  res.send(isActiveForSite);
};

export { isActiveForSite };
