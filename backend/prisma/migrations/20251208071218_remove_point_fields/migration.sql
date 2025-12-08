/*
  Warnings:

  - You are about to drop the column `pointsForDraw` on the `League` table. All the data in the column will be lost.
  - You are about to drop the column `pointsForWin` on the `League` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `League` DROP COLUMN `pointsForDraw`,
    DROP COLUMN `pointsForWin`;
