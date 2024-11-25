// controllers/tacheGroupeController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tacheGroupeController = {
  async addGroupeTotache(req, res) {
    try {
      const { tache_id, groupe_id } = req.body;
      const tacheGroupe = await prisma.tache_assignations_groupes.create({
        data: { tache_id, groupe_id },
      });
      res.status(201).json({
        message: "Groupe ajouté avec succès",
        data: tacheGroupe,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de la Groupe",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async removeGroupeFromtache(req, res) {
    try {
      const { tache_id, groupe_id } = req.body;
      await prisma.tache_assignations_groupes.delete({
        where: { tache_id_groupe_id: { tache_id, groupe_id } },
      });
      res.status(200).json({
        message: "Groupe supprimée avec succès",
        data: null,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la Groupe",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getGroupesBytache(req, res) {
    try {
      const { tache_id } = req.params;
      const Groupes = await prisma.tache_assignations_groupes.findMany({
        where: { tache_id },
        include: { taches: true },
      });
      res.status(200).json({
        message: "Groupes récupérées avec succès",
        data: Groupes,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des Groupes",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async gettachesByGroupe(req, res) {
    try {
      const { groupe_id } = req.params;
      const taches = await prisma.tache_assignations_groupes.findMany({
        where: { groupe_id },
        include: { taches: true },
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

module.exports = tacheGroupeController;
