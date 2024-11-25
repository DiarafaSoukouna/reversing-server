// controllers/groupeProjetController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const groupeProjetController = {
  async addProjetTogroupe(req, res) {
    try {
      const { groupe_id, projet_id } = req.body;
      const groupeProjet = await prisma.projet_groupes.create({
        data: { groupe_id, projet_id },
      });
      res.status(201).json({
        message: "Projet ajouté avec succès",
        data: groupeProjet,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de la Projet",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async removeProjetFromgroupe(req, res) {
    try {
      const { groupe_id, projet_id } = req.body;
      await prisma.projet_groupes.delete({
        where: { groupe_id_projet_id: { groupe_id, projet_id } },
      });
      res.status(200).json({
        message: "Projet supprimée avec succès",
        data: null,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la Projet",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getProjetsBygroupe(req, res) {
    try {
      const { groupe_id } = req.params;
      const Projets = await prisma.projet_groupes.findMany({
        where: { groupe_id },
        include: { projets: true },
      });
      res.status(200).json({
        message: "Projets récupérées avec succès",
        data: Projets,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des Projets",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getgroupesByProjet(req, res) {
    try {
      const { projet_id } = req.params;
      const groupes = await prisma.projet_groupes.findMany({
        where: { projet_id },
        include: { groupes: true },
      });
      res.status(200).json({
        message: "Rôles récupérés avec succès",
        data: groupes,
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

module.exports = groupeProjetController;
