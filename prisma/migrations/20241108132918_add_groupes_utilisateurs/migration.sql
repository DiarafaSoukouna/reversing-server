-- CreateTable
CREATE TABLE `GroupesUtilisateurs` (
    `groupe_id` INTEGER NOT NULL,
    `utilisateur_id` INTEGER NOT NULL,

    PRIMARY KEY (`groupe_id`, `utilisateur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupesUtilisateurs` ADD CONSTRAINT `GroupesUtilisateurs_groupe_id_fkey` FOREIGN KEY (`groupe_id`) REFERENCES `groupes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupesUtilisateurs` ADD CONSTRAINT `GroupesUtilisateurs_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
