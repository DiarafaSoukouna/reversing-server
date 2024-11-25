const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const newsletterController = require("../controllers/newsletterController");

router.post(
  "/add-newsletter",
  authMiddleware,
  newsletterController.createNewsletter
);
router.put(
  "/update-newsletter",
  authMiddleware,
  newsletterController.updateNewsletter
);
router.delete(
  "/delete-newsletter/:id",
  authMiddleware,
  newsletterController.deleteNewsletter
);
router.get(
  "/get-newsletter",
  authMiddleware,
  newsletterController.getNewsletter
);
router.get(
  "/get-newsletter/:id",
  authMiddleware,
  newsletterController.getNewsletterById
);

module.exports = router;
