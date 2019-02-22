const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reach Schema
const ReachSchema = new Schema({
    reachDate: {
        type: Date,
        default: Date.now,
    },
    reachSourceSite: {
        type: String,
        uppercase: true,
        minlength: 2,
        maxlength: 3,
        required: true,
    },
    reachType: {
        type: String,
        required: true,
    },
    callersFirstName: {
        type: String,
        required: true,
    },
    addictsRelationshipToCaller: {
        type: String,
        required: true
    },
    addictsAge: {
        type: Number,
    },
    addictsState: {
        type: String,
    },
    substanceAbused: {
        type: String,
    },
    medicationsUsed: {
        type: String,
    },
    legalIssues: {
        type: String,
    },
    medicalIssues: {
        type: String,
    },
    willingToGetHelp: {
        type: String,
    },
    beenInTreatmentBefore: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    assignTo: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        // type: String,
        // required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});
const Reach = mongoose.model('reaches', ReachSchema);
module.exports = Reach;