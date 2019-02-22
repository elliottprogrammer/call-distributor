const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Get User model
const User = require("../../models/User");
// Get passport
const passport = require("passport");
// auth roles middleware
const authRoles = require("../../config/authRoles");

// Load User input validation
const validateRegisterInput = require('../../validation/registerValidation');
const validateLoginInput = require('../../validation/loginValidation');

// @route   POST /api/users/login
// @desc    Login user / Returns JWT
// @access  Public
router.post("/login", (req, res) => {
    
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User email not found";
            return res.status(404).json(errors);
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
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});

// @route   POST /api/users/register
// @desc    Resister user
// @access  Private (Only admin)
router.post(
    "/register",
    [passport.authenticate("jwt", { session: false }), authRoles(["admin"])],
    (req, res) => {

        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                errors.email = 'User email already exists';
                return res.status(400).json(errors);
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

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get(
    "/current",
    [passport.authenticate("jwt", { session: false }), authRoles(["admin", "qualifer"])],
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        });
    }
);

module.exports = router;
