const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const removeFile = require("../helpers/removeFile");

const RecipeController = {
    getAllRecipes: async (req, res) => {
        const limit = 6;
        const page = req.query.page || 1;
        console.log(page);

        const recipes = await Recipe.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({createdAt: -1});

        const totalRecipesCount = await Recipe.countDocuments();
        // console.log("totalRecipesCount : ", totalRecipesCount-);

        const totalPagesCount = Math.ceil(totalRecipesCount / limit);
        // console.log("totalPagesCount", totalPagesCount;

        const links = {
            nextPage: totalPagesCount == page ? false : true,
            previousPage: page == 1 ? false : true,
            currentPage: page,
            loopableLinks: [],
        };

        // console.log("links.previousPage", links.previousPage);
        // console.log("link.nextPage", links.nextPage);

        //generate loop able Links array
        for (let index = 0; index < totalPagesCount; index++) {
            const number = index + 1;
            links.loopableLinks.push({number});
        }

        // console.log("links", links.loopableLinks);

        const response = {
            links,
            recipesData: recipes,
        };

        return res.json(response);
    },

    createRecipes: async (req, res) => {
        const {title, description, ingredients} = req.body;
        try {
            const recipe = await Recipe.create({
                title,
                description,
                ingredients,
            });
            return res.json(recipe);
        } catch (error) {
            return res.status(400).json({msg: "Invalid Fields."});
        }
    },

    getSingleRecipe: async (req, res) => {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({msg: "Not a valid id"});
        }

        try {
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                return res.status(404).json({msg: "recipe not found."});
            }

            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({msg: "Internet server error."});
        }
    },

    deleteRecipe: async (req, res) => {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({msg: "Not a valid id."});
        }

        try {
            const recipe = await Recipe.findByIdAndDelete(id);
            if (!recipe) {
                return res.status(404).json({msg: "recipe not found."});
            }

            let path = __dirname + "/../public" + recipe.Photo
            await removeFile(path);

            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({msg: "Internet server error."});
        }
    },

    updateRecipe: async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg: 'not a valid id'});
            }
            let recipe = await Recipe.findByIdAndUpdate(id, {
                ...req.body // title : "updated title value"
            });


            let path = __dirname + "/../public" + recipe.Photo
            await removeFile(path);

            if (!recipe) {
                return res.status(404).json({msg: 'recipe not found'});
            }
            return res.json(recipe);
        } catch (e) {
            return res.status(500).json({msg: 'internet server error'});
        }
    },

    fileUpload: async (req, res) => {
        try {
            const {id} = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg: "Not a valid id."});
            }
            const fileUpload = await Recipe.findByIdAndUpdate(id, {Photo: '/' + req.file.filename})
            if (!fileUpload) {
                return res.status(404).json({msg: "recipe not found."});
            }
            return res.json(fileUpload);
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: "Internet server error."});
        }
    }
};

module.exports = RecipeController;
