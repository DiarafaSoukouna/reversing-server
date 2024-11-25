const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const groupeController = {
  // Création d'un groupe
  createGroupe: async (req, res) => {
    try {
      const { nom } = req.body;

      if (!nom) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newgroupe = await prisma.groupes.create({
        data: {
          nom,
        },
      });

      res.status(201).json({
        message: "groupe créé avec succès",
        data: newgroupe,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création du groupe  :", error);
      res.status(500).json({
        message: "Erreur lors de la création du groupe ",
        error: error.message,
        code: 500,
      });
    }
  },
  getGroupe: async (req, res) => {
    try {
      const groupes = await prisma.groupes.findMany();
      res.status(200).json({
        message: "Liste des groupes",
        data: groupes,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des groupes",
        error: error.message,
        code: 500,
      });
    }
  },
  getGroupeById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le groupe existe dans la base de données
      const groupe = await prisma.groupes.findUnique({
        where: { id: parseInt(id) },
      });

      if (!groupe) {
        return res.status(404).json({
          message: "groupe non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails du groupe",
        data: groupe,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du groupe:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du groupe",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un groupe
  updateGroupe: async (req, res) => {
    try {
      const { id, nom } = req.body;

      // Vérifie si le groupe existe
      const groupeExist = await prisma.groupes.findUnique({
        where: { id: parseInt(id) },
      });
      if (!groupeExist) {
        return res.status(404).json({ message: "groupe non trouvé." });
      }

      const updatedgroupe = await prisma.groupes.update({
        where: { id: parseInt(id) },
        data: {
          nom,
        },
      });

      res.status(200).json({
        message: "groupe mis à jour avec succès",
        data: updatedgroupe,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du groupe :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du groupe",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un groupe
  deleteGroupe: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le groupe existe
      const groupeExist = await prisma.groupes.findUnique({
        where: { id: parseInt(id) },
      });
      if (!groupeExist) {
        return res.status(404).json({ message: "groupe non trouvé." });
      }

      await prisma.groupes.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "groupe supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du groupe",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = groupeController;
