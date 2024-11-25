// controllers/projetUtilisateurController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const projetUtilisateurController = {
  async addUtilisateurToprojet(req, res) {
    try {
      const { projet_id, utilisateur_id } = req.body;
      const projetUtilisateur = await prisma.projet_utilisateurs.create({
        data: { projet_id, utilisateur_id },
      });
      res.status(201).json({
        message: "Utilisateur ajouté avec succès",
        data: projetUtilisateur,
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
  async removeUtilisateurFromprojet(req, res) {
    try {
      const { projet_id, utilisateur_id } = req.body;
      await prisma.projet_utilisateurs.delete({
        where: { projet_id_utilisateur_id: { projet_id, utilisateur_id } },
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
  async getUtilisateursByprojet(req, res) {
    try {
      const { projet_id } = req.params;
      const Utilisateurs = await prisma.projet_utilisateurs.findMany({
        where: { projet_id },
        include: { utilisateurs: true },
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
  async getprojetsByUtilisateur(req, res) {
    try {
      const { utilisateur_id } = req.params;
      const projets = await prisma.projet_utilisateurs.findMany({
        where: { utilisateur_id },
        include: { projets: true },
      });
      res.status(200).json({
        message: "Rôles récupérés avec succès",
        data: projets,
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

module.exports = projetUtilisateurController;
