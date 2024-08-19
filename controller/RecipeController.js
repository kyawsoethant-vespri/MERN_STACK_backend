const Recipe = require("../models/Recipe");

const RecipeController = {
  index: (req, res) => {
    return res.json({ msg: "Get all recipes" });
  },
  store: async (req, res) => {
    const { title, description, ingredients } = req.body;
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    return res.json(recipe);
  },
  show: (req, res) => {
    return res.json({ msg: "Get single recipe" });
  },
  destory: (req, res) => {
    return res.json({ msg: "delete recipe" });
  },
  update: (req, res) => {
    return res.json({ msg: "Update recipe" });
  },
};

module.exports = RecipeController;
