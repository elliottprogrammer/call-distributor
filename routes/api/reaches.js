const express = require('express');
const router = express.Router();
// Get Reach model
const Reach = require('../../models/Reach');
const User = require("../../models/User");
// Get passport
const passport = require("passport");
// auth roles middleware
const authRoles = require("../../config/authRoles");

// Load create Reach validation
const validateReachInput = require('../../validation/createReachValidation');


// @route   POST /api/reaches
// @desc    Create Reach
// @access  Private (admin, dro, reg)
router.post(
    '/',
    [passport.authenticate("jwt", { session: false }), authRoles(['admin', 'dro', 'reg'])],
    (req, res) => {

        const { errors, isValid } = validateReachInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newReach = new Reach({
            reachDate: req.body.reachDate,
            reachSourceSite: req.body.reachSourceSite,
            reachType: req.body.reachType,
            callersFirstName: req.body.callersFirstName,
            addictsRelationshipToCaller: req.body.addictsRelationshipToCaller,
            addictsAge: req.body.addictsAge,
            addictsState: req.body.addictsState,
            substanceAbused: req.body.substanceAbused,
            medicationsUsed: req.body.medicationsUsed,
            legalIssues: req.body.legalIssues,
            medicalIssues: req.body.medicalIssues,
            willingToGetHelp: req.body.willingToGetHelp,
            beenInTreatmentBefore: req.body.beenInTreatmentBefore,
            phone: req.body.phone,
            email: req.body.email,
            assignTo: req.body.assignTo,
            createdBy: req.user.id,
        });
        newReach
            .save()
            .then(reach => res.json(reach))
            .catch(err => console.log(err));
});

// @route   GET /api/reaches
// @desc    Get all reaches
// @access  Private (all roles allowed)
router.get('/',
    [passport.authenticate("jwt", { session: false }), authRoles([])],
    (req, res) => {
        Reach.find()
            .sort({ reachDate: -1 })
            .then(reaches => res.json(reaches))
            .catch(err => console.log(err));
});

// @route   GET /api/reaches/:id
// @desc    Get all reaches
// @access  Private (all roles allowed)
router.get('/:id',
    [passport.authenticate("jwt", { session: false }), authRoles([])],
    (req, res) => {
        Reach.findById(req.params.id)
            .then(reach => res.json(reach))
            .catch(err => res.status(404).json({reachNotFound: 'No reach found with that ID'}));
});

module.exports = router;