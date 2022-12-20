/*
  Warnings:

  - Made the column `rules` on table `Segments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Segments" ALTER COLUMN "rules" SET NOT NULL,
ALTER COLUMN "rules" SET DEFAULT '[]';
