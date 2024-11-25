const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tacheGroupeController = require("../controllers/tache_groupeController");

router.post(
  "/add-tacheGroupe",
  authMiddleware,
  tacheGroupeController.addGroupeTotache
);
router.delete(
  "/delete-tacheGroupe",
  authMiddleware,
  tacheGroupeController.removeGroupeFromtache
);
router.get(
  "/get-groupeTache/:id",
  authMiddleware,
  tacheGroupeController.getGroupesBytache
);
router.get(
  "/get-tacheGroupe/:id",
  authMiddleware,
  tacheGroupeController.gettachesByGroupe
);

module.exports = router;
