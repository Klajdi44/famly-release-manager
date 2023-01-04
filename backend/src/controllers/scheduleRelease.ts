import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
import cron from "node-schedule";

export const scheduleReleaseToggle = async (req: Request, res: Response) => {
  try {
    const {
      id,
      date,
      userName,
    }: { id: number; date: string; userName: string } = req.body;

    if (id === undefined || date === undefined || userName === undefined) {
      return res
        .status(400)
        .send({ message: "Release toggle ID,Date and User are required" });
    }

    if (Number.isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Release toggle ID must be a number" });
    }

    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id,
      },
    });

    if (releaseToggle === null) {
      return res.status(404).send({ message: "Release toggle not found" });
    }

    const releaseToggleSchedule = releaseToggle.release as Prisma.JsonObject;

    if (releaseToggleSchedule?.scheduleRef) {
      cron.cancelJob(String(releaseToggleSchedule.scheduleRef));
    }

    const job = cron.scheduleJob(new Date(date), async function () {
      console.log("----- cron run", "ReleaseToggleId:", id);

      const releaseToggleScheduledForRelease =
        await prisma.releaseToggle.findUnique({
          where: {
            id,
          },
        });

      if (!releaseToggleScheduledForRelease) {
        return;
      }

      await prisma.releaseToggle.update({
        where: {
          id: id,
        },
        data: {
          isActive: true,
          release: {},
        },
      });
    });

    if (job === null) {
      return res.status(400).send({
        message:
          "Schedule failed! Make sure that the date is correct! No past dates can be scheduled!",
      });
    }

    const releaseToggleWithReleaseProperty = await prisma.releaseToggle.update({
      where: {
        id: id,
      },
      data: {
        release: { scheduleRef: job.name, date, userName },
      },
    });

    res.send(releaseToggleWithReleaseProperty);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const deleteScheduleForReleaseToggle = async (
  req: Request,
  res: Response
) => {
  try {
    const { id }: { id: number } = req.body;

    if (Number.isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Release toggle ID must be a number" });
    }

    const releaseToggle = await prisma.releaseToggle.findUnique({
      where: {
        id,
      },
    });

    if (releaseToggle === null) {
      return res.status(404).send({ message: "Release toggle not found" });
    }

    const release = releaseToggle.release as Prisma.JsonObject;

    if (!release?.scheduleRef) {
      return res.status(400).send({
        message:
          "This release toggle is not scheduled for release, Make sure it was not released already",
      });
    }

    if (!cron.cancelJob(String(release.scheduleRef))) {
      return res.status(500).send({
        message:
          "Could not cancel this schedule, Make sure it was not released already",
      });
    }

    const releaseToggleWithCronRef = await prisma.releaseToggle.update({
      where: {
        id: id,
      },
      data: {
        release: {},
      },
    });

    return res.send(releaseToggleWithCronRef);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
