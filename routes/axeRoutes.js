const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const axeController = require("../controllers/axeController");

router.post("/add-axe", authMiddleware, axeController.createAxe);
router.put("/update-axe", authMiddleware, axeController.updateAxe);
router.delete("/delete-axe/:id", authMiddleware, axeController.deleteAxe);
router.get("/get-axe", authMiddleware, axeController.getAxe);
router.get("/get-axe/:id", authMiddleware, axeController.getaxeById);

module.exports = router;
