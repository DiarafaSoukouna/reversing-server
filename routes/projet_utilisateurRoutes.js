const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const projet_utilisateurController = require("../controllers/projet_utilisateurController");

router.post(
  "/add-utilisateurProjet",
  authMiddleware,
  projet_utilisateurController.addUtilisateurToprojet
);
router.delete(
  "/delete-utilisateurProjet",
  authMiddleware,
  projet_utilisateurController.removeUtilisateurFromprojet
);
router.get(
  "/get-ProjetUtilisateur/:id",
  authMiddleware,
  projet_utilisateurController.getUtilisateursByprojet
);
router.get(
  "/get-utilisateurProjet/:id",
  authMiddleware,
  projet_utilisateurController.getprojetsByUtilisateur
);

module.exports = router;
