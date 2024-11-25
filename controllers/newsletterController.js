const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const newsletterController = {
  // Création d'un newsletter
  createNewsletter: async (req, res) => {
    try {
      const { title, body, posted_by, newsletter_statut } = req.body;

      if (!title || !body) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newnewsletter = await prisma.newsletter.create({
        data: {
          title,
          body,
          posted_by,
          newsletter_statut,
        },
      });

      res.status(201).json({
        message: "newsletter créé avec succès",
        data: newnewsletter,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de newsletter  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de newsletter ",
        error: error.message,
        code: 500,
      });
    }
  },
  getNewsletter: async (req, res) => {
    try {
      const newsletters = await prisma.newsletter.findMany();
      res.status(200).json({
        message: "Liste des newsletters d'action",
        data: newsletters,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des newsletters d'action :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des newsletters d'action",
        error: error.message,
        code: 500,
      });
    }
  },
  getNewsletterById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le newsletter existe dans la base de données
      const newsletter = await prisma.newsletter.findUnique({
        where: { id: parseInt(id) },
      });

      if (!newsletter) {
        return res.status(404).json({
          message: "newsletter non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de newsletter",
        data: newsletter,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de newsletter:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de newsletter",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un newsletter
  updateNewsletter: async (req, res) => {
    try {
      const { id, title, body, posted_by, newsletter_statut } = req.body;

      // Vérifie si le newsletter existe
      const newsletterExist = await prisma.newsletter.findUnique({
        where: { id: parseInt(id) },
      });
      if (!newsletterExist) {
        return res.status(404).json({ message: "newsletter non trouvé." });
      }

      const updatednewsletter = await prisma.newsletter.update({
        where: { id: parseInt(id) },
        data: {
          id,
          title,
          body,
          posted_by,
          newsletter_statut,
        },
      });

      res.status(200).json({
        message: "newsletter mis à jour avec succès",
        data: updatednewsletter,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du newsletter :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du newsletter",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un newsletter
  deleteNewsletter: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le newsletter existe
      const newsletterExist = await prisma.newsletter.findUnique({
        where: { id: parseInt(id) },
      });
      if (!newsletterExist) {
        return res.status(404).json({ message: "newsletter non trouvé." });
      }

      await prisma.newsletter.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "newsletter supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de newsletter  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de newsletter",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = newsletterController;
