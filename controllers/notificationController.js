const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const notificationController = {
  // Création d'un notification
  createNotification: async (req, res) => {
    try {
      const { id, titre, message, type, isRead, userId, groupeId } = req.body;

      if (!titre || !message) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newNotification = await prisma.notifications.create({
        data: {
          id,
          titre,
          message,
          type,
          isRead: false,
          userId,
          groupeId,
        },
      });

      res.status(201).json({
        message: "notification créé avec succès",
        data: newNotification,
        code: 201,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la notification  :", error);
      res.status(500).json({
        message: "Erreur lors de la création de la notification ",
        error: error.message,
        code: 500,
      });
    }
  },
  getNotification: async (req, res) => {
    try {
      const notifications = await prisma.notifications.findMany();
      res.status(200).json({
        message: "Liste des notifications d'action",
        data: notifications,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications d'action :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des notifications d'action",
        error: error.message,
        code: 500,
      });
    }
  },
  getNotificationById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le notification existe dans la base de données
      const notification = await prisma.notifications.findUnique({
        where: { id: parseInt(id) },
      });

      if (!notification) {
        return res.status(404).json({
          message: "notification non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de la notification",
        data: notification,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la notification:",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération de la notification",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un notification
  updateNotification: async (req, res) => {
    try {
      const { id, titre, message, type, isRead, userId, groupeId } = req.body;

      // Vérifie si le notification existe
      const notificationExist = await prisma.notifications.findUnique({
        where: { id: parseInt(id) },
      });
      if (!notificationExist) {
        return res.status(404).json({ message: "notification non trouvé." });
      }

      const updatedNotification = await prisma.notifications.update({
        where: { id: parseInt(id) },
        data: {
          id,
          titre,
          message,
          type,
          isRead: false,
          userId,
          groupeId,
        },
      });

      res.status(200).json({
        message: "notification mis à jour avec succès",
        data: updatedNotification,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du notification :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du notification",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un notification
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le notification existe
      const notificationExist = await prisma.notifications.findUnique({
        where: { id: parseInt(id) },
      });
      if (!notificationExist) {
        return res.status(404).json({ message: "notification non trouvé." });
      }

      await prisma.notifications.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "notification supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la notification  :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la suppression de la notification",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = notificationController;
