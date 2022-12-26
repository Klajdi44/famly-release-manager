import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("** Database seeding...");

  console.log("** Adding users createMany...");
  const users = await prisma.user.createMany({
    data: [
      {
        firstName: "Andrei",
        lastName: "Mihutoni",
        email: "andrei@example.com",
        password: "$2b$10$mxtWyHbkM1V11k5GAsZUDeFJ1Dxe4ihsqh.7tcYIcfeeInNcCmkvy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Klajdi",
        lastName: "Ajdini",
        email: "klajdi@example.com",
        password: "$2b$10$SPPyddDACcCTHru4nUbxTu9oNTOb6A0UrR/K3Wu21sGDAaAgSuAn.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jonas",
        lastName: "Bøgh",
        email: "jonas@example.com",
        password: "$2b$10$lM/hpUT8jQAiBEW.okK/ouYNUcWxUj42oofhQw41WY8VOMRW1cQcy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });
  console.log(users);

  // const andrei = await prisma.user.upsert({
  //   where: { email: 'andrei@example.com' },
  //   update: {},
  //   create: {
  //     firstName: 'Andrei',
  //     lastName: 'Mihutoni',
  //     email: 'andrei@example.com',
  //     password: '$2b$10$mxtWyHbkM1V11k5GAsZUDeFJ1Dxe4ihsqh.7tcYIcfeeInNcCmkvy',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // })
  // const klajdi = await prisma.user.upsert({
  //   where: { email: 'klajdi@example.com' },
  //   update: {},
  //   create: {
  //     firstName: 'Klajdi',
  //     lastName: 'Ajdini',
  //     email: 'klajdi@example.com',
  //     password: '$2b$10$SPPyddDACcCTHru4nUbxTu9oNTOb6A0UrR/K3Wu21sGDAaAgSuAn.',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // })
  // const jonas = await prisma.user.upsert({
  //   where: { email: 'jonas@example.com' },
  //   update: {},
  //   create: {
  //     firstName: 'Jonas',
  //     lastName: 'Bøgh',
  //     email: 'jonas@example.com',
  //     password: '$2b$10$lM/hpUT8jQAiBEW.okK/ouYNUcWxUj42oofhQw41WY8VOMRW1cQcy',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // })
  // console.log({ andrei, klajdi, jonas })

  console.log("** Adding countries...");
  const countries = await prisma.country.createMany({
    data: [
      { name: "Denmark", createdAt: new Date(), updatedAt: new Date() },
      { name: "United Kingdom", createdAt: new Date(), updatedAt: new Date() },
      { name: "USA", createdAt: new Date(), updatedAt: new Date() },
      { name: "Germany", createdAt: new Date(), updatedAt: new Date() },
      { name: "Norway", createdAt: new Date(), updatedAt: new Date() },
      { name: "Switzerland", createdAt: new Date(), updatedAt: new Date() },
      { name: "Austria", createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  });
  console.log(countries);

  console.log("** Adding subscriptions...");
  const subscriptions = await prisma.subscription.createMany({
    data: [
      { title: "Free", createdAt: new Date(), updatedAt: new Date() },
      { title: "Starter", createdAt: new Date(), updatedAt: new Date() },
      { title: "Essentials", createdAt: new Date(), updatedAt: new Date() },
      { title: "Premium", createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  });
  console.log(subscriptions);

  console.log("** Adding sites...");
  const sites = await prisma.site.createMany({
    data: [
      { name: "Site #1", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #2", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 2 },
      { name: "Site #3", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 3 },
      { name: "Site #4", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 4 },
      { name: "Site #5", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: "Site #6", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 2 },
      { name: "Site #7", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 3 },
      { name: "Site #8", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 4 },
      { name: "Site #9", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 1 },
      { name: "Site #10", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 2 },
      { name: "Site #11", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 1 },
      { name: "Site #12", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 2 },
      { name: "Site #13", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 3 },
      { name: "Site #14", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 4 },
      { name: "Site #15", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #16", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 2 },
      { name: "Site #17", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 3 },
      { name: "Site #18", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 4 },
      { name: "Site #19", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: "Site #20", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 2 },
      { name: "Site #21", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 1 },
      { name: "Site #22", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 2 },
      { name: "Site #23", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 3 },
      { name: "Site #24", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 4 },
      { name: "Site #25", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 1 },
      { name: "Site #26", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 2 },
      { name: "Site #27", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 3 },
      { name: "Site #28", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 4 },
      { name: "Site #29", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #30", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 1 },
      { name: "Site #31", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 1 },
      { name: "Site #32", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 2 },
      { name: "Site #33", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 3 },
      { name: "Site #34", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 4 },
      { name: "Site #35", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 1 },
      { name: "Site #36", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 2 },
      { name: "Site #37", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 3 },
      { name: "Site #38", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 4 },
      { name: "Site #39", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 1 },
      { name: "Site #40", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: "Site #41", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 1 },
      { name: "Site #42", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 2 },
      { name: "Site #43", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 3 },
      { name: "Site #44", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 4 },
      { name: "Site #45", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 1 },
      { name: "Site #46", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 2 },
      { name: "Site #47", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 3 },
      { name: "Site #48", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 4 },
      { name: "Site #49", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 1 },
      { name: "Site #50", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #51", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 1 },
      { name: "Site #52", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 2 },
      { name: "Site #53", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 3 },
      { name: "Site #54", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 4 },
      { name: "Site #55", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 1 },
      { name: "Site #56", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 2 },
      { name: "Site #57", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 3 },
      { name: "Site #58", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 4 },
      { name: "Site #59", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 1 },
      { name: "Site #60", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 2 },
      { name: "Site #61", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: "Site #62", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 2 },
      { name: "Site #63", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 3 },
      { name: "Site #64", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 4 },
      { name: "Site #65", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 1 },
      { name: "Site #66", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 2 },
      { name: "Site #67", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 3 },
      { name: "Site #68", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 4 },
      { name: "Site #69", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 1 },
      { name: "Site #70", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 2 },
      { name: "Site #71", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #72", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 2 },
      { name: "Site #73", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 3 },
      { name: "Site #74", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 4 },
      { name: "Site #75", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: "Site #76", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 2 },
      { name: "Site #77", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 3 },
      { name: "Site #78", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 4 },
      { name: "Site #79", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 1 },
      { name: "Site #80", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 1 },
      { name: "Site #81", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 1 },
      { name: "Site #82", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 2 },
      { name: "Site #83", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 3 },
      { name: "Site #84", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 4 },
      { name: "Site #85", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #86", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 2 },
      { name: "Site #87", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 3 },
      { name: "Site #88", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 4 },
      { name: "Site #89", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: "Site #90", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 1 },
      { name: "Site #91", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 1 },
      { name: "Site #92", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 2 },
      { name: "Site #93", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 3 },
      { name: "Site #94", createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 4 },
      { name: "Site #95", createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 1 },
      { name: "Site #96", createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 2 },
      { name: "Site #97", createdAt: new Date(), updatedAt: new Date(), countryId: 6, subscriptionId: 3 },
      { name: "Site #98", createdAt: new Date(), updatedAt: new Date(), countryId: 7, subscriptionId: 4 },
      { name: "Site #99", createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: "Site #100", createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 1 },
    ],
    skipDuplicates: true,
  });
  console.log(sites);

  console.log("** Adding segments...");
  const segments = await prisma.segment.createMany({
    data: [
      { title: "Segment #1", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 1 },
      { title: "Segment #2", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 2 },
      { title: "Segment #3", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 3 },
      { title: "Segment #4", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 1 },
      { title: "Segment #5", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 2 },
      { title: "Segment #6", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 3 },
      { title: "Segment #7", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 1 },
      { title: "Segment #8", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 2 },
      { title: "Segment #9", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 3 },
      { title: "Segment #10", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 1 },
      { title: "Segment #11", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 2 },
      { title: "Segment #12", createdAt: new Date(), updatedAt: new Date(), description: "Lorem", userId: 3 },
    ],
    skipDuplicates: true,
  });
  console.log(segments);

  console.log("** Adding release toggles...");
  const releaseToggle = await prisma.releaseToggle.createMany({
    data: [
      {
        name: "Release Toggle #1",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 1,
        isActive: false,
      },
      {
        name: "Release Toggle #2",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 2,
        isActive: false,
      },
      {
        name: "Release Toggle #3",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 3,
        isActive: false,
      },
      {
        name: "Release Toggle #4",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 1,
        isActive: false,
      },
      {
        name: "Release Toggle #5",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 2,
        isActive: false,
      },
      {
        name: "Release Toggle #6",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 3,
        isActive: false,
      },
      {
        name: "Release Toggle #7",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 1,
        isActive: false,
      },
      {
        name: "Release Toggle #8",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 2,
        isActive: false,
      },
      {
        name: "Release Toggle #9",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 3,
        isActive: false,
      },
      {
        name: "Release Toggle #10",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 1,
        isActive: false,
      },
      {
        name: "Release Toggle #11",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 2,
        isActive: false,
      },
      {
        name: "Release Toggle #12",
        releaseAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem",
        userId: 3,
        isActive: false,
      },
    ],
    skipDuplicates: true,
  });
  console.log(releaseToggle);
}
main();
