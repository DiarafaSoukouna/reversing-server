// routes/roleRoutes.js
const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/add-role", roleController.addRole);
router.get("/get-role", roleController.getRole);
router.put("/update-role", roleController.updateRole); // Route pour modifier un rôle
router.delete("/delete-role/:id", roleController.deleteRole); // Route pour supprimer un rôle

module.exports = router;
