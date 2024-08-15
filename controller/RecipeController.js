const RecipeController = {
  index: (req, res) => {
    return res.json({ msg: "Get all recipes" });
  },
  store: (req, res) => {
    return res.json({ msg: "create recipes" });
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
