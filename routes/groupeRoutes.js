const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const groupeController = require("../controllers/groupeController");

router.post("/add-groupe", authMiddleware, groupeController.createGroupe);
router.put("/update-groupe", authMiddleware, groupeController.updateGroupe);
router.delete(
  "/delete-groupe/:id",
  authMiddleware,
  groupeController.deleteGroupe
);
router.get("/get-groupe", authMiddleware, groupeController.getGroupe);
router.get("/get-groupe/:id", authMiddleware, groupeController.getGroupeById);

module.exports = router;
