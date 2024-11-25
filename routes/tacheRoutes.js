const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tacheController = require("../controllers/tacheController");

router.post("/add-tache", authMiddleware, tacheController.createTache);
router.put("/update-tache", authMiddleware, tacheController.updateTache);
router.delete("/delete-tache/:id", authMiddleware, tacheController.deleteTache);
router.get("/get-tache", authMiddleware, tacheController.getTache);
router.get("/get-tache/:id", authMiddleware, tacheController.getTacheById);

module.exports = router;
