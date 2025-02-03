const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const RecipeController = require("../controller/RecipeController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const multer = require("multer");
const upload = require('../helpers/fileUpload')

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
            .isArray({min: 3})
            .withMessage("Ingredients are required field."),
    ],
    handleErrorMessage,
    RecipeController.createRecipes
);

router.get("/:id", RecipeController.getSingleRecipe);

router.delete("/:id", RecipeController.deleteRecipe);

router.patch("/:id", RecipeController.updateRecipe);

//File Upload
router.post("/:id/upload",
    [
        upload.single('photo'),
        body('photo').custom((value, {req}) => {
            if (!req.file) {
                throw new Error('Photo is a required field.');
            }
            if (!req.file.mimetype.startsWith('image')) {
                throw new Error('Photo must be image.')
            }
            return true
        })
    ], handleErrorMessage,
    RecipeController.fileUpload
)

module.exports = router;
