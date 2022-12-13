import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('** Database seeding...')


  console.log('** Adding users...')
  const andrei = await prisma.user.upsert({
    where: { email: 'andrei@example.com' },
    update: {},
    create: {
      firstName: 'Andrei',
      lastName: 'Mihutoni',
      email: 'andrei@example.com',
      password: '$2b$10$mxtWyHbkM1V11k5GAsZUDeFJ1Dxe4ihsqh.7tcYIcfeeInNcCmkvy',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  const klajdi = await prisma.user.upsert({
    where: { email: 'klajdi@example.com' },
    update: {},
    create: {
      firstName: 'Klajdi',
      lastName: 'Ajdini',
      email: 'klajdi@example.com',
      password: '$2b$10$SPPyddDACcCTHru4nUbxTu9oNTOb6A0UrR/K3Wu21sGDAaAgSuAn.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  const jonas = await prisma.user.upsert({
    where: { email: 'jonas@example.com' },
    update: {},
    create: {
      firstName: 'Jonas',
      lastName: 'Bøgh',
      email: 'jonas@example.com',
      password: '$2b$10$lM/hpUT8jQAiBEW.okK/ouYNUcWxUj42oofhQw41WY8VOMRW1cQcy',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  console.log({ andrei, klajdi, jonas })

  console.log('** Adding countries...')
  const countries = await prisma.country.createMany({
    data: [
      { name: 'Denmark', createdAt: new Date(), updatedAt: new Date() },
      { name: 'United Kingdom', createdAt: new Date(), updatedAt: new Date() },
      { name: 'USA', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Germany', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Norway', createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true
  })
  console.log(countries);

  console.log('** Adding subscriptions...')
  const subscriptions = await prisma.subscription.createMany({
    data: [
      { title: 'Free', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Starter', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Essentials', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Premium', createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true
  })
  console.log(subscriptions);

  console.log('** Adding sites...')
  const sites = await prisma.site.createMany({
    data: [
      { name: 'Site #1', createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 1 },
      { name: 'Site #2', createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 2 },
      { name: 'Site #3', createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 3 },
      { name: 'Site #4', createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 4 },
      { name: 'Site #5', createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 1 },
      { name: 'Site #6', createdAt: new Date(), updatedAt: new Date(), countryId: 1, subscriptionId: 2 },
      { name: 'Site #7', createdAt: new Date(), updatedAt: new Date(), countryId: 2, subscriptionId: 3 },
      { name: 'Site #8', createdAt: new Date(), updatedAt: new Date(), countryId: 3, subscriptionId: 4 },
      { name: 'Site #9', createdAt: new Date(), updatedAt: new Date(), countryId: 4, subscriptionId: 1 },
      { name: 'Site #10', createdAt: new Date(), updatedAt: new Date(), countryId: 5, subscriptionId: 2 },
    ],
    skipDuplicates: true
  })
  console.log(sites);

  console.log('** Adding segments...')
  const segments = await prisma.segment.createMany({
    data: [
      { title: 'Segment #1', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 1 },
      { title: 'Segment #2', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 2 },
      { title: 'Segment #3', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 3 },
      { title: 'Segment #4', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 1 },
      { title: 'Segment #5', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 2 },
      { title: 'Segment #6', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 3 },
      { title: 'Segment #7', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 1 },
      { title: 'Segment #8', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 2 },
      { title: 'Segment #9', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 3 },
      { title: 'Segment #10', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 1 },
      { title: 'Segment #11', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 2 },
      { title: 'Segment #12', createdAt: new Date(), updatedAt: new Date(), description: 'Lorem', userId: 3 },
    ],
    skipDuplicates: true
  })
  console.log(segments);
}
main();
