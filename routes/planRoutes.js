const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const planController = require("../controllers/planController");

router.post("/add-plan", authMiddleware, planController.createPlan);
router.put("/update-plan", authMiddleware, planController.updatePlan);
router.delete("/delete-plan/:id", authMiddleware, planController.deletePlan);
router.get("/get-plan", authMiddleware, planController.getPlan);
router.get("/get-plan/:id", authMiddleware, planController.getPlanById);

module.exports = router;
