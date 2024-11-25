const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const actualite_imageController = require("../controllers/actualite_imageController");

router.post(
  "/add-actualite_image",
  authMiddleware,
  actualite_imageController.createActualite_image
);
router.put(
  "/update-actualite_image",
  authMiddleware,
  actualite_imageController.updateActualite_image
);
router.delete(
  "/delete-actualite_image/:id",
  authMiddleware,
  actualite_imageController.deleteActualite_image
);
router.get(
  "/get-actualite_image",
  authMiddleware,
  actualite_imageController.getActualite_image
);
router.get(
  "/get-actualite_image-by-actualite/:actualite_id",
  authMiddleware,
  actualite_imageController.getAllImagesByActualite
);
router.get(
  "/get-actualite_image/:id",
  authMiddleware,
  actualite_imageController.getActualite_imageById
);

module.exports = router;
