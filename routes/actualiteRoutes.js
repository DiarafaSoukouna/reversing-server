const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const actualiteController = require("../controllers/actualiteController");

router.post(
  "/add-actualite",
  authMiddleware,
  actualiteController.createActualite
);
router.put(
  "/update-actualite",
  authMiddleware,
  actualiteController.updateActualite
);
router.delete(
  "/delete-actualite/:id",
  authMiddleware,
  actualiteController.deleteActualite
);
router.get("/get-actualite", authMiddleware, actualiteController.getActualite);
router.get(
  "/get-actualite/:id",
  authMiddleware,
  actualiteController.getActualiteById
);

module.exports = router;
