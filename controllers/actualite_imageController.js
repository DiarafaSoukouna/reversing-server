const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const actualite_imageController = {
  // Création d'un actualite_image
  createActualite_image: async (req, res) => {
    try {
      const { actualite_id, image_url } = req.body;

      if (!actualite_id || !image_url) {
        return res
          .status(400)
          .json({ message: "Renseignez tous les champs requis." });
      }

      const newactualite_image = await prisma.actualite_images.create({
        data: {
          actualite_id,
          image_url,
        },
      });

      res.status(201).json({
        message: "actualite_image créé avec succès",
        data: newactualite_image,
        code: 201,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'actualite_image  :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la création de l'actualite_image ",
        error: error.message,
        code: 500,
      });
    }
  },
  getActualite_image: async (req, res) => {
    try {
      const actualite_images = await prisma.actualite_images.findMany();
      res.status(200).json({
        message: "Liste des actualite_images",
        data: actualite_images,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des actualite_images :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des actualite_images",
        error: error.message,
        code: 500,
      });
    }
  },
  getActualite_imageById: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le actualite_image existe dans la base de données
      const actualite_image = await prisma.actualite_images.findUnique({
        where: { id: parseInt(id) },
      });

      if (!actualite_image) {
        return res.status(404).json({
          message: "actualite_image non trouvé",
          code: 404,
        });
      }

      res.status(200).json({
        message: "Détails de l'actualite_image",
        data: actualite_image,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'actualite_image:",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération de l'actualite_image",
        error: error.message,
        code: 500,
      });
    }
  },
  // Modification d'un actualite_image
  updateActualite_image: async (req, res) => {
    try {
      const { id, actualite_id, image_url } = req.body;

      // Vérifie si le actualite_image existe
      const actualite_imageExist = await prisma.actualite_images.findUnique({
        where: { id: parseInt(id) },
      });
      if (!actualite_imageExist) {
        return res.status(404).json({ message: "actualite_image non trouvé." });
      }

      const updatedactualite_image = await prisma.actualite_images.update({
        where: { id: parseInt(id) },
        data: {
          id,
          actualite_id,
          image_url,
        },
      });

      res.status(200).json({
        message: "actualite_image mis à jour avec succès",
        data: updatedactualite_image,
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du actualite_image :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la mise à jour du actualite_image",
        error: error.message,
        code: 500,
      });
    }
  },
  getAllImagesByActualite: async (req, res) => {
    try {
      const { actualite_id } = req.params; // assuming actualite_id is passed as a route parameter

      if (!actualite_id) {
        return res
          .status(400)
          .json({ message: "L'ID de l'actualité est requis." });
      }

      // Retrieve all images associated with the specified actualite_id
      const actualiteImages = await prisma.actualite_images.findMany({
        where: {
          actualite_id: parseInt(actualite_id),
        },
        select: {
          image_url: true,
        },
      });

      if (actualiteImages.length === 0) {
        return res
          .status(404)
          .json({ message: "Aucune image trouvée pour cette actualité." });
      }

      res.status(200).json({
        message: "Images récupérées avec succès.",
        data: actualiteImages,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des images :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des images",
        error: error.message,
        code: 500,
      });
    }
  },

  // Suppression d'un actualite_image
  deleteActualite_image: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le actualite_image existe
      const actualite_imageExist = await prisma.actualite_images.findUnique({
        where: { id: parseInt(id) },
      });
      if (!actualite_imageExist) {
        return res.status(404).json({ message: "actualite_image non trouvé." });
      }

      await prisma.actualite_images.delete({ where: { id: parseInt(id) } });

      res.status(200).json({
        message: "actualite_image supprimé avec succès",
        code: 200,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'actualite_image  :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la suppression de l'actualite_image",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = actualite_imageController;
