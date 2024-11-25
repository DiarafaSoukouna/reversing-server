const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const axeController = {
  // Création d'un axe d'action
  createAxe: async (req, res) => {
    try {
      const { plan_id, name, description, statut, objectif } = req.body;

      if (!name || !objectif || !statut || !plan_id) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newAxe = await prisma.axes.create({
        data: {
          plan_id,
          name,
          description,
          statut,
          objectif,
        },
      });

      res.status(201).json({
        message: "axe d'action créé avec succès",
        data: newAxe,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'axe  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de l'axe ",
        error: error.message,
        code: 500,
      });
    }
  },
  getAxe: async (req, res) => {
    try {
      const axes = await prisma.axes.findMany();
      res.status(200).json({
        message: "Liste des axes d'action",
        data: axes,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des axes d'action :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des axes d'action",
        error: error.message,
        code: 500,
      });
    }
  },
  getaxeById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le axe existe dans la base de données
      const axe = await prisma.axes.findUnique({
        where: { id: parseInt(id) },
      });

      if (!axe) {
        return res.status(404).json({
          message: "axe non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'axe",
        data: axe,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'axe:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'axe",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un axe d'action
  updateAxe: async (req, res) => {
    try {
      const { id, plan_id, name, description, statut, objectif } = req.body;

      // Vérifie si le axe existe
      const axeExist = await prisma.axes.findUnique({
        where: { id: parseInt(id) },
      });
      if (!axeExist) {
        return res.status(404).json({ message: "axe non trouvé." });
      }

      const updatedAxe = await prisma.axes.update({
        where: { id: parseInt(id) },
        data: {
          plan_id,
          name,
          description,
          statut,
          objectif,
        },
      });

      res.status(200).json({
        message: "axe d'action mis à jour avec succès",
        data: updatedAxe,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du axe d'action :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du axe d'action",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un axe d'action
  deleteAxe: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le axe existe
      const axeExist = await prisma.axes.findUnique({
        where: { id: parseInt(id) },
      });
      if (!axeExist) {
        return res.status(404).json({ message: "axe non trouvé." });
      }

      await prisma.axes.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "axe supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'axe  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'axe",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = axeController;
