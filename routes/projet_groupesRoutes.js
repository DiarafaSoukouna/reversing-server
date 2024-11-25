const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const groupeProjetController = require("../controllers/projet_groupeController");

router.post(
  "/add-groupeProjet",
  authMiddleware,
  groupeProjetController.addProjetTogroupe
);
router.delete(
  "/delete-groupeProjet",
  authMiddleware,
  groupeProjetController.removeProjetFromgroupe
);
router.get(
  "/get-Projetgroupe/:id",
  authMiddleware,
  groupeProjetController.getProjetsBygroupe
);
router.get(
  "/get-groupeProjet/:id",
  authMiddleware,
  groupeProjetController.getgroupesByProjet
);

module.exports = router;
