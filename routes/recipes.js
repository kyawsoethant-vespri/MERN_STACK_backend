const express = require("express");
const router = express.Router();
const RecipeController = require("../controller/RecipeController");

router.get("", RecipeController.getAllRecipes);
router.post("/insert", RecipeController.createRecipes);
router.get("/:id", RecipeController.getSingleRecipe);
router.delete("/:id", RecipeController.deleteRecipe);
router.patch("/:id", RecipeController.updateRecipe);

module.exports = router;
