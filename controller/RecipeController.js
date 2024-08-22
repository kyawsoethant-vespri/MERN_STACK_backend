const Recipe = require("../models/Recipe");

const RecipeController = {
  getAllRecipes: async (req, res) => {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return res.status(200).json(recipes);
  },

  createRecipes: async (req, res) => {
    const { title, description, ingredients } = req.body;
    try {
      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
      });
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(400).json({ msg: "Invalid Fields." });
    }
  },

  getSingleRecipe: (req, res) => {
    return res.json({ msg: "Get single recipe" });
  },

  deleteRecipe: (req, res) => {
    return res.json({ msg: "delete recipe" });
  },

  updateRecipe: (req, res) => {
    return res.json({ msg: "Update recipe" });
  },
};

module.exports = RecipeController;
