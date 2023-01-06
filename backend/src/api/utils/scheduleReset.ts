import { prisma } from "../../prisma";

const scheduleReset = async () => {
  await prisma.releaseToggle.updateMany({
    data: {
      release: {},
    },
  });
};

export { scheduleReset };
