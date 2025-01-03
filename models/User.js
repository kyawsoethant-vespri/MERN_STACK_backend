const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.statics.register = async function (name, email, password) {
    const userExist = await this.findOne({email});
    if (userExist) {
        throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt();
    const hashValue = await bcrypt.hash(password, salt);

    const user = await this.create({
        name,
        email,
        password: hashValue,
    });
    return user;
};

module.exports = mongoose.model("User", UserSchema);
