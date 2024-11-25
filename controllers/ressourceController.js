const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ressourceController = {
  // Création d'un ressource
  createRessource: async (req, res) => {
    try {
      const { project_id, name, description, quantity, unit, cost } = req.body;

      if (!name || !project_id) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newressource = await prisma.ressources.create({
        data: {
          project_id,
          name,
          description,
          quantity,
          unit,
          cost,
        },
      });

      res.status(201).json({
        message: "ressource créé avec succès",
        data: newressource,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'ressource  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de l'ressource ",
        error: error.message,
        code: 500,
      });
    }
  },
  getRessource: async (req, res) => {
    try {
      const ressources = await prisma.ressources.findMany();
      res.status(200).json({
        message: "Liste des ressources",
        data: ressources,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des ressources :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des ressources",
        error: error.message,
        code: 500,
      });
    }
  },
  getRessourceById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le ressource existe dans la base de données
      const ressource = await prisma.ressources.findUnique({
        where: { id: parseInt(id) },
      });

      if (!ressource) {
        return res.status(404).json({
          message: "ressource non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'ressource",
        data: ressource,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ressource:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'ressource",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un ressource
  updateRessource: async (req, res) => {
    try {
      const { id, project_id, name, description, quantity, unit, cost } =
        req.body;

      // Vérifie si le ressource existe
      const ressourceExist = await prisma.ressources.findUnique({
        where: { id: parseInt(id) },
      });
      if (!ressourceExist) {
        return res.status(404).json({ message: "ressource non trouvé." });
      }

      const updatedressource = await prisma.ressources.update({
        where: { id: parseInt(id) },
        data: {
          project_id,
          name,
          description,
          quantity,
          unit,
          cost,
        },
      });

      res.status(200).json({
        message: "ressource mis à jour avec succès",
        data: updatedressource,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du ressource :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du ressource",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un ressource
  deleteRessource: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le ressource existe
      const ressourceExist = await prisma.ressources.findUnique({
        where: { id: parseInt(id) },
      });
      if (!ressourceExist) {
        return res.status(404).json({ message: "ressource non trouvé." });
      }

      await prisma.ressources.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "ressource supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ressource  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'ressource",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = ressourceController;
