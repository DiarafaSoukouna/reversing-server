const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const voteController = {
  // Création d'un vote
  createVote: async (req, res) => {
    try {
      const { compte_id, vote_value } = req.body;

      if (!compte_id || !vote_value) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newvote = await prisma.votes.create({
        data: {
          compte_id,
          vote_value,
        },
      });

      res.status(201).json({
        message: "vote créé avec succès",
        data: newvote,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création du vote  :", error);
      res.status(500).json({
        message: "Erreur lors de la création du vote ",
        error: error.message,
        code: 500,
      });
    }
  },
  getVote: async (req, res) => {
    try {
      const votes = await prisma.votes.findMany();
      res.status(200).json({
        message: "Liste des votes",
        data: votes,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des votes :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des votes",
        error: error.message,
        code: 500,
      });
    }
  },
  getVoteById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le vote existe dans la base de données
      const vote = await prisma.votes.findUnique({
        where: { id: parseInt(id) },
      });

      if (!vote) {
        return res.status(404).json({
          message: "vote non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails du vote",
        data: vote,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du vote:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du vote",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un vote
  updateVote: async (req, res) => {
    try {
      const { id, compte_id, vote_value } = req.body;

      // Vérifie si le vote existe
      const voteExist = await prisma.votes.findUnique({
        where: { id: parseInt(id) },
      });
      if (!voteExist) {
        return res.status(404).json({ message: "vote non trouvé." });
      }

      const updatedvote = await prisma.votes.update({
        where: { id: parseInt(id) },
        data: {
          compte_id,
          vote_value,
        },
      });

      res.status(200).json({
        message: "vote mis à jour avec succès",
        data: updatedvote,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du vote :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du vote",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un vote
  deleteVote: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le vote existe
      const voteExist = await prisma.votes.findUnique({
        where: { id: parseInt(id) },
      });
      if (!voteExist) {
        return res.status(404).json({ message: "vote non trouvé." });
      }

      await prisma.votes.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "vote supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du vote  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du vote",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = voteController;
