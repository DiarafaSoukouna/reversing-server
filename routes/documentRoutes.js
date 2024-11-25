const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const documentController = require("../controllers/documentController");

router.post("/add-document", authMiddleware, documentController.createDocument);
router.put(
  "/update-document",
  authMiddleware,
  documentController.updateDocument
);
router.delete(
  "/delete-document/:id",
  authMiddleware,
  documentController.deleteDocument
);
router.get("/get-document", authMiddleware, documentController.getDocument);
router.get(
  "/get-document/:id",
  authMiddleware,
  documentController.getDocumentById
);

module.exports = router;
