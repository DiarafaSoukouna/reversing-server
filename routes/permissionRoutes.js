const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const permissionController = require("../controllers/permissionController");

router.post(
  "/add-permission",
  authMiddleware,
  permissionController.createPermission
);
router.put(
  "/update-permission",
  authMiddleware,
  permissionController.updatePermission
);
router.delete(
  "/delete-permission/:id",
  authMiddleware,
  permissionController.deletePermission
);
router.get(
  "/get-permission",
  authMiddleware,
  permissionController.getPermission
);
router.get(
  "/get-permission/:id",
  authMiddleware,
  permissionController.getPermissionById
);

module.exports = router;
