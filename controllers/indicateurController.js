const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const indicateurController = {
  // Création d'un indicateur
  createIndicateur: async (req, res) => {
    try {
      const {
        project_id,
        name,
        description,
        unit,
        baseline_value,
        target_value,
        current_value,
        created_date,
        last_updated,
        latitude,
        longitude,
      } = req.body;

      if (!name || !description || !project_id || !unit) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const newindicateur = await prisma.indicateurs.create({
        data: {
          project_id,
          name,
          description,
          unit,
          baseline_value,
          target_value,
          current_value,
          created_date,
          last_updated,
          latitude,
          longitude,
        },
      });

      res.status(201).json({
        message: "indicateur créé avec succès",
        data: newindicateur,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création du indicateur :", error);
      res.status(500).json({
        message: "Erreur lors de la création du indicateur",
        error: error.message,
        code: 500,
      });
    }
  },
  getIndicateur: async (req, res) => {
    try {
      const indicateurs = await prisma.indicateurs.findMany();
      res.status(200).json({
        message: "Liste des indicateurs",
        data: indicateurs,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des indicateurs :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des indicateurs",
        error: error.message,
        code: 500,
      });
    }
  },
  getIndicateurById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le indicateur existe dans la base de données
      const indicateur = await prisma.indicateurs.findUnique({
        where: { id: parseInt(id) },
      });

      if (!indicateur) {
        return res.status(404).json({
          message: "indicateur non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails du indicateur",
        data: indicateur,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du indicateur :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du indicateur",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un indicateur
  updateIndicateur: async (req, res) => {
    try {
      const {
        id,
        project_id,
        name,
        description,
        unit,
        baseline_value,
        target_value,
        current_value,
        created_date,
        last_updated,
        latitude,
        longitude,
      } = req.body;

      // Vérifie si le indicateur existe
      const indicateurExist = await prisma.indicateurs.findUnique({
        where: { id: parseInt(id) },
      });
      if (!indicateurExist) {
        return res.status(404).json({ message: "indicateur non trouvé." });
      }

      const updatedindicateur = await prisma.indicateurs.update({
        where: { id: parseInt(id) },
        data: {
          project_id,
          name,
          description,
          unit,
          baseline_value,
          target_value,
          current_value,
          created_date,
          last_updated,
          latitude,
          longitude,
        },
      });

      res.status(200).json({
        message: "indicateur mis à jour avec succès",
        data: updatedindicateur,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du indicateur :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du indicateur",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un indicateur
  deleteIndicateur: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le indicateur existe
      const indicateurExist = await prisma.indicateurs.findUnique({
        where: { id: parseInt(id) },
      });
      if (!indicateurExist) {
        return res.status(404).json({ message: "indicateur non trouvé." });
      }

      await prisma.indicateurs.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "indicateur supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du indicateur :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du indicateur",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = indicateurController;
