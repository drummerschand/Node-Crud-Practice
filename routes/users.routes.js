const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controllers");
const validate = require("../middlewares/validate");
const userSchema = require("../validations/users.validation");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Auth Routes
router.post("/register", validate.validatePostUser(userSchema.postUser), authController.register);
router.post("/login", validate.validatePostUser(userSchema.loginUser), authController.login);

// User routes
router.get("/", authMiddleware.validateToken, userController.getUser);
router.post("/updateUser", validate.validatePostUser(userSchema.updateUser), authMiddleware.validateToken, userController.updateUser);

module.exports = router;
