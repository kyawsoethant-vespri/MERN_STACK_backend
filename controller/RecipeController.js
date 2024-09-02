const Recipe = require("../models/Recipe");

const RecipeController = {
  getAllRecipes: async (req, res) => {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return res.json(recipes);
  },

  createRecipes: async (req, res) => {
    const { title, description, ingredients } = req.body;
    try {
      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
      });
      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ msg: "Invalid Fields." });
    }
  },

  getSingleRecipe: async (req, res) => {
    try {
      const id = req.params.id;
      const recipe = await Recipe.findById(id);
      return res.json(recipe);
    } catch (error) {
      return res.status(404).json({ msg: "Recipe not found." });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const id = req.params.id;
      const recipe = await Recipe.findByIdAndDelete(id);
      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ msg: "Can't Delete this data" });
    }
  },

  updateRecipe: (req, res) => {
    return res.json({ msg: "Update recipe" });
  },
};

module.exports = RecipeController;
