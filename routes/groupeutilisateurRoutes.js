const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const groupe_utilisateurController = require("../controllers/groupe_utilisateurController");

router.post(
  "/add-groupeUtilisateur",
  authMiddleware,
  groupe_utilisateurController.addUtilisateurTogroupe
);
router.delete(
  "/delete-groupeUtilisateur",
  authMiddleware,
  groupe_utilisateurController.removeUtilisateurFromgroupe
);
router.get(
  "/get-utilisateurGroupe/:id",
  authMiddleware,
  groupe_utilisateurController.getUtilisateursBygroupe
);
router.get(
  "/get-groupeUtilisateur/:id",
  authMiddleware,
  groupe_utilisateurController.getgroupesByutilisateur
);

module.exports = router;
