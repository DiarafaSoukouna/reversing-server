const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const suggestionController = {
  // Création d'un suggestion
  createSuggestion: async (req, res) => {
    try {
      const { compte_id, project_id, suggestion_content } = req.body;

      if (!compte_id || !project_id || !suggestion_content) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newsuggestion = await prisma.suggestions.create({
        data: {
          compte_id,
          project_id,
          suggestion_content,
        },
      });

      res.status(201).json({
        message: "suggestion créé avec succès",
        data: newsuggestion,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'suggestion  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de l'suggestion ",
        error: error.message,
        code: 500,
      });
    }
  },
  getSuggestion: async (req, res) => {
    try {
      const suggestions = await prisma.suggestions.findMany();
      res.status(200).json({
        message: "Liste des suggestions",
        data: suggestions,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des suggestions",
        error: error.message,
        code: 500,
      });
    }
  },
  getSuggestionById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le suggestion existe dans la base de données
      const suggestion = await prisma.suggestions.findUnique({
        where: { id: parseInt(id) },
      });

      if (!suggestion) {
        return res.status(404).json({
          message: "suggestion non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'suggestion",
        data: suggestion,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'suggestion:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'suggestion",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un suggestion
  updateSuggestion: async (req, res) => {
    try {
      const { id, compte_id, project_id, suggestion_content } = req.body;

      // Vérifie si le suggestion existe
      const suggestionExist = await prisma.suggestions.findUnique({
        where: { id: parseInt(id) },
      });
      if (!suggestionExist) {
        return res.status(404).json({ message: "suggestion non trouvé." });
      }

      const updatedsuggestion = await prisma.suggestions.update({
        where: { id: parseInt(id) },
        data: {
          id,
          compte_id,
          project_id,
          suggestion_content,
        },
      });

      res.status(200).json({
        message: "suggestion mis à jour avec succès",
        data: updatedsuggestion,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du suggestion :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du suggestion",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un suggestion
  deleteSuggestion: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le suggestion existe
      const suggestionExist = await prisma.suggestions.findUnique({
        where: { id: parseInt(id) },
      });
      if (!suggestionExist) {
        return res.status(404).json({ message: "suggestion non trouvé." });
      }

      await prisma.suggestions.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "suggestion supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'suggestion  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'suggestion",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = suggestionController;
