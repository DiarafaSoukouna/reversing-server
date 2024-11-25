const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const planController = {
  // Création d'un plan d'action
  createPlan: async (req, res) => {
    try {
      const { name, description, objectif, start_date, end_date } = req.body;

      if (!name || !description || !objectif || !start_date || !end_date) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const newPlan = await prisma.plans_action.create({
        data: {
          name,
          description,
          objectif,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      });

      res.status(201).json({
        message: "Plan d'action créé avec succès",
        data: newPlan,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création du plan d'action :", error);
      res.status(500).json({
        message: "Erreur lors de la création du plan d'action",
        error: error.message,
        code: 500,
      });
    }
  },
  getPlan: async (req, res) => {
    try {
      const plans = await prisma.plans_action.findMany();
      res.status(200).json({
        message: "Liste des plans d'action",
        data: plans,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des plans d'action :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des plans d'action",
        error: error.message,
        code: 500,
      });
    }
  },
  getPlanById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le plan existe dans la base de données
      const plan = await prisma.plans_action.findUnique({
        where: { id: parseInt(id) },
      });

      if (!plan) {
        return res.status(404).json({
          message: "Plan d'action non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails du plan d'action",
        data: plan,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du plan d'action :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du plan d'action",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un plan d'action
  updatePlan: async (req, res) => {
    try {
      const { id, name, description, objectif, start_date, end_date } =
        req.body;

      // Vérifie si le plan existe
      const planExist = await prisma.plans_action.findUnique({
        where: { id: parseInt(id) },
      });
      if (!planExist) {
        return res.status(404).json({ message: "Plan d'action non trouvé." });
      }

      const updatedPlan = await prisma.plans_action.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          objectif,
          start_date: start_date ? new Date(start_date) : undefined,
          end_date: end_date ? new Date(end_date) : undefined,
        },
      });

      res.status(200).json({
        message: "Plan d'action mis à jour avec succès",
        data: updatedPlan,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du plan d'action :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du plan d'action",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un plan d'action
  deletePlan: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le plan existe
      const planExist = await prisma.plans_action.findUnique({
        where: { id: parseInt(id) },
      });
      if (!planExist) {
        return res.status(404).json({ message: "Plan d'action non trouvé." });
      }

      await prisma.plans_action.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "Plan d'action supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du plan d'action :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du plan d'action",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = planController;
