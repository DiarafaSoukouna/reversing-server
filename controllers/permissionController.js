const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const permissionController = {
  // Création d'un permission
  createPermission: async (req, res) => {
    try {
      const { name, description, created_date, last_updated } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newpermission = await prisma.permissions.create({
        data: {
          name,
          description,
          created_date,
          last_updated,
        },
      });

      res.status(201).json({
        message: "permission créé avec succès",
        data: newpermission,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'permission  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de l'permission ",
        error: error.message,
        code: 500,
      });
    }
  },
  getPermission: async (req, res) => {
    try {
      const permissions = await prisma.permissions.findMany();
      res.status(200).json({
        message: "Liste des permission",
        data: permissions,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des permission :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des permission",
        error: error.message,
        code: 500,
      });
    }
  },
  getPermissionById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le permission existe dans la base de données
      const permission = await prisma.permissions.findUnique({
        where: { id: parseInt(id) },
      });

      if (!permission) {
        return res.status(404).json({
          message: "permission non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'permission",
        data: permission,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'permission:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'permission",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un permission
  updatePermission: async (req, res) => {
    try {
      const { id, name, description, created_date, last_updated } = req.body;

      // Vérifie si le permission existe
      const permissionExist = await prisma.permissions.findUnique({
        where: { id: parseInt(id) },
      });
      if (!permissionExist) {
        return res.status(404).json({ message: "permission non trouvé." });
      }

      const updatedpermission = await prisma.permissions.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          created_date,
          last_updated,
        },
      });

      res.status(200).json({
        message: "permission mis à jour avec succès",
        data: updatedpermission,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du permission :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du permission",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un permission
  deletePermission: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le permission existe
      const permissionExist = await prisma.permissions.findUnique({
        where: { id: parseInt(id) },
      });
      if (!permissionExist) {
        return res.status(404).json({ message: "permission non trouvé." });
      }

      await prisma.permissions.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "permission supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'permission  :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'permission",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = permissionController;
