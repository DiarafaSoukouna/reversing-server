const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const rolePermissionController = require("../controllers/role_permissionController");

router.post(
  "/add-rolePermission",
  authMiddleware,
  rolePermissionController.addPermissionToRole
);
router.delete(
  "/delete-rolePermission",
  authMiddleware,
  rolePermissionController.removePermissionFromRole
);
router.get(
  "/get-permissionRole/:id",
  authMiddleware,
  rolePermissionController.getPermissionsByRole
);
router.get(
  "/get-rolePermission/:id",
  authMiddleware,
  rolePermissionController.getRolesByPermission
);

module.exports = router;
