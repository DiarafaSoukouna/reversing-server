const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const priorityController = require("../controllers/priorityController");

router.post("/add-priority", authMiddleware, priorityController.createPriority);
router.put(
  "/update-priority",
  authMiddleware,
  priorityController.updatePriority
);
router.delete(
  "/delete-priority/:id",
  authMiddleware,
  priorityController.deletePriority
);
router.get("/get-priority", authMiddleware, priorityController.getPriority);
router.get(
  "/get-priority/:id",
  authMiddleware,
  priorityController.getPriorityById
);

module.exports = router;
