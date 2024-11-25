// controllers/groupeutilisateurController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const groupeutilisateurController = {
  async addUtilisateurTogroupe(req, res) {
    try {
      const { groupe_id, utilisateur_id } = req.body;
      const groupeutilisateur = await prisma.groupesUtilisateurs.create({
        data: { groupe_id, utilisateur_id },
      });
      res.status(201).json({
        message: "utilisateur ajoutée avec succès",
        data: groupeutilisateur,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de la utilisateur",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async removeUtilisateurFromgroupe(req, res) {
    try {
      const { groupe_id, utilisateur_id } = req.body;
      await prisma.groupesUtilisateurs.delete({
        where: { groupe_id_utilisateur_id: { groupe_id, utilisateur_id } },
      });
      res.status(200).json({
        message: "utilisateur supprimée avec succès",
        data: null,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la utilisateur",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getUtilisateursBygroupe(req, res) {
    try {
      const { groupe_id } = req.params;
      const utilisateurs = await prisma.groupesUtilisateurs.findMany({
        where: { groupe_id },
        include: { utilisateurs: true },
      });
      res.status(200).json({
        message: "utilisateurs récupérées avec succès",
        data: utilisateurs,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des utilisateurs",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getgroupesByutilisateur(req, res) {
    try {
      const { utilisateur_id } = req.params;
      const groupes = await prisma.groupesUtilisateurs.findMany({
        where: { utilisateur_id },
        include: { groupes: true },
      });
      res.status(200).json({
        message: "Groupes récupérés avec succès",
        data: groupes,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des groupes",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
};

module.exports = groupeutilisateurController;
