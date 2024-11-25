// controllers/rolePermissionController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const rolePermissionController = {
  async addPermissionToRole(req, res) {
    try {
      const { role_id, permission_id } = req.body;
      const rolePermission = await prisma.role_permissions.create({
        data: { role_id, permission_id },
      });
      res.status(201).json({
        message: "Permission ajoutée avec succès",
        data: rolePermission,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de la permission",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async removePermissionFromRole(req, res) {
    try {
      const { role_id, permission_id } = req.body;
      await prisma.role_permissions.delete({
        where: { role_id_permission_id: { role_id, permission_id } },
      });
      res.status(200).json({
        message: "Permission supprimée avec succès",
        data: null,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la permission",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getPermissionsByRole(req, res) {
    try {
      const { role_id } = req.params;
      const permissions = await prisma.role_permissions.findMany({
        where: { role_id },
        include: { permissions: true },
      });
      res.status(200).json({
        message: "Permissions récupérées avec succès",
        data: permissions,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des permissions",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
  async getRolesByPermission(req, res) {
    try {
      const { permission_id } = req.params;
      const roles = await prisma.role_permissions.findMany({
        where: { permission_id },
        include: { roles: true },
      });
      res.status(200).json({
        message: "Rôles récupérés avec succès",
        data: roles,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des rôles",
        data: null,
        code: 500,
        error: error.message,
      });
    }
  },
};

module.exports = rolePermissionController;
