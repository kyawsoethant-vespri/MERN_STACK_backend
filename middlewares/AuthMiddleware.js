const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AuthMiddleware = (req, res, next) => {
    const token = req.cookies.jwt; // Step1
    // console.log(token)
    if (token) {
        //Step 2
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({message: "Authentication failed"});
            } else {
                console.log(decoded);
                User.findById(decoded._id).then((user) => {
                    console.log(user);
                    req.user = user;
                    next()
                })
            }
        })
    } else {
        res.status(400).json({message: "Token is invalid"});
    }
}

module.exports = AuthMiddleware

// Step 1 => get jwt token
// Step 2 => check valid or invalid token
