const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configurer Multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les fichiers seront sauvegardés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier pour éviter les conflits
  },
});

const upload = multer({ storage });

const documentController = {
  // Création d'un document avec upload de fichier
  createDocument: async (req, res) => {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur d'upload de fichier", error: err.message });
      }

      try {
        const { project_id, name } = req.body;
        const file_path = req.file ? req.file.path : null;

        if (!name || !project_id || !file_path) {
          return res
            .status(400)
            .json({ message: "Renseignez tous les champs requis." });
        }

        const newDocument = await prisma.documents.create({
          data: {
            project_id: parseInt(project_id),
            name,
            file_path,
          },
        });

        res.status(201).json({
          message: "Document créé avec succès",
          data: newDocument,
          code: 201,
        });
      } catch (error) {
        console.error("Erreur lors de la création du document :", error);
        res.status(500).json({
          message: "Erreur lors de la création du document",
          error: error.message,
          code: 500,
        });
      }
    });
  },

  // Méthode pour récupérer tous les documents
  getDocument: async (req, res) => {
    try {
      const documents = await prisma.documents.findMany();
      res.status(200).json({
        message: "Liste des documents",
        data: documents,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des documents",
        error: error.message,
        code: 500,
      });
    }
  },

  // Méthode pour récupérer un document par ID
  getDocumentById: async (req, res) => {
    try {
      const { id } = req.params;
      const document = await prisma.documents.findUnique({
        where: { id: parseInt(id) },
      });

      if (!document) {
        return res
          .status(404)
          .json({ message: "Document non trouvé", code: 404 });
      }

      res
        .status(200)
        .json({ message: "Détails du document", data: document, code: 200 });
    } catch (error) {
      console.error("Erreur lors de la récupération du document:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération du document",
        error: error.message,
        code: 500,
      });
    }
  },

  // Méthode pour mettre à jour un document
  updateDocument: async (req, res) => {
    try {
      const { id, project_id, name, file_path } = req.body;
      const documentExist = await prisma.documents.findUnique({
        where: { id: parseInt(id) },
      });

      if (!documentExist) {
        return res.status(404).json({ message: "Document non trouvé." });
      }

      const updatedDocument = await prisma.documents.update({
        where: { id: id },
        data: {
          project_id, // Convertit project_id en entier
          name,
          file_path,
        },
      });

      res.status(200).json({
        message: "Document mis à jour avec succès",
        data: updatedDocument,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
      res.status(500).json({
        message: "Erreur lors de la mise à jour du document",
        error: error.message,
        code: 500,
      });
    }
  },

  // Méthode pour supprimer un document

  // Méthode pour supprimer un document
  deleteDocument: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifie si le document existe
      const documentExist = await prisma.documents.findUnique({
        where: { id: parseInt(id) },
      });

      if (!documentExist) {
        return res.status(404).json({ message: "Document non trouvé." });
      }

      // Récupère le chemin du fichier
      const filePath = path.join(__dirname, "..", documentExist.file_path);

      // Supprime le fichier du serveur
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
          return res.status(500).json({
            message: "Erreur lors de la suppression du fichier.",
            error: err.message,
            code: 500,
          });
        }

        // Supprime l'entrée dans la base de données après la suppression du fichier
        await prisma.documents.delete({ where: { id: parseInt(id) } });

        res.status(200).json({
          message: "Document supprimé avec succès",
          code: 200,
        });
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du document",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = documentController;
