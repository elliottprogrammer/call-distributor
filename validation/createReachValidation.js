const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateReachInput(data) {
    let errors = {};

    data.reachSourceSite = isEmpty(data.reachSourceSite) ? '' : data.reachSourceSite;
    data.reachType = isEmpty(data.reachType) ? '' : data.reachType;
    data.callersFirstName = isEmpty(data.callersFirstName) ? '' : data.callersFirstName;
    data.addictsRelationshipToCaller = isEmpty(data.addictsRelationshipToCaller) ? '' : data.addictsRelationshipToCaller;
    data.addictsAge = isEmpty(data.addictsAge) ? '' : data.addictsAge;
    data.addictsState = isEmpty(data.addictsState) ? '' : data.addictsState;
    data.substanceAbused = isEmpty(data.substanceAbused) ? '' : data.substanceAbused;
    data.medicationsUsed = isEmpty(data.medicationsUsed) ? '' : data.medicationsUsed;
    data.legalIssues = isEmpty(data.legalIssues) ? '' : data.legalIssues;
    data.medicalIssues = isEmpty(data.medicalIssues) ? '' : data.medicalIssues;
    data.willingToGetHelp = isEmpty(data.willingToGetHelp) ? '' : data.willingToGetHelp;
    data.beenInTreatmentBefore = isEmpty(data.beenInTreatmentBefore) ? '' : data.beenInTreatmentBefore;
    data.phone = isEmpty(data.phone) ? '' : data.phone;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.assignTo = isEmpty(data.assignTo) ? '' : data.assignTo;


    if (Validator.isEmpty(data.reachSourceSite)) {
        errors.reachSourceSite = 'This field is required';
    }
    if (Validator.isEmpty(data.reachType)) {
        errors.reachType = 'This field is required';
    }
    if (Validator.isEmpty(data.callersFirstName)) {
        errors.callersFirstName = 'This field is required';
    }
    if (Validator.isEmpty(data.addictsRelationshipToCaller)) {
        errors.addictsRelationshipToCaller = 'This field is required';
    }
    if (Validator.isEmpty(data.assignTo)) {
        errors.assignTo = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}