const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const projetController = require("../controllers/projetController");

router.post("/add-projet", authMiddleware, projetController.createProjet);
router.put("/update-projet", authMiddleware, projetController.updateProjet);
router.delete(
  "/delete-projet/:id",
  authMiddleware,
  projetController.deleteProjet
);
router.get("/get-projet", authMiddleware, projetController.getProjet);
router.get("/get-projet/:id", authMiddleware, projetController.getProjetById);

module.exports = router;
