const jwt = require("jsonwebtoken");

const maxDay = 24 * 60 * 60; //1 day

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: maxDay});
};

module.exports = createToken;
