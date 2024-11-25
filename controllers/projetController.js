const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const projetController = {
  // Création d'un projet
  createProjet: async (req, res) => {
    try {
      const {
        axe_id,
        priority_id,
        manager,
        name,
        description,
        objectif,
        statut,
        budget,
        start_date,
        end_date,
        target_value,
        current_value,
      } = req.body;

      if (
        !name ||
        !description ||
        !objectif ||
        !priority_id ||
        !axe_id ||
        !statut ||
        !budget ||
        !start_date ||
        !end_date
      ) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const newprojet = await prisma.projets.create({
        data: {
          axe_id,
          priority_id,
          manager,
          name,
          description,
          objectif,
          statut,
          budget,
          target_value,
          current_value,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      });

      res.status(201).json({
        message: "projet créé avec succès",
        data: newprojet,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
      res.status(500).json({
        message: "Erreur lors de la création du projet",
        error: error.message,
        code: 500,
      });
    }
  },
  getProjet: async (req, res) => {
    try {
      const projets = await prisma.projets.findMany({
        include: {
          taches: true, // Inclut les tâches associées à chaque projet
        },
      });
      res.status(200).json({
        message: "Liste des projets d'action",
        data: projets,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des projets d'action :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des projets d'action",
        error: error.message,
        code: 500,
      });
    }
  },

  getProjetById: async (req, res) => {
    try {
      const { id } = req.params;

      // Recherche du projet avec ses tâches
      const projet = await prisma.projets.findUnique({
        where: { id: parseInt(id) },
        include: {
          taches: true, // Inclut les tâches associées au projet
        },
      });

      if (!projet) {
        return res.status(404).json({
          message: "Projet non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails du projet",
        data: projet,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du projet :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du projet",
        error: error.message,
        code: 500,
      });
    }
  },

  // Modification d'un projet
  updateProjet: async (req, res) => {
    try {
      const {
        id,
        axe_id,
        priority_id,
        manager,
        name,
        description,
        objectif,
        statut,
        budget,
        start_date,
        end_date,
        target_value,
        current_value,
      } = req.body;

      // Vérifie si le projet existe
      const projetExist = await prisma.projets.findUnique({
        where: { id: parseInt(id) },
      });
      if (!projetExist) {
        return res.status(404).json({ message: "projet non trouvé." });
      }

      const updatedprojet = await prisma.projets.update({
        where: { id: parseInt(id) },
        data: {
          axe_id,
          priority_id,
          manager,
          name,
          description,
          objectif,
          statut,
          budget,
          target_value,
          current_value,
          start_date: start_date ? new Date(start_date) : undefined,
          end_date: end_date ? new Date(end_date) : undefined,
        },
      });

      res.status(200).json({
        message: "projet mis à jour avec succès",
        data: updatedprojet,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du projet :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du projet",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un projet
  deleteProjet: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le projet existe
      const projetExist = await prisma.projets.findUnique({
        where: { id: parseInt(id) },
      });
      if (!projetExist) {
        return res.status(404).json({ message: "projet non trouvé." });
      }

      await prisma.projets.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "projet supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du projet",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = projetController;
