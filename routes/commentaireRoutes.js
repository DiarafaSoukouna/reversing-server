const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const commentaireController = require("../controllers/commentaireController");

router.post(
  "/add-commentaire",
  authMiddleware,
  commentaireController.createCommentaire
);
router.put(
  "/update-commentaire",
  authMiddleware,
  commentaireController.updateCommentaire
);
router.delete(
  "/delete-commentaire/:id",
  authMiddleware,
  commentaireController.deleteCommentaire
);
router.get(
  "/get-commentaire",
  authMiddleware,
  commentaireController.getCommentaire
);
router.get(
  "/get-commentaire/:id",
  authMiddleware,
  commentaireController.getCommentaireById
);

module.exports = router;
