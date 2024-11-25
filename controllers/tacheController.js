const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tacheController = {
  // Création d'un tache
  createTache: async (req, res) => {
    try {
      const {
        utilisateur_id,
        projet_id,
        commentaires,
        dateCreation,
        dateDebut,
        dateFin,
        dateMiseAJour,
        delaiEstime,
        delaiReel,
        description,
        libelle,
        priorite,
        statut,
        tacheParentId,
      } = req.body;

      if (!libelle || !projet_id || !statut || !dateFin || !dateDebut) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const newtache = await prisma.taches.create({
        data: {
          utilisateur_id,
          projet_id,
          commentaires,
          dateDebut,
          dateFin,
          delaiEstime,
          delaiReel,
          description,
          libelle,
          priorite,
          statut,
          tacheParentId,
          dateCreation,
          dateMiseAJour,
        },
      });

      res.status(201).json({
        message: "tache créé avec succès",
        data: newtache,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la tache :", error);
      res.status(500).json({
        message: "Erreur lors de la création de la tache",
        error: error.message,
        code: 500,
      });
    }
  },
  getTache: async (req, res) => {
    try {
      const taches = await prisma.taches.findMany();
      res.status(200).json({
        message: "Liste des taches",
        data: taches,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des taches :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des taches",
        error: error.message,
        code: 500,
      });
    }
  },
  getTacheById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le tache existe dans la base de données
      const tache = await prisma.taches.findUnique({
        where: { id: parseInt(id) },
      });

      if (!tache) {
        return res.status(404).json({
          message: "tache non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de la tache",
        data: tache,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la tache :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de la tache",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un tache
  updateTache: async (req, res) => {
    try {
      const {
        id,
        utilisateur_id,
        projet_id,
        commentaires,
        dateCreation,
        dateDebut,
        dateFin,
        dateMiseAJour,
        delaiEstime,
        delaiReel,
        description,
        libelle,
        priorite,
        statut,
        tacheParentId,
      } = req.body;

      // Vérifie si le tache existe
      const tacheExist = await prisma.taches.findUnique({
        where: { id: parseInt(id) },
      });
      if (!tacheExist) {
        return res.status(404).json({ message: "tache non trouvé." });
      }

      const updatedtache = await prisma.taches.update({
        where: { id: parseInt(id) },
        data: {
          utilisateur_id,
          projet_id,
          commentaires,
          dateDebut,
          dateFin,
          delaiEstime,
          delaiReel,
          description,
          libelle,
          priorite,
          statut,
          tacheParentId,
          dateCreation,
          dateMiseAJour,
        },
      });

      res.status(200).json({
        message: "tache mis à jour avec succès",
        data: updatedtache,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tache :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour de la tache",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un tache
  deleteTache: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le tache existe
      const tacheExist = await prisma.taches.findUnique({
        where: { id: parseInt(id) },
      });
      if (!tacheExist) {
        return res.status(404).json({ message: "tache non trouvé." });
      }

      await prisma.taches.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "tache supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la tache :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de la tache",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = tacheController;
