const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const evaluationController = {
  // Création d'un evaluation
  createEvaluation: async (req, res) => {
    try {
      const { indicator_id, evaluation_date, value, comment } = req.body;

      if (!evaluation_date || !value) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newEvaluation = await prisma.evaluations.create({
        data: {
          indicator_id,
          evaluation_date,
          value,
          comment,
        },
      });

      res.status(201).json({
        message: "evaluation créé avec succès",
        data: newEvaluation,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'evaluation  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de l'evaluation ",
        error: error.message,
        code: 500,
      });
    }
  },
  getEvaluation: async (req, res) => {
    try {
      const evaluations = await prisma.evaluations.findMany();
      res.status(200).json({
        message: "Liste des evaluation",
        data: evaluations,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des evaluation :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des evaluation",
        error: error.message,
        code: 500,
      });
    }
  },
  getEvaluationById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le evaluation existe dans la base de données
      const evaluation = await prisma.evaluations.findUnique({
        where: { id: parseInt(id) },
      });

      if (!evaluation) {
        return res.status(404).json({
          message: "evaluation non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'evaluation",
        data: evaluation,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'evaluation:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'evaluation",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un evaluation
  updateEvaluation: async (req, res) => {
    try {
      const { id, indicator_id, evaluation_date, value, comment } = req.body;

      // Vérifie si le evaluation existe
      const evaluationExist = await prisma.evaluations.findUnique({
        where: { id: parseInt(id) },
      });
      if (!evaluationExist) {
        return res.status(404).json({ message: "evaluation non trouvé." });
      }

      const updatedevaluation = await prisma.evaluations.update({
        where: { id: parseInt(id) },
        data: {
          indicator_id,
          evaluation_date,
          value,
          comment,
        },
      });

      res.status(200).json({
        message: "evaluation mis à jour avec succès",
        data: updatedevaluation,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du evaluation :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du evaluation",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un evaluation
  deleteEvaluation: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le evaluation existe
      const evaluationExist = await prisma.evaluations.findUnique({
        where: { id: parseInt(id) },
      });
      if (!evaluationExist) {
        return res.status(404).json({ message: "evaluation non trouvé." });
      }

      await prisma.evaluations.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "evaluation supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'evaluation  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'evaluation",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = evaluationController;
