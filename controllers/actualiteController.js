const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const actualiteController = {
  // Création d'un actualite
  createActualite: async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newactualite = await prisma.actualites.create({
        data: {
          title,
          content,
        },
      });

      res.status(201).json({
        message: "actualite créé avec succès",
        data: newactualite,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'actualite  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de l'actualite ",
        error: error.message,
        code: 500,
      });
    }
  },
  getActualite: async (req, res) => {
    try {
      const actualites = await prisma.actualites.findMany({
        include: {
          actualite_images: true, // Inclut les images associées à chaque actualité
        },
      });

      res.status(200).json({
        message: "Liste des actualités",
        data: actualites,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des actualités :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des actualités",
        error: error.message,
        code: 500,
      });
    }
  },

  getActualiteById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le actualite existe dans la base de données
      const actualite = await prisma.actualites.findUnique({
        where: { id: parseInt(id) },
      });

      if (!actualite) {
        return res.status(404).json({
          message: "actualite non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'actualite",
        data: actualite,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'actualite:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'actualite",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un actualite
  updateActualite: async (req, res) => {
    try {
      const { id, title, content } = req.body;

      // Vérifie si le actualite existe
      const actualiteExist = await prisma.actualites.findUnique({
        where: { id: parseInt(id) },
      });
      if (!actualiteExist) {
        return res.status(404).json({ message: "actualite non trouvé." });
      }

      const updatedactualite = await prisma.actualites.update({
        where: { id: parseInt(id) },
        data: {
          id,
          title,
          content,
        },
      });

      res.status(200).json({
        message: "actualite mis à jour avec succès",
        data: updatedactualite,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du actualite :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du actualite",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un actualite
  deleteActualite: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le actualite existe
      const actualiteExist = await prisma.actualites.findUnique({
        where: { id: parseInt(id) },
      });
      if (!actualiteExist) {
        return res.status(404).json({ message: "actualite non trouvé." });
      }

      await prisma.actualites.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "actualite supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'actualite  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'actualite",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = actualiteController;
