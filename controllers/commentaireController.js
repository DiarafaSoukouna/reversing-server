const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const commentaireController = {
  // Création d'un commentaire
  createCommentaire: async (req, res) => {
    try {
      const { project_id, compte_id, content } = req.body;

      if (!project_id || !compte_id || !content) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newcommentaire = await prisma.commentaires.create({
        data: {
          project_id,
          compte_id,
          content,
        },
      });

      res.status(201).json({
        message: "commentaire créé avec succès",
        data: newcommentaire,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création du commentaire  :", error);
      res.status(500).json({
        message: "Erreur lors de la création du commentaire ",
        error: error.message,
        code: 500,
      });
    }
  },
  getCommentaire: async (req, res) => {
    try {
      const commentaires = await prisma.commentaires.findMany();
      res.status(200).json({
        message: "Liste des commentaires",
        data: commentaires,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des commentaires",
        error: error.message,
        code: 500,
      });
    }
  },
  getCommentaireById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le commentaire existe dans la base de données
      const commentaire = await prisma.commentaires.findUnique({
        where: { id: parseInt(id) },
      });

      if (!commentaire) {
        return res.status(404).json({
          message: "commentaire non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails du commentaire",
        data: commentaire,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du commentaire:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du commentaire",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un commentaire
  updateCommentaire: async (req, res) => {
    try {
      const { id, project_id, compte_id, content } = req.body;

      // Vérifie si le commentaire existe
      const commentaireExist = await prisma.commentaires.findUnique({
        where: { id: parseInt(id) },
      });
      if (!commentaireExist) {
        return res.status(404).json({ message: "commentaire non trouvé." });
      }

      const updatedcommentaire = await prisma.commentaires.update({
        where: { id: parseInt(id) },
        data: {
          id,
          project_id,
          compte_id,
          content,
        },
      });

      res.status(200).json({
        message: "commentaire mis à jour avec succès",
        data: updatedcommentaire,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du commentaire",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un commentaire
  deleteCommentaire: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le commentaire existe
      const commentaireExist = await prisma.commentaires.findUnique({
        where: { id: parseInt(id) },
      });
      if (!commentaireExist) {
        return res.status(404).json({ message: "commentaire non trouvé." });
      }

      await prisma.commentaires.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "commentaire supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du commentaire",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = commentaireController;
