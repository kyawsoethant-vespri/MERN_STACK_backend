const jwt = require("jsonwebtoken");

const maxDay = 24 * 60 * 60; //1 day

const createToken = (_id) => {
    return jwt.sign({_id}, "secretary", {expiresIn: maxDay});
};

module.exports = createToken;
