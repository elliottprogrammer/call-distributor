const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'spectator'
    },
    password: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('users', UserSchema);
module.exports = User;