const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        ingredients: {
            type: Array,
            required: true,
        },

        Photo: {
            type: String
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Recipe", RecipeSchema);
