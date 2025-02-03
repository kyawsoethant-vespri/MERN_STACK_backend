const User = require("../models/User");
const createToken = require("../helpers/createToken");
const {token} = require("morgan");

const UserController = {
    me: async (req, res) => {
        return res.json(req.user);
    },

    //user Login
    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.login(email, password);

            // createToken
            const token = await createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            return res.json({user, token});
        } catch (e) {
            return res.status(400).json({error: e.message});
        }

    },

    //User Logout
    logout: async (req, res) => {
        res.cookie('jwt', '', {maxAge: 1});
        res.json({message: 'User logged out'});
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
