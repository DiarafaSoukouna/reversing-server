const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const evaluationController = require("../controllers/evaluationController");

router.post(
  "/add-evaluation",
  authMiddleware,
  evaluationController.createEvaluation
);
router.put(
  "/update-evaluation",
  authMiddleware,
  evaluationController.updateEvaluation
);
router.delete(
  "/delete-evaluation/:id",
  authMiddleware,
  evaluationController.deleteEvaluation
);
router.get(
  "/get-evaluation",
  authMiddleware,
  evaluationController.getEvaluation
);
router.get(
  "/get-evaluation/:id",
  authMiddleware,
  evaluationController.getEvaluationById
);

module.exports = router;
