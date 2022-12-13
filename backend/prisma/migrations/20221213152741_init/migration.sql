-- CreateTable
CREATE TABLE "Countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseToggles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "releaseAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ReleaseToggles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segments" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sites" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryId" INTEGER,
    "subscriptionId" INTEGER,

    CONSTRAINT "Sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReleaseToggleToSegment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SegmentToSite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Segments_title_key" ON "Segments"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Sites_name_key" ON "Sites"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_title_key" ON "Subscriptions"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ReleaseToggleToSegment_AB_unique" ON "_ReleaseToggleToSegment"("A", "B");

-- CreateIndex
CREATE INDEX "_ReleaseToggleToSegment_B_index" ON "_ReleaseToggleToSegment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SegmentToSite_AB_unique" ON "_SegmentToSite"("A", "B");

-- CreateIndex
CREATE INDEX "_SegmentToSite_B_index" ON "_SegmentToSite"("B");

-- AddForeignKey
ALTER TABLE "ReleaseToggles" ADD CONSTRAINT "ReleaseToggles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segments" ADD CONSTRAINT "Segments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sites" ADD CONSTRAINT "Sites_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sites" ADD CONSTRAINT "Sites_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseToggleToSegment" ADD CONSTRAINT "_ReleaseToggleToSegment_A_fkey" FOREIGN KEY ("A") REFERENCES "ReleaseToggles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseToggleToSegment" ADD CONSTRAINT "_ReleaseToggleToSegment_B_fkey" FOREIGN KEY ("B") REFERENCES "Segments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SegmentToSite" ADD CONSTRAINT "_SegmentToSite_A_fkey" FOREIGN KEY ("A") REFERENCES "Segments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SegmentToSite" ADD CONSTRAINT "_SegmentToSite_B_fkey" FOREIGN KEY ("B") REFERENCES "Sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
