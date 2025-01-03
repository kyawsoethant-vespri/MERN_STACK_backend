const User = require("../models/User");
const createToken = require("../helpers/createToken");

const UserController = {
    login: (req, res) => {
        return res.json({msg: "User login api working"});
    },

    //User Register
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;
            const user = await User.register(name, email, password);

            // create token
            const token = createToken(user._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.json({user, token});
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    },
};

module.exports = UserController;
