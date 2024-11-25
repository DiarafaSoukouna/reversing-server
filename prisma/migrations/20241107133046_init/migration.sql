/*
  Warnings:

  - You are about to drop the column `label` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_date_crea` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_date_done` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_deleted` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_last_modify` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_range` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_reminder_exceptions` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_reminder_freq` on the `taches` table. All the data in the column will be lost.
  - You are about to drop the column `task_reminder_lastdate` on the `taches` table. All the data in the column will be lost.
  - Added the required column `dateMiseAJour` to the `taches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `libelle` to the `taches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taches` DROP COLUMN `label`,
    DROP COLUMN `status`,
    DROP COLUMN `task_date_crea`,
    DROP COLUMN `task_date_done`,
    DROP COLUMN `task_deleted`,
    DROP COLUMN `task_last_modify`,
    DROP COLUMN `task_range`,
    DROP COLUMN `task_reminder_exceptions`,
    DROP COLUMN `task_reminder_freq`,
    DROP COLUMN `task_reminder_lastdate`,
    ADD COLUMN `commentaires` VARCHAR(191) NULL,
    ADD COLUMN `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateDebut` DATETIME(3) NULL,
    ADD COLUMN `dateFin` DATETIME(3) NULL,
    ADD COLUMN `dateMiseAJour` DATETIME(3) NOT NULL,
    ADD COLUMN `delaiEstime` VARCHAR(191) NULL,
    ADD COLUMN `delaiReel` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `libelle` VARCHAR(191) NOT NULL,
    ADD COLUMN `priorite` VARCHAR(191) NULL,
    ADD COLUMN `statut` VARCHAR(191) NULL,
    ADD COLUMN `tacheParentId` INTEGER NULL,
    MODIFY `projet_id` INTEGER NULL;
