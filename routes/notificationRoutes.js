const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");

router.post(
  "/add-notification",
  authMiddleware,
  notificationController.createNotification
);
router.put(
  "/update-notification",
  authMiddleware,
  notificationController.updateNotification
);
router.delete(
  "/delete-notification/:id",
  authMiddleware,
  notificationController.deleteNotification
);
router.get(
  "/get-notification",
  authMiddleware,
  notificationController.getNotification
);
router.get(
  "/get-notification/:id",
  authMiddleware,
  notificationController.getNotificationById
);

module.exports = router;
