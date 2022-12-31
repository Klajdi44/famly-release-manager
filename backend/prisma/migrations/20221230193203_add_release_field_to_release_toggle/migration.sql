/*
  Warnings:

  - Added the required column `release` to the `ReleaseToggles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReleaseToggles" ADD COLUMN     "release" JSONB NOT NULL;
