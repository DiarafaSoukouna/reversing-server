const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const suggestionController = require("../controllers/suggestionController");

router.post(
  "/add-suggestion",
  authMiddleware,
  suggestionController.createSuggestion
);
router.put(
  "/update-suggestion",
  authMiddleware,
  suggestionController.updateSuggestion
);
router.delete(
  "/delete-suggestion/:id",
  authMiddleware,
  suggestionController.deleteSuggestion
);
router.get(
  "/get-suggestion",
  authMiddleware,
  suggestionController.getSuggestion
);
router.get(
  "/get-suggestion/:id",
  authMiddleware,
  suggestionController.getSuggestionById
);

module.exports = router;
