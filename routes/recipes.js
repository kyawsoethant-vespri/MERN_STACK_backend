const express = require("express");
const router = express.Router();
const RecipeController = require("../controller/RecipeController");

router.get("", RecipeController.index);
router.post("", RecipeController.store);
router.get("/:id", RecipeController.show);
router.delete("/:id", RecipeController.destory);
router.patch("/:id", RecipeController.update);

module.exports = router;
