const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const priorityController = {
  // Création d'un priority
  createPriority: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const newPriority = await prisma.priority.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        message: "Priority créé avec succès",
        data: newPriority,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la priority :", error);
      res.status(500).json({
        message: "Erreur lors de la création de la priority",
        error: error.message,
        code: 500,
      });
    }
  },
  getPriority: async (req, res) => {
    try {
      const priority = await prisma.priority.findMany();
      res.status(200).json({
        message: "Liste des priorities",
        data: priority,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des priorities :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des priorities",
        error: error.message,
        code: 500,
      });
    }
  },
  getPriorityById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le priority existe dans la base de données
      const priority = await prisma.priority.findUnique({
        where: { id: parseInt(id) },
      });

      if (!priority) {
        return res.status(404).json({
          message: "priority non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de la priority",
        data: priority,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la priority :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de la priority",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un priority
  updatePriority: async (req, res) => {
    try {
      const { id, name } = req.body;

      // Vérifie si le priority existe
      const priorityExist = await prisma.priority.findUnique({
        where: { id: parseInt(id) },
      });
      if (!priorityExist) {
        return res.status(404).json({ message: "priority non trouvé." });
      }

      const updatedpriority = await prisma.priority.update({
        where: { id: parseInt(id) },
        data: {
          id,
          name,
        },
      });

      res.status(200).json({
        message: "priority mis à jour avec succès",
        data: updatedpriority,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la priority :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour de la priority",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un priority
  deletePriority: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le priority existe
      const priorityExist = await prisma.priority.findUnique({
        where: { id: parseInt(id) },
      });
      if (!priorityExist) {
        return res.status(404).json({ message: "priority non trouvé." });
      }

      await prisma.priority.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "priority supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la priority :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de la priority",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = priorityController;
