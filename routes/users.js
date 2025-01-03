const express = require("express");
const UserController = require("../controller/UserController");
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const User = require("../models/User");
const router = express.Router();

router.post("/login", UserController.login);

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is a required field"),
    body("email").notEmpty().withMessage("Email is a required field."),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
    body("password")
      .notEmpty()
      .withMessage("Password is a required field.")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long."),
  ],
  handleErrorMessage,
  UserController.register
);

module.exports = router;
