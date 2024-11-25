const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tacheUtilisateurController = require("../controllers/tache_utilisateurController");

router.post(
  "/add-tacheUtilisateur",
  authMiddleware,
  tacheUtilisateurController.addUtilisateurTotache
);
router.delete(
  "/delete-tacheUtilisateur",
  authMiddleware,
  tacheUtilisateurController.removeUtilisateurFromtache
);
router.get(
  "/get-groupeTache/:id",
  authMiddleware,
  tacheUtilisateurController.getUtilisateursBytache
);
router.get(
  "/get-tacheUtilisateur/:id",
  authMiddleware,
  tacheUtilisateurController.gettachesByUtilisateur
);

module.exports = router;
