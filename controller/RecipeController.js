const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not a valid id" });
    }

    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found." });
      }

      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ msg: "Internet server error." });
    }
  },

  deleteRecipe: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not a valid id." });
    }

    try {
      const recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found." });
      }

      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ msg: "Internet server error." });
    }
  },

  updateRecipe: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not a valid id." });
    }

    try {
      const recipe = await Recipe.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found." });
      }

      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ msg: "Internet server error." });
    }
  },
};

module.exports = RecipeController;
