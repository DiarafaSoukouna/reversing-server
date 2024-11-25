const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const indicateurController = require("../controllers/indicateurController");

router.post(
  "/add-indicateur",
  authMiddleware,
  indicateurController.createIndicateur
);
router.put(
  "/update-indicateur",
  authMiddleware,
  indicateurController.updateIndicateur
);
router.delete(
  "/delete-indicateur/:id",
  authMiddleware,
  indicateurController.deleteIndicateur
);
router.get(
  "/get-indicateur",
  authMiddleware,
  indicateurController.getIndicateur
);
router.get(
  "/get-indicateur/:id",
  authMiddleware,
  indicateurController.getIndicateurById
);

module.exports = router;
