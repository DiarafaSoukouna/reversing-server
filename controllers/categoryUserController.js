// controllers/CategoryUserController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CategoryUser = require("../models/CategoryUser");

class CategoryUserController {
  async addCategory(req, res) {
    const { name, description } = req.body;

    try {
      const categoryId = await CategoryUser.createCategoryUser(
        name,
        description
      );
      res
        .status(201)
        .json({ message: "Catégorie ajoutée avec succès", categoryId });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de la catégorie",
        error: error.message,
      }); // Amélioration du message d'erreur
    }
  }
  async updateCategory(req, res) {
    const { id, name, description } = req.body;

    try {
      const result = await CategoryUser.updateCategoryUser(
        id,
        name,
        description
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }
      res.json({ message: "Catégorie modifiée avec succès" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la modification de la catégorie",
        error: error.message,
      });
    }
  }
  async getCatUser(req, res) {
    try {
      const categories = await prisma.category_user.findMany();
      res.status(200).json({
        message: "Liste des catégories",
        data: categories,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des utilisateurs",
        error: error.message,
        code: 500,
      });
    }
  }
  async deleteCategory(req, res) {
    const { id } = req.params;

    try {
      const result = await CategoryUser.deleteCategoryUser(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }
      res.json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la catégorie",
        error: error.message,
      });
    }
  }
}

module.exports = new CategoryUserController();
