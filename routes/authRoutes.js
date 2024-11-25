const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryUserController");
const authMiddleware = require("../middlewares/authMiddleware"); // Import du middleware

router.post("/register", authController.register);
router.get("/get-user", authMiddleware, authController.getUsers);
router.put("/update-user", authController.updateUser);
router.delete("/user/:id", authController.deleteUser);
router.get("/get-account", authController.getAccounts);
router.put("/update-account", authController.updateAccount);
router.delete("/account/:id", authController.deleteAccount);
router.post("/login", authController.login);
router.post("/add-category", categoryController.addCategory);
router.get("/get-category", categoryController.getCatUser);
router.put("/update-category", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);
router.post("/login", authController.login);

module.exports = router;
