// controllers/RoleController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Role = require("../models/Role");

class RoleController {
  // Méthode pour ajouter un nouveau rôle
  async addRole(req, res) {
    const { nom } = req.body;

    try {
      const roleId = await Role.createRole(nom);
      res.status(201).json({ message: "Rôle ajouté avec succès", roleId });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout du rôle",
        error: error.message,
      });
    }
  }
  async getRole(req, res) {
    try {
      const roles = await prisma.roles.findMany();
      res.status(200).json({
        message: "Liste des roles",
        data: roles,
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
  // Méthode pour modifier un rôle existant
  async updateRole(req, res) {
    // const { id } = req.params;
    const { id, nom } = req.body;

    try {
      const updated = await Role.updateRole(id, nom);
      if (updated) {
        res.status(200).json({ message: "Rôle mis à jour avec succès" });
      } else {
        res.status(404).json({ message: "Rôle non trouvé" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour du rôle",
        error: error.message,
      });
    }
  }

  // Méthode pour supprimer un rôle
  async deleteRole(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Role.deleteRole(id);
      if (deleted) {
        res.status(200).json({ message: "Rôle supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Rôle non trouvé" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du rôle",
        error: error.message,
      });
    }
  }
}

module.exports = new RoleController();
