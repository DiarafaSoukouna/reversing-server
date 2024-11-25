// controllers/tacheUtilisateurController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tacheUtilisateurController = {
  async addUtilisateurTotache(req, res) {
    try {
      const { tache_id, utilisateur_id } = req.body;
      const tacheUtilisateur =
        await prisma.tache_assignations_utilisateurs.create({
          data: { tache_id, utilisateur_id },
        });
      res.status(201).json({
        message: "Utilisateur ajouté avec succès",
        data: tacheUtilisateur,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de la Utilisateur",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async removeUtilisateurFromtache(req, res) {
    try {
      const { tache_id, utilisateur_id } = req.body;
      await prisma.tache_assignations_utilisateurs.delete({
        where: { tache_id_utilisateur_id: { tache_id, utilisateur_id } },
      });
      res.status(200).json({
        message: "Utilisateur supprimée avec succès",
        data: null,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la Utilisateur",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getUtilisateursBytache(req, res) {
    try {
      const { tache_id } = req.params;
      const Utilisateurs =
        await prisma.tache_assignations_utilisateurs.findMany({
          where: { tache_id },
          include: { taches: true },
        });
      res.status(200).json({
        message: "Utilisateurs récupérées avec succès",
        data: Utilisateurs,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des Utilisateurs",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async gettachesByUtilisateur(req, res) {
    try {
      const { utilisateur_id } = req.params;
      const taches = await prisma.tache_assignations_utilisateurs.findMany({
        where: { utilisateur_id },
        include: { utilisateurs: true },
      });
      res.status(200).json({
        message: "Rôles récupérés avec succès",
        data: taches,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des rôles",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
};

module.exports = tacheUtilisateurController;
