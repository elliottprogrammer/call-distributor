const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Get User model
const User = require("../../models/User");
// Get passport
const passport = require('passport');

// @route   GET /api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST /api/users/register
// @desc    Resister user
// @access  Public(development)/Private(production)
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route   POST /api/users/login
// @desc    Login user / Returns JWT
// @access  Public
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: "User email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // create payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                };
                // Sign Token
                jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                    });
                });
            } else {
                return res.status(400).json({ password: "Incorrect password" });
            }
        });
    });
});

// function isAdmin() is just a test..
// TODO:
// write middleware function like this: https://github.com/themikenicholson/passport-jwt/issues/154
// ------------------------
const isAdmin = function (req, res, next) { 
    if (req.user.role != 'admin') return res.status(403).send('Access denied.');
    next();
}

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', [passport.authenticate('jwt', { session: false }), isAdmin], (req, res) => {
    return res.json( {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    } );
});

module.exports = router;
