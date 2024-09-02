const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const RecipeController = require("../controller/RecipeController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");

router.get("", RecipeController.getAllRecipes);

router.post(
  "/insert",
  [
    body("title").notEmpty().withMessage("Title is a required field"),
    body("description")
      .notEmpty()
      .withMessage("Description is a required field."),
    body("ingredients")
      .notEmpty()
      .isArray({ min: 3 })
      .withMessage("Ingredients are required field."),
  ],
  handleErrorMessage,
  RecipeController.createRecipes
);

router.get("/:id", RecipeController.getSingleRecipe);

router.delete("/:id", RecipeController.deleteRecipe);

router.patch(
  "/:id",
  [
    body("title").notEmpty().withMessage("Title is a required field"),
    body("description")
      .notEmpty()
      .withMessage("Description is a required field."),
    body("ingredients")
      .notEmpty()
      .isArray({ min: 3 })
      .withMessage("Ingredients are required field."),
  ],
  handleErrorMessage,
  RecipeController.updateRecipe
);

module.exports = router;
