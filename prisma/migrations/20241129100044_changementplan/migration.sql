/*
  Warnings:

  - You are about to drop the column `plan_id` on the `axes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `axes` DROP FOREIGN KEY `axes_ibfk_1`;

-- AlterTable
ALTER TABLE `axes` DROP COLUMN `plan_id`;
