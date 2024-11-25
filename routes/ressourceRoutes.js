const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const ressourceController = require("../controllers/ressourceController");

router.post(
  "/add-ressource",
  authMiddleware,
  ressourceController.createRessource
);
router.put(
  "/update-ressource",
  authMiddleware,
  ressourceController.updateRessource
);
router.delete(
  "/delete-ressource/:id",
  authMiddleware,
  ressourceController.deleteRessource
);
router.get("/get-ressource", authMiddleware, ressourceController.getRessource);
router.get(
  "/get-ressource/:id",
  authMiddleware,
  ressourceController.getRessourceById
);

module.exports = router;
