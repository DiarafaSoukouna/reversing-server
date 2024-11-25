-- CreateTable
CREATE TABLE `actualite_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actualite_id` INTEGER NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,

    INDEX `actualite_id`(`actualite_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actualites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `axes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `statut` VARCHAR(100) NULL,
    `objectif` TEXT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `plan_id`(`plan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentaires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `compte_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `compte_id`(`compte_id`),
    INDEX `project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comptes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `validity` ENUM('D', 'Y', 'N') NOT NULL DEFAULT 'Y',
    `user_id` INTEGER NULL,

    UNIQUE INDEX `username`(`username`),
    INDEX `role_id`(`role_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `file_path` VARCHAR(255) NULL,
    `uploaded_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indicator_id` INTEGER NOT NULL,
    `evaluation_date` DATE NULL,
    `value` FLOAT NULL,
    `comment` TEXT NULL,

    INDEX `indicator_id`(`indicator_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groupes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indicateurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `unit` VARCHAR(50) NULL,
    `baseline_value` FLOAT NULL,
    `target_value` FLOAT NULL,
    `current_value` FLOAT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NULL,
    `body` TEXT NOT NULL,
    `posted_by` INTEGER NOT NULL DEFAULT 0,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `newsletter_statut` VARCHAR(5) NOT NULL DEFAULT 'Y',

    INDEX `newsletter_index`(`title`(100), `body`(100)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans_action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `objectif` TEXT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `priority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projet_groupes` (
    `projet_id` INTEGER NOT NULL,
    `groupe_id` INTEGER NOT NULL,

    INDEX `groupe_id`(`groupe_id`),
    PRIMARY KEY (`projet_id`, `groupe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projet_utilisateurs` (
    `projet_id` INTEGER NOT NULL,
    `utilisateur_id` INTEGER NOT NULL,

    INDEX `utilisateur_id`(`utilisateur_id`),
    PRIMARY KEY (`projet_id`, `utilisateur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `axe_id` INTEGER NOT NULL,
    `priority_id` INTEGER NULL,
    `manager` INTEGER NULL,
    `name` VARCHAR(500) NOT NULL,
    `description` TEXT NULL,
    `objectif` TEXT NULL,
    `statut` VARCHAR(100) NULL,
    `budget` INTEGER NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `target_value` FLOAT NULL,
    `current_value` FLOAT NULL,

    INDEX `axe_id`(`axe_id`),
    INDEX `manager`(`manager`),
    INDEX `priority_id`(`priority_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ressources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `quantity` FLOAT NULL,
    `unit` VARCHAR(50) NULL,
    `cost` DECIMAL(10, 2) NULL,

    INDEX `project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `permission_id`(`permission_id`),
    PRIMARY KEY (`role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_updated` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suggestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compte_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,
    `suggestion_content` TEXT NOT NULL,
    `submitted_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `compte_id`(`compte_id`),
    INDEX `project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tache_assignations_groupes` (
    `tache_id` INTEGER NOT NULL,
    `groupe_id` INTEGER NOT NULL,

    INDEX `groupe_id`(`groupe_id`),
    PRIMARY KEY (`tache_id`, `groupe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tache_assignations_utilisateurs` (
    `tache_id` INTEGER NOT NULL,
    `utilisateur_id` INTEGER NOT NULL,

    INDEX `utilisateur_id`(`utilisateur_id`),
    PRIMARY KEY (`tache_id`, `utilisateur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(4000) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `utilisateur_id` INTEGER NULL,
    `projet_id` INTEGER NOT NULL,
    `task_date_done` DATETIME(0) NOT NULL DEFAULT ('0001-01-01 00:00:00'),
    `task_reminder_freq` VARCHAR(100) NOT NULL,
    `task_reminder_lastdate` DATETIME(0) NOT NULL DEFAULT ('0001-01-01 00:00:00'),
    `task_reminder_exceptions` VARCHAR(500) NOT NULL DEFAULT '',
    `task_range` INTEGER NOT NULL,
    `task_date_crea` DATETIME(0) NOT NULL DEFAULT ('0001-01-01 00:00:00'),
    `task_last_modify` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `task_deleted` VARCHAR(1) NOT NULL DEFAULT 'N',

    INDEX `projet_id`(`projet_id`),
    INDEX `utilisateur_id`(`utilisateur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilisateurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,
    `prenom` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `category_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compte_id` INTEGER NOT NULL,
    `suggestion_id` INTEGER NOT NULL,
    `vote_value` INTEGER NULL,
    `voted_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `compte_id`(`compte_id`),
    INDEX `suggestion_id`(`suggestion_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `actualite_images` ADD CONSTRAINT `actualite_images_ibfk_1` FOREIGN KEY (`actualite_id`) REFERENCES `actualites`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `axes` ADD CONSTRAINT `axes_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plans_action`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `commentaires` ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `commentaires` ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`compte_id`) REFERENCES `comptes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comptes` ADD CONSTRAINT `comptes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `utilisateurs`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comptes` ADD CONSTRAINT `comptes_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`indicator_id`) REFERENCES `indicateurs`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `indicateurs` ADD CONSTRAINT `indicateurs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projet_groupes` ADD CONSTRAINT `projet_groupes_ibfk_1` FOREIGN KEY (`projet_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projet_groupes` ADD CONSTRAINT `projet_groupes_ibfk_2` FOREIGN KEY (`groupe_id`) REFERENCES `groupes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projet_utilisateurs` ADD CONSTRAINT `projet_utilisateurs_ibfk_1` FOREIGN KEY (`projet_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projet_utilisateurs` ADD CONSTRAINT `projet_utilisateurs_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projets` ADD CONSTRAINT `projets_ibfk_1` FOREIGN KEY (`manager`) REFERENCES `utilisateurs`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projets` ADD CONSTRAINT `projets_ibfk_2` FOREIGN KEY (`axe_id`) REFERENCES `axes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `projets` ADD CONSTRAINT `projets_ibfk_3` FOREIGN KEY (`priority_id`) REFERENCES `priority`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ressources` ADD CONSTRAINT `ressources_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `suggestions` ADD CONSTRAINT `suggestions_ibfk_1` FOREIGN KEY (`compte_id`) REFERENCES `comptes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `suggestions` ADD CONSTRAINT `suggestions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tache_assignations_groupes` ADD CONSTRAINT `tache_assignations_groupes_ibfk_1` FOREIGN KEY (`tache_id`) REFERENCES `taches`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tache_assignations_groupes` ADD CONSTRAINT `tache_assignations_groupes_ibfk_2` FOREIGN KEY (`groupe_id`) REFERENCES `groupes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tache_assignations_utilisateurs` ADD CONSTRAINT `tache_assignations_utilisateurs_ibfk_1` FOREIGN KEY (`tache_id`) REFERENCES `taches`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tache_assignations_utilisateurs` ADD CONSTRAINT `tache_assignations_utilisateurs_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `taches` ADD CONSTRAINT `taches_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `taches` ADD CONSTRAINT `taches_ibfk_2` FOREIGN KEY (`projet_id`) REFERENCES `projets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `utilisateurs` ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_user`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`compte_id`) REFERENCES `comptes`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`suggestion_id`) REFERENCES `suggestions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
