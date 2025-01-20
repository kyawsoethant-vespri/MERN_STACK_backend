const express = require("express");
const UserController = require("../controller/UserController");
const {body} = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/login", [
        body("email")
            .notEmpty()
            .withMessage("Email is a required field.")
            .custom(async (value) => {
                const user = await User.findOne({email: value});
                if (!user) {
                    throw new Error("Email does not exist.");
                }
            }),
        body("password")
            .notEmpty()
            .withMessage("Password is a required field.")
            .custom(async (value, {req}) => {
                const user = await User.findOne({email: req.body.email});
                if (user) {
                    const isMatch = await bcrypt.compare(value, user.password);
                    if (!isMatch) {
                        throw new Error("Password is incorrect.");
                    }
                }
            })
    ],
    handleErrorMessage,
    UserController.login
);

router.post("/logout", UserController.logout)

router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is a required field"),
        body("email").notEmpty().withMessage("Email is a required field."),
        body("email").custom(async (value) => {
            const user = await User.findOne({email: value});
            if (user) {
                throw new Error("E-mail already in use");
            }
        }),
        body("password")
            .notEmpty()
            .withMessage("Password is a required field.")
            .isLength({min: 5})
            .withMessage("Password must be at least 5 characters long."),
    ],
    handleErrorMessage,
    UserController.register
);

module.exports = router;
