/*
  Warnings:

  - You are about to drop the column `suggestion_id` on the `votes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `suggestion_id` ON `votes`;

-- AlterTable
ALTER TABLE `votes` DROP COLUMN `suggestion_id`;
